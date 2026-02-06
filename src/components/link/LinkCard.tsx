/**
 * Link Card Component
 * 
 * Displays links in a card layout with blue header
 */

import { UILinkField } from '@/types/link';
import LinkItem from './LinkItem';

interface LinkCardProps {
  links: UILinkField[];
}

export default function LinkCard({ links }: LinkCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#FFFBEB] overflow-hidden">
      {/* Card Header - Blue background with LINKS */}
      <div
        className="px-6 py-4 flex items-center gap-2"
        style={{
          background: 'linear-gradient(90deg, #136DEC 0%, #136DEC 100%)',
          borderBottom: '1px solid #0C4697',
        }}
      >
        {/* Link Icon */}
        <span className="material-icons text-white" style={{ fontSize: '20px' }}>
          link
        </span>

        {/* Label */}
        <h3
          className="text-base font-bold text-white uppercase tracking-wider"
          style={{ letterSpacing: '0.4px' }}
        >
          Links
        </h3>
      </div>

      {/* Link Items */}
      <div>
        {links.map((link) => (
          <LinkItem key={link.linksID} link={link} />
        ))}
      </div>
    </div>
  );
}
