import { GalleryApiResponse, GalleryImage } from '@/types/gallery';

export interface GalleryDashboardField {
  id: string;
  field: string;
  label: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  fileType: string;
  fileSize: string;
  enabled: boolean;
  displayOrder: number;
  originalData: GalleryImage;
}

export interface GalleryDashboardData {
  accountID: number;
  group: string;
  fields: GalleryDashboardField[];
}

export class GalleryDashboardAdapter {
  static toDashboard(apiResponse: GalleryApiResponse): GalleryDashboardData {
    const { accountID, group, fieldList } = apiResponse.data;
    const fields: GalleryDashboardField[] = fieldList
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((field) => ({
        id: `gallery-${field.galleryID}`,
        field: field.title,
        label: field.title,
        title: field.title,
        description: field.description,
        imageUrl: field.imageUrl,
        thumbnailUrl: field.thumbnailUrl,
        fileType: field.fileType,
        fileSize: field.fileSize,
        enabled: field.isVisible,
        displayOrder: field.displayOrder,
        originalData: field,
      }));
    return { accountID, group, fields };
  }

  static toApiUpdate(
    dashboardData: GalleryDashboardData,
    updatedState: {
      fields: Record<string, { enabled: boolean; title: string; description: string; imageUrl?: string; thumbnailUrl?: string }>;
      fieldsOrder: string[];
    }
  ): Partial<GalleryApiResponse['data']> {
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
          imageUrl: fieldState?.imageUrl ?? field.imageUrl,
          thumbnailUrl: fieldState?.thumbnailUrl ?? field.thumbnailUrl,
          isVisible: fieldState?.enabled ?? field.enabled,
          displayOrder: index + 1,
        };
      })
      .filter((f) => f !== null) as GalleryImage[];
    return { fieldList: updatedFields };
  }

  static getFieldDescription(fileType: string, fileSize: string): string {
    return `${fileType} image • ${fileSize}`;
  }
}
