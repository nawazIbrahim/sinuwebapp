import { UIProfileGroup } from '@/types/profile';
import { ProfileSectionCard } from './ProfileSectionCard';

interface ProfileSectionsGridProps {
  groups: UIProfileGroup[];
}

export function ProfileSectionsGrid({ groups }: ProfileSectionsGridProps) {
  // Check if last item is alone (odd number of groups)
  const isLastItemAlone = groups.length % 2 === 1;

  return (
    <div>
      {/* Grid (2 columns) - includes all profile modules including Emergency */}
      <div className="grid grid-cols-2 gap-5">
        {groups.map((group, index) => {
          const isLastItem = index === groups.length - 1;
          const shouldSpanFullWidth = isLastItemAlone && isLastItem;

          return (
            <div
              key={group.group}
              className={`h-full ${shouldSpanFullWidth ? 'col-span-2' : ''}`}
            >
              <ProfileSectionCard
                label={group.label}
                subtitle={group.subtitle}
                icon={group.icon}
                color={group.color}
                iconColor={group.iconColor}
                route={group.route}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
