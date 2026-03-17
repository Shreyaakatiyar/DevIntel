import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdPeopleAlt,MdGroupAdd  } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { RiGitRepositoryFill,RiStarSFill, RiGitRepositoryCommitsFill } from "react-icons/ri";
import { FaCodeFork, FaBusinessTime} from "react-icons/fa6";
import {PieChart, Pie, Tooltip, ResponsiveContainer} from "recharts";

const ProfileOverview = ({profile, repos}) => {
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

    // language chart 
    const languageCount = {};

    if (repos) {
      repos.forEach((repo) => {
        if (repo.language) {
          languageCount[repo.language] =
            (languageCount[repo.language] || 0) + 1;
        }
      });
    }

    const generateColor = (index, total) => {
      const hue = (index * 360) / total; // spread evenly
      return `hsl(${hue}, 70%, 55%)`;
    };

    const languageData = Object.entries(languageCount).map(
      ([name, value], index, arr) => ({
        name,
        value,
        fill: generateColor(index, arr.length),
      }),
    );
    
    const totalLanguages = languageData.reduce(
      (sum, lang) => sum + lang.value,
      0,
    );

    const languageWithPercent = languageData.map((lang) => ({
      ...lang,
      percent:
      totalLanguages > 0
      ? Math.round((lang.value / totalLanguages) * 100)
      : 0,
    }));

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
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

                <button className="px-4 py-2 bg-white/5 text-gray-300 rounded-lg text-sm hover:bg-white/20 transition cursor-pointer">
                  Compare
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Card  */}
        <div className="bg-[#202020] rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute bg-[#1b1b1b]"></div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-primary">
              {" "}
              <BsStars className="text-[#3b82f6]/70" />{" "}
            </span>
            <h3 class="text-sm font-bold uppercase tracking-widest text-primary">
              AI Insights
            </h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#313131] ">
              <p className="text-xs text-[#3b82f6]/80 font-medium mb-1 uppercase">
                Primary focus
              </p>
              <p className="text-on-surface text-sm font-medium">
                Cloud Infrastructure &amp; High-Performance Computing
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#313131] ghost-border">
              <p className="text-xs text-[#3b82f6]/80 font-medium mb-1 uppercase">
                Core Proficiency
              </p>
              <p className="text-on-surface text-sm font-medium">
                Strong architectural patterns in Go and Rust
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#313131] ghost-border">
              <p className="text-xs text-[#3b82f6]/80 font-medium mb-1 uppercase">
                Contribution Style
              </p>
              <p className="text-on-surface text-sm font-medium">
                Consistency leads to 99th percentile reliability score.
              </p>
            </div>
          </div>
        </div>
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
        {/* Language Card */}
        <div className="bg-[#1b1b1b] rounded-xl p-8">
          <h3 className="text-lg font-bold text-primary mb-8">
            Language Usage
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={languageData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1b1b1b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value, name) => {
                  const percent = Math.round((value / totalLanguages) * 100);
                  return [`${percent}%`, name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-3">
            {languageWithPercent.map((lang, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.fill }}
                  ></span>

                  <span className="text-gray-300 text-sm">{lang.name}</span>
                </div>

                <span className="text-gray-400 text-sm">{lang.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap Card */}
        <div className="bg-[#1b1b1b] rounded-xl p-8">
          <h3 className="text-lg font-bold text-primary mb-8">
            Contribution Heatmap
          </h3>
        </div>
      </section>
    </>
  );
}

export default ProfileOverview