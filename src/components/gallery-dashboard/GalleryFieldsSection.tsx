'use client';

import { GalleryDashboardField } from '@/adapters/gallery-dashboard.adapter';
import { GalleryFieldCard } from './GalleryFieldCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface GalleryFieldsSectionProps {
  fields: GalleryDashboardField[];
  onToggle: (id: string, enabled: boolean) => void;
  onTitleChange: (id: string, title: string) => void;
  onDescriptionChange: (id: string, description: string) => void;
  onImageChange: (id: string, imageUrl: string, thumbnailUrl: string) => void;
  onReorder: (fields: GalleryDashboardField[]) => void;
  getFieldDescription: (fileType: string, fileSize: string) => string;
}

export function GalleryFieldsSection({
  fields,
  onToggle,
  onTitleChange,
  onDescriptionChange,
  onImageChange,
  onReorder,
  getFieldDescription,
}: GalleryFieldsSectionProps) {
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
      <h3 className="text-base font-bold text-white mb-4 px-1">Image Gallery Management</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery-fields">
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
                      <GalleryFieldCard
                        label={field.label}
                        title={field.title}
                        description={field.description}
                        fieldDescription={getFieldDescription(field.fileType, field.fileSize)}
                        thumbnailUrl={field.thumbnailUrl}
                        imageUrl={field.imageUrl}
                        enabled={field.enabled}
                        onToggle={(enabled) => onToggle(field.id, enabled)}
                        onTitleChange={(title) => onTitleChange(field.id, title)}
                        onDescriptionChange={(description) => onDescriptionChange(field.id, description)}
                        onImageChange={(imageUrl, thumbnailUrl) => onImageChange(field.id, imageUrl, thumbnailUrl)}
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
