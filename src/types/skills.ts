/**
 * Skills Module Types
 * 
 * Type definitions for the Skills screen based on API structure
 */

export interface SkillField {
  skillSetID: number;
  name: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | string;
  isVisible: boolean;
  displayOrder: number;
}

export interface SkillsData {
  accountID: number;
  enableShareButton: boolean;
  group: string;
  fieldList: SkillField[];
}

export interface SkillsApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: SkillsData;
}

/**
 * UI-ready Skill Field
 * Enhanced with visual metadata from adapter
 */
export interface UISkillField {
  skillSetID: number;
  name: string;
  description: string;
  duration: string;
  level: string;
  icon: string;           // Material Icon based on level
  iconColor: string;      // Hex color for icon
  iconBgColor: string;    // Hex color for icon background
  badgeColor: string;     // Color for level badge
}

/**
 * Adapted Skills Data (UI-Ready)
 */
export interface AdaptedSkillsData {
  skills: UISkillField[];
}
