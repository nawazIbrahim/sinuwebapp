import { ProfileApiResponse, ContactIcon, ProfileGroup } from '@/types/profile';

/**
 * Dashboard-specific types
 */
export interface DashboardQuickAction {
  id: string;
  label: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  enabled: boolean;
  originalData: ContactIcon;
}

export interface DashboardModule {
  id: string;
  label: string;
  description: string;
  icon: string;
  iconColor: string;
  enabled: boolean;
  originalData: ProfileGroup;
}

export interface DashboardData {
  profile: {
    name: string;
    title: string;
    description: string;
    avatarUrl: string;
  };
  quickActions: DashboardQuickAction[];
  modules: DashboardModule[];
  emergency: {
    enabled: boolean;
    originalData?: ProfileGroup;
  };
}

/**
 * Dashboard Adapter
 * 
 * Transforms profile API data into dashboard-ready format
 * Maintains reference to original data for saving back to API
 */
export class DashboardAdapter {
  /**
   * Transform profile API data to dashboard format
   */
  static toDashboard(apiResponse: ProfileApiResponse): DashboardData {
    const { profile, contactIcons, groupList } = apiResponse.data;

    // Map contact icons to quick actions
    const quickActions: DashboardQuickAction[] = contactIcons
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((icon) => ({
        id: icon.field,
        label: icon.label,
        icon: this.getIconName(icon.icon, icon.field),
        iconBgColor: this.getQuickActionBgColor(icon.field),
        iconColor: icon.iconColor || this.getDefaultIconColor(icon.field),
        enabled: icon.isVisible,
        originalData: icon,
      }));

    // Separate emergency from regular modules
    const emergencyModule = groupList.find((g) => g.group === 'emergency');
    const regularModules = groupList.filter((g) => g.group !== 'emergency');

    // Map group list to modules
    const modules: DashboardModule[] = regularModules
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((group) => ({
        id: group.group,
        label: group.label,
        description: group.subtitle || '',
        icon: group.icon || 'folder',
        iconColor: group.iconColor || '#136dec',
        enabled: group.isVisible,
        originalData: group,
      }));

    return {
      profile: {
        name: profile.title ? `${profile.title} ${profile.fullname}` : profile.fullname,
        title: profile.profession,
        description: profile.profileIntro || '',
        avatarUrl: profile.profilePhotoUrl,
      },
      quickActions,
      modules,
      emergency: {
        enabled: emergencyModule?.isVisible ?? true,
        originalData: emergencyModule,
      },
    };
  }

  /**
   * Convert dashboard state back to API format for saving
   */
  static toApiUpdate(
    dashboardData: DashboardData,
    updatedState: {
      quickActions: Record<string, boolean>;
      modules: Record<string, boolean>;
      modulesOrder: string[];
      emergencyEnabled: boolean;
      profile: {
        name: string;
        title: string;
        description: string;
        avatarUrl: string;
      };
    },
    originalApiResponse: ProfileApiResponse
  ): Partial<ProfileApiResponse['data']> {
    // Update contact icons visibility
    const updatedContactIcons = dashboardData.quickActions.map((action) => ({
      ...action.originalData,
      isVisible: updatedState.quickActions[action.id] ?? action.enabled,
    }));

    // Update group list visibility and display order
    // First, map modules by their ID for easy lookup
    const modulesById = new Map(
      dashboardData.modules.map((moduleItem) => [moduleItem.id, moduleItem])
    );

    // Reorder modules based on the new order
    const updatedModules = updatedState.modulesOrder
      .map((id, index) => {
        const moduleItem = modulesById.get(id);
        if (!moduleItem) return null;
        return {
          ...moduleItem.originalData,
          isVisible: updatedState.modules[moduleItem.id] ?? moduleItem.enabled,
          displayOrder: index + 1, // Update display order (1-based)
        };
      })
      .filter((m) => m !== null) as ProfileGroup[];

    // Add emergency back if it exists
    const updatedGroupList = [...updatedModules];
    if (dashboardData.emergency.originalData) {
      updatedGroupList.push({
        ...dashboardData.emergency.originalData,
        isVisible: updatedState.emergencyEnabled,
      });
    }

    // Update profile data if changed
    const updatedProfile = {
      ...originalApiResponse.data.profile,
    };

    // Parse name back to title + fullname
    if (updatedState.profile.name !== dashboardData.profile.name) {
      console.log('=== PARSING NAME ===');
      console.log('Original name from dashboard:', dashboardData.profile.name);
      console.log('Updated name from state:', updatedState.profile.name);
      
      const trimmedName = updatedState.profile.name.trim();
      const nameParts = trimmedName.split(' ');
      
      // Check if first word looks like a title (ends with . or is very short like Dr, Mr, Mrs)
      const firstWord = nameParts[0];
      const looksLikeTitle = firstWord.endsWith('.') || 
                            (firstWord.length <= 4 && nameParts.length > 1 && 
                             ['dr', 'mr', 'mrs', 'ms', 'prof'].includes(firstWord.toLowerCase()));
      
      console.log('First word:', firstWord);
      console.log('Looks like title?', looksLikeTitle);
      
      if (looksLikeTitle && nameParts.length > 1) {
        // First word is a title, rest is fullname
        updatedProfile.title = firstWord;
        updatedProfile.fullname = nameParts.slice(1).join(' ');
        console.log('Parsed as: title="' + firstWord + '", fullname="' + nameParts.slice(1).join(' ') + '"');
      } else {
        // No title detected, entire string is fullname
        updatedProfile.title = '';
        updatedProfile.fullname = trimmedName;
        console.log('Parsed as: title="" (cleared), fullname="' + trimmedName + '"');
      }
    }

    if (updatedState.profile.title !== dashboardData.profile.title) {
      updatedProfile.profession = updatedState.profile.title;
    }

    if (updatedState.profile.description !== dashboardData.profile.description) {
      updatedProfile.profileIntro = updatedState.profile.description;
    }

    if (updatedState.profile.avatarUrl !== dashboardData.profile.avatarUrl) {
      updatedProfile.profilePhotoUrl = updatedState.profile.avatarUrl;
    }

    return {
      profile: updatedProfile,
      contactIcons: updatedContactIcons,
      groupList: updatedGroupList,
    };
  }

  /**
   * Get icon name (Material Symbols)
   */
  private static getIconName(icon: string | undefined, field: string): string {
    if (icon?.startsWith('fa-')) return icon;
    if (icon && this.isValidUrl(icon)) return icon;

    const iconMap: Record<string, string> = {
      call: 'call',
      email: 'mail',
      whatsapp: 'chat_bubble',
      location: 'location_on',
    };

    return iconMap[field] || 'help_outline';
  }

  /**
   * Get background color for quick action icons
   */
  private static getQuickActionBgColor(field: string): string {
    const colorMap: Record<string, string> = {
      call: '#FEF2F2',
      email: '#FAF5FF',
      whatsapp: '#FFFBEB',
      location: '#FEF2F2',
    };
    return colorMap[field] || '#F3F4F6';
  }

  /**
   * Get default icon color
   */
  private static getDefaultIconColor(field: string): string {
    const colorMap: Record<string, string> = {
      call: '#2563EB',
      email: '#9333EA',
      whatsapp: '#059669',
      location: '#DC2626',
    };
    return colorMap[field] || '#136dec';
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
