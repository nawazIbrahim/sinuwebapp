'use client';

import { UIContactIcon } from '@/types/profile';
import { ActionIconButton } from './ActionIconButton';

interface ActionIconsRowProps {
  icons: UIContactIcon[];
}

export function ActionIconsRow({ icons }: ActionIconsRowProps) {
  const handleIconClick = (icon: UIContactIcon) => {
    console.log(`Clicked ${icon.field}:`, icon.value);
    
    switch (icon.field) {
      case 'call':
        // Open phone dialer with the phone number
        window.location.href = `tel:${icon.value}`;
        break;
        
      case 'email':
        // Open email client with the email address
        window.location.href = `mailto:${icon.value}`;
        break;
        
      case 'whatsapp':
        // Open WhatsApp with the phone number
        // Format: Remove all non-numeric characters except leading +
        const whatsappNumber = icon.value.replace(/[^\d+]/g, '').replace(/^\+/, '');
        window.open(`https://wa.me/${whatsappNumber}`, '_blank', 'noopener,noreferrer');
        break;
        
      case 'location':
        // Open Google Maps with the location
        if (icon.value.startsWith('http')) {
          // If it's already a URL (like Google Maps share link), open directly
          window.open(icon.value, '_blank', 'noopener,noreferrer');
        } else {
          // If it's an address or coordinates, open in Google Maps
          window.open(`https://maps.google.com/?q=${encodeURIComponent(icon.value)}`, '_blank', 'noopener,noreferrer');
        }
        break;
        
      default:
        // For any custom action icons, log for now
        console.warn(`No action defined for field: ${icon.field}`);
        break;
    }
  };

  return (
    <div className="flex items-center justify-center gap-5 px-6 py-0 -mt-10 relative z-20">
      {icons.map((icon) => (
        <ActionIconButton
          key={icon.field}
          label={icon.label}
          icon={icon.resolvedIcon}
          iconType={icon.iconType}
          iconColor={icon.iconColor}
          onClick={() => handleIconClick(icon)}
        />
      ))}
    </div>
  );
}
