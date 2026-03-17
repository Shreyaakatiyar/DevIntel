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

    //heatmap data
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
              contributionDays {
                date
                contributionCount
              }
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
        body: JSON.stringify({
          query,
          variables: { login: username, from, to },
        }),
      });

      const data = await res.json();
      const calendar =
        data.data.user.contributionsCollection.contributionCalendar;

      return {
        total: calendar.totalContributions,
        weeks: calendar.weeks,
      };
    };

    useEffect(() => {
      const loadContributions = async () => {
        const contrib = await fetchContributions(username, selectedYear);
        setContributions(contrib.total);
        const formatted = contrib.weeks.flatMap((week) =>
          week.contributionDays.map((day) => ({
            date: day.date,
            count: day.contributionCount,
          })),
        );
        setHeatmapData(formatted);
      };
      if (username) loadContributions();
    }, [username, selectedYear]);


    //fetch data
    useEffect(() => {
        const fetchData = async() => {
            try {
                const useRes = await axios.get(`https://api.github.com/users/${username}`)

                const repoRes = await axios.get(`https://api.github.com/users/${username}/repos`)

                setProfile(useRes.data)
                setRepos(repoRes.data)

            } catch(error) {
                alert ("Error loading analysis")
            }
        }

        fetchData();

    }, [username])

    if(!profile){
        return <div className='p-10 text-white'>Loading...</div>
    }

    return (
      <div className="flex min-h-screen">
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
}

export default Dashboard