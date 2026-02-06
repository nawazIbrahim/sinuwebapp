import { ProfessionalApiResponse, ProfessionalField } from '@/types/professional';

export interface ProfessionalDashboardField {
  id: string;
  field: string;
  label: string;
  value: string;
  enabled: boolean;
  displayOrder: number;
  originalData: ProfessionalField;
}

export interface ProfessionalDashboardData {
  accountID: number;
  group: string;
  fields: ProfessionalDashboardField[];
}

export class ProfessionalDashboardAdapter {
  static toDashboard(apiResponse: ProfessionalApiResponse): ProfessionalDashboardData {
    const { accountID, group, fieldList } = apiResponse.data;
    const fields: ProfessionalDashboardField[] = fieldList
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
    dashboardData: ProfessionalDashboardData,
    updatedState: {
      fields: Record<string, { enabled: boolean; value: string }>;
      fieldsOrder: string[];
    }
  ): Partial<ProfessionalApiResponse['data']> {
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
      .filter((f) => f !== null) as ProfessionalField[];
    return { fieldList: updatedFields };
  }

  static getFieldDescription(field: string): string {
    const descriptions: Record<string, string> = {
      company: 'Your company name',
      designation: 'Your job title',
      professionSpecialization: 'Your area of specialization',
      serviceProviding: 'Services you provide',
      compAddress: 'Company address',
      compPlace: 'Company location',
      compEmail: 'Company email address',
      compMobile: 'Company mobile number',
      compPhone: 'Company phone number',
      compWhatsApp: 'Company WhatsApp number',
      compWebsite: 'Company website URL',
    };
    return descriptions[field] || 'Professional information';
  }
}
