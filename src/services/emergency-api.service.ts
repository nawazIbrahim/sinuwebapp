/**
 * Emergency API Service
 * 
 * Mocked API service for emergency contact data
 * In production, this would make real HTTP calls
 */

import { EmergencyApiResponse } from '@/types/emergency';

export class EmergencyApiService {
  /**
   * Mock emergency data
   * This simulates the backend API response
   */
  private static mockData: EmergencyApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      accountID: 25,
      enableShareButton: false,
      group: 'emergency',
      fieldList: [
        {
          field: 'emerContactName',
          label: 'Emergency Contact Name',
          value: 'Ansil Ansar',
          isVisible: true,
          displayOrder: 1,
        },
        {
          field: 'emerContactNo',
          label: 'Emergency Contact No',
          value: '+915845565555',
          isVisible: true,
          displayOrder: 2,
        },
        {
          field: 'emerContactRelation',
          label: 'Relation',
          value: 'Brother',
          isVisible: true,
          displayOrder: 3,
        },
      ],
    },
  };

  /**
   * Simulates fetching emergency data from API
   * In production: GET /api/emergency
   */
  static async getEmergencyData(): Promise<EmergencyApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('[EmergencyApiService] Fetching emergency data');
    return this.mockData;
  }

  /**
   * Simulates updating emergency data via API
   * In production: PUT /api/emergency
   * 
   * @param updatedData - Partial emergency data to update
   */
  static async updateEmergencyData(
    updatedData: Partial<EmergencyApiResponse['data']>
  ): Promise<EmergencyApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log('[EmergencyApiService] Updating emergency data', updatedData);
    
    // Update mock data to simulate persistence
    this.mockData.data = {
      ...this.mockData.data,
      ...updatedData,
    };
    
    return this.mockData;
  }
}
