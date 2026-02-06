/**
 * Emergency Card Component
 * 
 * Displays emergency contact fields in a card layout with red header
 */

import { UIEmergencyField } from '@/types/emergency';
import EmergencyFieldItem from './EmergencyFieldItem';

interface EmergencyCardProps {
  fields: UIEmergencyField[];
}

export default function EmergencyCard({ fields }: EmergencyCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#FFFBEB] overflow-hidden">
      {/* Card Header - Red background with EMERGENCY CONTACT */}
      <div
        className="px-6 py-4 flex items-center gap-2"
        style={{
          background: 'linear-gradient(90deg, #DC2626 0%, #DC2626 100%)',
          borderBottom: '1px solid #B91C1C',
        }}
      >
        {/* Emergency Icon */}
        <span className="material-icons text-white" style={{ fontSize: '20px' }}>
          local_hospital
        </span>

        {/* Label */}
        <h3
          className="text-base font-bold text-white uppercase tracking-wider"
          style={{ letterSpacing: '0.4px' }}
        >
          Emergency Contact
        </h3>
      </div>

      {/* Emergency Fields */}
      <div>
        {fields.map((field, index) => (
          <EmergencyFieldItem key={`${field.field}-${index}`} field={field} />
        ))}
      </div>
    </div>
  );
}
