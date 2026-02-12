
import React, { useState } from 'react';
import { ICONS } from '../constants';

interface MultipleInsertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (urls: string[]) => void;
}

const MultipleInsertModal: React.FC<MultipleInsertModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [rows, setRows] = useState<string[]>(['']);

  if (!isOpen) return null;

  const handleAddRow = () => setRows([...rows, '']);
  const handleUpdateRow = (idx: number, val: string) => {
    const updated = [...rows];
    updated[idx] = val;
    setRows(updated);
  };
  const handleRemoveRow = (idx: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== idx));
    }
  };

  const handleSave = () => {
    const validUrls = rows.filter(r => r.trim() !== '');
    onConfirm(validUrls);
    setRows(['']);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
          <h3 className="text-xl font-light text-white">Bulk Insert Assets</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">{ICONS.Close}</button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-zinc-500 font-bold border-b border-[#2a2a2a]">
                <th className="pb-3 w-16">Preview</th>
                <th className="pb-3 px-4">Remote URL</th>
                <th className="pb-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {rows.map((row, idx) => (
                <tr key={idx} className="group">
                  <td className="py-4">
                    <div className="w-10 h-10 rounded bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden flex items-center justify-center">
                      {row.startsWith('http') ? (
                        <img src={row} alt="" className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                      ) : (
                        <span className="text-zinc-700 text-[10px] uppercase font-bold">N/A</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <input 
                      type="text" 
                      value={row}
                      onChange={(e) => handleUpdateRow(idx, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full bg-transparent text-sm font-light text-zinc-300 focus:outline-none focus:text-white"
                    />
                  </td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => handleRemoveRow(idx)}
                      className="text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      {ICONS.Trash}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            onClick={handleAddRow}
            className="w-full py-3 border border-dashed border-[#2a2a2a] rounded-xl text-zinc-500 text-xs uppercase tracking-widest hover:text-white hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
          >
            {ICONS.Plus} Add Row
          </button>
        </div>

        <div className="p-6 border-t border-[#2a2a2a] flex justify-end gap-3 bg-[#1a1a1a]/50">
          <button onClick={onClose} className="px-5 py-2 rounded-full text-zinc-400 text-sm font-medium hover:text-white">Cancel</button>
          <button 
            onClick={handleSave}
            className="px-8 py-2 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition-transform"
          >
            Confirm & Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultipleInsertModal;
