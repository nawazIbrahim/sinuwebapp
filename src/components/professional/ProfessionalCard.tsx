import { UIProfessionalField } from '@/types/professional';
import { ProfessionalFieldItem } from './ProfessionalFieldItem';

interface ProfessionalCardProps {
  fields: UIProfessionalField[];
}

export function ProfessionalCard({ fields }: ProfessionalCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      {/* Header */}
      <div
        className="px-6 py-4 border-b flex items-center gap-2"
        style={{ 
          backgroundColor: '#136DEC', // Blue Ribbon from Figma
          borderBottomColor: '#0c4697', // Darker blue from Figma
        }}
      >
        <span className="material-symbols-outlined text-white text-2xl">
          work
        </span>
        <h2 className="text-white font-bold text-base tracking-wide uppercase">
          PROFESSIONAL
        </h2>
      </div>

      {/* Fields */}
      <div className="divide-y divide-purple-50">
        {fields.map((field) => (
          <ProfessionalFieldItem key={field.id} field={field} />
        ))}
      </div>
    </div>
  );
}
