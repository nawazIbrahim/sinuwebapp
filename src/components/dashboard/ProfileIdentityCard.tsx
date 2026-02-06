'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

interface ProfileIdentityCardProps {
  name: string;
  title: string;
  description: string;
  avatarUrl: string;
  onUpdate: (updates: { name?: string; title?: string; description?: string; avatarUrl?: string }) => void;
}

export function ProfileIdentityCard({
  name,
  title,
  description,
  avatarUrl,
  onUpdate,
}: ProfileIdentityCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameSave = () => {
    if (editedName.trim() && editedName !== name) {
      onUpdate({ name: editedName.trim() });
    }
    setIsEditingName(false);
  };

  const handleTitleSave = () => {
    if (editedTitle.trim() && editedTitle !== title) {
      onUpdate({ title: editedTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleDescriptionSave = () => {
    if (editedDescription.trim() && editedDescription !== description) {
      onUpdate({ description: editedDescription.trim() });
    }
    setIsEditingDescription(false);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production: Upload to server and get URL
      // For now: Create local URL
      const localUrl = URL.createObjectURL(file);
      onUpdate({ avatarUrl: localUrl });
    }
  };

  return (
    <div className="bg-white rounded-[20px] p-5 shadow-[0px_8px_30px_0px_rgba(0,0,0,0.04)]">
      {/* Profile Picture and Name Row */}
      <div className="flex items-center gap-4 mb-4">
        {/* Profile Picture - Editable */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={handlePhotoClick}
            className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#136dec]/20 relative group transition-all hover:border-[#136dec] active:scale-95 touch-manipulation"
            aria-label="Change profile picture"
          >
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className="object-cover transition-opacity group-hover:opacity-80"
              sizes="80px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <span className="material-icons text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                photo_camera
              </span>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
            aria-label="Upload profile picture"
          />
        </div>

        {/* Name and Title - Editable */}
        <div className="flex-1 min-w-0">
          {/* Name */}
          {isEditingName ? (
            <div className="flex items-center gap-2 mb-1">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur={handleNameSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNameSave();
                  if (e.key === 'Escape') {
                    setEditedName(name);
                    setIsEditingName(false);
                  }
                }}
                className="flex-1 text-lg font-bold text-gray-900 bg-blue-50 border border-blue-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                placeholder="Enter name"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-1 group/name">
              <h2 className="text-lg font-bold text-gray-900 leading-tight">{name}</h2>
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="opacity-0 group-hover/name:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded active:scale-90 touch-manipulation"
                aria-label="Edit name"
              >
                <span className="material-icons text-gray-500 text-base pointer-events-none">edit</span>
              </button>
            </div>
          )}

          {/* Title/Profession */}
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSave();
                  if (e.key === 'Escape') {
                    setEditedTitle(title);
                    setIsEditingTitle(false);
                  }
                }}
                className="flex-1 text-sm text-gray-600 font-medium bg-blue-50 border border-blue-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                placeholder="Enter profession"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 group/title">
              <p className="text-sm text-gray-600 font-medium">{title}</p>
              <button
                type="button"
                onClick={() => setIsEditingTitle(true)}
                className="opacity-0 group-hover/title:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded active:scale-90 touch-manipulation"
                aria-label="Edit profession"
              >
                <span className="material-icons text-gray-500 text-base pointer-events-none">edit</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description - Editable */}
      {isEditingDescription ? (
        <div className="mt-3">
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            onBlur={handleDescriptionSave}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setEditedDescription(description);
                setIsEditingDescription(false);
              }
            }}
            className="w-full text-sm text-gray-700 bg-blue-50 border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"
            autoFocus
            placeholder="Enter profile description"
          />
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <span>Press Esc to cancel, click outside to save</span>
          </div>
        </div>
      ) : (
        <div className="group/desc">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">About</span>
            <button
              type="button"
              onClick={() => setIsEditingDescription(true)}
              className="opacity-0 group-hover/desc:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded active:scale-90 touch-manipulation"
              aria-label="Edit description"
            >
              <span className="material-icons text-gray-500 text-base pointer-events-none">edit</span>
            </button>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {description || 'No description provided'}
          </p>
        </div>
      )}
    </div>
  );
}
