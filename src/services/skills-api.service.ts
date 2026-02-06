/**
 * Skills API Service
 * 
 * Mocked API service for skills data
 * In production, this would make real HTTP calls
 */

import { SkillsApiResponse } from '@/types/skills';

export class SkillsApiService {
  /**
   * Mock skills data
   * This simulates the backend API response
   */
  private static mockData: SkillsApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      accountID: 25,
      enableShareButton: false,
      group: 'skillSet',
      fieldList: [
        {
          skillSetID: 200,
          name: 'Web Application Development',
          description: 'Designing and developing scalable web applications using modern frameworks',
          duration: '5 Years',
          level: 'Advanced',
          isVisible: true,
          displayOrder: 1,
        },
        {
          skillSetID: 201,
          name: 'Cloud Infrastructure Management',
          description: 'Managing and deploying applications on cloud platforms like AWS and Azure',
          duration: '3 Years',
          level: 'Intermediate',
          isVisible: true,
          displayOrder: 3,
        },
      ],
    },
  };

  /**
   * Simulates fetching skills data from API
   * In production: GET /api/skills
   */
  static async getSkillsData(): Promise<SkillsApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('[SkillsApiService] Fetching skills data');
    return this.mockData;
  }

  /**
   * Simulates updating skills data via API
   * In production: PUT /api/skills
   * 
   * @param updatedData - Partial skills data to update
   */
  static async updateSkillsData(
    updatedData: Partial<SkillsApiResponse['data']>
  ): Promise<SkillsApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log('[SkillsApiService] Updating skills data', updatedData);
    
    // Update mock data to simulate persistence
    this.mockData.data = {
      ...this.mockData.data,
      ...updatedData,
    };
    
    return this.mockData;
  }
}
