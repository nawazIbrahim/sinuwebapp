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
  const [refreshKey, setRefreshKey] = useState(0);

  // Extracted fetch function for reuse
  const fetchData = async () => {
    try {
      console.log('=== GALLERY PAGE LOADING ===');
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

  // Initial load and refresh on refreshKey change
  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  // Auto-refresh mechanism - polls sessionStorage for updates
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldRefresh = sessionStorage.getItem('gallery-data-updated');
      if (shouldRefresh === 'true') {
        console.log('=== GALLERY DATA UPDATED - REFETCHING ===');
        sessionStorage.removeItem('gallery-data-updated');
        setRefreshKey((prev) => prev + 1);
      }
    }, 500); // Poll every 500ms

    return () => clearInterval(interval);
  }, []);

  // Also refresh when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const shouldRefresh = sessionStorage.getItem('gallery-data-updated');
        if (shouldRefresh === 'true') {
          console.log('=== PAGE VISIBLE - REFETCHING GALLERY DATA ===');
          sessionStorage.removeItem('gallery-data-updated');
          setRefreshKey((prev) => prev + 1);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
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
