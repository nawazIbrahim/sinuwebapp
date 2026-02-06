/**
 * Emergency Adapter
 * 
 * Transforms raw API emergency data into UI-ready format
 * Maps fields to appropriate icons and colors
 */

import { EmergencyApiResponse, AdaptedEmergencyData, UIEmergencyField } from '@/types/emergency';

/**
 * Emergency Field Configurations
 * Maps field names to icons and colors
 */
const FIELD_CONFIG: Record<string, {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  actionIcon?: string;
  actionType?: 'call' | 'message' | 'none';
}> = {
  emerContactName: {
    icon: 'person',              // Person icon
    iconColor: '#DC2626',        // Red for emergency
    iconBgColor: '#FEE2E2',      // Light red
    actionType: 'none',
  },
  emerContactNo: {
    icon: 'phone',               // Phone icon
    iconColor: '#DC2626',        // Red for emergency
    iconBgColor: '#FEE2E2',      // Light red
    actionIcon: 'call',          // Call action
    actionType: 'call',
  },
  emerContactRelation: {
    icon: 'supervisor_account',  // Relationship icon
    iconColor: '#DC2626',        // Red for emergency
    iconBgColor: '#FEE2E2',      // Light red
    actionType: 'none',
  },
  emerContactEmail: {
    icon: 'email',               // Email icon
    iconColor: '#DC2626',        // Red for emergency
    iconBgColor: '#FEE2E2',      // Light red
    actionIcon: 'mail',
    actionType: 'message',
  },
  emerContactAddress: {
    icon: 'location_on',         // Location icon
    iconColor: '#DC2626',        // Red for emergency
    iconBgColor: '#FEE2E2',      // Light red
    actionType: 'none',
  },
};

/**
 * Default configuration for unknown fields
 */
const DEFAULT_CONFIG = {
  icon: 'local_hospital',        // Medical icon
  iconColor: '#DC2626',          // Red for emergency
  iconBgColor: '#FEE2E2',        // Light red
  actionType: 'none' as const,
};

export class EmergencyAdapter {
  /**
   * Transforms API response into UI-ready emergency data
   * 
   * @param apiResponse - Raw API response
   * @returns UI-ready emergency data with icons, colors, and actions
   */
  static toUI(apiResponse: EmergencyApiResponse): AdaptedEmergencyData {
    const fields = apiResponse.data.fieldList
      .filter(field => field.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(field => this.adaptField(field));

    return { fields };
  }

  /**
   * Adapts a single emergency field with visual metadata
   */
  private static adaptField(field: EmergencyApiResponse['data']['fieldList'][0]): UIEmergencyField {
    const config = FIELD_CONFIG[field.field] || DEFAULT_CONFIG;

    return {
      field: field.field,
      label: field.label,
      value: field.value,
      icon: config.icon,
      iconColor: config.iconColor,
      iconBgColor: config.iconBgColor,
      actionIcon: config.actionIcon,
      actionType: config.actionType,
    };
  }
}
