import React from 'react'
import SideNavbar from '../components/SideNavbar'
import TopNavbar from '../components/TopNavbar'

const Dashboard = () => {
  return (
    <div className='flex min-h-screen'>
        <SideNavbar/>
        <main className='flex-1 flex flex-col'>
            <TopNavbar/>
        </main>
    </div>
  )
}

export default Dashboard