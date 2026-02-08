import { UIContactField } from '@/types/contact';
import { ContactItem } from './ContactItem';

interface ContactGroupCardProps {
  contacts: UIContactField[];
}

export function ContactGroupCard({ contacts }: ContactGroupCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      {/* Group Header */}
      <div
        className="px-6 py-4 border-b flex items-center gap-3"
        style={{
          backgroundColor: '#136DEC',
          borderBottomColor: '#0c4697',
        }}
      >
        <span className="material-icons text-white text-2xl" style={{ fontSize: '28px' }} aria-hidden>
          contacts
        </span>
        <h2 className="text-white font-bold text-base tracking-wide uppercase">
          Direct contact
        </h2>
      </div>

      {/* Contact Items */}
      <div className="divide-y divide-purple-50">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
          />
        ))}
      </div>
    </div>
  );
}
