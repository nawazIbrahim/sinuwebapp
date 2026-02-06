/**
 * Social Media Adapter
 * 
 * Transforms raw API social media data into UI-ready format
 * Groups by category and maps platforms to appropriate icons and colors
 */

import { SocialMediaApiResponse, AdaptedSocialMediaData, UISocialMediaField, UISocialMediaGroup } from '@/types/socialMedia';

/**
 * Platform-specific configurations (from Figma)
 * Each platform has unique icon and background colors
 */
const PLATFORM_CONFIG: Record<string, {
  icon: string;
  iconColor: string;
  iconBgColor: string;
}> = {
  linkedin: {
    icon: 'business',           // LinkedIn business icon
    iconColor: '#0077B5',        // LinkedIn blue
    iconBgColor: 'rgba(0, 119, 181, 0.1)',  // Light blue 10%
  },
  twitter: {
    icon: 'close',              // X icon for Twitter/X
    iconColor: '#000000',        // Black
    iconBgColor: 'rgba(0, 0, 0, 0.05)',  // Black 5%
  },
  instagram: {
    icon: 'photo_camera',        // Instagram camera icon
    iconColor: '#E4405F',        // Instagram pink
    iconBgColor: 'rgba(236, 72, 153, 0.1)',  // Pink 10%
  },
  facebook: {
    icon: 'facebook',            // Facebook icon
    iconColor: '#1877F2',        // Facebook blue
    iconBgColor: 'rgba(37, 99, 235, 0.1)',  // Blue 10%
  },
  snapchat: {
    icon: 'photo_camera',        // Snapchat ghost/camera icon
    iconColor: '#000000',        // Black
    iconBgColor: '#FFFC00',      // Snapchat yellow
  },
  telegram: {
    icon: 'send',                // Telegram paper plane icon
    iconColor: '#0088CC',        // Telegram blue
    iconBgColor: 'rgba(96, 165, 250, 0.1)',  // Light blue 10%
  },
};

/**
 * Category configurations (from Figma)
 */
const CATEGORY_CONFIG = {
  professional: {
    label: 'Professional Networks',
    icon: 'laptop',
    color: '#136DEC',
  },
  personal: {
    label: 'Personal Channels',
    icon: 'sentiment_satisfied',
    color: '#136DEC',
  },
  community: {
    label: 'Community Platforms',
    icon: 'forum',
    color: '#136DEC',
  },
};

/**
 * Default configuration for unknown platforms
 */
const DEFAULT_CONFIG = {
  icon: 'share',
  iconColor: '#617289',
  iconBgColor: '#F3F4F6',
};

export class SocialMediaAdapter {
  /**
   * Transforms API response into UI-ready grouped social media data
   * 
   * @param apiResponse - Raw API response
   * @returns UI-ready social media data grouped by category
   */
  static toUI(apiResponse: SocialMediaApiResponse): AdaptedSocialMediaData {
    // Filter visible items
    const visibleItems = apiResponse.data.fieldList.filter(field => field.isVisible);

    // Group by category
    const groupedByCategory = this.groupByCategory(visibleItems);

    // Transform to UI groups
    const groups = Object.keys(CATEGORY_CONFIG).map(category => {
      const items = groupedByCategory[category] || [];
      const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];

      return {
        category,
        categoryLabel: config.label,
        categoryIcon: config.icon,
        categoryColor: config.color,
        items: items
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map(item => this.adaptField(item)),
      };
    }).filter(group => group.items.length > 0);  // Only include groups with items

    return { groups };
  }

  /**
   * Groups social media fields by category
   */
  private static groupByCategory(fields: SocialMediaApiResponse['data']['fieldList']): Record<string, SocialMediaApiResponse['data']['fieldList']> {
    return fields.reduce((acc, field) => {
      if (!acc[field.category]) {
        acc[field.category] = [];
      }
      acc[field.category].push(field);
      return acc;
    }, {} as Record<string, SocialMediaApiResponse['data']['fieldList']>);
  }

  /**
   * Adapts a single social media field with visual metadata
   */
  private static adaptField(field: SocialMediaApiResponse['data']['fieldList'][0]): UISocialMediaField {
    const config = PLATFORM_CONFIG[field.platform] || DEFAULT_CONFIG;

    // Format display URL (remove protocol and trailing slash)
    const displayUrl = this.formatUrl(field.url);

    return {
      socialMediaID: field.socialMediaID,
      platform: field.platform,
      platformName: field.platformName,
      url: field.url,
      displayUrl: displayUrl,
      icon: config.icon,
      iconColor: config.iconColor,
      iconBgColor: config.iconBgColor,
      category: field.category,
    };
  }

  /**
   * Formats URL for display (removes protocol and www)
   */
  private static formatUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      let displayText = urlObj.hostname + urlObj.pathname;
      
      // Remove 'www.' prefix
      displayText = displayText.replace(/^www\./, '');
      
      // Remove trailing slash
      displayText = displayText.replace(/\/$/, '');
      
      return displayText;
    } catch {
      // If URL parsing fails, return as is
      return url;
    }
  }
}
