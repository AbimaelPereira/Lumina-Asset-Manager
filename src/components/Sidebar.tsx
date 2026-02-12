
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS, COLORS } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-20 md:w-64 border-r border-[#2a2a2a] h-screen flex flex-col bg-[#0f0f0f] transition-all">
      <div className="p-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-black font-bold">L</div>
          <span className="hidden md:block font-medium tracking-tight text-white text-lg">Lumina</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-[#1a1a1a] text-white' : 'text-zinc-500 hover:text-white hover:bg-[#161616]'}`}
        >
          {ICONS.Assets}
          <span className="hidden md:block text-sm font-light">Remote Assets</span>
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-[#1a1a1a] text-white' : 'text-zinc-500 hover:text-white hover:bg-[#161616]'}`}
        >
          {ICONS.Settings}
          <span className="hidden md:block text-sm font-light">Settings</span>
        </NavLink>
      </nav>

      <div className="p-6 border-t border-[#2a2a2a]">
        <div className="hidden md:flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">System Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-xs text-zinc-400">Stable Build</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
