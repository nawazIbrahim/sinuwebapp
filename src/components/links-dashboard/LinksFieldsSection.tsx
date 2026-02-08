'use client';

import { LinksDashboardField } from '@/adapters/links-dashboard.adapter';
import { LinkFieldCard } from './LinkFieldCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface LinksFieldsSectionProps {
  fields: LinksDashboardField[];
  onToggle: (id: string, enabled: boolean) => void;
  onLabelChange: (id: string, value: string) => void;
  onDescriptionChange: (id: string, value: string) => void;
  onLinkTextChange: (id: string, value: string) => void;
  onLinkUrlChange: (id: string, value: string) => void;
  onReorder: (fields: LinksDashboardField[]) => void;
}

export function LinksFieldsSection({
  fields,
  onToggle,
  onLabelChange,
  onDescriptionChange,
  onLinkTextChange,
  onLinkUrlChange,
  onReorder,
}: LinksFieldsSectionProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    const reorderedFields = Array.from(fields);
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);
    onReorder(reorderedFields);
  };

  return (
    <section className="w-full">
      <h3 className="text-base font-bold text-white mb-4 px-1">Links</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="links-fields">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                      <LinkFieldCard
                        label={field.label}
                        description={field.description}
                        linkText={field.linkText}
                        linkUrl={field.linkUrl}
                        enabled={field.enabled}
                        onToggle={(enabled) => onToggle(field.id, enabled)}
                        onLabelChange={(value) => onLabelChange(field.id, value)}
                        onDescriptionChange={(value) => onDescriptionChange(field.id, value)}
                        onLinkTextChange={(value) => onLinkTextChange(field.id, value)}
                        onLinkUrlChange={(value) => onLinkUrlChange(field.id, value)}
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
