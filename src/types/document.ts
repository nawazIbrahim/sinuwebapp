/**
 * Document Module Types
 * 
 * Type definitions for the Document screen based on API structure
 */

export interface DocumentField {
  documentID: number;
  name: string;
  fileType: string;      // PDF, JPEG, PNG, DOCX, etc.
  fileUrl: string;
  fileSize: string;
  title: string;
  description: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface DocumentData {
  accountID: number;
  enableShareButton: boolean;
  group: string;
  fieldList: DocumentField[];
}

export interface DocumentApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: DocumentData;
}

/**
 * Download States
 */
export type DownloadState = 'idle' | 'downloading' | 'success' | 'error';

/**
 * UI-ready Document Field
 * Enhanced with visual metadata from adapter
 */
export interface UIDocumentField {
  documentID: number;
  name: string;
  fileType: string;
  fileUrl: string;
  fileSize: string;
  title: string;
  description: string;
  icon: string;           // Material Icon name based on file type
  iconColor: string;      // Hex color for icon
  iconBgColor: string;    // Hex color for icon background
}

/**
 * Adapted Document Data (UI-Ready)
 */
export interface AdaptedDocumentData {
  documents: UIDocumentField[];
}
