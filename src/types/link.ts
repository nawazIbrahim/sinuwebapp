/**
 * Link Module Types
 * 
 * Type definitions for the Link screen based on API structure
 */

export interface LinkField {
  linksID: number;
  name: string;
  description: string;
  linkText: string;
  linkUrl: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface LinkData {
  accountID: number;
  group: string;
  fieldList: LinkField[];
}

export interface LinkApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: LinkData;
}

/**
 * UI-ready Link Field
 * Enhanced with visual metadata from adapter
 */
export interface UILinkField {
  linksID: number;
  name: string;
  description: string;
  linkText: string;       // Custom button text
  linkUrl: string;        // Full URL
  icon: string;           // Material Icon name or custom icon
  iconColor: string;      // Hex color for icon
  iconBgColor: string;    // Hex color for icon background
  displayText: string;    // Formatted display text for the link (cleaned URL)
}

/**
 * Adapted Link Data (UI-Ready)
 */
export interface AdaptedLinkData {
  links: UILinkField[];
}
