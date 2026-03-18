import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import axios from 'axios'
import { RiStarSFill, RiGitRepositoryFill } from 'react-icons/ri'
import { MdPeopleAlt } from 'react-icons/md'
import { FaCodeFork } from 'react-icons/fa6'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const CompareDevelopers = ({ profile, repos }) => {
  const [compareUsername, setCompareUsername] = useState("")
  const [compareProfile, setCompareProfile] = useState(null)
  const [compareRepos, setCompareRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCompare = async () => {
    if (!compareUsername.trim()) return
    setLoading(true)
    setError(null)
    try {
      const [userRes, repoRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${compareUsername}`),
        axios.get(`https://api.github.com/users/${compareUsername}/repos`)
      ])
      setCompareProfile(userRes.data)
      setCompareRepos(repoRes.data)
    } catch {
      setError("User not found.")
    } finally {
      setLoading(false)
    }
  }

  const totalStars1 = repos.reduce((s, r) => s + r.stargazers_count, 0)
  const totalStars2 = compareRepos.reduce((s, r) => s + r.stargazers_count, 0)
  const totalForks1 = repos.reduce((s, r) => s + r.forks_count, 0)
  const totalForks2 = compareRepos.reduce((s, r) => s + r.forks_count, 0)

  const chartData = compareProfile ? [
    { metric: "Followers", [profile.login]: profile.followers, [compareProfile.login]: compareProfile.followers },
    { metric: "Repos", [profile.login]: profile.public_repos, [compareProfile.login]: compareProfile.public_repos },
    { metric: "Stars", [profile.login]: totalStars1, [compareProfile.login]: totalStars2 },
    { metric: "Forks", [profile.login]: totalForks1, [compareProfile.login]: totalForks2 },
  ] : []

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-2">Compare Developers</h2>
      <p className="text-gray-400 text-sm mb-8">Compare {profile.login} with another GitHub developer</p>

      {/* Search */}
      <div className="flex gap-3 mb-8 max-w-lg">
        <div className="relative flex-1">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={compareUsername}
            onChange={e => setCompareUsername(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleCompare()}
            placeholder="Enter GitHub username to compare..."
            className="w-full bg-[#202020] border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]/40"
          />
        </div>
        <button
          onClick={handleCompare}
          disabled={loading}
          className="px-4 py-2.5 bg-[#3b82f6] text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition cursor-pointer disabled:opacity-50"
        >
          {loading ? "Loading..." : "Compare"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-6">{error}</p>}

      {compareProfile && (
        <>
          {/* Profile cards side by side */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { p: profile, stars: totalStars1, forks: totalForks1 },
              { p: compareProfile, stars: totalStars2, forks: totalForks2 }
            ].map(({ p, stars, forks }) => (
              <div key={p.login} className="bg-[#202020] border border-white/5 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={p.avatar_url} className="w-12 h-12 rounded-xl" alt={p.login} />
                  <div>
                    <p className="text-white font-semibold">{p.name || p.login}</p>
                    <p className="text-[#3b82f6] text-xs">@{p.login}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#2a2a2a] rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <MdPeopleAlt /> Followers
                    </div>
                    <p className="text-white font-bold">{p.followers.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <RiGitRepositoryFill /> Repos
                    </div>
                    <p className="text-white font-bold">{p.public_repos}</p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <RiStarSFill /> Stars
                    </div>
                    <p className="text-white font-bold">{stars.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <FaCodeFork /> Forks
                    </div>
                    <p className="text-white font-bold">{forks.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison chart */}
          <div className="bg-[#202020] border border-white/5 rounded-xl p-6">
            <p className="text-sm font-medium text-gray-300 mb-6">Side-by-side Comparison</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} barSize={24}>
                <XAxis dataKey="metric" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1b1b1b", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", color: "#9ca3af" }} />
                <Bar dataKey={profile.login} fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.85} />
                <Bar dataKey={compareProfile.login} fill="#6366f1" radius={[4, 4, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  )
}

export default CompareDevelopers