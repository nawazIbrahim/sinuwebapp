import { AddressApiResponse, AddressField } from '@/types/address';

export interface AddressDashboardField {
  id: string;
  field: string;
  label: string;
  value: string;
  enabled: boolean;
  displayOrder: number;
  originalData: AddressField;
}

export interface AddressDashboardData {
  accountID: number;
  group: string;
  fields: AddressDashboardField[];
}

export class AddressDashboardAdapter {
  static toDashboard(apiResponse: AddressApiResponse): AddressDashboardData {
    const { accountID, group, fieldList } = apiResponse.data;
    const fields: AddressDashboardField[] = fieldList
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
    dashboardData: AddressDashboardData,
    updatedState: {
      fields: Record<string, { enabled: boolean; value: string }>;
      fieldsOrder: string[];
    }
  ): Partial<AddressApiResponse['data']> {
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
      .filter((f) => f !== null) as AddressField[];
    return { fieldList: updatedFields };
  }

  static getFieldDescription(field: string): string {
    const descriptions: Record<string, string> = {
      address: 'Your full address',
      place: 'Your location/city',
      LocationMapUrl: 'Google Maps location link',
    };
    return descriptions[field] || 'Address information';
  }
}
