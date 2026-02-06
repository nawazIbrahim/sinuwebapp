'use client';

interface ShareProfileButtonProps {
  shareLink: string;
  displayName: string;
}

export function ShareProfileButton({
  shareLink,
  displayName,
}: ShareProfileButtonProps) {
  const handleShare = async () => {
    // Placeholder for Web Share API
    // Future implementation:
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName}'s Profile`,
          text: `Check out ${displayName}'s professional profile`,
          url: shareLink,
        });
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareLink);
      alert('Profile link copied to clipboard!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full bg-gradient-to-r from-[#136dec] to-[#4b94f7] rounded-full shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] px-6 py-4 flex items-center justify-center gap-2 transition-all hover:shadow-[0px_12px_32px_0px_rgba(19,109,236,0.24)] active:scale-[0.98]"
    >
      <span className="text-white text-base font-bold leading-6 text-center">
        Share Profile
      </span>
      <span className="material-icons text-white text-xl">share</span>
    </button>
  );
}
