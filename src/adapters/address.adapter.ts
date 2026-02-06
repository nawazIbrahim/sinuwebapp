/**
 * Address Adapter
 * 
 * Transforms raw API address data into UI-ready format
 * Maps field types to appropriate icons, colors, and display properties
 */

import { AddressApiResponse, AdaptedAddressData, UIAddressField } from '@/types/address';

/**
 * Address Field Configurations (from Figma)
 * Icon colors match Figma design specifications exactly
 * All address fields use home icon with pink background
 */
const FIELD_CONFIG: Record<string, {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  isMultiline: boolean;
  isMapField?: boolean;
}> = {
  address: {
    icon: 'home',              // Home icon
    iconColor: '#617289',      // Lynch (gray-blue) from Figma
    iconBgColor: '#FFE4E6',    // Light pink background from Figma
    isMultiline: true,         // Address can be long, use multi-line
    isMapField: false,
  },
  place: {
    icon: 'home',              // Home icon
    iconColor: '#617289',      // Lynch (gray-blue) from Figma
    iconBgColor: '#FFE4E6',    // Light pink background from Figma
    isMultiline: false,
    isMapField: false,
  },
  LocationMapUrl: {
    icon: 'home',              // Home icon (shown in label)
    iconColor: '#617289',      // Lynch (gray-blue) from Figma
    iconBgColor: '#FFE4E6',    // Light pink background from Figma
    isMultiline: false,
    isMapField: true,          // Special rendering for map field
  },
};

/**
 * Default configuration for unknown field types
 */
const DEFAULT_CONFIG = {
  icon: 'home',                // Default to home icon
  iconColor: '#617289',        // Lynch (gray-blue) from Figma
  iconBgColor: '#FFE4E6',      // Light pink background from Figma
  isMultiline: false,
};

export class AddressAdapter {
  /**
   * Transforms API response into UI-ready address data
   * 
   * @param apiResponse - Raw API response
   * @returns UI-ready address data with icons, colors, and display properties
   */
  static toUI(apiResponse: AddressApiResponse): AdaptedAddressData {
    const fields = apiResponse.data.fieldList
      .filter(field => field.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(field => this.adaptField(field));

    return { fields };
  }

  /**
   * Adapts a single address field with visual metadata
   */
  private static adaptField(field: AddressApiResponse['data']['fieldList'][0]): UIAddressField {
    const config = FIELD_CONFIG[field.field] || DEFAULT_CONFIG;

    return {
      field: field.field,
      label: field.label,
      value: field.value,
      icon: config.icon,
      iconColor: config.iconColor,
      iconBgColor: config.iconBgColor,
      isMultiline: config.isMultiline,
      isMapField: config.isMapField || false,
    };
  }
}
