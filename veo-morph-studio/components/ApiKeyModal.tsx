import React, { useEffect, useState } from 'react';
import { AIStudio } from '../types';

const ApiKeyModal: React.FC<{ onKeySelected: () => void }> = ({ onKeySelected }) => {
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  const checkKey = async () => {
    try {
      const aistudio = (window as any).aistudio as AIStudio | undefined;
      if (aistudio && aistudio.hasSelectedApiKey) {
        const selected = await aistudio.hasSelectedApiKey();
        setHasKey(selected);
        if (selected) {
          onKeySelected();
        }
      }
    } catch (e) {
      console.error("Error checking API key", e);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectKey = async () => {
    const aistudio = (window as any).aistudio as AIStudio | undefined;
    if (aistudio && aistudio.openSelectKey) {
      await aistudio.openSelectKey();
      // Assume success after interaction and re-check immediately or proceed
      // The prompt suggests: "assume the key selection was successful after triggering openSelectKey"
      setHasKey(true);
      onKeySelected();
    }
  };

  if (checking) return null; // Or a spinner
  if (hasKey) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-4">
      <div className="bg-[#18181b] border border-zinc-700 rounded-xl max-w-md w-full p-8 shadow-2xl text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-400">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">API Key Required</h2>
        <p className="text-zinc-400 mb-6 leading-relaxed">
          To generate high-quality videos with Veo, you need to select a paid Google Cloud Project API key.
        </p>
        
        <button
          onClick={handleSelectKey}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/25"
        >
          Select API Key
        </button>

        <p className="mt-6 text-xs text-zinc-500">
          Learn more about <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">billing and API keys</a>.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyModal;