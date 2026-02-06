/**
 * Gallery API Service
 * 
 * Mocked API service for image gallery data
 * In production, this would make real HTTP calls
 */

import { GalleryApiResponse } from '@/types/gallery';

export class GalleryApiService {
  /**
   * Mock gallery data
   * This simulates the backend API response
   */
  private static mockData: GalleryApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      accountID: 25,
      enableShareButton: false,
      group: 'gallery',
      fieldList: [
        {
          galleryID: 201,
          title: 'Company Event 2025',
          description: 'Photos from the annual company event held in 2025',
          imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
          thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80',
          fileSize: '1.2MB',
          fileType: 'JPEG',
          isVisible: true,
          displayOrder: 1,
        },
        {
          galleryID: 202,
          title: 'Product Launch',
          description: 'Images of the new product launch ceremony',
          imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
          thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
          fileSize: '900KB',
          fileType: 'JPEG',
          isVisible: true,
          displayOrder: 2,
        },
        {
          galleryID: 203,
          title: 'Team Building',
          description: 'Snapshots from the team-building activities',
          imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
          thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
          fileSize: '1.5MB',
          fileType: 'JPEG',
          isVisible: false,
          displayOrder: 3,
        },
        {
          galleryID: 204,
          title: 'Office Space',
          description: 'Modern workspace and collaborative areas',
          imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
          thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
          fileSize: '850KB',
          fileType: 'JPEG',
          isVisible: true,
          displayOrder: 4,
        },
        {
          galleryID: 205,
          title: 'Innovation Lab',
          description: 'Research and development workspace',
          imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
          thumbnailUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
          fileSize: '1.1MB',
          fileType: 'JPEG',
          isVisible: true,
          displayOrder: 5,
        },
        {
          galleryID: 206,
          title: 'Client Meeting Room',
          description: 'Professional meeting spaces for client interactions',
          imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
          thumbnailUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80',
          fileSize: '950KB',
          fileType: 'JPEG',
          isVisible: true,
          displayOrder: 6,
        },
        {
          galleryID: 207,
          title: 'Recreation Area',
          description: 'Employee lounge and relaxation zone',
          imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
          thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80',
          fileSize: '1.3MB',
          fileType: 'JPEG',
          isVisible: true,
          displayOrder: 7,
        },
      ],
    },
  };

  /**
   * Simulates fetching gallery data from API
   * In production: GET /api/gallery
   */
  static async getGalleryData(): Promise<GalleryApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('[GalleryApiService] Fetching gallery data');
    return this.mockData;
  }

  /**
   * Simulates updating gallery data via API
   * In production: PUT /api/gallery
   * 
   * @param updatedData - Partial gallery data to update
   */
  static async updateGalleryData(
    updatedData: Partial<GalleryApiResponse['data']>
  ): Promise<GalleryApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log('[GalleryApiService] Updating gallery data', updatedData);
    
    // Update mock data to simulate persistence
    this.mockData.data = {
      ...this.mockData.data,
      ...updatedData,
    };
    
    return this.mockData;
  }
}
