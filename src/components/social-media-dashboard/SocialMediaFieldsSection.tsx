'use client';

import { SocialMediaDashboardField } from '@/adapters/socialMedia-dashboard.adapter';
import { SocialMediaFieldCard } from './SocialMediaFieldCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface SocialMediaFieldsSectionProps {
  fields: SocialMediaDashboardField[];
  onToggle: (id: string, enabled: boolean) => void;
  onValueChange: (id: string, value: string) => void;
  onReorder: (fields: SocialMediaDashboardField[]) => void;
  getFieldDescription: (field: string, category: string) => string;
}

export function SocialMediaFieldsSection({
  fields,
  onToggle,
  onValueChange,
  onReorder,
  getFieldDescription,
}: SocialMediaFieldsSectionProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.source.index === result.destination.index) {
      return;
    }

    const reorderedFields = Array.from(fields);
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);

    onReorder(reorderedFields);
  };

  return (
    <section className="w-full">
      <h3 className="text-base font-bold text-white mb-4 px-1">Social Media Profiles</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="social-media-fields">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3"
            >
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                      <SocialMediaFieldCard
                        label={field.label}
                        value={field.value}
                        description={getFieldDescription(field.field, field.category)}
                        enabled={field.enabled}
                        onToggle={(enabled) => onToggle(field.id, enabled)}
                        onValueChange={(value) => onValueChange(field.id, value)}
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
