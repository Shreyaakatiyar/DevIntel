import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className='top-0 z-50 flex items-center justify-between px-8 py-4 surface glass border-b border-[#282828]'>
            <div className='flex items-center gap-2 justify-center'>
                <div className='w-11 h-11 rounded-lg flex items-center justify-center'>
                    <span><img src="./src/assets/Logo.svg" alt="Logo"/></span>
                </div>
                <span className='text-2xl font-headline font-bold tracking-tight text-primary'>DevIntel</span>
            </div>
        </nav>
    </>
  )
}

export default Navbar