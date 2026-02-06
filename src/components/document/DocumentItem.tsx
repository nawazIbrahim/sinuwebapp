/**
 * Document Item Component
 * 
 * Displays a single document with icon, info, and download functionality
 * Supports download progress and success states
 */

'use client';

import { useState } from 'react';
import { UIDocumentField, DownloadState } from '@/types/document';

interface DocumentItemProps {
  document: UIDocumentField;
}

export default function DocumentItem({ document }: DocumentItemProps) {
  const [downloadState, setDownloadState] = useState<DownloadState>('idle');
  const [progress, setProgress] = useState(0);

  // Simulate download with progress
  const handleDownload = async () => {
    if (downloadState === 'downloading') return;

    setDownloadState('downloading');
    setProgress(0);

    // Simulate download progress
    const totalSteps = 20;
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setProgress((i / totalSteps) * 100);
    }

    // Show success state
    setDownloadState('success');

    // Trigger actual download
    try {
      const link = window.document.createElement('a');
      link.href = document.fileUrl;
      link.download = `${document.name}.${document.fileType.toLowerCase()}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      setDownloadState('error');
    }

    // Reset to idle after 2 seconds
    setTimeout(() => {
      setDownloadState('idle');
      setProgress(0);
    }, 2000);
  };

  // Get button content based on state
  const getButtonContent = () => {
    switch (downloadState) {
      case 'downloading':
        return (
          <>
            <span>Downloading...</span>
            <span className="material-icons animate-spin" style={{ fontSize: '16px' }}>
              sync
            </span>
          </>
        );
      case 'success':
        return (
          <>
            <span>Downloaded</span>
            <span className="material-icons" style={{ fontSize: '16px' }}>
              check_circle
            </span>
          </>
        );
      case 'error':
        return (
          <>
            <span>Failed</span>
            <span className="material-icons" style={{ fontSize: '16px' }}>
              error
            </span>
          </>
        );
      default:
        return (
          <>
            <span>Download</span>
            <span className="material-icons" style={{ fontSize: '16px' }}>
              download
            </span>
          </>
        );
    }
  };

  // Get button style based on state
  const getButtonStyle = () => {
    switch (downloadState) {
      case 'success':
        return 'bg-[#059669] hover:bg-[#047857]'; // Green
      case 'error':
        return 'bg-[#DC2626] hover:bg-[#B91C1C]'; // Red
      default:
        return 'bg-[#136DEC] hover:bg-[#0C4697]'; // Blue
    }
  };

  return (
    <div className="flex items-start gap-4 px-6 py-4 border-t border-[#FAF5FF]">
      {/* Icon Container */}
      <div className="flex-shrink-0 pt-1">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: document.iconBgColor }}
        >
          <span
            className="material-icons"
            style={{
              fontSize: '24px',
              color: document.iconColor,
            }}
          >
            {document.icon}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-0.5">
        {/* Title */}
        <div className="text-base font-semibold text-[#111418] leading-[22px]">
          {document.title}
        </div>

        {/* Description */}
        <div className="mt-0.5">
          <div className="text-sm text-[#617289] leading-[21px] font-normal">
            {document.description}
          </div>
        </div>

        {/* File Info */}
        <div className="mt-1 flex items-center gap-2 text-xs text-[#617289]">
          <span className="font-medium">{document.fileType}</span>
          <span>•</span>
          <span>{document.fileSize}</span>
        </div>

        {/* Progress Bar (shown only during download) */}
        {downloadState === 'downloading' && (
          <div className="mt-3">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#136DEC] transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-[#617289] text-right">
              {Math.round(progress)}%
            </div>
          </div>
        )}

        {/* Download Button */}
        <div className="mt-3">
          <button
            onClick={handleDownload}
            disabled={downloadState === 'downloading'}
            className={`inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed ${getButtonStyle()}`}
          >
            {getButtonContent()}
          </button>
        </div>
      </div>
    </div>
  );
}
