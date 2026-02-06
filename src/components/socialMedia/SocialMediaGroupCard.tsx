/**
 * Social Media Group Card Component
 * 
 * Displays a group of social media platforms with category header
 */

import { UISocialMediaGroup } from '@/types/socialMedia';
import SocialMediaItem from './SocialMediaItem';

interface SocialMediaGroupCardProps {
  group: UISocialMediaGroup;
}

export default function SocialMediaGroupCard({ group }: SocialMediaGroupCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#FFFBEB] overflow-hidden">
      {/* Card Header - Blue background with category label */}
      <div
        className="px-6 py-4 flex items-center gap-2"
        style={{
          background: `linear-gradient(90deg, ${group.categoryColor} 0%, ${group.categoryColor} 100%)`,
          borderBottom: '1px solid #0C4697',
        }}
      >
        {/* Category Icon */}
        <span className="material-icons text-white" style={{ fontSize: '20px' }}>
          {group.categoryIcon}
        </span>

        {/* Category Label */}
        <h3
          className="text-base font-bold text-white uppercase tracking-wider"
          style={{ letterSpacing: '0.4px' }}
        >
          {group.categoryLabel}
        </h3>
      </div>

      {/* Social Media Items */}
      <div>
        {group.items.map((item) => (
          <SocialMediaItem key={item.socialMediaID} item={item} />
        ))}
      </div>
    </div>
  );
}
