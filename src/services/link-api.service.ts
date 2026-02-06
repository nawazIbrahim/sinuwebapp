/**
 * Link API Service
 * 
 * Mocked API service for link data
 * In production, this would make real HTTP calls
 */

import { LinkApiResponse } from '@/types/link';

export class LinkApiService {
  /**
   * Mock link data
   * This simulates the backend API response
   */
  private static mockData: LinkApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      accountID: 25,
      group: 'links',
      fieldList: [
        {
          linksID: 100,
          name: 'Official Website',
          description: 'Visit our official company website for complete details',
          linkText: 'Visit Website',
          linkUrl: 'https://www.vitronic.com',
          isVisible: true,
          displayOrder: 1,
        },
        {
          linksID: 102,
          name: 'Customer Support',
          description: 'Contact our customer support team for assistance',
          linkText: 'Get Support',
          linkUrl: 'https://support.vitronic.com',
          isVisible: true,
          displayOrder: 3,
        },
      ],
    },
  };

  /**
   * Simulates fetching link data from API
   * In production: GET /api/links
   */
  static async getLinkData(): Promise<LinkApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('[LinkApiService] Fetching link data');
    return this.mockData;
  }

  /**
   * Simulates updating link data via API
   * In production: PUT /api/links
   * 
   * @param updatedData - Partial link data to update
   */
  static async updateLinkData(
    updatedData: Partial<LinkApiResponse['data']>
  ): Promise<LinkApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log('[LinkApiService] Updating link data', updatedData);
    
    // Update mock data to simulate persistence
    this.mockData.data = {
      ...this.mockData.data,
      ...updatedData,
    };
    
    return this.mockData;
  }
}
