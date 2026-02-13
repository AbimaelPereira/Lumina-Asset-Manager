import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS, COLORS } from '../constants';
import { Slug } from '../types';
import { assetService } from '../services/assetService';

const SlugDashboard: React.FC = () => {
  const [slugs, setSlugs] = useState<Slug[]>([]);
  const [search, setSearch] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    assetService.loadSlugs().then(setSlugs);
  }, []);

  const filteredSlugs = slugs.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    const newSlug: Slug = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'new-slug-' + Math.floor(Math.random() * 1000),
      description: 'Newly created asset group.',
      assets: [],
      createdAt: new Date().toISOString()
    };
    const updated = [...slugs, newSlug];
    assetService.saveSlugs(updated);
    setSlugs(updated);
    navigate(`/edit/${newSlug.id}`);
  };

  const handleDelete = async (id: string) => {
    const updated = slugs.filter(s => s.id !== id);
    setSlugs(updated);
    await assetService.saveSlugs(updated);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-white mb-2">Remote Assets</h1>
          <p className="text-zinc-500 font-light text-sm">Manage and organize your remote media metadata efficiently.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-white text-black px-6 py-2.5 rounded-full flex items-center gap-2 font-medium hover:scale-105 transition-transform"
        >
          {ICONS.Plus}
          <span>New Slug</span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500">
          {ICONS.Search}
        </div>
        <input 
          type="text" 
          placeholder="Search by slug name or description..."
          className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl py-3 pl-12 pr-4 text-sm font-light focus:outline-none focus:border-zinc-500 transition-colors text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]">
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-zinc-500 font-bold">Slug Identifier</th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-zinc-500 font-bold">Description</th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-zinc-500 font-bold">Assets</th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-zinc-500 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2a2a]">
            {filteredSlugs.map(slug => (
              <tr key={slug.id} className="hover:bg-[#1a1a1a] transition-colors group">
                <td className="px-6 py-5">
                  <span className="font-medium text-white group-hover:underline cursor-pointer" onClick={() => navigate(`/edit/${slug.id}`)}>
                    {slug.name}
                  </span>
                </td>
                <td className="px-6 py-5 text-zinc-400 font-light text-sm max-w-md truncate">
                  {slug.description || 'No description provided'}
                </td>
                <td className="px-6 py-5">
                  <span className="px-2.5 py-1 rounded-full bg-[#2a2a2a] text-zinc-300 text-xs font-medium">
                    {slug.assets.length} items
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => navigate(`/edit/${slug.id}`)}
                      className="p-2 text-zinc-400 hover:text-white transition-colors"
                    >
                      {ICONS.Chevron}
                    </button>
                    <button 
                      onClick={() => handleDelete(slug.id)}
                      className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                      title="Remove permanently"
                    >
                      {ICONS.Trash}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredSlugs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-zinc-600 font-light italic">
                  No slugs found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SlugDashboard;