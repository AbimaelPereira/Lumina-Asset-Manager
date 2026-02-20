import React, { useState } from 'react';
import { ICONS } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreateFromJSON: (data: any[]) => void;
  onCreateEmpty: (slugName: string) => void;
}

const AddSlugModal: React.FC<Props> = ({ isOpen, onClose, onCreateFromJSON, onCreateEmpty }) => {
  const [method, setMethod] = useState<'json' | 'empty' | null>(null);
  const [jsonText, setJsonText] = useState('');
  const [slugName, setSlugName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetModal = () => {
    setMethod(null);
    setJsonText('');
    setSlugName('');
    setError('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleMethodSelect = (selectedMethod: 'json' | 'empty') => {
    setMethod(selectedMethod);
    setError('');
  };

  const handleJSONSubmit = () => {
    try {
      const parsedData = JSON.parse(jsonText);
      
      if (!Array.isArray(parsedData)) {
        setError('JSON deve ser um array de objetos');
        return;
      }

      const validData = parsedData.filter(item => 
        item && 
        typeof item === 'object' && 
        typeof item.slug === 'string' && 
        typeof item.description === 'string' && 
        Array.isArray(item.media)
      );

      if (validData.length === 0) {
        setError('Nenhum objeto válido encontrado. Formato esperado: [{"slug": "string", "description": "string", "media": ["url1", "url2"]}]');
        return;
      }

      onCreateFromJSON(validData);
      handleClose();
    } catch (err) {
      setError('JSON inválido. Verifique a sintaxe.');
    }
  };

  const handleEmptySubmit = () => {
    if (!slugName.trim()) {
      setError('Nome do slug é obrigatório');
      return;
    }

    onCreateEmpty(slugName.trim());
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={handleClose}>
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-white">Adicionar Novo Slug</h2>
          <button 
            onClick={handleClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            {ICONS.Close}
          </button>
        </div>

        {!method ? (
          <div className="space-y-4">
            <p className="text-sm text-zinc-500 mb-6">Escolha o método de adição:</p>
            
            <button
              onClick={() => handleMethodSelect('json')}
              className="w-full p-6 border border-[#2a2a2a] rounded-xl hover:border-zinc-500 hover:bg-[#1a1a1a] transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                {ICONS.JSON}
                <div>
                  <h3 className="text-white font-medium group-hover:text-white">Importar JSON</h3>
                  <p className="text-sm text-zinc-500">Cole o array JSON gerado pela extensão</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleMethodSelect('empty')}
              className="w-full p-6 border border-[#2a2a2a] rounded-xl hover:border-zinc-500 hover:bg-[#1a1a1a] transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                {ICONS.Plus}
                <div>
                  <h3 className="text-white font-medium group-hover:text-white">Criar Slug Vazio</h3>
                  <p className="text-sm text-zinc-500">Crie um novo slug e adicione medias posteriormente</p>
                </div>
              </div>
            </button>
          </div>
        ) : method === 'json' ? (
          <div className="space-y-4">
            <button
              onClick={() => setMethod(null)}
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm mb-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>
            
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Array JSON</label>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full h-64 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4 text-sm font-mono text-zinc-400 focus:outline-none focus:border-zinc-500 resize-none"
              placeholder='[{"slug": "cachorros-golden", "description": "Imagens de cachorros Golden Retriever", "media": ["https://exemplo.com/img1.jpg", "https://exemplo.com/img2.jpg"]}]'
            />
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                {ICONS.Alert}
                {error}
              </div>
            )}
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setMethod(null)}
                className="flex-1 px-6 py-3 rounded-lg border border-[#2a2a2a] text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleJSONSubmit}
                className="flex-1 px-6 py-3 rounded-lg bg-white text-black font-medium hover:scale-105 transition-transform"
              >
                Importar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setMethod(null)}
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm mb-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>
            
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Nome do Slug</label>
            <input
              type="text"
              value={slugName}
              onChange={(e) => setSlugName(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4 text-sm text-white focus:outline-none focus:border-zinc-500"
              placeholder="ex: cachorros-golden"
            />
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                {ICONS.Alert}
                {error}
              </div>
            )}
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setMethod(null)}
                className="flex-1 px-6 py-3 rounded-lg border border-[#2a2a2a] text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleEmptySubmit}
                className="flex-1 px-6 py-3 rounded-lg bg-white text-black font-medium hover:scale-105 transition-transform"
              >
                Criar e Editar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSlugModal;