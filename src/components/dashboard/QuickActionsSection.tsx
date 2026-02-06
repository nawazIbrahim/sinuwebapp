'use client';

import { DashboardQuickAction } from '@/adapters/dashboard.adapter';
import { QuickActionToggle } from './QuickActionToggle';

interface QuickActionsSectionProps {
  actions: DashboardQuickAction[];
  onToggle: (id: string, enabled: boolean) => void;
}

export function QuickActionsSection({ actions, onToggle }: QuickActionsSectionProps) {
  return (
    <section className="w-full">
      <h3 className="text-base font-bold text-gray-900 mb-4 px-1">Quick Actions</h3>
      <div className="bg-white rounded-[20px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.04)] overflow-hidden">
        {actions.map((action) => (
          <QuickActionToggle
            key={action.id}
            label={action.label}
            icon={action.icon}
            iconBgColor={action.iconBgColor}
            iconColor={action.iconColor}
            enabled={action.enabled}
            onChange={(enabled) => onToggle(action.id, enabled)}
          />
        ))}
      </div>
    </section>
  );
}
