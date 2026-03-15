import React from 'react'
import { MdDashboard,MdPeopleAlt } from "react-icons/md";
import { RiGitRepositoryFill } from "react-icons/ri";
import { IoBarChart } from "react-icons/io5";


const SideNavbar = () => {
  return (
    <aside className='w-64 bg-[#1b1b1b] flex flex-col h-screen sticky top-0'>
        <div className='p-6 flex items-center gap-2'>
            <div className='w-10 h-10 flex items-center justify-center'>
                <span><img src="/src/assets/Logo.svg" alt="" /></span>
            </div>
            <div>
                <h1 className='font-bold text-lg leading-none'>DevIntel</h1>
            </div>
        </div>
        <nav className='flex-1 px-4 space-y-2'>
            <a className='flex items-center gap-3 px-4 py-3 rounded-xl text-primary hover:bg-[#303030]' href="#">
                <span className='text-xl'> <MdDashboard/> </span>
                <span>Dashboard</span>
            </a>
            <a className='flex items-center gap-3 px-4 py-3 rounded-xl text-primary hover:bg-[#303030]' href="#">
                <span className='text-xl'> <RiGitRepositoryFill/> </span>
                <span>Repositories</span>
            </a>
            <a className='flex items-center gap-3 px-4 py-3 rounded-xl text-primary hover:bg-[#303030]' href="#">
                <span className='text-xl'> <IoBarChart/> </span>
                <span>AI Insights</span>
            </a>
            <a className='flex items-center gap-3 px-4 py-3 rounded-xl text-primary hover:bg-[#303030]' href="#">
                <span className='text-xl'> <MdPeopleAlt/> </span>
                <span>Compare Developers</span>
            </a>
        </nav>
    </aside>
  )
}

export default SideNavbar