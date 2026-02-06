/**
 * Document API Service
 * 
 * Mocked API service for document data
 * In production, this would make real HTTP calls
 */

import { DocumentApiResponse } from '@/types/document';

export class DocumentApiService {
  /**
   * Mock document data
   * This simulates the backend API response
   */
  private static mockData: DocumentApiResponse = {
    isSuccess: true,
    statusCode: 200,
    statusMessage: null,
    data: {
      accountID: 25,
      enableShareButton: false,
      group: 'document',
      fieldList: [
        {
          documentID: 101,
          name: 'Biodata',
          fileType: 'PDF',
          fileUrl: 'https://www.example.com/docs/john_doe_biodata.pdf',
          fileSize: '250KB',
          title: 'Biodata of John Doe',
          description: 'Personal biodata including education and work experience',
          isVisible: true,
          displayOrder: 1,
        },
        {
          documentID: 102,
          name: 'License copy',
          fileType: 'JPEG',
          fileUrl: 'https://www.example.com/docs/john_doe_license.jpeg',
          fileSize: '500KB',
          title: 'Driving License Copy',
          description: 'Scanned copy of driving license',
          isVisible: true,
          displayOrder: 2,
        },
        {
          documentID: 103,
          name: 'Other Doc',
          fileType: 'PDF',
          fileUrl: 'https://www.example.com/docs/john_doe_otherdoc.pdf',
          fileSize: '150KB',
          title: 'Other Document',
          description: 'Additional document related to John Doe',
          isVisible: false,
          displayOrder: 3,
        },
      ],
    },
  };

  /**
   * Simulates fetching document data from API
   * In production: GET /api/documents
   */
  static async getDocumentData(): Promise<DocumentApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('[DocumentApiService] Fetching document data');
    return this.mockData;
  }

  /**
   * Simulates updating document data via API
   * In production: PUT /api/documents
   * 
   * @param updatedData - Partial document data to update
   */
  static async updateDocumentData(
    updatedData: Partial<DocumentApiResponse['data']>
  ): Promise<DocumentApiResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log('[DocumentApiService] Updating document data', updatedData);
    
    // Update mock data to simulate persistence
    this.mockData.data = {
      ...this.mockData.data,
      ...updatedData,
    };
    
    return this.mockData;
  }
}
