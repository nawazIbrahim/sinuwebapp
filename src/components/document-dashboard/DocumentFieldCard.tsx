'use client';

import { useState, useRef } from 'react';
import { ToggleSwitch } from '../dashboard/ToggleSwitch';

interface DocumentFieldCardProps {
  label: string;
  title: string;
  description: string;
  fieldDescription: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onFileChange: (fileUrl: string, fileType: string, fileSize: string) => void;
  draggableProps?: any;
  dragHandleProps?: any;
  isDragging?: boolean;
}

export function DocumentFieldCard({
  label,
  title,
  description,
  fieldDescription,
  fileType,
  fileSize,
  fileUrl,
  icon,
  iconColor,
  iconBgColor,
  enabled,
  onToggle,
  onTitleChange,
  onDescriptionChange,
  onFileChange,
  draggableProps,
  dragHandleProps,
  isDragging = false,
}: DocumentFieldCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [currentIcon, setCurrentIcon] = useState(icon);
  const [currentIconColor, setCurrentIconColor] = useState(iconColor);
  const [currentIconBgColor, setCurrentIconBgColor] = useState(iconBgColor);
  const [currentFileType, setCurrentFileType] = useState(fileType);
  const [currentFileSize, setCurrentFileSize] = useState(fileSize);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveTitle = () => {
    if (editedTitle.trim() && editedTitle !== title) {
      onTitleChange(editedTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleCancelTitle = () => {
    setEditedTitle(title);
    setIsEditingTitle(false);
  };

  const handleSaveDescription = () => {
    if (editedDescription.trim() !== description) {
      onDescriptionChange(editedDescription.trim());
    }
    setIsEditingDescription(false);
  };

  const handleCancelDescription = () => {
    setEditedDescription(description);
    setIsEditingDescription(false);
  };

  const getFileTypeIcon = (type: string): { icon: string; iconColor: string; iconBgColor: string } => {
    const upperType = type.toUpperCase();
    const configs: Record<string, { icon: string; iconColor: string; iconBgColor: string }> = {
      PDF: { icon: 'picture_as_pdf', iconColor: '#DC2626', iconBgColor: '#FEE2E2' },
      DOC: { icon: 'description', iconColor: '#2563EB', iconBgColor: '#DBEAFE' },
      DOCX: { icon: 'description', iconColor: '#2563EB', iconBgColor: '#DBEAFE' },
      TXT: { icon: 'article', iconColor: '#64748B', iconBgColor: '#F1F5F9' },
      XLS: { icon: 'table_chart', iconColor: '#059669', iconBgColor: '#D1FAE5' },
      XLSX: { icon: 'table_chart', iconColor: '#059669', iconBgColor: '#D1FAE5' },
      JPG: { icon: 'image', iconColor: '#7C3AED', iconBgColor: '#EDE9FE' },
      JPEG: { icon: 'image', iconColor: '#7C3AED', iconBgColor: '#EDE9FE' },
      PNG: { icon: 'image', iconColor: '#7C3AED', iconBgColor: '#EDE9FE' },
      GIF: { icon: 'gif', iconColor: '#7C3AED', iconBgColor: '#EDE9FE' },
      PPT: { icon: 'slideshow', iconColor: '#DC2626', iconBgColor: '#FEE2E2' },
      PPTX: { icon: 'slideshow', iconColor: '#DC2626', iconBgColor: '#FEE2E2' },
      ZIP: { icon: 'folder_zip', iconColor: '#CA8A04', iconBgColor: '#FEF3C7' },
      RAR: { icon: 'folder_zip', iconColor: '#CA8A04', iconBgColor: '#FEF3C7' },
    };
    return configs[upperType] || { icon: 'insert_drive_file', iconColor: '#617289', iconBgColor: '#F3F4F6' };
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + 'B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + 'KB';
    return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toUpperCase() || '';
    const allowedTypes = ['JPG', 'JPEG', 'PNG', 'GIF', 'PDF', 'DOC', 'DOCX', 'TXT', 'XLS', 'XLSX', 'CSV', 'PPT', 'PPTX', 'ZIP', 'RAR'];
    if (!allowedTypes.includes(extension)) {
      alert('❌ Invalid File Type\n\nPlease select a valid file format:\n• Images: JPG, JPEG, PNG, GIF\n• Documents: PDF, DOC, DOCX, TXT\n• Spreadsheets: XLS, XLSX, CSV\n• Presentations: PPT, PPTX\n• Archives: ZIP, RAR');
      return;
    }

    const maxSizeBytes = 1 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      alert(`❌ File Too Large\n\nYour file size: ${fileSizeMB} MB\nMaximum allowed: 1 MB\n\nPlease select a smaller file.`);
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const iconData = getFileTypeIcon(extension);
      setCurrentIcon(iconData.icon);
      setCurrentIconColor(iconData.iconColor);
      setCurrentIconBgColor(iconData.iconBgColor);
      setCurrentFileType(extension);
      setCurrentFileSize(formatFileSize(file.size));
      setTimeout(() => {
        onFileChange(dataUrl, extension, formatFileSize(file.size));
        setIsUploading(false);
      }, 500);
    };
    reader.onerror = () => {
      alert('Failed to read file');
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
                <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} onKeyDown={(e) => { if (e.key === 'Escape') handleCancelTitle(); if (e.key === 'Enter') handleSaveTitle(); }} className="w-full text-sm text-gray-900 bg-white border-2 border-blue-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" autoFocus placeholder="Enter document title..." />
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
                <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} onKeyDown={(e) => { if (e.key === 'Escape') handleCancelDescription(); }} className="w-full text-sm text-gray-900 bg-white border-2 border-blue-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px] resize-none placeholder-gray-400" autoFocus placeholder="Enter document description..." />
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

          {/* File (compact row) */}
          <div className="mb-3">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pointer-events-none block mb-2">File</label>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: currentIconBgColor }}>
                  <span className="material-icons text-lg" style={{ color: currentIconColor }}>{currentIcon}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{currentFileType} • {currentFileSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleUploadClick} disabled={isUploading} className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {isUploading ? <span className="material-icons text-base animate-spin">refresh</span> : <span className="material-icons text-base">upload</span>}
                  <span>{isUploading ? 'Uploading...' : 'Replace'}</span>
                </button>
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all">
                  <span className="material-icons text-base">download</span>
                  <span>Download</span>
                </a>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt,.xls,.xlsx,.csv,.ppt,.pptx,.zip,.rar" onChange={handleFileUpload} className="hidden" />
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
