import React from 'react'
import SideNavbar from '../components/SideNavbar'
import TopNavbar from '../components/TopNavbar'
import ProfileOverview from '../components/ProfileOverview'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
    const { username } = useParams();
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [contributions, setContributions] = useState(0);
    const [heatmapData, setHeatmapData] = useState([]);
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);

    const fetchContributions = async (username, year) => {
      const from = `${year}-01-01T00:00:00Z`;
      const to = `${year}-12-31T23:59:59Z`;
      const query = `
        query ($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays { date contributionCount }
                }
              }
            }
          }
        }
      `;
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { login: username, from, to } }),
      });
      const data = await res.json();
      const calendar = data.data.user.contributionsCollection.contributionCalendar;
      return { total: calendar.totalContributions, weeks: calendar.weeks };
    };

    useEffect(() => {
      const loadContributions = async () => {
        const contrib = await fetchContributions(username, selectedYear);
        setContributions(contrib.total);
        const formatted = contrib.weeks.flatMap((week) =>
          week.contributionDays.map((day) => ({
            date: day.date,
            count: day.contributionCount,
          }))
        );
        setHeatmapData(formatted);
      };
      if (username) loadContributions();
    }, [username, selectedYear]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setError(null);
          const userRes = await axios.get(`https://api.github.com/users/${username}`);
          const repoRes = await axios.get(`https://api.github.com/users/${username}/repos`);
          setProfile(userRes.data);
          setRepos(repoRes.data);
        } catch (err) {
          setError(err.response?.status === 404
            ? `No GitHub user found for "${username}".`
            : "Something went wrong while fetching the profile. Please try again."
          );
        }
      };
      fetchData();
    }, [username]);

    // Error state
    if (error) {
      return (
        <div className="flex min-h-screen">
          <SideNavbar />
          <main className="ml-64 flex-1 flex flex-col">
            <TopNavbar />
            <div className="flex flex-col items-center justify-center flex-1 gap-6 p-10">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">Analysis Failed</h2>
                <p className="text-gray-400 text-sm max-w-sm">{error}</p>
              </div>
              <button
                onClick={() => window.history.back()}
                className="px-5 py-2.5 bg-[#3b82f6] text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition cursor-pointer"
              >
                Go Back
              </button>
            </div>
          </main>
        </div>
      );
    }

    // Loading state
    if (!profile) {
      return (
        <div className="flex min-h-screen">
          <SideNavbar />
          <main className="ml-64 flex-1 flex flex-col">
            <TopNavbar />
            <div className="flex flex-col items-center justify-center flex-1 gap-8 p-10">

              {/* Animated logo / spinner */}
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-2 border-[#3b82f6]/20"></div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#3b82f6] animate-spin"></div>
                <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-[#3b82f6]/50 animate-spin" style={{ animationDuration: "1.5s" }}></div>
              </div>

              {/* Text */}
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Analyzing <span className="text-[#3b82f6]">@{username}</span>
                </h2>
                <p className="text-gray-500 text-sm">Fetching profile, repositories and insights...</p>
              </div>

              {/* Skeleton cards */}
              <div className="w-full max-w-3xl grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-[#202020] rounded-xl p-5 animate-pulse">
                    <div className="w-10 h-10 bg-[#2a2a2a] rounded-lg mb-4"></div>
                    <div className="h-3 bg-[#2a2a2a] rounded w-2/3 mb-3"></div>
                    <div className="h-6 bg-[#2a2a2a] rounded w-1/2"></div>
                  </div>
                ))}
              </div>

            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="flex min-h-screen scrollbar-hide">
        <SideNavbar />
        <main className="flex-1 flex flex-col">
          <TopNavbar />
          <ProfileOverview
            profile={profile}
            repos={repos}
            contributions={contributions}
            heatmapData={heatmapData}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </main>
      </div>
    );
};

export default Dashboard; 