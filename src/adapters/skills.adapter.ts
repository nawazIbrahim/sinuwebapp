/**
 * Skills Adapter
 * 
 * Transforms raw API skills data into UI-ready format
 * Maps skill levels to appropriate icons and colors
 */

import { SkillsApiResponse, AdaptedSkillsData, UISkillField } from '@/types/skills';

/**
 * Skill Level Configurations
 * Each level has specific icon and color scheme
 */
const LEVEL_CONFIG: Record<string, {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  badgeColor: string;
}> = {
  'Beginner': {
    icon: 'star_outline',        // Outline star for beginner
    iconColor: '#64748B',         // Slate gray
    iconBgColor: '#F1F5F9',       // Light slate
    badgeColor: '#64748B',        // Slate gray
  },
  'Intermediate': {
    icon: 'star_half',            // Half star for intermediate
    iconColor: '#F59E0B',         // Amber/Orange
    iconBgColor: '#FEF3C7',       // Light amber
    badgeColor: '#F59E0B',        // Amber/Orange
  },
  'Advanced': {
    icon: 'star',                 // Full star for advanced
    iconColor: '#3B82F6',         // Blue
    iconBgColor: '#DBEAFE',       // Light blue
    badgeColor: '#3B82F6',        // Blue
  },
  'Expert': {
    icon: 'workspace_premium',    // Premium badge for expert
    iconColor: '#8B5CF6',         // Purple
    iconBgColor: '#EDE9FE',       // Light purple
    badgeColor: '#8B5CF6',        // Purple
  },
};

/**
 * Default configuration for unknown levels
 */
const DEFAULT_CONFIG = {
  icon: 'psychology',             // Brain/knowledge icon
  iconColor: '#617289',           // Gray-blue
  iconBgColor: '#F3F4F6',         // Light gray
  badgeColor: '#617289',          // Gray-blue
};

export class SkillsAdapter {
  /**
   * Transforms API response into UI-ready skills data
   * 
   * @param apiResponse - Raw API response
   * @returns UI-ready skills data with icons, colors, and display properties
   */
  static toUI(apiResponse: SkillsApiResponse): AdaptedSkillsData {
    const skills = apiResponse.data.fieldList
      .filter(field => field.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(field => this.adaptField(field));

    return { skills };
  }

  /**
   * Adapts a single skill field with visual metadata
   */
  private static adaptField(field: SkillsApiResponse['data']['fieldList'][0]): UISkillField {
    // Get config for this skill level
    const config = LEVEL_CONFIG[field.level] || DEFAULT_CONFIG;

    return {
      skillSetID: field.skillSetID,
      name: field.name,
      description: field.description,
      duration: field.duration,
      level: field.level,
      icon: config.icon,
      iconColor: config.iconColor,
      iconBgColor: config.iconBgColor,
      badgeColor: config.badgeColor,
    };
  }
}
