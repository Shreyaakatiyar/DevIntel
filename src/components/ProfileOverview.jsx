import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { RiGitRepositoryFill,RiStarSFill } from "react-icons/ri";
import { FaCodeFork, FaBusinessTime} from "react-icons/fa6";
import LanguageChart from './LanguageChart';
import ContributionHeatmap from './ContributionHeatmap'
import AIInsights from './AIInsights'

const ProfileOverview = ({profile, repos, contributions, heatmapData, selectedYear, setSelectedYear, setActiveSection}) => {
    // total stars 
    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0,
    );

    // total forks 
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    // joining year 
    const joinYear = new Date(profile.created_at).getFullYear();
    const currentYear = new Date().getFullYear();

    const githubAge = currentYear - joinYear;

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 p-4 md:p-8">
        {/* Profile Overview card */}
        <div className="lg:col-span-2 bg-[#202020] rounded-xl p-5 md:p-8 relative overflow-hidden border border-white/5">
          <div className="flex flex-col sm:flex-row items-start gap-5 md:gap-8 relative z-10">
            <div className="relative">
              <img
                alt="User Avatar"
                className="w-20 h-20 md:w-30 md:h-30 rounded-xl object-cover shadow-lg"
                src={profile.avatar_url}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  {profile.name || profile.login}
                </h2>
                <span className="bg-[#3b82f6]/10 text-[#3b82f6] px-3 py-1 rounded-full text-xs font-medium">
                  @{profile.login}
                </span>
              </div>

              <p className="text-gray-400 mt-3 max-w-xl leading-relaxed text-sm">
                {profile.bio}
              </p>

              <div className="flex items-center gap-2 mt-4 text-gray-400 text-sm">
                <FaLocationDot className="text-[#3b82f6] shrink-0" />
                <span>{profile.location}</span>
              </div>

              <div className="flex flex-wrap gap-6 md:gap-10 mt-4 mb-6">
                <div>
                  <p className="text-lg md:text-xl font-semibold text-white">
                    {profile.followers}
                  </p>
                  <p className="text-xs text-gray-400">Followers</p>
                </div>
                <div>
                  <p className="text-lg md:text-xl font-semibold text-white">
                    {profile.following}
                  </p>
                  <p className="text-xs text-gray-400">Following</p>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm font-medium border border-[#3b82f6] hover:bg-transparent hover:text-[#3b82f6] transition-all duration-200 cursor-pointer">
                    View GitHub
                  </button>
                </a>
                <button
                  onClick={() => setActiveSection("compare")}
                  className="px-4 py-2 bg-white/5 text-gray-300 rounded-lg text-sm hover:bg-white/20 transition cursor-pointer"
                >
                  Compare
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Card */}
        <AIInsights profile={profile} repos={repos} />
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 p-4 md:p-8">
        {[
          {
            icon: <RiGitRepositoryFill className="w-4 h-4 md:w-6 md:h-6" />,
            label: "Total Repos",
            value: profile.public_repos,
          },
          {
            icon: <RiStarSFill className="w-4 h-4 md:w-6 md:h-6" />,
            label: "Total Stars",
            value: totalStars,
          },
          {
            icon: <FaBusinessTime className="w-4 h-4 md:w-6 md:h-6" />,
            label: "On GitHub since",
            value: `${githubAge} yrs`,
          },
          {
            icon: <FaCodeFork className="w-4 h-4 md:w-5 md:h-5" />,
            label: "Total Forks",
            value: totalForks,
          },
        ].map((stat, i) => (
          <div key={i} className="bg-[#202020] rounded-xl p-3 md:p-6">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-[#3b82f6]/15 flex items-center justify-center mb-2 md:mb-4">
              <span className="text-[#3b82f6]">{stat.icon}</span>
            </div>
            <p className="text-[#3b82f6]/80 text-[10px] md:text-sm font-medium truncate">
              {stat.label}
            </p>
            <h4 className="text-lg md:text-2xl font-bold text-white mt-1 truncate">
              {stat.value}
            </h4>
          </div>
        ))}
      </section>

      {/* Language + Heatmap */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 p-4 md:p-8">
        <div className="lg:col-span-1">
          <LanguageChart repos={repos} />
        </div>
        <div className="lg:col-span-2">
          <ContributionHeatmap
            heatmapData={heatmapData}
            contributions={contributions}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            repos={repos}
            profile={profile}
          />
        </div>
      </section>
    </>
  );
}

export default ProfileOverview