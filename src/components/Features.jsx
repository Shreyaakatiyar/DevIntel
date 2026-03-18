import React from 'react'
import { BsStars } from "react-icons/bs";
import { IoGrid } from "react-icons/io5";
import { MdOutlineCompare } from "react-icons/md";
import { IoBarChart } from "react-icons/io5";
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 }
  })
};

const Features = () => {
  return (
    <section className='py-32 px-8 max-w-7xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

        {/* AI Insights Feature card */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='md:col-span-2 group relative overflow-hidden bg-[#1b1b1b] rounded-xl border border-default p-8 transition-colors'
        >
          <div className='relative z-10 flex flex-col h-full'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-[#3b82f6]/20 rounded-lg'>
                <BsStars className='text-[#3b82f6] text-xl'/>
              </div>
              <h3 className='text-white text-xl font-semibold'>AI-Powered Insights</h3>
            </div>
            <p className='text-gray-300 text-sm leading-relaxed'>
              Get deep technical analysis beyond the stars. Our neural engine parses commit messages, PR quality, and architectural patterns to score engineering maturity.
            </p>
            <div className='flex gap-2 mt-6'>
              <span className='px-3 py-1 bg-[#2d2d2d] border border-default text-secondary text-xs rounded-full'>Semantic Analysis</span>
              <span className='px-3 py-1 bg-[#2d2d2d] border border-default text-secondary text-xs rounded-full'>Code Quality Score</span>
            </div>
          </div>
        </motion.div>

        {/* Technical Impact card */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-[#1b1b1b] rounded-xl border border-default p-8 transition-colors'
        >
          <div className='relative z-10 flex flex-col h-full'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-2 bg-[#3b82f6]/20 rounded-lg'>
                <IoBarChart className='text-[#3b82f6] text-xl'/>
              </div>
              <h3 className='text-white text-lg font-semibold'>Technical Impact</h3>
            </div>
            <div className='space-y-4 mt-auto'>
              <div>
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className='text-[#a2c3f9] text-2xl font-bold'
                >
                  1M+
                </motion.p>
                <p className='text-gray-400 text-xs uppercase tracking-wider'>Profiles Indexed</p>
              </div>
              <div>
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className='text-[#a2c3f9] text-2xl font-bold'
                >
                  98.4%
                </motion.p>
                <p className='text-gray-400 text-xs uppercase tracking-wider'>Prediction Accuracy</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contribution Heatmaps card */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-[#1b1b1b] rounded-xl border border-default p-8 transition-colors'
        >
          <div className='relative z-10 flex flex-col h-full'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='p-2 bg-[#3b82f6]/20 rounded-lg'>
                <IoGrid className='text-[#3b82f6] text-xl'/>
              </div>
              <h3 className='text-white text-lg font-semibold'>Contribution Heatmaps</h3>
            </div>
            <p className='text-gray-300 text-sm mb-4'>
              Visualize coding velocity and consistency with advanced temporal maps that reveal peak productivity windows.
            </p>
            {/* Animated heatmap grid */}
            <div className='grid grid-cols-4 gap-2'>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  className={`h-6 rounded ${
                    i % 3 === 0
                      ? 'bg-[#3b82f6]/70'
                      : i % 3 === 1
                      ? 'bg-[#3b82f6]/35'
                      : 'bg-[#393939]/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skill Benchmarking card */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='md:col-span-2 group relative overflow-hidden bg-[#1b1b1b] rounded-xl border border-default p-8 transition-colors'
        >
          <div className='relative z-10 flex flex-col h-full'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='p-2 bg-[#3b82f6]/20 rounded-lg'>
                <MdOutlineCompare className='text-[#3b82f6] text-xl'/>
              </div>
              <h3 className='text-white text-xl font-semibold'>Skill Benchmarking</h3>
            </div>
            <p className='text-gray-300 text-sm mb-6'>
              Compare profiles side-by-side with precision. Map technical breadth against global standards or your own team's stack.
            </p>
            <div className='space-y-3'>
              {[
                { label: "Rust Performance", value: "95%", rank: "Top 2%" },
                { label: "System Architecture", value: "85%", rank: "Top 8%" },
              ].map((item, i) => (
                <div key={i}>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-gray-300 text-xs font-medium'>{item.label}</span>
                    <span className='text-[#669ef9] text-xs font-semibold'>{item.rank}</span>
                  </div>
                  <div className='w-full h-2 bg-gray-700 rounded-full overflow-hidden'>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.value }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: "easeOut" }}
                      className='h-full bg-gradient-to-r from-[#669ef9] to-[#60a5fa] rounded-full'
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Features