import {
  ContactApiResponse,
  AdaptedContactData,
  UIContactField,
} from '@/types/contact';

/**
 * Contact Field Configurations (from Figma)
 * Icon colors and backgrounds match Figma design specifications exactly
 */
const FIELD_CONFIG: Record<string, {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  actionIcon: string;
}> = {
  mobile: {
    icon: 'smartphone',
    iconColor: '#DC2626', // Red from Figma
    iconBgColor: '#FEF2F2', // Alice Blue (light pink/red) from Figma
    actionIcon: 'phone',
  },
  mobileAlt: {
    icon: 'smartphone',
    iconColor: '#DC2626', // Red from Figma
    iconBgColor: '#FEF2F2', // Alice Blue (light pink/red) from Figma
    actionIcon: 'phone',
  },
  phone: {
    icon: 'smartphone',
    iconColor: '#DC2626', // Red from Figma
    iconBgColor: '#FEF2F2', // Alice Blue (light pink/red) from Figma
    actionIcon: 'phone',
  },
  whatsapp: {
    icon: 'chat',
    iconColor: '#16A34A', // Salem Green from Figma
    iconBgColor: '#DBEAFE', // Pattens Blue (light blue) from Figma
    actionIcon: 'send',
  },
  email: {
    icon: 'email',
    iconColor: '#DC2626',
    iconBgColor: '#FEF2F2',
    actionIcon: 'send',
  },
  fax: {
    icon: 'print',
    iconColor: '#64748B',
    iconBgColor: '#F1F5F9',
    actionIcon: 'call',
  },
};

/**
 * Contact Data Adapter
 * 
 * Transforms raw API data into UI-ready format with Figma-specified styling
 */
export class ContactAdapter {
  /**
   * Main adapter method
   */
  static adapt(apiResponse: ContactApiResponse): AdaptedContactData {
    return {
      accountID: apiResponse.data.accountID,
      enableShareButton: apiResponse.data.enableShareButton,
      group: apiResponse.data.group,
      contacts: this.adaptContacts(apiResponse.data.fieldList),
    };
  }

  /**
   * Adapt contact fields
   * - Filter visible contacts
   * - Sort by displayOrder
   * - Add styling information from Figma
   */
  private static adaptContacts(fields: ContactApiResponse['data']['fieldList']): UIContactField[] {
    let isFirstMobile = true;

    return fields
      .filter((field) => field.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((field) => {
        const config = FIELD_CONFIG[field.field] || FIELD_CONFIG.mobile;
        
        // First mobile gets primary styling (blue action button)
        const isPrimary = field.field === 'mobile' && isFirstMobile;
        if (field.field === 'mobile') isFirstMobile = false;

        // Primary gets blue action button, others get light pink
        const actionButtonColor = isPrimary ? '#136DEC' : '#FFE4E6';

        return {
          id: `${field.field}-${field.displayOrder}`,
          field: field.field,
          label: field.label,
          value: field.value,
          icon: config.icon,
          iconColor: config.iconColor,
          iconBgColor: config.iconBgColor,
          actionIcon: config.actionIcon,
          actionButtonColor,
          isPrimary,
          canCall: this.canCall(field.field),
          canMessage: this.canMessage(field.field),
        };
      });
  }

  /**
   * Determine if contact can be called
   */
  private static canCall(fieldType: string): boolean {
    return ['mobile', 'mobileAlt', 'phone'].includes(fieldType);
  }

  /**
   * Determine if contact can be messaged
   */
  private static canMessage(fieldType: string): boolean {
    return ['mobile', 'mobileAlt', 'whatsapp', 'email'].includes(fieldType);
  }
}
