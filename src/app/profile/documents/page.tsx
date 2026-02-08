/**
 * Documents Page
 * 
 * Displays user's documents with download functionality
 * Linked from Profile screen, navigates back to Profile
 */

'use client';

import { useEffect, useState } from 'react';
import DocumentHeader from '@/components/document/DocumentHeader';
import DocumentCard from '@/components/document/DocumentCard';
import { DocumentApiService } from '@/services/document-api.service';
import { DocumentAdapter } from '@/adapters/document.adapter';
import { AdaptedDocumentData } from '@/types/document';

export default function DocumentsPage() {
  const [documentData, setDocumentData] = useState<AdaptedDocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Extracted fetch function for reuse
  const fetchData = async () => {
    try {
      console.log('=== DOCUMENTS PAGE LOADING ===');
      const response = await DocumentApiService.getDocumentData();
      console.log('[DocumentsPage] API Response:', response);
      
      const adapted = DocumentAdapter.toUI(response);
      console.log('[DocumentsPage] Adapted Data:', adapted);
      
      setDocumentData(adapted);
    } catch (error) {
      console.error('[DocumentsPage] Error fetching document data:', error);
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
      const shouldRefresh = sessionStorage.getItem('document-data-updated');
      if (shouldRefresh === 'true') {
        console.log('=== DOCUMENT DATA UPDATED - REFETCHING ===');
        sessionStorage.removeItem('document-data-updated');
        setRefreshKey((prev) => prev + 1);
      }
    }, 500); // Poll every 500ms

    return () => clearInterval(interval);
  }, []);

  // Also refresh when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const shouldRefresh = sessionStorage.getItem('document-data-updated');
        if (shouldRefresh === 'true') {
          console.log('=== PAGE VISIBLE - REFETCHING DOCUMENT DATA ===');
          sessionStorage.removeItem('document-data-updated');
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
        <DocumentHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  if (!documentData || documentData.documents.length === 0) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <DocumentHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">No documents available</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D4D8DD]">
      <DocumentHeader />
      
      <main className="p-4">
        <DocumentCard documents={documentData.documents} />
      </main>
    </div>
  );
}
