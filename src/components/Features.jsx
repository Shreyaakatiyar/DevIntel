import React from 'react'
import { BsStars } from "react-icons/bs";
import { IoGrid } from "react-icons/io5";
import { MdOutlineCompare } from "react-icons/md";
import { IoBarChart } from "react-icons/io5";

const Features = () => {
  return (
    <section className='py-32 px-8 max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* AI Insights Feature card */}
            <div className='md:col-span-2 group relative overflow-hidden bg-[#1b1b1b] rounded-xl border border-default p-8 transition-all'>
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
                        <span className='px-3 py-1 bg-[#3b82f6]/10 border border-default text-[#60a5fa] text-xs rounded-full'>Semantic Analysis</span>
                        <span className='px-3 py-1 bg-[#3b82f6]/10 border border-default text-[#60a5fa] text-xs rounded-full'>Code Quality Score</span>
                    </div>
                </div>
            </div>

            {/* Technical Impact card */}
            <div className='group relative overflow-hidden bg-[#1b1b1b] rounded-xl border border-default p-8 transition-all'>
                <div className='relative z-10 flex flex-col h-full'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='p-2 bg-[#3b82f6]/20 rounded-lg'>
                            <IoBarChart className='text-[#3b82f6] text-xl'/>
                        </div>
                        <h3 className='text-white text-lg font-semibold'>Technical Impact</h3>
                    </div>
                    <div className='space-y-4 mt-auto'>
                        <div>
                            <p className='text-[#3b82f6] text-2xl font-bold'>1M+</p>
                            <p className='text-gray-400 text-xs uppercase tracking-wider'>Profiles Indexed</p>
                        </div>
                        <div>
                            <p className='text-[#3b82f6] text-2xl font-bold'>98.4%</p>
                            <p className='text-gray-400 text-xs uppercase tracking-wider'>Prediction Accuracy</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contribution Heatmaps card */}
            <div className='group relative overflow-hidden bg-[#1b1b1b] rounded-xl border border-default p-8 transition-all'>
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
                    <div className='grid grid-cols-4 gap-2'>
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className={`h-6 rounded ${i % 3 === 0 ? 'bg-[#3b82f6]' : i % 3 === 1 ? 'bg-[#3b82f6]/60' : 'bg-[#3b82f6]/30'}`}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Skill Benchmarking card */}
            <div className='md:col-span-2 group relative overflow-hidden bg-[#1b1b1b] rounded-xl border border-default p-8 transition-all'>
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
                        <div>
                            <div className='flex justify-between items-center mb-2'>
                                <span className='text-gray-300 text-xs font-medium'>Rust Performance</span>
                                <span className='text-[#3b82f6] text-xs font-semibold'>Top 2%</span>
                            </div>
                            <div className='w-full h-2 bg-gray-700 rounded-full overflow-hidden'>
                                <div className='h-full w-[95%] bg-linear-to-r from-[#3b82f6] to-[#60a5fa]'></div>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between items-center mb-2'>
                                <span className='text-gray-300 text-xs font-medium'>System Architecture</span>
                                <span className='text-[#3b82f6] text-xs font-semibold'>Top 8%</span>
                            </div>
                            <div className='w-full h-2 bg-gray-700 rounded-full overflow-hidden'>
                                <div className='h-full w-[85%] bg-linear-to-r from-[#3b82f6] to-[#60a5fa]'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features