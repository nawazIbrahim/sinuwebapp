'use client';

import { useState } from 'react';
import { UIContactField } from '@/types/contact';

interface ContactItemProps {
  contact: UIContactField;
}

export function ContactItem({ contact }: ContactItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contact.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleAction = () => {
    if (contact.canCall) {
      window.location.href = `tel:${contact.value}`;
    } else if (contact.field === 'whatsapp') {
      window.open(`https://wa.me/${contact.value.replace(/\D/g, '')}`, '_blank');
    } else if (contact.field === 'email') {
      window.location.href = `mailto:${contact.value}`;
    }
  };

  return (
    <div className="px-6 py-4 flex items-center gap-4">
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: contact.iconBgColor }}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ color: contact.iconColor }}
        >
          {contact.icon}
        </span>
      </div>

      {/* Contact Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-gray-900 font-semibold text-base truncate">
            {contact.value}
          </p>
          <button
            onClick={handleCopy}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Copy"
            title={copied ? 'Copied!' : 'Copy'}
          >
            <span className="material-symbols-outlined text-gray-600 text-xl">
              {copied ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>
        <p className="text-gray-500 text-sm">
          {contact.label}
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={handleAction}
        className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm transition-colors flex-shrink-0"
        style={{
          backgroundColor: contact.actionButtonColor,
        }}
        aria-label={`${contact.field} ${contact.label}`}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ 
            color: contact.isPrimary ? '#FFFFFF' : '#DC2626' 
          }}
        >
          {contact.actionIcon}
        </span>
      </button>
    </div>
  );
}
