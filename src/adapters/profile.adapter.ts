import {
  ProfileApiResponse,
  AdaptedProfileData,
  UIContactIcon,
  UIProfileGroup,
  UIProfileData,
} from '@/types/profile';

/**
 * Material Icons mapping for contact fields
 */
const CONTACT_FIELD_ICONS: Record<string, string> = {
  call: 'phone',
  email: 'email',
  whatsapp: 'chat',
  location: 'location_on',
};

/**
 * Default icon colors for contact fields (from Figma)
 */
const CONTACT_FIELD_COLORS: Record<string, string> = {
  call: '#2563EB',      // Royal Blue
  email: '#2563EB',     // Royal Blue
  whatsapp: '#059669',  // Green (WhatsApp brand)
  location: '#2563EB',  // Royal Blue
};

/**
 * Profile Data Adapter
 * 
 * Transforms raw API data into UI-ready format
 * - Filters invisible items
 * - Sorts by displayOrder
 * - Resolves icons (font/image/fallback)
 * - Generates routes
 */
export class ProfileAdapter {
  /**
   * Main adapter method
   */
  static adapt(apiResponse: ProfileApiResponse): AdaptedProfileData {
    return {
      profile: this.adaptProfile(apiResponse.data.profile),
      contactIcons: this.adaptContactIcons(apiResponse.data.contactIcons),
      groups: this.adaptGroups(apiResponse.data.groupList),
    };
  }

  /**
   * Adapt profile data
   */
  private static adaptProfile(profile: ProfileApiResponse['data']['profile']): UIProfileData {
    const displayName = profile.title 
      ? `${profile.title} ${profile.fullname}`
      : profile.fullname;

    return {
      ...profile,
      displayName,
    };
  }

  /**
   * Adapt contact icons
   * - Filter visible items
   * - Sort by displayOrder
   * - Resolve icon type and value
   * - Resolve icon color
   */
  private static adaptContactIcons(icons: ProfileApiResponse['data']['contactIcons']): UIContactIcon[] {
    return icons
      .filter((icon) => icon.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((icon) => {
        const { iconType, resolvedIcon } = this.resolveIcon(icon.icon, icon.field);
        const iconColor = icon.iconColor || CONTACT_FIELD_COLORS[icon.field] || '#2563EB';
        
        return {
          field: icon.field,
          label: icon.label,
          value: icon.value,
          icon: icon.icon,
          iconType,
          resolvedIcon,
          iconColor,
        };
      });
  }

  /**
   * Adapt profile groups
   * - Filter visible items
   * - Sort by displayOrder
   * - Generate routes
   */
  private static adaptGroups(groups: ProfileApiResponse['data']['groupList']): UIProfileGroup[] {
    return groups
      .filter((group) => group.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((group) => ({
        group: group.group,
        label: group.label,
        value: group.value,
        subtitle: group.subtitle,
        icon: group.icon,
        color: group.color,
        iconColor: group.iconColor || '#136dec',
        route: `/profile/${group.group}`,
      }));
  }

  /**
   * Resolve icon type and value
   * Priority:
   * 1. Font icon (if starts with 'fa-')
   * 2. Image URL (if valid URL)
   * 3. Material Icon fallback
   */
  private static resolveIcon(
    icon: string | undefined,
    field: string
  ): { iconType: 'font' | 'image' | 'material'; resolvedIcon: string } {
    // Check if font icon
    if (icon?.startsWith('fa-')) {
      return {
        iconType: 'font',
        resolvedIcon: icon,
      };
    }

    // Check if image URL
    if (icon && this.isValidUrl(icon)) {
      return {
        iconType: 'image',
        resolvedIcon: icon,
      };
    }

    // Fallback to Material Icon
    const materialIcon = CONTACT_FIELD_ICONS[field] || 'help_outline';
    return {
      iconType: 'material',
      resolvedIcon: materialIcon,
    };
  }

  /**
   * Validate URL
   */
  private static isValidUrl(urlString: string): boolean {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }
}
