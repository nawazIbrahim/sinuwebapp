// Custom Fields API Response Types

export interface CustomField {
  field: string;
  label: string;
  value: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface CustomFieldsApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: {
    accountID: number;
    group: string;
    fieldList: CustomField[];
  };
}

// UI-Ready Types (After Adapter)

export interface UICustomField extends Omit<CustomField, 'isVisible' | 'displayOrder'> {
  id: string;
  icon: string; // Material icon name
  iconColor: string; // Icon color
  isMultiline: boolean; // For long text fields
}

export interface AdaptedCustomFieldsData {
  fields: UICustomField[];
}
