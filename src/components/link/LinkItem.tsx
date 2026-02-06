/**
 * Link Item Component
 * 
 * Displays a single link with icon, name, description, and clickable button
 * Opens link in new tab on click
 */

'use client';

import { UILinkField } from '@/types/link';

interface LinkItemProps {
  link: UILinkField;
}

export default function LinkItem({ link }: LinkItemProps) {
  // Handle link click - open in new tab
  const handleLinkClick = () => {
    window.open(link.linkUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-start gap-4 px-6 py-4 border-t border-[#FAF5FF]">
      {/* Icon Container */}
      <div className="flex-shrink-0 pt-1">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: link.iconBgColor }}
        >
          <span
            className="material-icons"
            style={{
              fontSize: '24px',
              color: link.iconColor,
            }}
          >
            {link.icon}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-0.5">
        {/* Name */}
        <div className="text-base font-semibold text-[#111418] leading-[22px]">
          {link.name}
        </div>

        {/* Description */}
        <div className="mt-0.5">
          <div className="text-sm text-[#617289] leading-[21px] font-normal">
            {link.description}
          </div>
        </div>

        {/* Link Button with Custom Text */}
        <div className="mt-3">
          <button
            onClick={handleLinkClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#136DEC] text-white text-sm font-semibold rounded-lg hover:bg-[#0C4697] transition-colors shadow-sm"
          >
            <span>{link.linkText}</span>
            <span className="material-icons" style={{ fontSize: '16px' }}>
              open_in_new
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
