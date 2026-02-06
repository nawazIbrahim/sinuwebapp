/**
 * Address Card Component
 * 
 * Displays address fields in a card layout with blue header
 */

import { UIAddressField } from '@/types/address';
import AddressFieldItem from './AddressFieldItem';

interface AddressCardProps {
  fields: UIAddressField[];
}

export default function AddressCard({ fields }: AddressCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#FFFBEB] overflow-hidden">
      {/* Card Header - Blue background with HOME ADDRESS */}
      <div
        className="px-6 py-4 flex items-center gap-2"
        style={{
          background: 'linear-gradient(90deg, #136DEC 0%, #136DEC 100%)',
          borderBottom: '1px solid #0C4697',
        }}
      >
        {/* Home Icon */}
        <span className="material-icons text-white" style={{ fontSize: '20px' }}>
          home
        </span>

        {/* Label */}
        <h3
          className="text-base font-bold text-white uppercase tracking-wider"
          style={{ letterSpacing: '0.4px' }}
        >
          Home Address
        </h3>
      </div>

      {/* Address Fields */}
      <div>
        {fields.map((field, index) => (
          <AddressFieldItem key={`${field.field}-${index}`} field={field} />
        ))}
      </div>
    </div>
  );
}
