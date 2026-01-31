import React, { useRef } from 'react';

interface ImageUploadProps {
  label: string;
  image: File | null;
  onImageChange: (file: File | null) => void;
  required?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, image, onImageChange, required = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-zinc-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {image && (
          <button 
            onClick={clearImage}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`
          relative group cursor-pointer
          h-64 w-full rounded-xl border-2 border-dashed
          transition-all duration-300 ease-in-out
          flex items-center justify-center overflow-hidden
          ${image 
            ? 'border-blue-500/50 bg-zinc-900/50' 
            : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/30 hover:bg-zinc-800/50'
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {image ? (
          <div className="relative w-full h-full">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-medium bg-black/60 px-3 py-1 rounded-full text-sm">Change Image</span>
            </div>
          </div>
        ) : (
          <div className="text-center p-6">
            <div className="mx-auto w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <p className="text-sm text-zinc-400 font-medium">Click or drop image</p>
            <p className="text-xs text-zinc-500 mt-1">JPG, PNG, WebP</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
