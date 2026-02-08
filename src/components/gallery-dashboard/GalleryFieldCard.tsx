'use client';

import { useState, useRef } from 'react';
import { ToggleSwitch } from '../dashboard/ToggleSwitch';

interface GalleryFieldCardProps {
  label: string;
  title: string;
  description: string;
  fieldDescription: string;
  thumbnailUrl: string;
  imageUrl: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onImageChange: (imageUrl: string, thumbnailUrl: string) => void;
  draggableProps?: any;
  dragHandleProps?: any;
  isDragging?: boolean;
}

const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23f3f4f6" width="64" height="64"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="system-ui" font-size="10"%3ENo Image%3C/text%3E%3C/svg%3E';

export function GalleryFieldCard({
  label,
  title,
  description,
  fieldDescription,
  thumbnailUrl,
  imageUrl,
  enabled,
  onToggle,
  onTitleChange,
  onDescriptionChange,
  onImageChange,
  draggableProps,
  dragHandleProps,
  isDragging = false,
}: GalleryFieldCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [currentThumbnail, setCurrentThumbnail] = useState(thumbnailUrl);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveTitle = () => {
    if (editedTitle.trim() && editedTitle !== title) onTitleChange(editedTitle.trim());
    setIsEditingTitle(false);
  };

  const handleCancelTitle = () => {
    setEditedTitle(title);
    setIsEditingTitle(false);
  };

  const handleSaveDescription = () => {
    if (editedDescription.trim() !== description) onDescriptionChange(editedDescription.trim());
    setIsEditingDescription(false);
  };

  const handleCancelDescription = () => {
    setEditedDescription(description);
    setIsEditingDescription(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setCurrentThumbnail(dataUrl);
      setTimeout(() => {
        onImageChange(dataUrl, dataUrl);
        setIsUploading(false);
      }, 500);
    };
    reader.onerror = () => {
      alert('Failed to read image file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  return (
    <div
      {...draggableProps}
      className={`bg-white rounded-[20px] p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] transition-all duration-200 border border-gray-100 ${
        isDragging ? 'shadow-[0px_8px_24px_0px_rgba(0,0,0,0.16)] scale-[1.02]' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-2">
          <ToggleSwitch checked={enabled} onChange={onToggle} size="sm" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pointer-events-none">Title</label>
              {!isEditingTitle && (
                <button type="button" onClick={() => setIsEditingTitle(true)} className="flex items-center gap-1 px-2 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all active:scale-95 touch-manipulation" aria-label="Edit title">
                  <span className="material-icons text-sm pointer-events-none">edit</span>
                  <span className="text-xs font-medium pointer-events-none">Edit</span>
                </button>
              )}
            </div>
            {isEditingTitle ? (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 space-y-3">
                <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} onKeyDown={(e) => { if (e.key === 'Escape') handleCancelTitle(); if (e.key === 'Enter') handleSaveTitle(); }} className="w-full text-sm text-gray-900 bg-white border-2 border-blue-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" autoFocus placeholder="Enter image title..." />
                <div className="flex items-center gap-2">
                  <button type="button" onClick={handleSaveTitle} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-sm touch-manipulation"><span className="material-icons text-base">check</span><span>Save</span></button>
                  <button type="button" onClick={handleCancelTitle} className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-50 active:scale-95 transition-all border border-gray-300 touch-manipulation"><span className="material-icons text-base">close</span><span>Cancel</span></button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed break-words pointer-events-none">{title || 'No title provided'}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pointer-events-none">Description</label>
              {!isEditingDescription && (
                <button type="button" onClick={() => setIsEditingDescription(true)} className="flex items-center gap-1 px-2 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all active:scale-95 touch-manipulation" aria-label="Edit description">
                  <span className="material-icons text-sm pointer-events-none">edit</span>
                  <span className="text-xs font-medium pointer-events-none">Edit</span>
                </button>
              )}
            </div>
            {isEditingDescription ? (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 space-y-3">
                <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} onKeyDown={(e) => { if (e.key === 'Escape') handleCancelDescription(); }} className="w-full text-sm text-gray-900 bg-white border-2 border-blue-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px] resize-none placeholder-gray-400" autoFocus placeholder="Enter image description..." />
                <div className="flex items-center gap-2">
                  <button type="button" onClick={handleSaveDescription} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-sm touch-manipulation"><span className="material-icons text-base">check</span><span>Save</span></button>
                  <button type="button" onClick={handleCancelDescription} className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-50 active:scale-95 transition-all border border-gray-300 touch-manipulation"><span className="material-icons text-base">close</span><span>Cancel</span></button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed break-words pointer-events-none">{description || 'No description provided'}</p>
              </div>
            )}
          </div>

          {/* Image (compact row) */}
          <div className="mb-3">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pointer-events-none block mb-2">Image</label>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <img src={currentThumbnail || FALLBACK_IMAGE} alt={title} className="w-14 h-14 rounded-lg object-cover border border-gray-200 flex-shrink-0" onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }} />
                <span className="text-sm text-gray-600">Thumbnail</span>
              </div>
              <button type="button" onClick={handleUploadClick} disabled={isUploading} className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {isUploading ? <span className="material-icons text-base animate-spin">refresh</span> : <span className="material-icons text-base">upload</span>}
                <span>{isUploading ? 'Uploading...' : 'Replace Image'}</span>
              </button>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
        </div>

        <div {...dragHandleProps} className="flex-shrink-0 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing transition-colors hover:bg-gray-100 rounded-lg p-2" aria-label="Drag to reorder">
          <div className="flex flex-col items-center gap-1">
            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
