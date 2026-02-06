'use client';

import Image from 'next/image';

interface ActionIconButtonProps {
  label: string;
  icon: string;
  iconType: 'font' | 'image' | 'material';
  iconColor?: string;
  onClick?: () => void;
}

export function ActionIconButton({
  label,
  icon,
  iconType,
  iconColor = '#2563EB',
  onClick,
}: ActionIconButtonProps) {
  const renderIcon = () => {
    switch (iconType) {
      case 'image':
        return (
          <Image
            src={icon}
            alt={label}
            width={22}
            height={26}
            className="object-contain"
          />
        );
      case 'font':
        // FontAwesome or custom font icon
        return <i className={icon} />;
      case 'material':
      default:
        return <span className="material-icons text-2xl">{icon}</span>;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 group transition-transform hover:scale-105 touch-manipulation"
      aria-label={label}
    >
      {/* Icon container */}
      <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] transition-shadow group-hover:shadow-[0px_12px_32px_0px_rgba(0,0,0,0.16)] pointer-events-none">
        <div className="flex items-center justify-center pointer-events-none" style={{ color: iconColor }}>
          {renderIcon()}
        </div>
      </div>

      {/* Label */}
      <span className="text-[10px] font-bold leading-[15px] tracking-[0.25px] uppercase text-[#4b5563] text-center pointer-events-none">
        {label}
      </span>
    </button>
  );
}
