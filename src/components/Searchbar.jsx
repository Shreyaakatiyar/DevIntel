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
    };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center bg-[#0f0f13] border border-white/10 rounded-xl px-4 py-4 shadow-lg">
        <IoSearch className="text-gray-400 text-xl ml-2" />

        <input
          type="text"
          placeholder="Enter GitHub username (e.g., torvalds)..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 bg-transparent outline-none px-4 py-3 text-gray-300 placeholder-gray-500"
          onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
          }}
        />

        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-full font-semibold text-black bg-linear-to-r from-[#efeef2] to-[#3b82f6] hover:opacity-90 transition shadow-lg cursor-pointer">
            Analyze Profile
        </button>
      </div>
    </div>
  );
}

export default Searchbar