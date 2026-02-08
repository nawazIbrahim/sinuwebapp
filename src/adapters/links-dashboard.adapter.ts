import { LinkApiResponse, LinkField } from '@/types/link';

export interface LinksDashboardField {
  id: string;
  field: string;
  label: string;
  description: string;
  linkText: string;
  linkUrl: string;
  enabled: boolean;
  displayOrder: number;
  originalData: LinkField;
}

export interface LinksDashboardData {
  accountID: number;
  group: string;
  fields: LinksDashboardField[];
}

export class LinksDashboardAdapter {
  static toDashboard(apiResponse: LinkApiResponse): LinksDashboardData {
    const { accountID, group, fieldList } = apiResponse.data;
    const fields: LinksDashboardField[] = fieldList
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((field) => ({
        id: `link-${field.linksID}`,
        field: field.name,
        label: field.name,
        description: field.description,
        linkText: field.linkText,
        linkUrl: field.linkUrl,
        enabled: field.isVisible,
        displayOrder: field.displayOrder,
        originalData: field,
      }));
    return { accountID, group, fields };
  }

  static toApiUpdate(
    dashboardData: LinksDashboardData,
    updatedState: {
      fields: Record<string, { enabled: boolean; label?: string; description?: string; linkText?: string; linkUrl?: string }>;
      fieldsOrder: string[];
    }
  ): Partial<LinkApiResponse['data']> {
    const fieldsById = new Map(dashboardData.fields.map((field) => [field.id, field]));
    const updatedFields = updatedState.fieldsOrder
      .map((id, index) => {
        const field = fieldsById.get(id);
        if (!field) return null;
        const fieldState = updatedState.fields[id];
        return {
          ...field.originalData,
          name: fieldState?.label ?? field.label,
          description: fieldState?.description ?? field.description,
          linkText: fieldState?.linkText ?? field.linkText,
          linkUrl: fieldState?.linkUrl ?? field.linkUrl,
          isVisible: fieldState?.enabled ?? field.enabled,
          displayOrder: index + 1,
        };
      })
      .filter((f) => f !== null) as LinkField[];
    return { fieldList: updatedFields };
  }
}
