/**
 * Link Adapter
 * 
 * Transforms raw API link data into UI-ready format
 * Maps link types to appropriate icons, colors, and display properties
 */

import { LinkApiResponse, AdaptedLinkData, UILinkField } from '@/types/link';

/**
 * Icon determination based on link name or URL patterns
 */
const ICON_PATTERNS: Array<{
  keywords: string[];
  icon: string;
}> = [
  { keywords: ['website', 'official', 'company', 'home'], icon: 'language' },
  { keywords: ['support', 'help', 'customer'], icon: 'support_agent' },
  { keywords: ['linkedin'], icon: 'business' },
  { keywords: ['facebook'], icon: 'facebook' },
  { keywords: ['instagram'], icon: 'photo_camera' },
  { keywords: ['twitter', 'x.com'], icon: 'alternate_email' },
  { keywords: ['github'], icon: 'code' },
  { keywords: ['youtube'], icon: 'play_circle' },
  { keywords: ['portfolio'], icon: 'work' },
  { keywords: ['blog'], icon: 'article' },
  { keywords: ['contact', 'email'], icon: 'mail' },
  { keywords: ['shop', 'store', 'buy'], icon: 'shopping_cart' },
  { keywords: ['docs', 'documentation'], icon: 'description' },
];

/**
 * Standard icon styling (consistent for all links)
 */
const ICON_STYLE = {
  iconColor: '#617289',       // Lynch (gray-blue) from Figma
  iconBgColor: '#DBEAFE',     // Light blue background
};

/**
 * Default icon for unmatched links
 */
const DEFAULT_ICON = 'link';

export class LinkAdapter {
  /**
   * Transforms API response into UI-ready link data
   * 
   * @param apiResponse - Raw API response
   * @returns UI-ready link data with icons, colors, and display properties
   */
  static toUI(apiResponse: LinkApiResponse): AdaptedLinkData {
    const links = apiResponse.data.fieldList
      .filter(field => field.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(field => this.adaptField(field));

    return { links };
  }

  /**
   * Adapts a single link field with visual metadata
   */
  private static adaptField(field: LinkApiResponse['data']['fieldList'][0]): UILinkField {
    // Determine icon based on name and URL
    const icon = this.determineIcon(field.name, field.linkUrl);

    // Format display text from URL
    const displayText = this.formatUrl(field.linkUrl);

    return {
      linksID: field.linksID,
      name: field.name,
      description: field.description,
      linkText: field.linkText,
      linkUrl: field.linkUrl,
      icon: icon,
      iconColor: ICON_STYLE.iconColor,
      iconBgColor: ICON_STYLE.iconBgColor,
      displayText: displayText,
    };
  }

  /**
   * Determines appropriate icon based on link name and URL
   */
  private static determineIcon(name: string, url: string): string {
    const searchText = `${name} ${url}`.toLowerCase();

    for (const pattern of ICON_PATTERNS) {
      for (const keyword of pattern.keywords) {
        if (searchText.includes(keyword)) {
          return pattern.icon;
        }
      }
    }

    return DEFAULT_ICON;
  }

  /**
   * Formats URL for display (removes protocol and trailing slash)
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
