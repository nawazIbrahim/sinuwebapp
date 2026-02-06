import { ContactApiResponse, ContactField } from '@/types/contact';

/**
 * Contact Dashboard Field Type
 */
export interface ContactDashboardField {
  id: string;
  field: string;
  label: string;
  value: string;
  enabled: boolean;
  displayOrder: number;
  originalData: ContactField;
}

/**
 * Contact Dashboard Data
 */
export interface ContactDashboardData {
  accountID: number;
  group: string;
  fields: ContactDashboardField[];
}

/**
 * Contact Dashboard Adapter
 */
export class ContactDashboardAdapter {
  static toDashboard(apiResponse: ContactApiResponse): ContactDashboardData {
    const { accountID, group, fieldList } = apiResponse.data;

    const fields: ContactDashboardField[] = fieldList
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((field) => ({
        id: field.field,
        field: field.field,
        label: field.label,
        value: field.value,
        enabled: field.isVisible,
        displayOrder: field.displayOrder,
        originalData: field,
      }));

    return { accountID, group, fields };
  }

  static toApiUpdate(
    dashboardData: ContactDashboardData,
    updatedState: {
      fields: Record<string, { enabled: boolean; value: string }>;
      fieldsOrder: string[];
    }
  ): Partial<ContactApiResponse['data']> {
    const fieldsById = new Map(dashboardData.fields.map((field) => [field.id, field]));

    const updatedFields = updatedState.fieldsOrder
      .map((id, index) => {
        const field = fieldsById.get(id);
        if (!field) return null;
        
        const fieldState = updatedState.fields[id];
        
        return {
          ...field.originalData,
          value: fieldState?.value ?? field.value,
          isVisible: fieldState?.enabled ?? field.enabled,
          displayOrder: index + 1,
        };
      })
      .filter((f) => f !== null) as ContactField[];

    return { fieldList: updatedFields };
  }

  static getFieldDescription(field: string): string {
    const descriptions: Record<string, string> = {
      mobile: 'Your primary mobile number',
      mobileAlt: 'Alternate mobile number',
      phone: 'Your phone number',
      whatsapp: 'Your WhatsApp contact number',
      email: 'Your email address',
    };
    return descriptions[field] || 'Contact information';
  }
}
