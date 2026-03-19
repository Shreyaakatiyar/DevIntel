import { useState, useEffect } from "react";
import { BsStars } from "react-icons/bs";
import { VscCode } from "react-icons/vsc";
import { MdOutlineTimeline, MdOutlineStyle } from "react-icons/md";
import { TbBrandGit } from "react-icons/tb";
import { RiRefreshLine } from "react-icons/ri";

const cache = {};

const InsightsDashboard = ({ profile, repos }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const generateInsights = async (force = false) => {
    if (!force && cache[profile.login]) {
      setData(cache[profile.login]);
      return;
    }

    setLoading(true);
    setError(null);

    const languageCount = {};
    repos.forEach(repo => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });
    const topLanguages = Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang]) => lang);

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const topRepos = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map(r => `${r.name} (${r.stargazers_count} stars, ${r.language || "unknown"})`);

    const prompt = `You are an expert developer profiler. Analyze this GitHub profile and return a detailed JSON report.

Developer: ${profile.name || profile.login}
Bio: ${profile.bio || "Not provided"}
Followers: ${profile.followers}
Public Repos: ${profile.public_repos}
Top Languages: ${topLanguages.join(", ")}
Total Stars: ${totalStars}
Top Repos: ${topRepos.join(", ")}
Account Age: ${new Date().getFullYear() - new Date(profile.created_at).getFullYear()} years

Return ONLY valid JSON, no markdown, no extra text:
{
  "persona": "2-3 word developer archetype title e.g. The Frontend Architect",
  "summary": "2-3 sentence executive summary of this developer highlighting their main strengths and focus areas",
  "recentTrend": "1-2 sentences about what their recent activity or trajectory suggests",
  "impactScore": number between 1 and 100,
  "reviewQuality": "letter grade A+ A B+ B C",
  "collaboration": "High / Medium / Low",
  "cards": [
    { "icon": "code", "label": "Primary Tech Stack", "value": "top 2-3 technologies", "detail": "one short sentence" },
    { "icon": "focus", "label": "Development Focus", "value": "main focus area", "detail": "one short sentence" },
    { "icon": "activity", "label": "Repository Activity", "value": "activity level", "detail": "one short sentence" },
    { "icon": "style", "label": "Project Style", "value": "style descriptor", "detail": "one short sentence" }
  ]
}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const res = await response.json();
      if (res.error) { setError(`Error loading AI Anlaysis`); return; }

      const text = res.candidates[0].content.parts[0].text.trim();
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      cache[profile.login] = parsed;
      setData(parsed);
      setLastUpdated(new Date());

    } catch (err) {
      setError(`Failed to generate insights: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData(null);
    setError(null);
    setLastUpdated(null);
  }, [profile.login]);

  const iconMap = {
    code: <VscCode className="text-[#3b82f6] text-xl" />,
    focus: <TbBrandGit className="text-[#3b82f6] text-xl" />,
    activity: <MdOutlineTimeline className="text-[#3b82f6] text-xl" />,
    style: <MdOutlineStyle className="text-[#3b82f6] text-xl" />,
  };

  const formatTime = (date) => {
    if (!date) return "";
    const diff = Math.floor((new Date() - date) / 1000);
    if (diff < 60) return "Updated just now";
    if (diff < 3600) return `Updated ${Math.floor(diff / 60)} mins ago`;
    return `Updated ${Math.floor(diff / 3600)} hours ago`;
  };

  return (
    <div className="flex flex-col flex-1 p-5 gap-6 min-h-full">
      {/* Page header */}
      <div className="flex items-start justify-between">
        {data && !loading && (
          <button
            onClick={() => {
              delete cache[profile.login];
              generateInsights(true);
            }}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-lg text-sm hover:bg-white/10 transition cursor-pointer disabled:opacity-40"
          >
            <RiRefreshLine className={loading ? "animate-spin" : ""} />
            Refresh AI
          </button>
        )}
      </div>

      {/* Initial state */}
      {!data && !loading && !error && (
        <div className="grow flex items-center justify-center min-h-[70vh]">
          <div className="flex flex-col items-center gap-6 bg-[#1b1b1b] border border-white/5 rounded-xl p-16 w-full max-w-md">
            <div className="w-16 h-16 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
              <BsStars className="text-[#3b82f6] text-2xl" />
            </div>
            <div className="text-center">
              <p className="text-white font-semibold mb-2">
                Generate AI Analysis
              </p>
              <p className="text-gray-400 text-sm">
                Get a detailed breakdown of {profile.login}'s development style,
                strengths, and technical focus.
              </p>
            </div>
            <button
              onClick={() => generateInsights()}
              className="px-6 py-2.5 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition cursor-pointer w-full"
            >
              Analyze Profile
            </button>
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="flex flex-col gap-4 animate-pulse">
          {/* Summary card skeleton */}
          <div className="bg-[#1b1b1b] border border-white/5 rounded-xl p-8 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-32 h-6 bg-[#2a2a2a] rounded-full"></div>
              <div className="w-24 h-4 bg-[#2a2a2a] rounded"></div>
            </div>
            <div className="h-7 bg-[#2a2a2a] rounded w-2/3 mb-5"></div>
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-[#2a2a2a] rounded w-full"></div>
              <div className="h-4 bg-[#2a2a2a] rounded w-5/6"></div>
              <div className="h-4 bg-[#2a2a2a] rounded w-4/6"></div>
            </div>
            <div className="h-px bg-[#2a2a2a] w-full mb-6"></div>
            <div className="flex gap-12">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-3 bg-[#2a2a2a] rounded w-20 mb-3"></div>
                  <div className="h-7 bg-[#2a2a2a] rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-[#1b1b1b] border border-white/5 rounded-xl p-5"
              >
                <div className="w-10 h-10 bg-[#2a2a2a] rounded-lg mb-5"></div>
                <div className="h-3 bg-[#2a2a2a] rounded w-2/3 mb-3"></div>
                <div className="h-5 bg-[#2a2a2a] rounded w-full mb-3"></div>
                <div className="h-3 bg-[#2a2a2a] rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm mb-3">{error}</p>
          <button
            onClick={() => generateInsights()}
            className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      {/* Results */}
      {data && !loading && (
        <div className="flex flex-col gap-4">
          {/* Executive summary card */}
          <div className="bg-[#1b1b1b] border border-white/5 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#3b82f6]/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              {/* Badge + timestamp */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-semibold rounded-full uppercase tracking-widest">
                  Executive Summary
                </span>
                {lastUpdated && (
                  <span className="text-gray-500 text-xs">
                    {formatTime(lastUpdated)}
                  </span>
                )}
              </div>

              {/* Persona */}
              <h3 className="text-2xl font-bold text-white mb-5">
                Development Persona:{" "}
                <span className="text-[#3b82f6]">{data.persona}</span>
              </h3>

              {/* Summary paragraphs */}
              <p className="text-gray-300 text-sm leading-relaxed mb-3 max-w-4xl">
                {data.summary}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-4xl">
                {data.recentTrend}
              </p>

              {/* Divider */}
              <div className="h-px bg-white/5 w-full my-6"></div>

              {/* Score row */}
              <div className="flex items-center gap-16">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Impact Score
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {data.impactScore}
                    <span className="text-gray-500 text-lg font-normal">
                      /100
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Review Quality
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {data.reviewQuality}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Collaboration
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {data.collaboration}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Insight cards — full width grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.cards?.map((card, i) => (
              <div
                key={i}
                className="bg-[#1b1b1b] border border-white/5 rounded-xl p-6 hover:border-[#3b82f6]/20 transition-all flex flex-col gap-4"
              >
                <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                  {iconMap[card.icon] || <BsStars className="text-[#3b82f6]" />}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                    {card.label}
                  </p>
                  <p className="text-white font-semibold text-sm mb-1">
                    {card.value}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {card.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsDashboard;