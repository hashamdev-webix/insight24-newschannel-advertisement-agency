'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({ value, onChange, label = 'Image', required }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string>('');

  const displayImage = preview || value;

  async function uploadFile(file: File) {
    setError('');
    setUploading(true);
    setProgress(10);

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setProgress(30);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress while uploading
      const progressInterval = setInterval(() => {
        setProgress(p => Math.min(p + 10, 85));
      }, 200);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      clearInterval(progressInterval);

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Upload failed');
      }

      const data = await res.json();
      setProgress(100);
      setPreview('');
      onChange(data.url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      setPreview('');
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 600);
    }
  }

  function handleFiles(files: FileList | null) {
    if (!files || !files[0]) return;
    uploadFile(files[0]);
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setDragging(false), []);

  function handleClear() {
    onChange('');
    setPreview('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">
        {label} {required && '*'}
      </label>

      {/* Current image preview */}
      {displayImage && !uploading && (
        <div className="relative mb-3 group">
          <div className="relative w-full h-48 bg-gray-100 overflow-hidden border border-gray-200">
            <Image
              src={displayImage}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={displayImage.startsWith('data:')}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="bg-white text-[#1a1a1a] text-xs font-bold px-4 py-2 hover:bg-gray-100 transition"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-[#dd0000] text-white text-xs font-bold px-4 py-2 hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>
          {/* URL display */}
          {value && !value.startsWith('data:') && (
            <p className="text-[10px] text-gray-400 mt-1 truncate">{value}</p>
          )}
        </div>
      )}

      {/* Upload progress */}
      {uploading && (
        <div className="mb-3">
          <div className="relative w-full h-48 bg-gray-100 border border-gray-200 overflow-hidden">
            {preview && (
              <Image src={preview} alt="Uploading..." fill className="object-cover opacity-50" unoptimized />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <p className="text-white text-xs font-bold">Uploading...</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-gray-200 mt-1">
            <div
              className="h-1 bg-[#dd0000] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Drop zone — hide when image is present and not uploading */}
      {!displayImage && !uploading && (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`w-full h-40 border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition
            ${dragging ? 'border-[#dd0000] bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-[#dd0000] hover:bg-gray-100'}`}
        >
          {/* Upload icon */}
          <div className={`w-10 h-10 flex items-center justify-center rounded-sm transition ${dragging ? 'bg-[#dd0000]' : 'bg-gray-200'}`}>
            <svg className={`w-5 h-5 ${dragging ? 'text-white' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#1a1a1a]">
              {dragging ? 'Drop to upload' : 'Drag & drop or click to upload'}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">JPEG, PNG, WebP, GIF — max 10 MB</p>
          </div>
        </div>
      )}

      {/* Replace button when image exists */}
      {displayImage && !uploading && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 text-xs font-semibold text-[#dd0000] hover:underline"
        >
          + Upload new image
        </button>
      )}

      {error && (
        <p className="text-xs text-red-600 mt-1 font-semibold">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
