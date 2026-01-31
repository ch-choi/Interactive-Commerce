import React, { useState } from 'react';
import ApiKeyModal from './components/ApiKeyModal';
import ImageUpload from './components/ImageUpload';
import VideoResult from './components/VideoResult';
import { generateVideo } from './services/veoService';
import { fileToBase64, getMimeType } from './utils';
import { AspectRatio, GenerationState } from './types';

const App: React.FC = () => {
  const [apiKeyReady, setApiKeyReady] = useState(false);
  const [startImage, setStartImage] = useState<File | null>(null);
  const [endImage, setEndImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  
  const [genState, setGenState] = useState<GenerationState>({ status: 'idle' });

  const handleGenerate = async () => {
    if (!startImage) return;

    setGenState({ status: 'generating' });
    
    try {
      const startBase64 = await fileToBase64(startImage);
      const startMime = getMimeType(startImage);
      
      let endBase64 = null;
      let endMime = null;
      
      if (endImage) {
        endBase64 = await fileToBase64(endImage);
        endMime = getMimeType(endImage);
      }

      setGenState({ status: 'polling' });
      
      const videoUrl = await generateVideo(
        prompt, 
        startBase64, 
        startMime, 
        aspectRatio, 
        endBase64, 
        endMime
      );

      setGenState({ status: 'complete', videoUrl });
    } catch (error: any) {
      console.error(error);
      setGenState({ 
        status: 'error', 
        error: error.message || "An unexpected error occurred during generation." 
      });
    }
  };

  const handleReset = () => {
    setGenState({ status: 'idle' });
    setStartImage(null);
    setEndImage(null);
    setPrompt('');
  };

  const handleCloseResult = () => {
    setGenState({ status: 'idle' });
  };

  // Loading UI Component
  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex flex-col items-center justify-center rounded-2xl">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-zinc-700 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <h3 className="mt-4 text-xl font-bold text-white">Generating Video</h3>
      <p className="text-zinc-400 mt-2 text-sm text-center max-w-xs">
        {genState.status === 'polling' 
          ? "Waiting for Veo to render frames..." 
          : "Uploading assets and initializing..."}
      </p>
      <p className="text-zinc-500 text-xs mt-4">This usually takes 1-2 minutes.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-blue-500/30">
      <ApiKeyModal onKeySelected={() => setApiKeyReady(true)} />

      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Veo Morph Studio</h1>
          </div>
          <a href="https://deepmind.google/technologies/veo/" target="_blank" rel="noreferrer" className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">
            Powered by Google Veo
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 pb-20">
        
        {genState.status === 'complete' && genState.videoUrl ? (
          <VideoResult 
            url={genState.videoUrl} 
            onDownload={() => {}} 
            onReset={handleCloseResult} 
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Input Controls */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
                 {/* Loading Overlay within the container */}
                {(genState.status === 'generating' || genState.status === 'polling') && <LoadingOverlay />}

                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">1</span>
                  Upload Keyframes
                </h2>
                
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <ImageUpload 
                    label="Start Frame" 
                    image={startImage} 
                    onImageChange={setStartImage}
                    required
                  />
                  
                  {/* Transition Arrow */}
                  <div className="hidden md:flex flex-col items-center justify-center pt-6 text-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                  <div className="md:hidden text-zinc-600 rotate-90 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>

                  <ImageUpload 
                    label="End Frame (Optional)" 
                    image={endImage} 
                    onImageChange={setEndImage}
                  />
                </div>
                
                <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-xs text-blue-200 flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    Tip: Uploading two images creates a smooth morphing transition. If you only upload the first, Veo will animate it based on your prompt.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Settings & Action */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">2</span>
                  Configuration
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Prompt (Optional)</label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the motion or transition (e.g., 'A natural and continuous transition between images')"
                      className="w-full h-32 bg-black/40 border border-zinc-700 rounded-xl p-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Aspect Ratio</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setAspectRatio('16:9')}
                        className={`
                          py-3 px-4 rounded-xl border flex flex-col items-center gap-2 transition-all
                          ${aspectRatio === '16:9' 
                            ? 'bg-blue-600/10 border-blue-500/50 text-blue-400' 
                            : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-800'
                          }
                        `}
                      >
                        <div className="w-8 h-4.5 border-2 border-current rounded-sm"></div>
                        <span className="text-xs font-medium">Landscape</span>
                      </button>
                      
                      <button
                        onClick={() => setAspectRatio('9:16')}
                        className={`
                          py-3 px-4 rounded-xl border flex flex-col items-center gap-2 transition-all
                          ${aspectRatio === '9:16' 
                            ? 'bg-blue-600/10 border-blue-500/50 text-blue-400' 
                            : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-800'
                          }
                        `}
                      >
                        <div className="w-4.5 h-8 border-2 border-current rounded-sm"></div>
                        <span className="text-xs font-medium">Portrait</span>
                      </button>
                    </div>
                  </div>

                  {genState.status === 'error' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-xs text-red-400">{genState.error}</p>
                    </div>
                  )}

                  <button
                    onClick={handleGenerate}
                    disabled={!startImage || !apiKeyReady || genState.status === 'generating' || genState.status === 'polling'}
                    className={`
                      w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all
                      flex items-center justify-center gap-2
                      ${!startImage || !apiKeyReady
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 transform hover:scale-[1.02]'
                      }
                    `}
                  >
                     {genState.status === 'generating' || genState.status === 'polling' ? (
                       <>
                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         Processing...
                       </>
                     ) : (
                       <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
                        Generate Video
                       </>
                     )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
