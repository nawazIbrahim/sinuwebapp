/**
 * Social Media API Service
 * 
 * Mocked API service for social media data
 * In production, this would make real HTTP calls
 */

import { SocialMediaApiResponse } from '@/types/socialMedia';

export class SocialMediaApiService {
  /**
   * Mock social media data
   * This simulates the backend API response
   */
  private static mockData: SocialMediaApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      accountID: 25,
      group: 'socialMedia',
      fieldList: [
        // Professional Networks
        {
          socialMediaID: 201,
          platform: 'linkedin',
          platformName: 'LinkedIn',
          url: 'https://linkedin.com/in/alexmorgan-md',
          isVisible: true,
          displayOrder: 1,
          category: 'professional',
        },
        {
          socialMediaID: 202,
          platform: 'twitter',
          platformName: 'X / Twitter',
          url: 'https://twitter.com/dr_alexmorgan',
          isVisible: true,
          displayOrder: 2,
          category: 'professional',
        },
        // Personal Channels
        {
          socialMediaID: 203,
          platform: 'instagram',
          platformName: 'Instagram',
          url: 'https://instagram.com/alex.morgan.life',
          isVisible: true,
          displayOrder: 1,
          category: 'personal',
        },
        {
          socialMediaID: 204,
          platform: 'facebook',
          platformName: 'Facebook',
          url: 'https://facebook.com/alexmorgan.private',
          isVisible: true,
          displayOrder: 2,
          category: 'personal',
        },
        {
          socialMediaID: 205,
          platform: 'snapchat',
          platformName: 'Snapchat',
          url: 'https://snapchat.com/add/alexm',
          isVisible: true,
          displayOrder: 3,
          category: 'personal',
        },
        // Community Platforms
        {
          socialMediaID: 206,
          platform: 'telegram',
          platformName: 'Telegram',
          url: 'https://t.me/alexmorgan_chat',
          isVisible: true,
          displayOrder: 1,
          category: 'community',
        },
      ],
    },
  };

  /**
   * Simulates fetching social media data from API
   * In production: GET /api/social-media
   */
  static async getSocialMediaData(): Promise<SocialMediaApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('[SocialMediaApiService] Fetching social media data');
    return this.mockData;
  }

  /**
   * Simulates updating social media data via API
   * In production: PUT /api/social-media
   * 
   * @param updatedData - Partial social media data to update
   */
  static async updateSocialMediaData(
    updatedData: Partial<SocialMediaApiResponse['data']>
  ): Promise<SocialMediaApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log('[SocialMediaApiService] Updating social media data', updatedData);
    
    // Update mock data to simulate persistence
    this.mockData.data = {
      ...this.mockData.data,
      ...updatedData,
    };
    
    return this.mockData;
  }
}
