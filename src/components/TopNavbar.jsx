import React, { useState } from 'react'
import { IoSearch, IoClose } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'

const TopNavbar = ({ showMobileSearch, onCloseMobileSearch }) => {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!username.trim()) return
    navigate(`/dashboard/${username.trim()}`)
    setUsername("")
    onCloseMobileSearch?.()
  }

  return (
    <div className="relative z-10">
      {/* Desktop top bar */}
      <header className="hidden lg:flex items-center px-8 h-16 bg-[#1b1b1b]/50 backdrop-blur-md border-b border-[#1e1e1e]">
        <div className="flex items-center ml-auto w-full max-w-sm">
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <IoSearch />
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-full bg-[#1b1b1b] border border-white/10 rounded-3xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/30 transition-all text-white placeholder-gray-500"
              placeholder="Search developers..."
              type="text"
            />
          </div>
        </div>
      </header>
      {/* Mobile + Tablet dropdown search */}
      {showMobileSearch && (
        <>
          {/* Invisible overlay — clicking it closes the search */}
          <div
            className="lg:hidden fixed inset-0 z-30"
            onClick={() => {
              setUsername("");
              onCloseMobileSearch?.();
            }}
          />

          {/* Search dropdown */}
          <div className="lg:hidden absolute top-0 left-0 right-0 px-4 py-3 bg-[#111111] border-b border-white/5 shadow-xl z-40">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <IoSearch />
              </span>
              <input
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="w-full bg-[#1b1b1b] border border-white/10 rounded-xl py-3 pl-12 pr-24 text-sm focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/30 transition-all text-white placeholder-gray-500"
                placeholder="Search developers..."
                type="text"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#3b82f6] text-white rounded-lg text-xs font-medium hover:bg-blue-500 transition cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TopNavbar