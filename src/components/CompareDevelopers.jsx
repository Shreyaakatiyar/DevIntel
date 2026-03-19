import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import axios from 'axios'
import { RiStarSFill, RiGitRepositoryFill } from 'react-icons/ri'
import { MdPeopleAlt } from 'react-icons/md'
import { FaCodeFork, FaLocationDot } from 'react-icons/fa6'
import { FiExternalLink } from 'react-icons/fi'
import { BsStars } from 'react-icons/bs'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const cache = {};

const CompareSection = ({ profile, repos }) => {
  const [compareUsername, setCompareUsername] = useState("")
  const [compareProfile, setCompareProfile] = useState(null)
  const [compareRepos, setCompareRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)

  const handleCompare = async () => {
    if (!compareUsername.trim()) return
    setLoading(true)
    setError(null)
    setCompareProfile(null)
    setAiAnalysis(null)
    try {
      const [userRes, repoRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${compareUsername}`),
        axios.get(`https://api.github.com/users/${compareUsername}/repos`)
      ])
      setCompareProfile(userRes.data)
      setCompareRepos(repoRes.data)
      generateAIAnalysis(userRes.data, repoRes.data)
    } catch {
      setError("User not found.")
    } finally {
      setLoading(false)
    }
  }

  const generateAIAnalysis = async (cp, cr) => {
    const cacheKey = `${profile.login}-${cp.login}`
    if (cache[cacheKey]) { setAiAnalysis(cache[cacheKey]); return; }
    setAiLoading(true)
    const langs1 = getTopLanguages(repos)
    const langs2 = getTopLanguages(cr)
    const stars1 = repos.reduce((s, r) => s + r.stargazers_count, 0)
    const stars2 = cr.reduce((s, r) => s + r.stargazers_count, 0)
    const prompt = `Compare these two GitHub developers and return ONLY valid JSON:
Developer 1: ${profile.login}, ${profile.followers} followers, ${profile.public_repos} repos, ${stars1} stars, top languages: ${langs1.join(", ")}
Developer 2: ${cp.login}, ${cp.followers} followers, ${cp.public_repos} repos, ${stars2} stars, top languages: ${langs2.join(", ")}
{
  "analysis": "2-3 sentences comparing both developers, mentioning their usernames with @ symbol",
  "recommendation": "one sentence on who to hire for what"
}`
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) }
      )
      const res = await response.json()
      const text = res.candidates[0].content.parts[0].text.trim()
      const clean = text.replace(/```json|```/g, "").trim()
      const parsed = JSON.parse(clean)
      cache[cacheKey] = parsed
      setAiAnalysis(parsed)
    } catch (e) { console.error(e) }
    finally { setAiLoading(false) }
  }

  const getTopLanguages = (repoList) => {
    const count = {}
    repoList.forEach(r => { if (r.language) count[r.language] = (count[r.language] || 0) + 1 })
    return Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([l]) => l)
  }

  const getLanguageData = (repoList) => {
    const count = {}
    repoList.forEach(r => { if (r.language) count[r.language] = (count[r.language] || 0) + 1 })
    const total = Object.values(count).reduce((a, b) => a + b, 0)
    return Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 4)
      .map(([lang, val]) => ({ lang, pct: Math.round((val / total) * 100) }))
  }

  const getReposByYear = (repoList) => {
    const byYear = {}
    repoList.forEach(r => { const y = new Date(r.created_at).getFullYear(); byYear[y] = (byYear[y] || 0) + 1 })
    return Object.entries(byYear).sort((a, b) => a[0] - b[0]).map(([year, count]) => ({ year, count }))
  }

  const totalStars1 = repos.reduce((s, r) => s + r.stargazers_count, 0)
  const totalStars2 = compareRepos.reduce((s, r) => s + r.stargazers_count, 0)
  const totalForks1 = repos.reduce((s, r) => s + r.forks_count, 0)
  const totalForks2 = compareRepos.reduce((s, r) => s + r.forks_count, 0)
  const avgStars1 = repos.length ? Math.round(totalStars1 / repos.length) : 0
  const avgStars2 = compareRepos.length ? Math.round(totalStars2 / compareRepos.length) : 0
  const avgForks1 = repos.length ? Math.round(totalForks1 / repos.length) : 0
  const avgForks2 = compareRepos.length ? Math.round(totalForks2 / compareRepos.length) : 0
  const langColors = ["#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"]
  const topRepos1 = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3)
  const topRepos2 = [...compareRepos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3)

  const growthData = compareProfile ? (() => {
    const years = new Set([...getReposByYear(repos).map(d => d.year), ...getReposByYear(compareRepos).map(d => d.year)])
    return [...years].sort().map(year => ({
      year,
      [profile.login]: getReposByYear(repos).find(d => d.year == year)?.count || 0,
      [compareProfile.login]: getReposByYear(compareRepos).find(d => d.year == year)?.count || 0,
    }))
  })() : []

  return (
    <div className="flex flex-col p-4 md:p-8 gap-5 md:gap-6">

      {/* Header */}
      <div>
        <p className="text-xs text-[#3b82f6]/80 uppercase tracking-widest mb-2">Benchmarking Engine</p>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Compare GitHub Developers</h2>
        <p className="text-gray-400 text-xs md:text-sm">Cross-reference talent engineering metrics and repository velocity.</p>
      </div>

      {/* Search bar — stacks on mobile */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex items-center gap-2 flex-1 sm:flex-none mb-4 sm:mb-0">
          <div className="relative flex-1 sm:flex-none">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
            <input
              value={profile.login}
              readOnly
              className="bg-[#202020] border border-white/10 rounded-xl py-2.5 pl-8 pr-4 text-sm text-gray-300 w-full sm:w-36 cursor-not-allowed"
            />
          </div>
          <span className="text-gray-500 text-sm font-medium shrink-0">VS</span>
          <div className="relative flex-1 sm:flex-none">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
            <input
              value={compareUsername}
              onChange={(e) => setCompareUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCompare()}
              placeholder="username"
              className="bg-[#202020] border border-white/10 rounded-xl py-2.5 pl-8 pr-4 text-sm text-white w-full sm:w-36 focus:outline-none focus:border-[#3b82f6]/40 placeholder-gray-500"
            />
          </div>
        </div>
        <button
          onClick={handleCompare}
          disabled={loading}
          className="px-5 py-2.5 bg-[#3b82f6] text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition cursor-pointer disabled:opacity-50 whitespace-nowrap w-full sm:w-auto"
        >
          {loading ? "Loading..." : "Compare Profiles"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Initial empty state */}
      {!compareProfile && !loading && !error && (
        <div className="flex items-center justify-center min-h-[40vh] md:min-h-[50vh]">
          <div className="text-center px-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#3b82f6]/10 flex items-center justify-center mx-auto mb-4">
              <IoSearch className="text-[#3b82f6] text-xl md:text-2xl" />
            </div>
            <p className="text-white font-semibold mb-2 text-sm md:text-base">Search a developer to compare</p>
            <p className="text-gray-500 text-xs md:text-sm">Enter a GitHub username above to start benchmarking</p>
          </div>
        </div>
      )}

      {compareProfile && (
        <>
          {/* AI Talent Analysis */}
          <div className="bg-[#1b1b1b] border border-white/5 rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <BsStars className="text-[#3b82f6] text-sm" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-xs md:text-sm mb-2">AI Talent Analysis</p>
                {aiLoading ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-3 bg-[#2a2a2a] rounded w-full"></div>
                    <div className="h-3 bg-[#2a2a2a] rounded w-4/5"></div>
                  </div>
                ) : aiAnalysis ? (
                  <>
                    <p className="text-gray-400 text-xs leading-relaxed mb-1">{aiAnalysis.analysis}</p>
                    <p className="text-gray-500 text-xs">{aiAnalysis.recommendation}</p>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* Profile cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { p: profile, stars: totalStars1, forks: totalForks1 },
              { p: compareProfile, stars: totalStars2, forks: totalForks2 },
            ].map(({ p }) => (
              <div key={p.login} className="bg-[#1b1b1b] border border-white/5 rounded-xl p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <img src={p.avatar_url} className="w-10 h-10 md:w-12 md:h-12 rounded-xl shrink-0" alt={p.login} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{p.name || p.login}</p>
                    <p className="text-[#3b82f6] text-xs">@{p.login}</p>
                    {p.bio && <p className="text-gray-400 text-xs mt-1 line-clamp-1">{p.bio}</p>}
                  </div>
                  <a href={p.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition shrink-0">
                    <FiExternalLink className="text-sm" />
                  </a>
                </div>
                {p.location && (
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                    <FaLocationDot className="text-[#3b82f6] shrink-0" />
                    <span className="truncate">{p.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1"><MdPeopleAlt />{p.followers.toLocaleString()} followers</span>
                  <span className="flex items-center gap-1"><RiGitRepositoryFill />{p.public_repos} repos</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats comparison — 2 cols on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: "Followers", icon: <MdPeopleAlt />, v1: profile.followers, v2: compareProfile.followers },
              { label: "Repos", icon: <RiGitRepositoryFill />, v1: profile.public_repos, v2: compareProfile.public_repos },
              { label: "Stars", icon: <RiStarSFill />, v1: totalStars1, v2: totalStars2 },
              { label: "Forks", icon: <FaCodeFork />, v1: totalForks1, v2: totalForks2 },
            ].map(({ label, icon, v1, v2 }) => (
              <div key={label} className="bg-[#1b1b1b] border border-white/5 rounded-xl p-3 md:p-5">
                <div className="flex items-center justify-between text-gray-500 text-[10px] md:text-xs mb-2 md:mb-3">
                  <span className="uppercase tracking-widest">{label}</span>
                  {icon}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white font-bold text-base md:text-xl">{v1.toLocaleString()}</p>
                    <p className="text-gray-500 text-[10px] truncate max-w-15 md:max-w-none">@{profile.login}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-base md:text-xl ${v2 > v1 ? "text-[#3b82f6]" : "text-white"}`}>{v2.toLocaleString()}</p>
                    <p className="text-gray-500 text-[10px] truncate max-w-15 md:max-w-none">@{compareProfile.login}</p>
                  </div>
                </div>
                <div className="mt-2 md:mt-3 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b82f6] rounded-full" style={{ width: `${Math.round((v1 / (v1 + v2 || 1)) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Languages + Growth — stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Programming Languages */}
            <div className="bg-[#1b1b1b] border border-white/5 rounded-xl p-4 md:p-6">
              <p className="text-white font-semibold text-sm mb-4 md:mb-5">Programming Languages</p>
              <div className="space-y-4">
                {[
                  { username: profile.login, langs: getLanguageData(repos) },
                  { username: compareProfile.login, langs: getLanguageData(compareRepos) },
                ].map(({ username, langs }) => (
                  <div key={username}>
                    <p className="text-gray-400 text-xs mb-2">@{username}</p>
                    <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                      {langs.map((l, i) => (
                        <div key={l.lang} style={{ width: `${l.pct}%`, backgroundColor: langColors[i] }} title={`${l.lang} ${l.pct}%`} />
                      ))}
                    </div>
                    <div className="flex gap-2 md:gap-3 mt-2 flex-wrap">
                      {langs.map((l, i) => (
                        <span key={l.lang} className="flex items-center gap-1 text-xs text-gray-400">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: langColors[i] }}></span>
                          <span className="truncate max-w-15">{l.lang}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-5 pt-4 md:pt-5 border-t border-white/5">
                <div>
                  <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest mb-1">Avg Stars/Repo</p>
                  <div className="flex gap-3 md:gap-4">
                    <p className="text-white font-bold text-sm">{avgStars1.toLocaleString()}</p>
                    <p className="text-[#3b82f6] font-bold text-sm">{avgStars2.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest mb-1">Avg Forks/Repo</p>
                  <div className="flex gap-3 md:gap-4">
                    <p className="text-white font-bold text-sm">{avgForks1.toLocaleString()}</p>
                    <p className="text-[#3b82f6] font-bold text-sm">{avgForks2.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Velocity */}
            <div className="bg-[#1b1b1b] border border-white/5 rounded-xl p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-5 flex-wrap gap-2">
                <p className="text-white font-semibold text-sm">Growth Velocity</p>
                <div className="flex items-center gap-2 md:gap-3 text-xs flex-wrap">
                  <span className="flex items-center gap-1 text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-[#3b82f6] shrink-0"></span>@{profile.login}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-[#6366f1] shrink-0"></span>@{compareProfile.login}
                  </span>
                </div>
              </div>
              <Bar
                data={{
                  labels: growthData.map((d) => d.year),
                  datasets: [
                    { label: profile.login, data: growthData.map((d) => d[profile.login] || 0), backgroundColor: "rgba(59,130,246,0.85)", borderRadius: 4, borderSkipped: false },
                    { label: compareProfile.login, data: growthData.map((d) => d[compareProfile.login] || 0), backgroundColor: "rgba(99,102,241,0.85)", borderRadius: 4, borderSkipped: false },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { labels: { color: "#9ca3af", font: { size: 10 }, boxWidth: 10 } },
                    tooltip: { backgroundColor: "#1b1b1b", borderColor: "rgba(59,130,246,0.2)", borderWidth: 1, titleColor: "#fff", bodyColor: "#9ca3af" },
                  },
                  scales: {
                    x: { grid: { display: false }, ticks: { color: "#6b7280", font: { size: 9 } }, border: { display: false } },
                    y: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#6b7280", font: { size: 9 } }, border: { display: false } },
                  },
                }}
                height={120}
              />
            </div>
          </div>

          {/* Flagship Repositories — stack on mobile */}
          <div className="bg-[#1b1b1b] border border-white/5 rounded-xl p-4 md:p-6">
            <p className="text-white font-semibold text-sm mb-4 md:mb-5">Flagship Repositories</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { username: profile.login, repoList: topRepos1 },
                { username: compareProfile.login, repoList: topRepos2 },
              ].map(({ username, repoList }) => (
                <div key={username}>
                  <p className="text-gray-400 text-xs mb-3">@{username} Top Projects</p>
                  <div className="space-y-2 md:space-y-3">
                    {repoList.map((repo) => (
                      <div key={repo.id} className="flex items-center justify-between p-3 bg-[#252525] rounded-lg hover:bg-[#2a2a2a] transition group">
                        <div className="flex-1 min-w-0">
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                            className="text-white text-xs font-medium group-hover:text-[#3b82f6] transition truncate block">
                            {repo.name}
                          </a>
                          {repo.description && (
                            <p className="text-gray-500 text-xs truncate mt-0.5 hidden sm:block">{repo.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                          {repo.language && (
                            <span className="text-xs text-gray-500 bg-white/5 px-1.5 py-0.5 rounded hidden sm:inline">{repo.language}</span>
                          )}
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <RiStarSFill className="text-yellow-400" />{repo.stargazers_count.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </>
      )}
    </div>
  );
}

export default CompareSection