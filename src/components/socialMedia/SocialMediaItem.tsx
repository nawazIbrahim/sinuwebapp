/**
 * Social Media Item Component
 * 
 * Displays a single social media platform with icon, name, and copy functionality
 */

'use client';

import { useState } from 'react';
import { UISocialMediaField } from '@/types/socialMedia';

interface SocialMediaItemProps {
  item: UISocialMediaField;
}

export default function SocialMediaItem({ item }: SocialMediaItemProps) {
  const [copied, setCopied] = useState(false);

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="flex items-start gap-4 px-6 py-4 border-t border-[#FAF5FF]">
      {/* Icon Container */}
      <div className="flex-shrink-0 pt-0.5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: item.iconBgColor }}
        >
          <span
            className="material-icons"
            style={{
              fontSize: '20px',
              color: item.iconColor,
            }}
          >
            {item.icon}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Platform Name */}
        <div className="text-base font-semibold text-[#111418] leading-6">
          {item.platformName}
        </div>

        {/* Display URL */}
        <div className="mt-0.5">
          <div className="text-sm text-[#0C4697] leading-[22.75px] font-normal truncate">
            {item.displayUrl}
          </div>
        </div>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors mt-1"
        aria-label="Copy link"
      >
        <span
          className="material-icons"
          style={{
            fontSize: '20px',
            color: copied ? '#059669' : '#94A3B8',
          }}
        >
          {copied ? 'check' : 'content_copy'}
        </span>
      </button>
    </div>
  );
}
