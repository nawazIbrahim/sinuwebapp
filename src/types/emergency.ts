/**
 * Emergency Module Types
 * 
 * Type definitions for the Emergency screen based on API structure
 */

export interface EmergencyField {
  field: string;
  label: string;
  value: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface EmergencyData {
  accountID: number;
  enableShareButton: boolean;
  group: string;
  fieldList: EmergencyField[];
}

export interface EmergencyApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: EmergencyData;
}

/**
 * UI-ready Emergency Field
 * Enhanced with visual metadata from adapter
 */
export interface UIEmergencyField {
  field: string;
  label: string;
  value: string;
  icon: string;           // Material Icon name
  iconColor: string;      // Hex color for icon
  iconBgColor: string;    // Hex color for icon background
  actionIcon?: string;    // Optional action icon (call, message)
  actionType?: 'call' | 'message' | 'none';  // Action type for the field
}

/**
 * Adapted Emergency Data (UI-Ready)
 */
export interface AdaptedEmergencyData {
  fields: UIEmergencyField[];
}
