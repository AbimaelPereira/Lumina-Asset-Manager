import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ICONS, COLORS } from '../constants';
import { Slug, MediaAsset } from '../types';
import { assetService } from '../services/assetService';
import MultipleInsertModal from './MultipleInsertModal';
import MediaDetailModal from './MediaDetailModal';

const AssetManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [slug, setSlug] = useState<Slug | null>(null);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null);

  useEffect(() => {
    if (id) {
      const data = assetService.getSlugById(id);
      if (data) setSlug(data);
      else navigate('/');
    }
  }, [id, navigate]);

  const saveState = (updated: Slug) => {
    setSlug(updated);
    const allSlugs = assetService.getSlugs();
    const idx = allSlugs.findIndex(s => s.id === updated.id);
    if (idx !== -1) {
      allSlugs[idx] = updated;
      assetService.saveSlugs(allSlugs);
    }
  };

  const handleUpdateMeta = (field: keyof Slug, val: string) => {
    if (!slug) return;
    saveState({ ...slug, [field]: val });
  };

  const handleRemoveAsset = (assetId: string) => {
    if (!slug) return;
    saveState({ ...slug, assets: slug.assets.filter(a => a.id !== assetId) });
  };

  const handleToggleStatus = (assetId: string) => {
    if (!slug) return;
    const updatedAssets = slug.assets.map(a => a.id === assetId ? { ...a, isInvalid: !a.isInvalid } : a);
    saveState({ ...slug, assets: updatedAssets });
    
    if (selectedMedia?.id === assetId) {
      setSelectedMedia(prev => prev ? { ...prev, isInvalid: !prev.isInvalid } : null);
    }
  };

  const handleBulkAdd = (urls: string[]) => {
    if (!slug) return;
    const newAssets: MediaAsset[] = urls.map(url => ({
      id: Math.random().toString(36).substr(2, 9),
      url,
      type: url.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image',
      extension: url.split('.').pop() || 'unknown',
      lastUsed: new Date().toISOString().split('T')[0],
      isInvalid: false
    }));
    saveState({ ...slug, assets: [...slug.assets, ...newAssets] });
  };

  if (!slug) return <div className="p-8 text-zinc-500 font-light flex items-center justify-center h-full">Loading asset details...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 text-zinc-500 text-sm mb-4">
        <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Remote Assets</button>
        <span className="opacity-30">{ICONS.Chevron}</span>
        <span className="text-white font-medium">{slug.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end bg-[#161616] p-8 rounded-2xl border border-[#2a2a2a] shadow-xl">
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Slug Identifier</label>
          <input 
            type="text" 
            value={slug.name}
            onChange={(e) => handleUpdateMeta('name', e.target.value)}
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg py-3 px-4 text-xl font-light focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all text-white"
          />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Brief Description</label>
          <input 
            type="text" 
            value={slug.description}
            onChange={(e) => handleUpdateMeta('description', e.target.value)}
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg py-3 px-4 text-sm font-light focus:outline-none focus:border-zinc-500 transition-all text-zinc-400"
            placeholder="Add a brief description..."
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light tracking-tight text-white flex items-center gap-3">
            Media Gallery
            <span className="text-[10px] text-zinc-400 font-bold bg-[#2a2a2a] px-2 py-0.5 rounded-full border border-[#3a3a3a]">{slug.assets.length} ITEMS</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {/* Add Button */}
          <button 
            onClick={() => setIsInsertModalOpen(true)}
            className="aspect-square rounded-xl border border-dashed border-[#2a2a2a] flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-500 hover:bg-[#1a1a1a] transition-all group relative overflow-hidden"
          >
            <div className="bg-[#1a1a1a] group-hover:bg-white group-hover:text-black p-3 rounded-full transition-all duration-300 mb-2 shadow-lg">
              {ICONS.Plus}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">Add Media</span>
          </button>

          {/* Cards */}
          {slug.assets.map(asset => (
            <div 
              key={asset.id} 
              className={`relative aspect-square rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#1a1a1a] group cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:border-[#3a3a3a] ${asset.isInvalid ? 'opacity-30 grayscale' : ''}`}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-3 scale-90 group-hover:scale-100 transition-transform">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedMedia(asset); }}
                    className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-all shadow-xl"
                  >
                    {ICONS.View}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleRemoveAsset(asset.id); }}
                    className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-red-500 transition-all shadow-xl"
                  >
                    {ICONS.Trash}
                  </button>
                </div>
              </div>
              
              {asset.type === 'video' ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
                  {ICONS.Video}
                  <span className="text-[10px] font-bold uppercase opacity-40">Video</span>
                </div>
              ) : (
                <img 
                  src={asset.url} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/200/161616/333333?text=Load+Error';
                  }}
                />
              )}

              {asset.isInvalid && (
                <div className="absolute top-3 right-3 z-20 text-red-500 drop-shadow-lg">
                  {ICONS.Alert}
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[9px] text-zinc-400 font-mono truncate">{asset.extension.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MultipleInsertModal 
        isOpen={isInsertModalOpen} 
        onClose={() => setIsInsertModalOpen(false)} 
        onConfirm={handleBulkAdd}
      />

      <MediaDetailModal 
        asset={selectedMedia} 
        onClose={() => setSelectedMedia(null)} 
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default AssetManagement;