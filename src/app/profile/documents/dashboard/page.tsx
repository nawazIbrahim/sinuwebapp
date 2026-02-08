'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentApiService } from '@/services/document-api.service';
import { DocumentDashboardAdapter, DocumentDashboardData, DocumentDashboardField } from '@/adapters/document-dashboard.adapter';
import { DocumentDashboardHeader } from '@/components/document-dashboard/DocumentDashboardHeader';
import { DocumentFieldsSection } from '@/components/document-dashboard/DocumentFieldsSection';

interface DocumentDashboardState {
  fields: Record<string, { enabled: boolean; title: string; description: string; fileUrl?: string; fileType?: string; fileSize?: string }>;
  fieldsOrder: string[];
}

export default function DocumentDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DocumentDashboardData | null>(null);
  const [originalApiResponse, setOriginalApiResponse] = useState<any>(null);
  const [state, setState] = useState<DocumentDashboardState>({
    fields: {},
    fieldsOrder: [],
  });

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      console.log('=== DOCUMENT DASHBOARD LOADING ===');

      // Fetch from SAME API as Document Screen
      const apiResponse = await DocumentApiService.getDocumentData();
      
      // Store original API response for updates
      setOriginalApiResponse(apiResponse);
      
      // Transform to dashboard format
      const dashboardData = DocumentDashboardAdapter.toDashboard(apiResponse);
      setData(dashboardData);

      // Initialize state
      const fieldsState: Record<string, { enabled: boolean; title: string; description: string; fileUrl?: string; fileType?: string; fileSize?: string }> = {};
      const fieldsOrder: string[] = [];

      dashboardData.fields.forEach((field) => {
        fieldsState[field.id] = {
          enabled: field.enabled,
          title: field.title,
          description: field.description,
          fileUrl: field.fileUrl,
          fileType: field.fileType,
          fileSize: field.fileSize,
        };
        fieldsOrder.push(field.id);
      });

      setState({
        fields: fieldsState,
        fieldsOrder: fieldsOrder,
      });

      console.log('Document dashboard loaded:', { fieldsCount: dashboardData.fields.length });
    };
    loadData();
  }, []);

  // Handlers
  const handleFieldToggle = (id: string, enabled: boolean) => {
    console.log(`Toggle field ${id}:`, enabled);
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [id]: {
          ...prev.fields[id],
          enabled,
        },
      },
    }));
  };

  const handleTitleChange = (id: string, title: string) => {
    console.log(`Update field ${id} title:`, title);
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [id]: {
          ...prev.fields[id],
          title,
        },
      },
    }));
  };

  const handleDescriptionChange = (id: string, description: string) => {
    console.log(`Update field ${id} description:`, description);
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [id]: {
          ...prev.fields[id],
          description,
        },
      },
    }));
  };

  const handleFileChange = (id: string, fileUrl: string, fileType: string, fileSize: string) => {
    console.log(`Update field ${id} file:`, { fileType, fileSize, url: fileUrl.substring(0, 50) + '...' });
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [id]: {
          ...prev.fields[id],
          fileUrl,
          fileType,
          fileSize,
        },
      },
    }));

    // Also update the data to reflect the change immediately
    if (data) {
      const updatedFields = data.fields.map(field => 
        field.id === id 
          ? { ...field, fileUrl, fileType, fileSize }
          : field
      );
      setData({ ...data, fields: updatedFields });
    }
  };

  const handleFieldsReorder = (reorderedFields: DocumentDashboardField[]) => {
    const newOrder = reorderedFields.map((f) => f.id);
    console.log('Reorder fields:', newOrder);
    setState((prev) => ({
      ...prev,
      fieldsOrder: newOrder,
    }));
  };

  const handleSave = async () => {
    if (!data || !originalApiResponse) return;

    console.log('=== SAVING DOCUMENT CHANGES ===');
    console.log('Document dashboard state:', state);

    // Convert dashboard state back to API format
    const apiUpdate = DocumentDashboardAdapter.toApiUpdate(data, state);
    console.log('API Update payload:', apiUpdate);

    // Save to API (updates mock data to persist changes)
    await DocumentApiService.updateDocumentData(apiUpdate);
    console.log('Document data saved to API service');

    // Set flag to notify Document page to refresh
    sessionStorage.setItem('document-data-updated', 'true');
    console.log('Set document-data-updated flag in sessionStorage');

    alert('Document settings saved successfully!');
  };

  const handleBack = () => {
    router.push('/profile/documents');
  };

  // Loading state
  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#94a3b8]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // Apply field state to data
  const fieldsWithState = state.fieldsOrder
    .map((id) => {
      const field = data.fields.find((f) => f.id === id);
      if (!field) return null;
      const fieldState = state.fields[id];
      return {
        ...field,
        enabled: fieldState?.enabled ?? field.enabled,
        title: fieldState?.title ?? field.title,
        description: fieldState?.description ?? field.description,
        fileUrl: fieldState?.fileUrl ?? field.fileUrl,
        fileType: fieldState?.fileType ?? field.fileType,
        fileSize: fieldState?.fileSize ?? field.fileSize,
      };
    })
    .filter((f) => f !== null) as DocumentDashboardField[];

  return (
    <div className="h-screen flex flex-col bg-[#94a3b8]">
      {/* Sticky Header */}
      <DocumentDashboardHeader onSave={handleSave} onBack={handleBack} />

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-6 pb-8">
          {/* Document Fields Section */}
          <DocumentFieldsSection
            fields={fieldsWithState}
            onToggle={handleFieldToggle}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            onFileChange={handleFileChange}
            onReorder={handleFieldsReorder}
            getFieldDescription={DocumentDashboardAdapter.getFieldDescription}
          />
        </div>
      </main>
    </div>
  );
}
