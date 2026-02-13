import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS, COLORS } from '../constants';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebar_collapsed', isCollapsed.toString());
  }, [isCollapsed]);

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-20 md:w-64'} border-r border-[#2a2a2a] h-screen flex flex-col bg-[#0f0f0f] transition-all duration-300 relative`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-500 transition-all z-50 shadow-lg hover:shadow-xl"
      >
        <svg className={`w-3 h-3 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="p-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-black font-bold flex-shrink-0">L</div>
          <span className={`font-medium tracking-tight text-white text-lg transition-opacity ${isCollapsed ? 'hidden' : 'block'}`}>Lumina</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-[#1a1a1a] text-white' : 'text-zinc-500 hover:text-white hover:bg-[#161616]'}`}
          title="Remote Assets"
        >
          {ICONS.Assets}
          <span className={`text-sm font-light transition-opacity ${isCollapsed ? 'hidden' : 'block'}`}>Remote Assets</span>
        </NavLink>
      </nav>

      <div className="p-6 border-t border-[#2a2a2a]">
        {!isCollapsed ? (
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-xs text-zinc-400">Stable Build</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" title="Stable Build"></div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;