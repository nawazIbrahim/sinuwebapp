import { PersonalApiResponse } from '@/types/personal';

/**
 * Personal API Service
 * 
 * Handles all personal data operations
 */
export class PersonalApiService {
  /**
   * Mock personal data matching API structure
   */
  private static mockData: PersonalApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      accountID: 25,
      group: 'personal',
      fieldList: [
        {
          field: 'fullname',
          label: 'Full Name',
          value: 'Ansil Ansar',
          isVisible: true,
          displayOrder: 1,
        },
        {
          field: 'profileIntro',
          label: 'Profile Introduction',
          value: 'Experienced professional specializing in business development.',
          isVisible: true,
          displayOrder: 2,
        },
        {
          field: 'qualification',
          label: 'Qualification',
          value: 'B.Tech in Computer Science',
          isVisible: true,
          displayOrder: 3,
        },
        {
          field: 'profession',
          label: 'Profession',
          value: 'Business Developer',
          isVisible: true,
          displayOrder: 4,
        },
        {
          field: 'gender',
          label: 'Gender',
          value: 'Male',
          isVisible: true,
          displayOrder: 5,
        },
        {
          field: 'languageSpeak',
          label: 'Languages Spoken',
          value: 'English, Malayalam, Hindi',
          isVisible: true,
          displayOrder: 6,
        },
        {
          field: 'bloodGroup',
          label: 'Blood Group',
          value: 'O+',
          isVisible: true,
          displayOrder: 7,
        },
        {
          field: 'biography',
          label: 'Biography',
          value: 'Passionate technologist with a strong interest in building scalable digital platforms and user-friendly applications.',
          isVisible: true,
          displayOrder: 8,
        },
        {
          field: 'dateOfBirth',
          label: 'Date of Birth',
          value: '2000-05-14',
          isVisible: true,
          displayOrder: 9,
        },
        {
          field: 'married',
          label: 'Marital Status',
          value: 'Married',
          isVisible: true,
          displayOrder: 10,
        },
      ],
    },
  };

  /**
   * Fetch personal data
   * In production, replace with: fetch('/api/personal')
   */
  static async getPersonalData(): Promise<PersonalApiResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    return this.mockData;
  }

  /**
   * Update personal data (used by dashboard)
   */
  static async updatePersonalData(updates: Partial<PersonalApiResponse['data']>): Promise<void> {
    console.log('=== UPDATING PERSONAL DATA ===');
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
    
    console.log('Personal data updated successfully');
  }

  /**
   * Get raw personal data (for dashboard editing)
   */
  static async getRawPersonalData(): Promise<PersonalApiResponse> {
    return this.getPersonalData();
  }
}
