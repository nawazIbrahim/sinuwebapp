'use client';

import { PersonalDashboardField } from '@/adapters/personal-dashboard.adapter';
import { PersonalFieldCard } from './PersonalFieldCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface PersonalFieldsSectionProps {
  fields: PersonalDashboardField[];
  onToggle: (id: string, enabled: boolean) => void;
  onValueChange: (id: string, value: string) => void;
  onReorder: (fields: PersonalDashboardField[]) => void;
  getFieldDescription: (field: string) => string;
}

export function PersonalFieldsSection({
  fields,
  onToggle,
  onValueChange,
  onReorder,
  getFieldDescription,
}: PersonalFieldsSectionProps) {
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
      <h3 className="text-base font-bold text-white mb-4 px-1">Personal Information Fields</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="personal-fields">
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
                      <PersonalFieldCard
                        label={field.label}
                        value={field.value}
                        description={getFieldDescription(field.field)}
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
