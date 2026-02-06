/**
 * Address Module Types
 * 
 * Type definitions for the Address screen based on API structure
 */

export interface AddressField {
  field: 'address' | 'place' | 'LocationMapUrl' | string;
  label: string;
  value: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface AddressData {
  accountID: number;
  group: string;
  fieldList: AddressField[];
}

export interface AddressApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: AddressData;
}

/**
 * UI-ready Address Field
 * Enhanced with visual metadata from adapter
 */
export interface UIAddressField {
  field: string;
  label: string;
  value: string;
  icon: string;           // Material Icon name
  iconColor: string;      // Hex color for icon
  iconBgColor: string;    // Hex color for icon background
  isMultiline: boolean;   // Whether value should display as multi-line
  isMapField?: boolean;   // Whether this is a map/location URL field
}

/**
 * Adapted Address Data (UI-Ready)
 */
export interface AdaptedAddressData {
  fields: UIAddressField[];
}
