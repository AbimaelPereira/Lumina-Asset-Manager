
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SlugDashboard from './components/SlugDashboard';
import AssetManagement from './components/AssetManagement';
import Settings from './components/Settings';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex h-screen w-full bg-[#0f0f0f] text-zinc-100 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative scroll-smooth">
          <Routes>
            <Route path="/" element={<SlugDashboard />} />
            <Route path="/edit/:id" element={<AssetManagement />} />
            <Route path="/settings" element={<Settings />} />
            {/* Future Modules placeholder */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center h-full text-zinc-600 animate-pulse">
                <h2 className="text-2xl font-light tracking-widest uppercase">Coming Soon</h2>
                <p className="text-sm font-light">Module expansion in development.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
