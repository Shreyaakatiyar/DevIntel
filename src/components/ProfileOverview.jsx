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
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 ">
        {/* Profile Overview card */}
        <div className="lg:col-span-2 bg-[#202020] rounded-xl p-8 relative overflow-hidden border border-white/5">
          <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
            <div className="relative">
              <img
                alt="User Avatar"
                className="w-30 h-30 rounded-xl object-cover shadow-lg"
                src={profile.avatar_url}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-3xl font-semibold text-white">
                  {profile.name || profile.login}
                </h2>

                <span className="bg-[#3b82f6]/10 text-[#3b82f6] px-3 py-1 rounded-full text-xs font-medium">
                  @{profile.login}
                </span>
              </div>

              <p className="text-gray-400 mt-3 max-w-xl leading-relaxed">
                {profile.bio}
              </p>

              <div className="flex items-center gap-2 mt-6 text-gray-400 text-sm">
                <FaLocationDot className="text-[#3b82f6]" />
                <span>{profile.location}</span>
              </div>

              <div className="flex flex-wrap gap-10 mt-6 mb-8">
                <div>
                  <p className="text-xl font-semibold text-white">
                    {profile.followers}
                  </p>
                  <p className="text-xs text-gray-400">Followers</p>
                </div>

                <div>
                  <p className="text-xl font-semibold text-white">
                    {profile.following}
                  </p>
                  <p className="text-xs text-gray-400">Following</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
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

        {/* AI Insights Card  */}

        <AIInsights profile={profile} repos={repos} />
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        <div className="bg-[#202020] rounded-xl p-6">
          <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/15 flex items-center justify-center mb-4">
            <span className="text-primary">
              {" "}
              <RiGitRepositoryFill className="w-6 h-6" />{" "}
            </span>
          </div>
          <p className="text-[#3b82f6]/80 text-sm font-medium">Total Repos</p>
          <h4 className="text-2xl font-bold text-on-surface mt-1">
            {profile.public_repos}
          </h4>
        </div>
        <div className="bg-[#202020] rounded-xl p-6">
          <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/15 flex items-center justify-center mb-4">
            <span className="text-primary">
              {" "}
              <RiStarSFill className="w-6 h-6" />{" "}
            </span>
          </div>
          <p className="text-[#3b82f6]/80 text-sm font-medium">Total Stars</p>
          <h4 className="text-2xl font-bold text-on-surface mt-1">
            {totalStars}
          </h4>
        </div>
        <div className="bg-[#202020] rounded-xl p-6">
          <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/15 flex items-center justify-center mb-4">
            <span className="text-primary">
              {" "}
              <FaBusinessTime className="w-6 h-6" />{" "}
            </span>
          </div>
          <p className="text-[#3b82f6]/80 text-sm font-medium">
            On GitHub <span className="text-sm">since</span>
          </p>
          <h4 className="text-2xl font-bold text-on-surface mt-1">
            {githubAge} years
          </h4>
        </div>
        <div className="bg-[#202020] rounded-xl p-6">
          <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/15 flex items-center justify-center mb-4">
            <span className="text-primary">
              {" "}
              <FaCodeFork className="w-5 h-5" />{" "}
            </span>
          </div>
          <p className="text-[#3b82f6]/80 text-sm font-medium">Total Forks</p>
          <h4 className="text-2xl font-bold text-on-surface mt-1">
            {totalForks}
          </h4>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        {/* Language card */}

        <LanguageChart repos={repos} />

        {/* Heatmap Card */}
        <ContributionHeatmap
          heatmapData={heatmapData}
          contributions={contributions}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          repos={repos}
          profile={profile}
        />
      </section>
    </>
  );
}

export default ProfileOverview