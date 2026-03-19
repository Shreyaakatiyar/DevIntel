import React from 'react'
import Logo from "../assets/Logo.svg"

const Navbar = () => {
  return (
    <>
        <nav className='w-full fixed top-0 z-50 flex items-center justify-between px-8 py-4 surface glassbg-[#1d1c1c]'>
            <div className='flex items-center gap-2 justify-center'>
                <div className='w-11 h-11 rounded-lg flex items-center justify-center'>
                    <span><img src={Logo} alt="Logo"/></span>
                </div>
                <span className='text-2xl font-headline font-bold tracking-tight text-primary'>DevIntel</span>
            </div>
        </nav>
    </>
  )
}

export default Navbar