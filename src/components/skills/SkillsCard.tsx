/**
 * Skills Card Component
 * 
 * Displays skills in a card layout with blue header
 */

import { UISkillField } from '@/types/skills';
import SkillItem from './SkillItem';

interface SkillsCardProps {
  skills: UISkillField[];
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#FFFBEB] overflow-hidden">
      {/* Card Header - Blue background with SKILLS */}
      <div
        className="px-6 py-4 flex items-center gap-2"
        style={{
          background: 'linear-gradient(90deg, #136DEC 0%, #136DEC 100%)',
          borderBottom: '1px solid #0C4697',
        }}
      >
        {/* Skills Icon */}
        <span className="material-icons text-white" style={{ fontSize: '20px' }}>
          psychology
        </span>

        {/* Label */}
        <h3
          className="text-base font-bold text-white uppercase tracking-wider"
          style={{ letterSpacing: '0.4px' }}
        >
          Skills
        </h3>
      </div>

      {/* Skill Items */}
      <div>
        {skills.map((skill) => (
          <SkillItem key={skill.skillSetID} skill={skill} />
        ))}
      </div>
    </div>
  );
}
