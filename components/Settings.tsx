
import React, { useState, useEffect } from 'react';
import { assetService } from '../services/assetService';
import { AppConfig, PersistenceMode } from '../types';
import { ICONS } from '../constants';

const Settings: React.FC = () => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    setConfig(assetService.getConfig());
  }, []);

  const handleSave = () => {
    if (config) {
      assetService.saveConfig(config);
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  if (!config) return null;

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-light tracking-tight text-white mb-2">System Settings</h1>
        <p className="text-zinc-500 font-light text-sm">Configure system architecture and data persistence endpoints.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Persistence Engine</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setConfig({ ...config, mode: PersistenceMode.JSON })}
                className={`p-4 border rounded-xl flex items-center gap-3 transition-all ${config.mode === PersistenceMode.JSON ? 'border-white bg-[#1a1a1a] text-white' : 'border-[#2a2a2a] text-zinc-600 hover:text-zinc-400'}`}
              >
                {ICONS.JSON}
                <div className="text-left">
                  <span className="block text-sm font-medium">JSON File</span>
                  <span className="block text-[10px] opacity-60">Local storage simulation</span>
                </div>
              </button>
              <button 
                onClick={() => setConfig({ ...config, mode: PersistenceMode.MONGODB })}
                className={`p-4 border rounded-xl flex items-center gap-3 transition-all ${config.mode === PersistenceMode.MONGODB ? 'border-white bg-[#1a1a1a] text-white' : 'border-[#2a2a2a] text-zinc-600 hover:text-zinc-400'}`}
              >
                {ICONS.Mongo}
                <div className="text-left">
                  <span className="block text-sm font-medium">MongoDB</span>
                  <span className="block text-[10px] opacity-60">Cloud Scalability</span>
                </div>
              </button>
            </div>
          </div>

          {config.mode === PersistenceMode.JSON && (
            <div className="space-y-4 animate-in slide-in-from-top-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Local File Path</label>
              <input 
                type="text" 
                value={config.jsonPath}
                onChange={(e) => setConfig({ ...config, jsonPath: e.target.value })}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl py-3 px-4 text-sm font-mono text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                placeholder="e.g. data/remote_assets.json"
              />
            </div>
          )}

          {config.mode === PersistenceMode.MONGODB && (
            <div className="space-y-4 animate-in slide-in-from-top-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">MongoDB Connection String</label>
              <input 
                type="password" 
                value={config.mongoConnection}
                onChange={(e) => setConfig({ ...config, mongoConnection: e.target.value })}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl py-3 px-4 text-sm font-mono text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                placeholder="mongodb+srv://..."
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-600 italic">Configuration is persisted to system memory.</p>
          <button 
            onClick={handleSave}
            className={`px-8 py-2.5 rounded-full flex items-center gap-2 font-bold transition-all ${savedStatus ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:scale-105'}`}
          >
            {savedStatus ? ICONS.Success : ICONS.Plus}
            <span>{savedStatus ? 'Configuration Saved' : 'Apply Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
