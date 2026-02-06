'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProfileSectionCardProps {
  label: string;
  subtitle?: string;
  icon?: string;
  color?: string;
  iconColor?: string;
  route: string;
  isWide?: boolean;
}

export function ProfileSectionCard({
  label,
  subtitle,
  icon = 'folder',
  color = '#EFF6FF',
  iconColor = '#136dec',
  route,
  isWide = false,
}: ProfileSectionCardProps) {
  const router = useRouter();
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);

    // Navigate
    router.push(route);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        group relative overflow-hidden
        bg-white border border-white/50 rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)]
        p-5 flex items-center gap-3 w-full touch-manipulation
        transition-all duration-300 ease-out
        hover:shadow-[0px_12px_24px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:scale-[1.02]
        active:scale-[0.98] active:shadow-[0px_6px_16px_0px_rgba(0,0,0,0.06)]
        ${isWide ? 'flex-row min-h-[80px]' : 'flex-col justify-center min-h-[140px]'}
      `}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-blue-400/30 animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
        />
      ))}

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      </div>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 pointer-events-none transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
        style={{ backgroundColor: color }}
      >
        <span 
          className="material-icons text-[28px] pointer-events-none transition-transform duration-300 group-hover:rotate-12" 
          style={{ color: iconColor }}
        >
          {icon}
        </span>
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-1.5 pointer-events-none ${isWide ? 'flex-1 items-start' : 'items-center'}`}>
        <h3 className={`text-[15px] font-bold leading-[18px] text-[#0f172a] ${isWide ? 'text-left' : 'text-center'}`}>
          {label}
        </h3>
        {subtitle && (
          <p className={`text-[13px] leading-4 text-[#6b7280] ${isWide ? 'text-left' : 'text-center'}`}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Arrow indicator for wide cards */}
      {isWide && (
        <span className="material-icons text-[#94a3b8] text-xl shrink-0 pointer-events-none transition-transform duration-300 group-hover:translate-x-1">
          chevron_right
        </span>
      )}

      {/* Custom CSS for ripple animation */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          100% {
            width: 300px;
            height: 300px;
            margin-left: -150px;
            margin-top: -150px;
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
      `}</style>
    </button>
  );
}
