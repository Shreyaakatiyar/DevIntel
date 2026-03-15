import React from 'react'
import { IoSearch } from "react-icons/io5";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {

    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
      if (!username.trim()) return;
      navigate(`/dashboard/${username.trim()}`);
      setUsername("");
    };

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-[#1b1b1b]/50 backdrop-blur-md sticky top-0 z-10">
      <div className="w-full flex items-center flex-1 max-w-xl">
        <div className="flex items-center relative w-full group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            {" "}
            <IoSearch />{" "}
          </span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            class="w-full bg-[#1b1b1b1] border-2 border-default rounded-3xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/30 transition-all"
            placeholder="Search developers..."
            type="text"
          />
        </div>
      </div>
    </header>
  );
}

export default TopNavbar