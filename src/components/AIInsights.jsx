import { useState, useEffect, useRef } from "react";
import { BsStars } from "react-icons/bs";

// Module-level cache — persists across renders, never resets
const cache = {};

const AIInsights = ({ profile, repos }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset when user changes
  useEffect(() => {
    setInsights(null);
    setError(null);
    setLoading(false);
  }, [profile.login]);

  const generateInsights = async () => {
    if (cache[profile.login]) {
      setInsights(cache[profile.login]);
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
    const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
    const topRepos = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3)
      .map(r => `${r.name} (${r.stargazers_count} stars)`);

    const prompt = `You are analyzing a GitHub developer profile. Based on the data below, generate exactly 3 short insights in JSON format.

Developer: ${profile.name || profile.login}
Bio: ${profile.bio || "Not provided"}
Followers: ${profile.followers}
Public Repos: ${profile.public_repos}
Top Languages: ${topLanguages.join(", ")}
Total Stars: ${totalStars}
Total Forks: ${totalForks}
Top Repos: ${topRepos.join(", ")}
Account Age: ${new Date().getFullYear() - new Date(profile.created_at).getFullYear()} years

Return ONLY a JSON array with exactly 3 objects, no extra text, no markdown:
[
  { "label": "Primary Focus", "insight": "one sentence about what they mainly work on" },
  { "label": "Core Proficiency", "insight": "one sentence about their strongest technical skills" },
  { "label": "Contribution Style", "insight": "one sentence about how they contribute to open source" }
]`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setError(`API Error: ${data.error.message}`);
        return;
      }

      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        setError("Unexpected response from Gemini.");
        return;
      }

      const text = data.candidates[0].content.parts[0].text.trim();
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      cache[profile.login] = parsed;
      setInsights(parsed);

    } catch (err) {
      setError(`Failed to generate insights: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#202020] rounded-xl p-6 relative overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BsStars className="text-[#3b82f6]/70" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">
            AI Insights
          </h3>
        </div>
        {insights && !loading && (
          <button
            onClick={() => {
              delete cache[profile.login];
              generateInsights();
            }}
            disabled={loading}
            className="text-xs text-[#3b82f6] hover:text-blue-400 transition cursor-pointer disabled:opacity-40"
          >
            Regenerate
          </button>
        )}
      </div>

      {/* Initial state */}
      {!insights && !loading && !error && (
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
            <BsStars className="text-[#3b82f6] text-xl" />
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm font-medium">AI-powered analysis</p>
            <p className="text-gray-500 text-xs mt-1">
              Generate insights based on this developer's GitHub data
            </p>
          </div>
          <button
            onClick={generateInsights}
            className="px-5 py-2 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition cursor-pointer"
          >
            Generate Insights
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#313131] animate-pulse">
              <div className="h-2.5 bg-[#404040] rounded w-1/3 mb-3"></div>
              <div className="h-3 bg-[#404040] rounded w-full mb-2"></div>
              <div className="h-3 bg-[#404040] rounded w-3/4"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={generateInsights}
            className="text-xs text-red-400 hover:text-red-300 mt-2 cursor-pointer block"
          >
            Try again
          </button>
        </div>
      )}

      {/* Insights */}
      {insights && !loading && (
        <div className="space-y-4">
          {insights.map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#313131]">
              <p className="text-xs text-[#3b82f6]/80 font-medium mb-1 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-gray-200 text-sm leading-relaxed">
                {item.insight}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default AIInsights;