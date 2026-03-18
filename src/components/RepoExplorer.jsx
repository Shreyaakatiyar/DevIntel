import React from 'react'
import { RiStarSFill } from "react-icons/ri"
import { FaCodeFork } from "react-icons/fa6"
import { FiExternalLink } from "react-icons/fi"

const RepoExplorer = ({repos}) => {

  const sorted = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-2">Repositories</h2>
      <p className="text-gray-400 text-sm mb-8">
        {repos.length} public repositories
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map(repo => (
          <div
            key={repo.id}
            className="bg-[#202020] border border-white/5 rounded-xl p-5 hover:border-[#3b82f6]/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-white font-medium group-hover:text-[#3b82f6] transition-colors">
                {repo.name}
              </h3>
                <a>
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                <FiExternalLink />
              </a>
            </div>

            {repo.description && (
              <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                {repo.description}
              </p>
            )}

            <div className="flex items-center gap-4 mt-auto">
              {repo.language && (
                <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <RiStarSFill className="text-yellow-400" />
                {repo.stargazers_count.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <FaCodeFork />
                {repo.forks_count.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RepoExplorer