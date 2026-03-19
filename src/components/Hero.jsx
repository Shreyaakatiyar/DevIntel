import React from 'react'
import Searchbar from './Searchbar'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 sm:px-6 text-center overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-32 sm:min-h-screen">

      {/* Background elements */}
      <div className="absolute inset-0 circuit-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] bg-[#3b82f6]/10 blur-[120px] rounded-full pointer-events-none h-40 sm:h-75"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center gap-4 sm:gap-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/5 text-[#3b82f6] text-xs font-medium mt-16 sm:mt-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse"></span>
          GitHub Developer Analysis
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-b from-[#b7cef2] to-[#ededed] bg-clip-text text-transparent leading-tight"
        >
          Decode Developer DNA
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed"
        >
          DevIntel transforms GitHub data into clear insights. Discover
          developer strengths, analyze repositories, and compare profiles with
          powerful visual analytics.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full"
        >
          <Searchbar />
        </motion.div>

        {/* Example usernames */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-xs text-gray-500"
        >
          <span>Try:</span>
          {["torvalds", "gaearon", "sindresorhus"].map((name) => (
            <span
              key={name}
              className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 hover:text-gray-300 transition cursor-pointer"
            >
              @{name}
            </span>
          ))}
        </motion.div>

      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-gray-700 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#3b82f6]"></div>
        </motion.div>
      </motion.div>

    </section>
  )
}

export default Hero