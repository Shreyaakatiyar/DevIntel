import React from 'react'
import { IoSearch } from "react-icons/io5";

const Searchbar = () => {
  return (
    <div className='relative max-w-2xl mx-auto p-1.5 rounded-2xl bg-[#201f1f]/40 border border-[#494454]/60 glass ambient-glow mb-10'>
        <div className='flex items-center px-4 py-2 gap-4'>
            <span> <IoSearch /> </span>
            <input  className='flex-1 bg-transparent border-none focus:ring-0 text-lg placeholder:text-[#cbc3d7]/40' type="text" placeholder="Enter GitHub username (e.g., torvalds)..."/>
            <button className='obsidian-gradient text-on-primary-fixed px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#3b82f6]/20 hover:scale-[1.02] transition-transform cursor-pointer'>Analyze Profile</button>
        </div>
    </div>
  )
}

export default Searchbar