import { PersonalApiResponse, PersonalFieldItem } from '@/types/personal';

/**
 * Personal Dashboard Field Type
 */
export interface PersonalDashboardField {
  id: string;
  field: string;
  label: string;
  value: string;
  enabled: boolean;
  displayOrder: number;
  originalData: PersonalFieldItem;
}

/**
 * Personal Dashboard Data
 */
export interface PersonalDashboardData {
  accountID: number;
  group: string;
  fields: PersonalDashboardField[];
}

/**
 * Personal Dashboard Adapter
 * Transforms API data for dashboard editing
 */
export class PersonalDashboardAdapter {
  /**
   * Convert API response to dashboard format
   */
  static toDashboard(apiResponse: PersonalApiResponse): PersonalDashboardData {
    const { accountID, group, fieldList } = apiResponse.data;

    // Map fields to dashboard format
    const fields: PersonalDashboardField[] = fieldList
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

    return {
      accountID,
      group,
      fields,
    };
  }

  /**
   * Convert dashboard state back to API format for saving
   */
  static toApiUpdate(
    dashboardData: PersonalDashboardData,
    updatedState: {
      fields: Record<string, { enabled: boolean; value: string }>;
      fieldsOrder: string[];
    }
  ): Partial<PersonalApiResponse['data']> {
    console.log('=== CONVERTING DASHBOARD STATE TO API FORMAT ===');
    console.log('Dashboard data:', dashboardData);
    console.log('Updated state:', updatedState);

    // Map fields by their ID for easy lookup
    const fieldsById = new Map(
      dashboardData.fields.map((field) => [field.id, field])
    );

    // Reorder fields based on the new order and apply updates
    const updatedFields = updatedState.fieldsOrder
      .map((id, index) => {
        const field = fieldsById.get(id);
        if (!field) return null;
        
        const fieldState = updatedState.fields[id];
        
        return {
          ...field.originalData,
          value: fieldState?.value ?? field.value,
          isVisible: fieldState?.enabled ?? field.enabled,
          displayOrder: index + 1, // Update display order (1-based)
        };
      })
      .filter((f) => f !== null) as PersonalFieldItem[];

    console.log('Updated fields:', updatedFields);

    return {
      fieldList: updatedFields,
    };
  }

  /**
   * Get description for field based on field name
   */
  static getFieldDescription(field: string): string {
    const descriptions: Record<string, string> = {
      fullname: 'Your full legal name',
      profileIntro: 'Brief introduction about yourself',
      qualification: 'Your educational qualification',
      profession: 'Your current profession or occupation',
      gender: 'Your gender identity',
      languageSpeak: 'Languages you can speak',
      bloodGroup: 'Your blood group',
      biography: 'Your detailed biography',
      dateOfBirth: 'Your date of birth',
      married: 'Your marital status',
    };
    return descriptions[field] || 'Personal information';
  }
}
