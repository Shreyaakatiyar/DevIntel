import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className='sticky top-0 z-50 flex items-center justify-between px-8 py-4 surface glass border-b border-default'>
            <div className='flex items-center gap-2 justify-center'>
                <div className='w-11 h-11 rounded-lg flex items-center justify-center'>
                    <span><img src="./src/assets/Logo.svg" alt="Logo"/></span>
                </div>
                <span className='text-2xl font-headline font-bold tracking-tight bg-linear-to-r from-[#3b82f6] to-[#efeef2] bg-clip-text text-transparent'>DevIntel</span>
            </div>
        </nav>
    </>
  )
}

export default Navbar