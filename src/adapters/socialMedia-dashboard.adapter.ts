import { SocialMediaApiResponse, SocialMediaField } from '@/types/socialMedia';

export interface SocialMediaDashboardField {
  id: string;
  field: string;
  label: string;
  value: string;
  enabled: boolean;
  displayOrder: number;
  category: string;
  originalData: SocialMediaField;
}

export interface SocialMediaDashboardData {
  accountID: number;
  group: string;
  fields: SocialMediaDashboardField[];
}

export class SocialMediaDashboardAdapter {
  static toDashboard(apiResponse: SocialMediaApiResponse): SocialMediaDashboardData {
    const { accountID, group, fieldList } = apiResponse.data;
    const fields: SocialMediaDashboardField[] = fieldList
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((field) => ({
        id: `socialmedia-${field.socialMediaID}`,
        field: field.platform,
        label: field.platformName,
        value: field.url,
        enabled: field.isVisible,
        displayOrder: field.displayOrder,
        category: field.category,
        originalData: field,
      }));
    return { accountID, group, fields };
  }

  static toApiUpdate(
    dashboardData: SocialMediaDashboardData,
    updatedState: {
      fields: Record<string, { enabled: boolean; value: string }>;
      fieldsOrder: string[];
    }
  ): Partial<SocialMediaApiResponse['data']> {
    const fieldsById = new Map(dashboardData.fields.map((field) => [field.id, field]));
    const updatedFields = updatedState.fieldsOrder
      .map((id, index) => {
        const field = fieldsById.get(id);
        if (!field) return null;
        const fieldState = updatedState.fields[id];
        return {
          ...field.originalData,
          url: fieldState?.value ?? field.value,
          isVisible: fieldState?.enabled ?? field.enabled,
          displayOrder: index + 1,
        };
      })
      .filter((f) => f !== null) as SocialMediaField[];
    return { fieldList: updatedFields };
  }

  static getFieldDescription(field: string, category: string): string {
    const descriptions: Record<string, string> = {
      linkedin: 'Your LinkedIn profile URL',
      twitter: 'Your X / Twitter profile URL',
      instagram: 'Your Instagram profile URL',
      facebook: 'Your Facebook profile URL',
      snapchat: 'Your Snapchat profile URL',
      telegram: 'Your Telegram channel URL',
      youtube: 'Your YouTube channel URL',
      tiktok: 'Your TikTok profile URL',
      github: 'Your GitHub profile URL',
      medium: 'Your Medium profile URL',
      reddit: 'Your Reddit profile URL',
    };
    return descriptions[field] || `Your ${category} network profile URL`;
  }
}
