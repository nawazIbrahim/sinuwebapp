import { CustomFieldsApiResponse } from '@/types/custom-fields';

/**
 * Mock API Service for Custom Fields
 */
export class CustomFieldsApiService {
  private static mockData: CustomFieldsApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      accountID: 25,
      group: 'customFields',
      fieldList: [
        {
          field: 'customField1',
          label: 'Custom Field 1',
          value: 'Custom Value 1',
          isVisible: true,
          displayOrder: 1,
        },
        {
          field: 'customField2',
          label: 'Custom Field 2',
          value: 'Custom Value 2',
          isVisible: true,
          displayOrder: 2,
        },
        {
          field: 'customField3',
          label: 'Custom Field 3',
          value: 'This is a longer custom field value that demonstrates multi-line text display capability.',
          isVisible: true,
          displayOrder: 3,
        },
      ],
    },
  };

  static async getCustomFields(): Promise<CustomFieldsApiResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.mockData;
  }

  static async updateCustomFields(updates: Partial<CustomFieldsApiResponse['data']>): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    if (updates.fieldList) {
      this.mockData.data.fieldList = updates.fieldList;
    }
  }
}
