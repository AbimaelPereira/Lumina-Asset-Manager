import React, { useState } from 'react';
import { ICONS } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (urls: string[]) => void;
}

const MultipleInsertModal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const urls = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    if (urls.length > 0) {
      onConfirm(urls);
      setText('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-light text-white mb-4">Add Multiple Assets</h2>
        <p className="text-sm text-zinc-500 mb-6">Paste URLs, one per line</p>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4 text-sm font-mono text-zinc-400 focus:outline-none focus:border-zinc-500 resize-none"
          placeholder="https://example.com/image1.jpg&#10;https://example.com/video1.mp4"
        />

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-lg border border-[#2a2a2a] text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-6 py-3 rounded-lg bg-white text-black font-medium hover:scale-105 transition-transform"
          >
            Add Assets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultipleInsertModal;