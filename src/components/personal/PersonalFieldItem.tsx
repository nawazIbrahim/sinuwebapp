import { UIPersonalField } from '@/types/personal';

interface PersonalFieldItemProps {
  field: UIPersonalField;
}

export function PersonalFieldItem({ field }: PersonalFieldItemProps) {
  return (
    <div className="px-6 py-5 flex flex-col gap-1.5">
      {/* Field Label with Icon */}
      <div className="flex items-center gap-2">
        <span 
          className="material-symbols-outlined text-xl"
          style={{ color: field.iconColor }}
        >
          {field.icon}
        </span>
        <p className="text-sm font-medium text-gray-500">
          {field.label}
        </p>
      </div>

      {/* Field Value */}
      <div className="pl-7">
        {field.isMultiline ? (
          <p className="text-base text-gray-900 leading-relaxed whitespace-pre-wrap">
            {field.value}
          </p>
        ) : (
          <p className="text-base text-gray-900 font-semibold">
            {field.value}
          </p>
        )}
      </div>
    </div>
  );
}
