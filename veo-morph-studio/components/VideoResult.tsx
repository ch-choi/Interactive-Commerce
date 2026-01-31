import React from 'react';

interface VideoResultProps {
  url: string;
  onDownload: () => void;
  onReset: () => void;
}

const VideoResult: React.FC<VideoResultProps> = ({ url, onDownload, onReset }) => {
  return (
    <div className="w-full animate-fade-in">
      <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-zinc-700/50 flex justify-between items-center bg-zinc-900">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Generation Complete
          </h3>
          <div className="flex gap-2">
             <button
              onClick={onReset}
               className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        
        <div className="relative bg-black aspect-video flex items-center justify-center">
            <video 
                src={url} 
                controls 
                autoPlay 
                loop 
                className="max-h-[60vh] w-full"
            />
        </div>

        <div className="p-4 bg-zinc-900 flex justify-end gap-3">
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-medium"
          >
            Create New
          </button>
          <a
            href={url}
            download="veo-generation.mp4"
            className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors text-sm font-bold flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download MP4
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoResult;
