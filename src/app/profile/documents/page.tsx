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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('[DocumentsPage] Fetching document data...');
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

    fetchData();
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
