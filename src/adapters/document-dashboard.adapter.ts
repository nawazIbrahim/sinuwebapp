import { DocumentApiResponse, DocumentField } from '@/types/document';

export interface DocumentDashboardField {
  id: string;
  field: string;
  label: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  enabled: boolean;
  displayOrder: number;
  originalData: DocumentField;
}

export interface DocumentDashboardData {
  accountID: number;
  group: string;
  fields: DocumentDashboardField[];
}

export class DocumentDashboardAdapter {
  static toDashboard(apiResponse: DocumentApiResponse): DocumentDashboardData {
    const { accountID, group, fieldList } = apiResponse.data;
    const fields: DocumentDashboardField[] = fieldList
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((field) => ({
        id: `document-${field.documentID}`,
        field: field.name,
        label: field.name,
        title: field.title,
        description: field.description,
        fileUrl: field.fileUrl,
        fileType: field.fileType,
        fileSize: field.fileSize,
        enabled: field.isVisible,
        displayOrder: field.displayOrder,
        originalData: field,
      }));
    return { accountID, group, fields };
  }

  static toApiUpdate(
    dashboardData: DocumentDashboardData,
    updatedState: {
      fields: Record<string, { enabled: boolean; title: string; description: string; fileUrl?: string; fileType?: string; fileSize?: string }>;
      fieldsOrder: string[];
    }
  ): Partial<DocumentApiResponse['data']> {
    const fieldsById = new Map(dashboardData.fields.map((field) => [field.id, field]));
    const updatedFields = updatedState.fieldsOrder
      .map((id, index) => {
        const field = fieldsById.get(id);
        if (!field) return null;
        const fieldState = updatedState.fields[id];
        return {
          ...field.originalData,
          title: fieldState?.title ?? field.title,
          description: fieldState?.description ?? field.description,
          fileUrl: fieldState?.fileUrl ?? field.fileUrl,
          fileType: fieldState?.fileType ?? field.fileType,
          fileSize: fieldState?.fileSize ?? field.fileSize,
          isVisible: fieldState?.enabled ?? field.enabled,
          displayOrder: index + 1,
        };
      })
      .filter((f) => f !== null) as DocumentField[];
    return { fieldList: updatedFields };
  }

  static getFieldDescription(fileType: string, fileSize: string): string {
    return `${fileType} document • ${fileSize}`;
  }

  static getFileTypeIcon(fileType: string): { icon: string; iconColor: string; iconBgColor: string } {
    const type = fileType.toUpperCase();
    
    const FILE_TYPE_CONFIG: Record<string, { icon: string; iconColor: string; iconBgColor: string }> = {
      PDF: { icon: 'picture_as_pdf', iconColor: '#DC2626', iconBgColor: '#FEE2E2' },
      DOC: { icon: 'description', iconColor: '#2563EB', iconBgColor: '#DBEAFE' },
      DOCX: { icon: 'description', iconColor: '#2563EB', iconBgColor: '#DBEAFE' },
      TXT: { icon: 'article', iconColor: '#64748B', iconBgColor: '#F1F5F9' },
      XLS: { icon: 'table_chart', iconColor: '#059669', iconBgColor: '#D1FAE5' },
      XLSX: { icon: 'table_chart', iconColor: '#059669', iconBgColor: '#D1FAE5' },
      CSV: { icon: 'grid_on', iconColor: '#059669', iconBgColor: '#D1FAE5' },
      JPG: { icon: 'image', iconColor: '#7C3AED', iconBgColor: '#EDE9FE' },
      JPEG: { icon: 'image', iconColor: '#7C3AED', iconBgColor: '#EDE9FE' },
      PNG: { icon: 'image', iconColor: '#7C3AED', iconBgColor: '#EDE9FE' },
      GIF: { icon: 'gif', iconColor: '#7C3AED', iconBgColor: '#EDE9FE' },
      PPT: { icon: 'slideshow', iconColor: '#DC2626', iconBgColor: '#FEE2E2' },
      PPTX: { icon: 'slideshow', iconColor: '#DC2626', iconBgColor: '#FEE2E2' },
      ZIP: { icon: 'folder_zip', iconColor: '#CA8A04', iconBgColor: '#FEF3C7' },
      RAR: { icon: 'folder_zip', iconColor: '#CA8A04', iconBgColor: '#FEF3C7' },
    };

    return FILE_TYPE_CONFIG[type] || { icon: 'insert_drive_file', iconColor: '#617289', iconBgColor: '#F3F4F6' };
  }
}
