import { ProfessionalApiResponse } from '@/types/professional';

/**
 * Professional API Service
 * 
 * Handles all professional data operations
 */
export class ProfessionalApiService {
  /**
   * Mock professional data matching API structure
   */
  private static mockData: ProfessionalApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      accountID: 25,
      group: 'professional',
      fieldList: [
        {
          field: 'company',
          label: 'Company Name',
          value: 'Vitronic',
          isVisible: true,
          displayOrder: 1,
        },
        {
          field: 'designation',
          label: 'Designation',
          value: 'Business Developer',
          isVisible: true,
          displayOrder: 2,
        },
        {
          field: 'professionSpecialization',
          label: 'Profession / Specialization',
          value: 'xxxx ssss',
          isVisible: true,
          displayOrder: 3,
        },
        {
          field: 'serviceProviding',
          label: 'Service Providing',
          value: 'Sample services',
          isVisible: true,
          displayOrder: 4,
        },
        {
          field: 'compAddress',
          label: 'Company Address',
          value: 'Building 2, Trivandrum',
          isVisible: true,
          displayOrder: 5,
        },
        {
          field: 'compPlace',
          label: 'Company Place',
          value: 'Trivandrum',
          isVisible: true,
          displayOrder: 6,
        },
        {
          field: 'compEmail',
          label: 'Company Email',
          value: 'company@gmail.com',
          isVisible: true,
          displayOrder: 7,
        },
        {
          field: 'compMobile',
          label: 'Company Mobile',
          value: '+91584555555',
          isVisible: true,
          displayOrder: 8,
        },
        {
          field: 'compPhone',
          label: 'Company Phone',
          value: '+91584555555',
          isVisible: true,
          displayOrder: 9,
        },
        {
          field: 'compWhatsApp',
          label: 'Company WhatsApp',
          value: '+91584555555',
          isVisible: true,
          displayOrder: 10,
        },
        {
          field: 'compWebsite',
          label: 'Company Website',
          value: 'http://www.company.com',
          isVisible: true,
          displayOrder: 11,
        },
      ],
    },
  };

  /**
   * Fetch professional data
   * In production, replace with: fetch('/api/professional')
   */
  static async getProfessionalData(): Promise<ProfessionalApiResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    return this.mockData;
  }

  /**
   * Update professional data (used by dashboard)
   */
  static async updateProfessionalData(updates: Partial<ProfessionalApiResponse['data']>): Promise<void> {
    console.log('=== UPDATING PROFESSIONAL DATA ===');
    console.log('Updates received:', updates);
    
    // In production: POST to API
    // For now: Update mock data to simulate persistence
    if (updates.fieldList) {
      console.log('Updating fieldList...');
      this.mockData.data.fieldList = updates.fieldList;
      console.log('New fieldList:', this.mockData.data.fieldList.map(f => ({ 
        field: f.field, 
        isVisible: f.isVisible 
      })));
    }
    
    console.log('Professional data updated successfully');
  }

  /**
   * Get raw professional data (for dashboard editing)
   */
  static async getRawProfessionalData(): Promise<ProfessionalApiResponse> {
    return this.getProfessionalData();
  }
}
