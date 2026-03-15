import React from 'react'
import Searchbar from './Searchbar'

const Hero = () => {
  return (
    <section className='relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center pt-20'>
        <div className="absolute inset-0 circuit-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#3b82f6]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className='relative z-10 max-w-4xl mx-auto'>
            <h1 className='text-6xl md:text-8xl display font-bold tracking-tighter mb-6 bg-linear-to-b from-[#b7cef2] to-[#ededed] bg-clip-text text-transparent'>
                Decode Developer DNA
            </h1>
            <p className='text-lg text-secodary max-w-2xl mx-auto mb-12 body leading-relaxed'>
                DevIntel transforms GitHub data into clear insights. Discover developer strengths, analyze repositories, and compare profiles with powerful visual analytics.
            </p>
        </div>
        
        <Searchbar/>
    </section>
  )
}

export default Hero