import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { MdDashboard,MdPeopleAlt } from "react-icons/md";
import { RiGitRepositoryFill } from "react-icons/ri";
import { IoBarChart } from "react-icons/io5";
import Logo from '../assets/logo.svg';

   const navItems = [
      { label: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
      {
        label: "Repositories",
        icon: <RiGitRepositoryFill />,
        path: "/repositories",
      },
      { label: "AI Insights", icon: <IoBarChart />, path: "/insights" },
      { label: "Compare Developers", icon: <MdPeopleAlt />, path: "/compare" },
    ];


const SideNavbar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="w-64 bg-[#1b1b1b] flex flex-col h-screen sticky top-0">
      <a href="/">
        <div className="p-6 flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center">
            <span>
              <img src={Logo} alt="" />
            </span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">DevIntel</h1>
          </div>
        </div>
      </a>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer w-full text-left ${
              isActive(item.path)
                ? "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20"
                : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
            }`}
          >
            <span
              className={`text-lg ${isActive(item.path) ? "text-[#3b82f6]" : "text-gray-500"}`}
            >
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default SideNavbar