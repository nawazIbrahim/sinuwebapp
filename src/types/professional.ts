// Professional API Response Types

export interface ProfessionalField {
  field: 'company' | 'designation' | 'professionSpecialization' | 'serviceProviding' | 'compAddress' | 'compPlace' | 'compEmail' | 'compMobile' | 'compPhone' | 'compWhatsApp' | 'compWebsite' | string;
  label: string;
  value: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface ProfessionalApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: {
    accountID: number;
    group: string;
    fieldList: ProfessionalField[];
  };
}

// UI-Ready Types (After Adapter)

export interface UIProfessionalField extends Omit<ProfessionalField, 'isVisible' | 'displayOrder'> {
  id: string;
  icon: string; // Material icon name from Figma
  iconColor: string; // Icon color from Figma
  isMultiline: boolean; // For long text fields
}

export interface AdaptedProfessionalData {
  accountID: number;
  group: string;
  fields: UIProfessionalField[];
}
