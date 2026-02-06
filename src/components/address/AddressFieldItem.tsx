/**
 * Address Field Item Component
 * 
 * Displays a single address field with icon, label, and value
 * Handles both single-line and multi-line text display
 * Special rendering for Google Maps location field
 */

'use client';

import { UIAddressField } from '@/types/address';

interface AddressFieldItemProps {
  field: UIAddressField;
}

export default function AddressFieldItem({ field }: AddressFieldItemProps) {
  // Handle "Open in Maps" click
  const handleOpenMap = () => {
    if (field.value) {
      window.open(field.value, '_blank', 'noopener,noreferrer');
    }
  };

  // Extract location for Google Maps embed (default to Trivandrum)
  const getMapEmbedUrl = () => {
    const defaultLocation = 'Trivandrum,Kerala,India';
    // If we have a Google Maps URL, try to extract coordinates or use default
    // For now, we'll use static map with default location
    const encodedLocation = encodeURIComponent(defaultLocation);
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedLocation}&zoom=13`;
  };

  // Render map field with embedded Google Maps
  if (field.isMapField) {
    return (
      <div className="flex items-start gap-4 px-6 py-4 border-t border-[#FAF5FF]">
        {/* Icon Container */}
        <div className="flex-shrink-0 pt-1">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: field.iconBgColor }}
          >
            <span
              className="material-icons"
              style={{
                fontSize: '24px',
                color: field.iconColor,
              }}
            >
              {field.icon}
            </span>
          </div>
        </div>

        {/* Content with Map */}
        <div className="flex-1 pt-0.5">
          {/* Label */}
          <div className="text-base font-semibold text-[#111418] leading-[22px]">
            {field.label}
          </div>

          {/* Value (Location name) */}
          <div className="mt-0.5">
            <div className="text-sm text-[#617289] leading-[21px] font-normal">
              Trivandrum
            </div>
          </div>

          {/* Map Preview */}
          <div className="mt-4 relative w-full h-36 rounded-2xl overflow-hidden shadow-sm border border-[#FFFBEB]">
            {/* Google Maps Embed */}
            <iframe
              src={getMapEmbedUrl()}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />

            {/* Overlay with "Open in Maps" Button */}
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
              <button
                onClick={handleOpenMap}
                className="backdrop-blur-sm bg-white/95 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto hover:bg-white transition-colors"
              >
                <span className="text-xs font-semibold text-[#1F2937]">
                  Open in Maps
                </span>
                <span className="material-icons text-[#1F2937]" style={{ fontSize: '14px' }}>
                  open_in_new
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular field rendering
  return (
    <div className="flex items-start gap-4 px-6 py-4 border-t border-[#FAF5FF]">
      {/* Icon Container */}
      <div className="flex-shrink-0 pt-1">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: field.iconBgColor }}
        >
          <span
            className="material-icons"
            style={{
              fontSize: '24px',
              color: field.iconColor,
            }}
          >
            {field.icon}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-0.5">
        {/* Label */}
        <div className="text-base font-semibold text-[#111418] leading-[22px]">
          {field.label}
        </div>

        {/* Value */}
        <div className="mt-0.5">
          <div
            className={`text-sm text-[#617289] leading-[21px] ${
              field.isMultiline ? 'whitespace-pre-wrap font-normal' : 'font-normal'
            }`}
          >
            {field.value}
          </div>
        </div>
      </div>
    </div>
  );
}
