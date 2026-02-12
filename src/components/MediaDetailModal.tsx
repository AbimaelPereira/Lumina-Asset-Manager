
import React from 'react';
import { ICONS } from '../constants';
import { MediaAsset } from '../types';

interface MediaDetailModalProps {
  asset: MediaAsset | null;
  onClose: () => void;
  onToggleStatus: (id: string) => void;
}

const MediaDetailModal: React.FC<MediaDetailModalProps> = ({ asset, onClose, onToggleStatus }) => {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/95 animate-in zoom-in-95 duration-300">
      <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-3xl w-full max-w-6xl h-full flex flex-col md:flex-row overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all">
          {ICONS.Close}
        </button>

        <div className="flex-1 bg-black flex items-center justify-center p-4 overflow-hidden">
          {asset.type === 'video' ? (
            <video controls className="max-w-full max-h-full">
              <source src={asset.url} />
            </video>
          ) : (
            <img 
              src={asset.url} 
              alt="" 
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/800x450?text=Failed+to+Load+Remote+Media';
              }}
            />
          )}
        </div>

        <div className="w-full md:w-80 border-l border-[#2a2a2a] flex flex-col bg-[#161616]">
          <div className="p-8 border-b border-[#2a2a2a]">
            <h3 className="text-xl font-light text-white mb-1">Asset Metadata</h3>
            <p className="text-zinc-500 text-xs font-light tracking-tight truncate max-w-full" title={asset.url}>{asset.url}</p>
          </div>

          <div className="flex-1 p-8 space-y-6 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500">Mime Type</span>
                <p className="text-sm font-medium text-white">{asset.type.toUpperCase()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500">Extension</span>
                <p className="text-sm font-medium text-white">.{asset.extension.toLowerCase()}</p>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Last Used In Production</span>
              <p className="text-sm font-medium text-white">{asset.lastUsed}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Internal ID</span>
              <p className="text-xs font-mono text-zinc-400">{asset.id}</p>
            </div>

            <div className="pt-6 border-t border-[#2a2a2a]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500">Mark as Invalid</span>
                  <p className="text-xs text-zinc-600 font-light">Exclude from active API delivery</p>
                </div>
                <button 
                  onClick={() => onToggleStatus(asset.id)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${asset.isInvalid ? 'bg-red-500' : 'bg-zinc-800'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${asset.isInvalid ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-[#2a2a2a] bg-[#1a1a1a]/50">
            <button 
              className="w-full py-3 rounded-xl bg-white/5 border border-[#2a2a2a] text-white text-sm font-medium hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
              onClick={() => window.open(asset.url, '_blank')}
            >
              {ICONS.Link} Open Source Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailModal;
