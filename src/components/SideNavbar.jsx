import React, { useState } from 'react'
import { RiDashboardLine, RiGitRepositoryLine } from "react-icons/ri"
import { BsStars } from "react-icons/bs"
import { MdOutlineCompare, MdClose } from "react-icons/md"
import { HiMenuAlt2 } from "react-icons/hi"
import { IoSearch } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.svg"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: RiDashboardLine },
  { id: "repositories", label: "Repositories", icon: RiGitRepositoryLine },
  { id: "insights", label: "AI Insights", icon: BsStars },
  { id: "compare", label: "Compare Developers", icon: MdOutlineCompare },
]

const SideNavbar = ({ activeSection, setActiveSection, onSearchOpen }) => {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (id) => {
    setActiveSection(id)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Desktop sidebar — lg and above */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#111111] border-r border-white/5 flex-col p-6 z-40">
        <div
          className="flex items-center gap-3 mb-10 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="DevIntel" className="w-7 h-7" />
          <span className="text-white font-semibold text-lg">DevIntel</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left w-full ${
                activeSection === id
                  ? "bg-[#3b82f6]/10 text-[#3b82f6]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="text-lg shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile + Tablet top bar — below lg */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-white/5 h-14">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="DevIntel" className="w-6 h-6" />
          <span className="text-white font-semibold">DevIntel</span>
        </div>

        {/* Right side — search icon + hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSearchOpen}
            className="p-2 text-gray-400 hover:text-white transition"
          >
            <IoSearch className="text-xl" />
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-400 hover:text-white transition"
          >
            <HiMenuAlt2 className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Drawer overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`lg:hidden fixed top-0 left-0 h-screen w-72 bg-[#111111] border-r border-white/5 z-60 flex flex-col p-6 transition-transform duration-300 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex items-center justify-between mb-10">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="DevIntel" className="w-7 h-7" />
            <span className="text-white font-semibold text-lg">DevIntel</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-400 hover:text-white transition p-1"
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer text-left w-full ${
                activeSection === id
                  ? "bg-[#3b82f6]/10 text-[#3b82f6]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="text-lg shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}

export default SideNavbar