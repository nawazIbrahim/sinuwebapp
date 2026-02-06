import { ProfileApiResponse } from '@/types/profile';

/**
 * Dummy API Service
 * 
 * In production, replace this with actual API calls
 */
export class ProfileApiService {
  private static mockData: ProfileApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      enableAccountSelection: false,
      account: {
        accountID: 25,
        userID: 500,
        personID: 256,
        name: 'Ansil Ansar',
        accountType: 'INDV',
        accountExpiry: '25-Jan-2025 10:00 PM',
        isPaid: 'false',
        subscriptionCode: 'SF-TRIAL',
        status: 'TRIAL',
        statusMessage: 'Trial account expire on 25-Jan-2025 at 10:00 PM',
      },
      profile: {
        profilePhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        title: '',
        fullname: 'Ansil Ansar',
        profession: 'Business Developer',
        location: 'Trivandrum',
        profileIntro: 'digital marketer with 8+ years of experience driving growth for SaaS companies',
        dataRefId: 's89sdflfjsj654sjhdj56584smloopuyt',
        shareLink: 'http://www.data.com/share/s89sdflfjsj654sjhdj56584smloopuyt',
        enableShareButton: true,
      },
      contactIcons: [
        {
          field: 'call',
          label: 'Call',
          value: '+971562646107',
          icon: '', // Empty string = use Material Icon fallback
          iconColor: '#2563EB',
          isVisible: true,
          displayOrder: 1,
        },
        {
          field: 'whatsapp',
          label: 'WhatsApp',
          value: '+971562646107',
          icon: '',
          iconColor: '#059669',
          isVisible: true,
          displayOrder: 2,
        },
        {
          field: 'email',
          label: 'Email',
          value: 'user@gmail.com',
          icon: '',
          iconColor: '#2563EB',
          isVisible: true,
          displayOrder: 3,
        },
        {
          field: 'location',
          label: 'Place',
          value: 'https://maps.app.goo.gl/peJxhu5xQYYV4RqX8',
          icon: '',
          iconColor: '#2563EB',
          isVisible: true,
          displayOrder: 4,
        },
      ],
      groupList: [
        {
          group: 'personal',
          label: 'Personal',
          value: 'Personal',
          isVisible: true,
          displayOrder: 1,
          icon: 'person',
          color: '#F8FAFC',
          iconColor: '#9333EA',
        },
        {
          group: 'contact',
          label: 'Contact',
          value: 'Contact',
          isVisible: true,
          displayOrder: 2,
          icon: 'contact_phone',
          color: '#EFF6FF',
          iconColor: '#2563EB',
        },
        {
          group: 'address',
          label: 'Address',
          value: 'Address',
          isVisible: true,
          displayOrder: 3,
          icon: 'location_on',
          color: '#F0FDF4',
          iconColor: '#10B981',
        },
        {
          group: 'professional',
          label: 'Professional',
          value: 'Professional',
          isVisible: true,
          displayOrder: 4,
          icon: 'work',
          color: '#EFF6FF',
          iconColor: '#2563EB',
        },
        {
          group: 'links',
          label: 'Links',
          value: 'Links',
          isVisible: true,
          displayOrder: 5,
          icon: 'link',
          color: '#ECFEFF',
          iconColor: '#06B6D4',
        },
        {
          group: 'social-media',
          label: 'Social Media',
          value: 'SocialMedia',
          isVisible: true,
          displayOrder: 6,
          icon: 'share',
          color: '#EFF6FF',
          iconColor: '#3B82F6',
        },
        {
          group: 'skills',
          label: 'Skills',
          value: 'Skills',
          isVisible: true,
          displayOrder: 7,
          icon: 'psychology',
          color: '#FFFBEB',
          iconColor: '#F59E0B',
        },
        {
          group: 'documents',
          label: 'Documents',
          value: 'Documents',
          isVisible: true,
          displayOrder: 8,
          icon: 'description',
          color: '#EEF2FF',
          iconColor: '#6366F1',
        },
        {
          group: 'gallery',
          label: 'Gallery',
          value: 'Gallery',
          isVisible: true,
          displayOrder: 9,
          icon: 'photo_library',
          color: '#F0FDF4',
          iconColor: '#10B981',
        },
        {
          group: 'customFields',
          label: 'Custom Fields',
          value: 'CustomFields',
          isVisible: false,
          displayOrder: 10,
          icon: 'settings',
          color: '#F8FAFC',
          iconColor: '#64748B',
        },
        {
          group: 'emergency',
          label: 'Emergency',
          value: 'Emergency',
          isVisible: true,
          displayOrder: 11,
          icon: 'local_hospital',
          color: '#FEF2F2',
          iconColor: '#DC2626',
        },
      ],
    },
  };

  /**
   * Fetch profile data
   * In production, replace with: fetch('/api/profile')
   */
  static async getProfileData(): Promise<ProfileApiResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    return this.mockData;
  }

  /**
   * Update profile data (used by dashboard)
   */
  static async updateProfileData(updates: Partial<ProfileApiResponse['data']>): Promise<void> {
    console.log('=== UPDATING MOCK DATA ===');
    console.log('Updates received:', updates);
    
    // In production: POST to API
    // For now: Update mock data to simulate persistence
    if (updates.contactIcons) {
      console.log('Updating contactIcons...');
      this.mockData.data.contactIcons = updates.contactIcons;
      console.log('New contactIcons:', this.mockData.data.contactIcons.map(i => ({ field: i.field, isVisible: i.isVisible })));
    }
    if (updates.groupList) {
      console.log('Updating groupList...');
      this.mockData.data.groupList = updates.groupList;
      console.log('New groupList:', this.mockData.data.groupList.map(g => ({ group: g.group, isVisible: g.isVisible })));
    }
    if (updates.profile) {
      console.log('Updating profile...');
      console.log('Before update:', this.mockData.data.profile);
      this.mockData.data.profile = { ...this.mockData.data.profile, ...updates.profile };
      console.log('After update:', this.mockData.data.profile);
      console.log('Profile updates applied:', {
        fullname: updates.profile.fullname,
        title: updates.profile.title,
        profession: updates.profile.profession,
        profileIntro: updates.profile.profileIntro,
        profilePhotoUrl: updates.profile.profilePhotoUrl,
      });
    }
    
    console.log('Mock data updated successfully');
  }

  /**
   * Get raw profile data (for dashboard editing)
   */
  static async getRawProfileData(): Promise<ProfileApiResponse> {
    return this.getProfileData();
  }
}
