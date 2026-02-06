'use client';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md';
  variant?: 'default' | 'emergency';
}

export function ToggleSwitch({
  checked,
  onChange,
  size = 'md',
  variant = 'default',
}: ToggleSwitchProps) {
  const isSmall = size === 'sm';
  const isEmergency = variant === 'emergency';

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`
          ${isSmall ? 'w-10 h-5' : 'w-11 h-6'}
          ${isEmergency ? 'bg-red-300' : 'bg-gray-300'}
          rounded-full peer
          peer-focus:outline-none
          ${isSmall ? 'peer-checked:after:translate-x-5' : 'peer-checked:after:translate-x-full'}
          rtl:peer-checked:after:-translate-x-full
          peer-checked:after:border-white
          after:content-['']
          after:absolute
          after:top-[2px]
          after:start-[2px]
          after:bg-white
          after:border-gray-300
          after:border
          after:rounded-full
          ${isSmall ? 'after:h-4 after:w-4' : 'after:h-5 after:w-5'}
          after:transition-all
          ${isEmergency ? 'peer-checked:bg-red-600' : 'peer-checked:bg-green-500'}
        `}
      />
    </label>
  );
}
