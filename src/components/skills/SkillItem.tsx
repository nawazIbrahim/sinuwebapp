/**
 * Skill Item Component
 * 
 * Displays a single skill with icon, name, description, duration, and level badge
 */

'use client';

import { UISkillField } from '@/types/skills';

interface SkillItemProps {
  skill: UISkillField;
}

export default function SkillItem({ skill }: SkillItemProps) {
  return (
    <div className="flex items-start gap-4 px-6 py-4 border-t border-[#FAF5FF]">
      {/* Icon Container */}
      <div className="flex-shrink-0 pt-1">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: skill.iconBgColor }}
        >
          <span
            className="material-icons"
            style={{
              fontSize: '24px',
              color: skill.iconColor,
            }}
          >
            {skill.icon}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-0.5">
        {/* Skill Name */}
        <div className="text-base font-semibold text-[#111418] leading-[22px]">
          {skill.name}
        </div>

        {/* Description */}
        <div className="mt-0.5">
          <div className="text-sm text-[#617289] leading-[21px] font-normal">
            {skill.description}
          </div>
        </div>

        {/* Duration and Level */}
        <div className="mt-3 flex items-center gap-3">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <span className="material-icons text-[#94A3B8]" style={{ fontSize: '16px' }}>
              schedule
            </span>
            <span className="text-xs text-[#617289] font-medium">
              {skill.duration}
            </span>
          </div>

          {/* Level Badge */}
          <div
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: `${skill.badgeColor}15`,
              color: skill.badgeColor,
            }}
          >
            {skill.level}
          </div>
        </div>
      </div>
    </div>
  );
}
