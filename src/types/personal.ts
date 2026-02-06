// Personal API Response Types

export interface PersonalField {
  field: 'fullname' | 'profileIntro' | 'qualification' | 'profession' | 'gender' | 'languageSpeak' | 'bloodGroup' | 'biography' | 'dateOfBirth' | 'married' | string;
  label: string;
  value: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface PersonalApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: {
    accountID: number;
    group: string;
    fieldList: PersonalField[];
  };
}

// UI-Ready Types (After Adapter)

export interface UIPersonalField extends Omit<PersonalField, 'isVisible' | 'displayOrder'> {
  id: string;
  icon: string; // Material icon name from Figma
  iconColor: string; // Icon color from Figma
  isMultiline: boolean; // For bio field
}

export interface AdaptedPersonalData {
  accountID: number;
  group: string;
  fields: UIPersonalField[];
}
