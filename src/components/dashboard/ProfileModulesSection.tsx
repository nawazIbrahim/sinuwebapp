'use client';

import { DashboardModule } from '@/adapters/dashboard.adapter';
import { ProfileModuleCard } from './ProfileModuleCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface ProfileModulesSectionProps {
  modules: DashboardModule[];
  onToggle: (id: string, enabled: boolean) => void;
  onSettings: (id: string) => void;
  onReorder: (modules: DashboardModule[]) => void;
}

export function ProfileModulesSection({
  modules,
  onToggle,
  onSettings,
  onReorder,
}: ProfileModulesSectionProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.source.index === result.destination.index) {
      return;
    }

    // Reorder modules array
    const reorderedModules = Array.from(modules);
    const [removed] = reorderedModules.splice(result.source.index, 1);
    reorderedModules.splice(result.destination.index, 0, removed);

    onReorder(reorderedModules);
  };

  // Check if last item is alone (odd number of modules)
  const isLastItemAlone = modules.length % 2 === 1;

  return (
    <section className="w-full">
      <h3 className="text-base font-bold text-gray-900 mb-4 px-1">Profile Modules</h3>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="profile-modules">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-2 gap-4"
            >
              {modules.map((module, index) => {
                const isLastItem = index === modules.length - 1;
                const shouldSpanFullWidth = isLastItemAlone && isLastItem;

                return (
                  <Draggable key={module.id} draggableId={module.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        className={shouldSpanFullWidth ? 'col-span-2' : ''}
                      >
                        <ProfileModuleCard
                          label={module.label}
                          description={module.description}
                          icon={module.icon}
                          iconColor={module.iconColor}
                          enabled={module.enabled}
                          onToggle={(enabled) => onToggle(module.id, enabled)}
                          onSettings={() => onSettings(module.id)}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
