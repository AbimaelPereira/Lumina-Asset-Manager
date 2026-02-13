import React from 'react';
import { ICONS } from '../constants';
import { MediaAsset } from '../types';

interface Props {
  asset: MediaAsset | null;
  onClose: () => void;
  onToggleStatus: (id: string) => void;
}

const MediaDetailModal: React.FC<Props> = ({ asset, onClose, onToggleStatus }) => {
  if (!asset) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto" 
      onClick={onClose}
    >
      <div 
        className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto my-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6 sticky top-0 bg-[#161616] pb-4 border-b border-[#2a2a2a] z-10">
          <h2 className="text-2xl font-light text-white">Asset Details</h2>
          <button 
            onClick={onClose} 
            className="text-zinc-500 hover:text-white transition-colors rotate-45"
          >
            {ICONS.Plus}
          </button>
        </div>

        <div className="space-y-6">
          {asset.type === 'video' ? (
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center overflow-hidden">
              <video src={asset.url} controls className="w-full h-full rounded-lg" />
            </div>
          ) : (
            <div className="w-full rounded-lg overflow-hidden bg-black flex items-center justify-center max-h-[60vh]">
              <img 
                src={asset.url} 
                alt="" 
                className="max-w-full max-h-[60vh] object-contain rounded-lg" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400/161616/666666?text=Error+Loading';
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase text-zinc-500 mb-2 font-bold tracking-widest">Type</p>
              <p className="text-white font-light">{asset.type}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-zinc-500 mb-2 font-bold tracking-widest">Extension</p>
              <p className="text-white font-light">{asset.extension}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs uppercase text-zinc-500 mb-2 font-bold tracking-widest">URL</p>
              <p className="text-zinc-400 text-sm font-mono break-all bg-[#0f0f0f] p-3 rounded-lg border border-[#2a2a2a]">
                {asset.url}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-zinc-500 mb-2 font-bold tracking-widest">Last Used</p>
              <p className="text-white font-light">{asset.lastUsed || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-zinc-500 mb-2 font-bold tracking-widest">Status</p>
              <p className={`font-light ${asset.isInvalid ? 'text-red-500' : 'text-emerald-500'}`}>
                {asset.isInvalid ? 'Invalid' : 'Valid'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onToggleStatus(asset.id)}
            className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
              asset.isInvalid
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {asset.isInvalid ? 'Mark as Valid' : 'Mark as Invalid'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailModal;