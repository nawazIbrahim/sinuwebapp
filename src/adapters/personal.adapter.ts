import {
  PersonalApiResponse,
  AdaptedPersonalData,
  UIPersonalField,
} from '@/types/personal';

/**
 * Personal Field Configurations (from Figma)
 * Icon colors match Figma design specifications exactly
 */
const FIELD_CONFIG: Record<string, {
  icon: string;
  iconColor: string;
  isMultiline: boolean;
}> = {
  fullname: {
    icon: 'person',           // Person icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  profileIntro: {
    icon: 'description',      // Document icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: true,        // Multi-line text
  },
  qualification: {
    icon: 'school',           // Education icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  profession: {
    icon: 'work',             // Work/briefcase icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  gender: {
    icon: 'wc',               // Gender icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  languageSpeak: {
    icon: 'language',         // Globe/language icon from Figma
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  bloodGroup: {
    icon: 'bloodtype',        // Blood type icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  biography: {
    icon: 'description',      // Document/description icon
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: true,        // Multi-line text
  },
  dateOfBirth: {
    icon: 'event',            // Calendar icon from Figma
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
  married: {
    icon: 'favorite',         // Heart icon for marital status
    iconColor: '#617289',     // Lynch (gray-blue) from Figma
    isMultiline: false,
  },
};

/**
 * Personal Data Adapter
 * 
 * Transforms raw API data into UI-ready format with Figma-specified styling
 */
export class PersonalAdapter {
  /**
   * Main adapter method
   */
  static adapt(apiResponse: PersonalApiResponse): AdaptedPersonalData {
    return {
      accountID: apiResponse.data.accountID,
      group: apiResponse.data.group,
      fields: this.adaptFields(apiResponse.data.fieldList),
    };
  }

  /**
   * Adapt personal fields
   * - Filter visible fields
   * - Sort by displayOrder
   * - Add styling information from Figma
   */
  private static adaptFields(fields: PersonalApiResponse['data']['fieldList']): UIPersonalField[] {
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
