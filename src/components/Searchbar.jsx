import React from 'react'
import { IoSearch } from "react-icons/io5";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!username.trim()) return;
    navigate(`/dashboard/${username}`);
    setUsername("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-0">

      {/* Desktop version — all in one row */}
      <div className="hidden sm:flex items-center bg-[#0f0f13] border border-white/10 rounded-xl px-4 py-4 shadow-lg">
        <IoSearch className="text-gray-400 text-xl ml-2 flex-shrink-0" />
        <input
          type="text"
          placeholder="Enter GitHub username (e.g., torvalds)..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
          className="flex-1 bg-transparent outline-none px-4 py-3 text-gray-300 placeholder-gray-500 min-w-0"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-full font-semibold text-black bg-gradient-to-r from-[#efeef2] to-[#3b82f6] hover:opacity-90 transition shadow-lg cursor-pointer flex-shrink-0"
        >
          Analyze Profile
        </button>
      </div>

      {/* Mobile version — stacked */}
      <div className="flex sm:hidden flex-col gap-3">
        <div className="flex items-center bg-[#0f0f13] border border-white/10 rounded-xl px-4 py-3 shadow-lg">
          <IoSearch className="text-gray-400 text-lg flex-shrink-0" />
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
            className="flex-1 bg-transparent outline-none px-3 py-1 text-gray-300 placeholder-gray-500 text-sm"
          />
        </div>
        <button
          onClick={handleSearch}
          className="w-full py-3.5 rounded-xl font-semibold text-black bg-gradient-to-r from-[#efeef2] to-[#3b82f6] hover:opacity-90 transition shadow-lg cursor-pointer text-sm"
        >
          Analyze Profile
        </button>
      </div>

    </div>
  );
}

export default Searchbar