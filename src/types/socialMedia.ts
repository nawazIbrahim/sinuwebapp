/**
 * Social Media Module Types
 * 
 * Type definitions for the Social Media screen based on API structure
 */

export interface SocialMediaField {
  socialMediaID: number;
  platform: string;        // linkedin, twitter, instagram, facebook, etc.
  platformName: string;    // Display name
  url: string;
  isVisible: boolean;
  displayOrder: number;
  category: 'professional' | 'personal' | 'community';
}

export interface SocialMediaGroup {
  category: 'professional' | 'personal' | 'community';
  categoryLabel: string;
  categoryIcon: string;
  items: SocialMediaField[];
}

export interface SocialMediaData {
  accountID: number;
  group: string;
  fieldList: SocialMediaField[];
}

export interface SocialMediaApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: SocialMediaData;
}

/**
 * UI-ready Social Media Field
 * Enhanced with visual metadata from adapter
 */
export interface UISocialMediaField {
  socialMediaID: number;
  platform: string;
  platformName: string;
  url: string;
  displayUrl: string;      // Formatted URL for display
  icon: string;            // Material Icon or platform icon
  iconColor: string;       // Hex color for icon
  iconBgColor: string;     // Hex color for icon background
  category: string;
}

/**
 * UI-ready Social Media Group
 */
export interface UISocialMediaGroup {
  category: string;
  categoryLabel: string;
  categoryIcon: string;
  categoryColor: string;
  items: UISocialMediaField[];
}

/**
 * Adapted Social Media Data (UI-Ready)
 */
export interface AdaptedSocialMediaData {
  groups: UISocialMediaGroup[];
}
