import React from 'react'
import Logo from "../assets/Logo.svg"

const Navbar = () => {
  return (
    <nav className='w-full fixed top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 surface glass bg-[#1d1c1c]'>
      <div className='flex items-center gap-2'>
        <div className='w-7 h-7 md:w-11 md:h-11 rounded-lg flex items-center justify-center'>
          <img src={Logo} alt="Logo" className="w-full h-full" />
        </div>
        <span className='text-lg md:text-2xl font-headline font-bold tracking-tight text-primary'>
          DevIntel
        </span>
      </div>
    </nav>
  )
}

export default Navbar