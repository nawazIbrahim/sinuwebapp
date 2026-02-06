/**
 * Address API Service
 * 
 * Mocked API service for address data
 * In production, this would make real HTTP calls
 */

import { AddressApiResponse } from '@/types/address';

export class AddressApiService {
  /**
   * Mock address data
   * This simulates the backend API response
   */
  private static mockData: AddressApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      accountID: 25,
      group: 'address',
      fieldList: [
        {
          field: 'address',
          label: 'Address',
          value: 'GHRS House No 2, Lane 3, Manacaud, Trivandrum',
          isVisible: true,
          displayOrder: 1,
        },
        {
          field: 'place',
          label: 'Location',
          value: 'Manacaud',
          isVisible: true,
          displayOrder: 2,
        },
        {
          field: 'LocationMapUrl',
          label: 'Location Map',
          value: 'https://maps.app.goo.gl/peJxhu5xQYYV4RqX8',
          isVisible: true,
          displayOrder: 3,
        },
      ],
    },
  };

  /**
   * Simulates fetching address data from API
   * In production: GET /api/address
   */
  static async getAddressData(): Promise<AddressApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('[AddressApiService] Fetching address data');
    return this.mockData;
  }

  /**
   * Simulates updating address data via API
   * In production: PUT /api/address
   * 
   * @param updatedData - Partial address data to update
   */
  static async updateAddressData(
    updatedData: Partial<AddressApiResponse['data']>
  ): Promise<AddressApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log('[AddressApiService] Updating address data', updatedData);
    
    // Update mock data to simulate persistence
    this.mockData.data = {
      ...this.mockData.data,
      ...updatedData,
    };
    
    return this.mockData;
  }
}
