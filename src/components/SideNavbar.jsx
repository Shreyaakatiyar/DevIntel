import React from 'react'
import { RiDashboardLine, RiGitRepositoryLine } from "react-icons/ri"
import { BsStars } from "react-icons/bs"
import { MdOutlineCompare } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.svg"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: RiDashboardLine },
  { id: "repositories", label: "Repositories", icon: RiGitRepositoryLine },
  { id: "insights", label: "AI Insights", icon: BsStars },
  { id: "compare", label: "Compare Developers", icon: MdOutlineCompare },
]

const SideNavbar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#111111] border-r border-white/5 flex flex-col p-6">

      {/* Logo */}
      <div
        className="flex items-center gap-3 mb-10 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="DevIntel" className="w-7 h-7" />
        <span className="text-white font-semibold text-lg">DevIntel</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left w-full ${
              activeSection === id
                ? "bg-[#3b82f6]/10 text-[#3b82f6]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="text-lg flex-shrink-0" />
            {label}
          </button>
        ))}
      </nav>

    </aside>
  )
}

export default SideNavbar