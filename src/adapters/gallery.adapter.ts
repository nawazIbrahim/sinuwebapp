/**
 * Gallery Adapter
 * 
 * Transforms raw API gallery data into UI-ready format
 */

import { GalleryApiResponse, AdaptedGalleryData, UIGalleryImage } from '@/types/gallery';

export class GalleryAdapter {
  /**
   * Transforms API response into UI-ready gallery data
   * 
   * @param apiResponse - Raw API response
   * @returns UI-ready gallery data with sorted images
   */
  static toUI(apiResponse: GalleryApiResponse): AdaptedGalleryData {
    const images = apiResponse.data.fieldList
      .filter(image => image.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(image => this.adaptImage(image));

    return { images };
  }

  /**
   * Adapts a single gallery image
   */
  private static adaptImage(image: GalleryApiResponse['data']['fieldList'][0]): UIGalleryImage {
    return {
      galleryID: image.galleryID,
      title: image.title,
      description: image.description,
      imageUrl: image.imageUrl,
      thumbnailUrl: image.thumbnailUrl,
      fileSize: image.fileSize,
      fileType: image.fileType,
    };
  }
}
