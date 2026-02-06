import { ContactApiResponse } from '@/types/contact';

/**
 * Contact API Service
 * 
 * Handles all contact data operations
 * Uses new simplified API structure
 */
export class ContactApiService {
  /**
   * Mock contact data matching new API structure
   */
  private static mockData: ContactApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      accountID: 25,
      enableShareButton: false,
      group: 'contact',
      fieldList: [
        {
          field: 'mobile',
          label: 'Mobile',
          value: '+9715558666666',
          isVisible: true,
          displayOrder: 1,
        },
        {
          field: 'mobileAlt',
          label: 'Alternate Mobile',
          value: '+9715558777777',
          isVisible: true,
          displayOrder: 2,
        },
        {
          field: 'phone',
          label: 'Phone',
          value: '+97144445555',
          isVisible: true,
          displayOrder: 3,
        },
        {
          field: 'whatsapp',
          label: 'WhatsApp',
          value: '+9715558666666',
          isVisible: true,
          displayOrder: 4,
        },
        {
          field: 'email',
          label: 'Email',
          value: 'user@gmail.com',
          isVisible: true,
          displayOrder: 5,
        },
      ],
    },
  };

  /**
   * Fetch contact data
   * In production, replace with: fetch('/api/contact')
   */
  static async getContactData(): Promise<ContactApiResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    return this.mockData;
  }

  /**
   * Update contact data (used by dashboard)
   */
  static async updateContactData(updates: Partial<ContactApiResponse['data']>): Promise<void> {
    console.log('=== UPDATING CONTACT DATA ===');
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
    
    console.log('Contact data updated successfully');
  }

  /**
   * Get raw contact data (for dashboard editing)
   */
  static async getRawContactData(): Promise<ContactApiResponse> {
    return this.getContactData();
  }
}
