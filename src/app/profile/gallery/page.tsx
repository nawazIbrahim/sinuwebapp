/**
 * Gallery Page
 * 
 * Displays image gallery carousel
 * Linked from Profile screen, navigates back to Profile
 */

'use client';

import { useEffect, useState } from 'react';
import GalleryHeader from '@/components/gallery/GalleryHeader';
import GalleryCarousel from '@/components/gallery/GalleryCarousel';
import { GalleryApiService } from '@/services/gallery-api.service';
import { GalleryAdapter } from '@/adapters/gallery.adapter';
import { AdaptedGalleryData } from '@/types/gallery';

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState<AdaptedGalleryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('[GalleryPage] Fetching gallery data...');
        const response = await GalleryApiService.getGalleryData();
        console.log('[GalleryPage] API Response:', response);
        
        const adapted = GalleryAdapter.toUI(response);
        console.log('[GalleryPage] Adapted Data:', adapted);
        
        setGalleryData(adapted);
      } catch (error) {
        console.error('[GalleryPage] Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <GalleryHeader />
        <main className="flex items-center justify-center py-12">
          <div className="text-[#617289]">Loading...</div>
        </main>
      </div>
    );
  }

  if (!galleryData || galleryData.images.length === 0) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <GalleryHeader />
        <main className="flex items-center justify-center py-12">
          <div className="text-[#617289]">No images available</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D4D8DD]">
      <GalleryHeader />
      
      <main className="flex items-center justify-center p-4 py-12">
        <GalleryCarousel images={galleryData.images} />
      </main>
    </div>
  );
}
