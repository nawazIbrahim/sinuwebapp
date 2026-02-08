'use client';

import { DocumentDashboardField, DocumentDashboardAdapter } from '@/adapters/document-dashboard.adapter';
import { DocumentFieldCard } from './DocumentFieldCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface DocumentFieldsSectionProps {
  fields: DocumentDashboardField[];
  onToggle: (id: string, enabled: boolean) => void;
  onTitleChange: (id: string, title: string) => void;
  onDescriptionChange: (id: string, description: string) => void;
  onFileChange: (id: string, fileUrl: string, fileType: string, fileSize: string) => void;
  onReorder: (fields: DocumentDashboardField[]) => void;
  getFieldDescription: (fileType: string, fileSize: string) => string;
}

export function DocumentFieldsSection({
  fields,
  onToggle,
  onTitleChange,
  onDescriptionChange,
  onFileChange,
  onReorder,
  getFieldDescription,
}: DocumentFieldsSectionProps) {
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
      <h3 className="text-base font-bold text-white mb-4 px-1">Document Management</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="document-fields">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3"
            >
              {fields.map((field, index) => {
                const iconData = DocumentDashboardAdapter.getFileTypeIcon(field.fileType);
                return (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}>
                        <DocumentFieldCard
                          label={field.label}
                          title={field.title}
                          description={field.description}
                          fieldDescription={getFieldDescription(field.fileType, field.fileSize)}
                          fileType={field.fileType}
                          fileSize={field.fileSize}
                          fileUrl={field.fileUrl}
                          icon={iconData.icon}
                          iconColor={iconData.iconColor}
                          iconBgColor={iconData.iconBgColor}
                          enabled={field.enabled}
                          onToggle={(enabled) => onToggle(field.id, enabled)}
                          onTitleChange={(title) => onTitleChange(field.id, title)}
                          onDescriptionChange={(description) => onDescriptionChange(field.id, description)}
                          onFileChange={(fileUrl, fileType, fileSize) => onFileChange(field.id, fileUrl, fileType, fileSize)}
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
