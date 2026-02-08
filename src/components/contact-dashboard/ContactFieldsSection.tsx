'use client';

import { ContactDashboardField } from '@/adapters/contact-dashboard.adapter';
import { ContactFieldCard } from './ContactFieldCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface ContactFieldsSectionProps {
  fields: ContactDashboardField[];
  onToggle: (id: string, enabled: boolean) => void;
  onValueChange: (id: string, value: string) => void;
  onReorder: (fields: ContactDashboardField[]) => void;
  getFieldDescription: (field: string) => string;
}

export function ContactFieldsSection({
  fields,
  onToggle,
  onValueChange,
  onReorder,
  getFieldDescription,
}: ContactFieldsSectionProps) {
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
      <h3 className="text-base font-bold text-white mb-4 px-1">Contact Information Fields</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="contact-fields">
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
                      <ContactFieldCard
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
