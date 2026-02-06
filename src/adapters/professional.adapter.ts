import {
  ProfessionalApiResponse,
  AdaptedProfessionalData,
  UIProfessionalField,
} from '@/types/professional';

/**
 * Professional Field Configurations (from Figma)
 * Icon colors match Figma design specifications exactly
 */
const FIELD_CONFIG: Record<string, {
  icon: string;
  iconColor: string;
  isMultiline: boolean;
}> = {
  company: {
    icon: 'business',         // Building/company icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  designation: {
    icon: 'badge',            // Badge/ID icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  professionSpecialization: {
    icon: 'work',             // Work/briefcase icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  serviceProviding: {
    icon: 'handyman',         // Tools/service icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  compAddress: {
    icon: 'location_on',      // Location pin icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  compPlace: {
    icon: 'place',            // Place marker icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  compEmail: {
    icon: 'email',            // Email icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  compMobile: {
    icon: 'smartphone',       // Mobile phone icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  compPhone: {
    icon: 'call',             // Phone icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  compWhatsApp: {
    icon: 'chat',             // WhatsApp/chat icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  compWebsite: {
    icon: 'language',         // Globe/website icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
};

/**
 * Professional Data Adapter
 * 
 * Transforms raw API data into UI-ready format with Figma-specified styling
 */
export class ProfessionalAdapter {
  /**
   * Main adapter method
   */
  static adapt(apiResponse: ProfessionalApiResponse): AdaptedProfessionalData {
    return {
      accountID: apiResponse.data.accountID,
      group: apiResponse.data.group,
      fields: this.adaptFields(apiResponse.data.fieldList),
    };
  }

  /**
   * Adapt professional fields
   * - Filter visible fields
   * - Sort by displayOrder
   * - Add styling information from Figma
   */
  private static adaptFields(fields: ProfessionalApiResponse['data']['fieldList']): UIProfessionalField[] {
    return fields
      .filter((field) => field.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((field) => {
        const config = FIELD_CONFIG[field.field] || {
          icon: 'info',
          iconColor: '#617289',
          isMultiline: false,
        };

        return {
          id: `${field.field}-${field.displayOrder}`,
          field: field.field,
          label: field.label,
          value: field.value,
          icon: config.icon,
          iconColor: config.iconColor,
          isMultiline: config.isMultiline,
        };
      });
  }
}
