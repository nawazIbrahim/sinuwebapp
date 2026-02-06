/**
 * Gallery Module Types
 * 
 * Type definitions for the Image Gallery screen based on API structure
 */

export interface GalleryImage {
  galleryID: number;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  fileSize: string;
  fileType: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface GalleryData {
  accountID: number;
  enableShareButton: boolean;
  group: string;
  fieldList: GalleryImage[];
}

export interface GalleryApiResponse {
  isSuccess: boolean;
  statusCode: number;
  statusMessage: string | null;
  data: GalleryData;
}

/**
 * UI-ready Gallery Image
 */
export interface UIGalleryImage {
  galleryID: number;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  fileSize: string;
  fileType: string;
}

/**
 * Adapted Gallery Data (UI-Ready)
 */
export interface AdaptedGalleryData {
  images: UIGalleryImage[];
}
