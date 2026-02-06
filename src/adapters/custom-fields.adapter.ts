import { CustomFieldsApiResponse, UICustomField, AdaptedCustomFieldsData } from '@/types/custom-fields';

/**
 * Adapter: Custom Fields API → UI-Ready Data
 * 
 * Responsibilities:
 * - Filter visible fields
 * - Sort by displayOrder
 * - Map icons and colors
 * - Format values for display
 */
export class CustomFieldsAdapter {
  static toUI(apiResponse: CustomFieldsApiResponse): AdaptedCustomFieldsData {
    const fields = apiResponse.data.fieldList
      .filter((field) => field.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((field) => this.mapField(field));

    return { fields };
  }

  private static mapField(field: CustomFieldsApiResponse['data']['fieldList'][0]): UICustomField {
    // Determine icon based on field name or type
    const icon = this.getIconForField(field.field);
    const iconColor = '#64748B'; // Slate color for custom fields
    
    // Check if value is long enough to be multiline
    const isMultiline = field.value.length > 50;

    return {
      id: field.field,
      field: field.field,
      label: field.label,
      value: field.value,
      icon,
      iconColor,
      isMultiline,
    };
  }

  /**
   * Map field names to appropriate Material Icons
   */
  private static getIconForField(fieldName: string): string {
    const fieldLower = fieldName.toLowerCase();
    
    // Try to match common patterns
    if (fieldLower.includes('note') || fieldLower.includes('comment')) {
      return 'note';
    }
    if (fieldLower.includes('link') || fieldLower.includes('url')) {
      return 'link';
    }
    if (fieldLower.includes('date') || fieldLower.includes('time')) {
      return 'calendar_today';
    }
    if (fieldLower.includes('number') || fieldLower.includes('count')) {
      return 'tag';
    }
    if (fieldLower.includes('text') || fieldLower.includes('description')) {
      return 'description';
    }
    
    // Default icon for custom fields
    return 'label';
  }
}
