// Contact API Response Types (New Structure)

export interface ContactField {
  field: 'mobile' | 'mobileAlt' | 'phone' | 'whatsapp' | 'email' | 'fax' | string;
  label: string;
  value: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface ContactApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: {
    accountID: number;
    enableShareButton: boolean;
    group: string;
    fieldList: ContactField[];
  };
}

// UI-Ready Types (After Adapter)

export interface UIContactField extends Omit<ContactField, 'isVisible' | 'displayOrder'> {
  id: string;
  icon: string; // Material icon name
  iconColor: string; // Hex color from Figma
  iconBgColor: string; // Hex color from Figma
  actionIcon: string; // Action button icon
  actionButtonColor: string; // Action button background color
  isPrimary: boolean; // Is this the primary contact (first mobile)
  canCall: boolean;
  canMessage: boolean;
}

export interface AdaptedContactData {
  accountID: number;
  enableShareButton: boolean;
  group: string;
  contacts: UIContactField[];
}
