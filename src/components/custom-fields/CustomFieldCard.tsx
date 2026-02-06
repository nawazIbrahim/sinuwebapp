import { UICustomField } from '@/types/custom-fields';

interface CustomFieldCardProps {
  field: UICustomField;
}

export function CustomFieldCard({ field }: CustomFieldCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${field.iconColor}15` }}
        >
          <span
            className="material-symbols-outlined text-2xl pointer-events-none"
            style={{ color: field.iconColor }}
          >
            {field.icon}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-500 mb-1">{field.label}</h3>
          <p
            className={`text-base text-gray-900 ${
              field.isMultiline ? 'whitespace-pre-wrap' : 'truncate'
            }`}
          >
            {field.value}
          </p>
        </div>
      </div>
    </div>
  );
}
