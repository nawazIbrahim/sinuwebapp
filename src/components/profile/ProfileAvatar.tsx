import Image from 'next/image';

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: number;
  showOnlineStatus?: boolean;
}

export function ProfileAvatar({
  src,
  alt,
  size = 288,
  showOnlineStatus = true,
}: ProfileAvatarProps) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* Blur backdrop */}
      <div className="absolute -inset-[7.2px] bg-white/30 rounded-full blur-[12px]" />
      
      {/* Main container with border and blur */}
      <div className="relative bg-white/20 backdrop-blur-[2px] border border-white/40 rounded-full p-[7px] shadow-[0px_0px_30px_0px_rgba(19,109,236,0.4)] w-full h-full">
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={`${size}px`}
            priority
          />
          {/* Inner shadow */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
        </div>
      </div>

      {/* Online status indicator */}
      {showOnlineStatus && (
        <div className="absolute bottom-6 right-6 bg-white border-2 border-black/0 rounded-full p-[6px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
          <div className="w-6 h-6 bg-[#22c55e] border-2 border-white rounded-full" />
        </div>
      )}
    </div>
  );
}
