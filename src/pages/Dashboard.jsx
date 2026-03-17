import React from 'react'
import SideNavbar from '../components/SideNavbar'
import TopNavbar from '../components/TopNavbar'
import ProfileOverview from '../components/ProfileOverview'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { div } from 'framer-motion/client'
// import { getUser, getRepos } from '../services/githubApi'

const Dashboard = () => {

    const { username } = useParams();

    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);

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
        <div className='flex min-h-screen'>
            <SideNavbar/>
            <main className='flex-1 flex flex-col'>
                <TopNavbar/>
                <ProfileOverview
                profile={profile}
                repos={repos}
                />
            </main>
        </div>
    )
}

export default Dashboard