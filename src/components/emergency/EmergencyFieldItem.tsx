/**
 * Emergency Field Item Component
 * 
 * Displays a single emergency field with icon, label, and value
 * Includes action button for phone numbers (call action)
 */

'use client';

import { UIEmergencyField } from '@/types/emergency';

interface EmergencyFieldItemProps {
  field: UIEmergencyField;
}

export default function EmergencyFieldItem({ field }: EmergencyFieldItemProps) {
  // Handle call action
  const handleCall = () => {
    if (field.actionType === 'call') {
      window.location.href = `tel:${field.value}`;
    }
  };

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
          <div className="text-sm text-[#617289] leading-[21px] font-normal">
            {field.value}
          </div>
        </div>

        {/* Action Button (for phone numbers) */}
        {field.actionType === 'call' && (
          <div className="mt-3">
            <button
              onClick={handleCall}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC2626] text-white text-sm font-semibold rounded-lg hover:bg-[#B91C1C] transition-colors shadow-sm"
            >
              <span className="material-icons" style={{ fontSize: '16px' }}>
                call
              </span>
              <span>Call Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
