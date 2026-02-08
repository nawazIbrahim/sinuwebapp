'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GalleryApiService } from '@/services/gallery-api.service';
import { GalleryDashboardAdapter, GalleryDashboardData, GalleryDashboardField } from '@/adapters/gallery-dashboard.adapter';
import { GalleryDashboardHeader } from '@/components/gallery-dashboard/GalleryDashboardHeader';
import { GalleryFieldsSection } from '@/components/gallery-dashboard/GalleryFieldsSection';

interface GalleryDashboardState {
  fields: Record<string, { enabled: boolean; title: string; description: string; imageUrl?: string; thumbnailUrl?: string }>;
  fieldsOrder: string[];
}

export default function GalleryDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<GalleryDashboardData | null>(null);
  const [originalApiResponse, setOriginalApiResponse] = useState<any>(null);
  const [state, setState] = useState<GalleryDashboardState>({
    fields: {},
    fieldsOrder: [],
  });

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      console.log('=== GALLERY DASHBOARD LOADING ===');

      // Fetch from SAME API as Gallery Screen
      const apiResponse = await GalleryApiService.getGalleryData();
      
      // Store original API response for updates
      setOriginalApiResponse(apiResponse);
      
      // Transform to dashboard format
      const dashboardData = GalleryDashboardAdapter.toDashboard(apiResponse);
      setData(dashboardData);

      // Initialize state
      const fieldsState: Record<string, { enabled: boolean; title: string; description: string; imageUrl?: string; thumbnailUrl?: string }> = {};
      const fieldsOrder: string[] = [];

      dashboardData.fields.forEach((field) => {
        fieldsState[field.id] = {
          enabled: field.enabled,
          title: field.title,
          description: field.description,
          imageUrl: field.imageUrl,
          thumbnailUrl: field.thumbnailUrl,
        };
        fieldsOrder.push(field.id);
      });

      setState({
        fields: fieldsState,
        fieldsOrder: fieldsOrder,
      });

      console.log('Gallery dashboard loaded:', { fieldsCount: dashboardData.fields.length });
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

  const handleImageChange = (id: string, imageUrl: string, thumbnailUrl: string) => {
    console.log(`Update field ${id} image:`, { imageUrl: imageUrl.substring(0, 50) + '...', thumbnailUrl: thumbnailUrl.substring(0, 50) + '...' });
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [id]: {
          ...prev.fields[id],
          imageUrl,
          thumbnailUrl,
        },
      },
    }));

    // Also update the data to reflect the change immediately
    if (data) {
      const updatedFields = data.fields.map(field => 
        field.id === id 
          ? { ...field, imageUrl, thumbnailUrl }
          : field
      );
      setData({ ...data, fields: updatedFields });
    }
  };

  const handleFieldsReorder = (reorderedFields: GalleryDashboardField[]) => {
    const newOrder = reorderedFields.map((f) => f.id);
    console.log('Reorder fields:', newOrder);
    setState((prev) => ({
      ...prev,
      fieldsOrder: newOrder,
    }));
  };

  const handleSave = async () => {
    if (!data || !originalApiResponse) return;

    console.log('=== SAVING GALLERY CHANGES ===');
    console.log('Gallery dashboard state:', state);

    // Convert dashboard state back to API format
    const apiUpdate = GalleryDashboardAdapter.toApiUpdate(data, state);
    console.log('API Update payload:', apiUpdate);

    // Save to API (updates mock data to persist changes)
    await GalleryApiService.updateGalleryData(apiUpdate);
    console.log('Gallery data saved to API service');

    // Set flag to notify Gallery page to refresh
    sessionStorage.setItem('gallery-data-updated', 'true');
    console.log('Set gallery-data-updated flag in sessionStorage');

    alert('Gallery settings saved successfully!');
  };

  const handleBack = () => {
    router.push('/profile/gallery');
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
        imageUrl: fieldState?.imageUrl ?? field.imageUrl,
        thumbnailUrl: fieldState?.thumbnailUrl ?? field.thumbnailUrl,
      };
    })
    .filter((f) => f !== null) as GalleryDashboardField[];

  return (
    <div className="h-screen flex flex-col bg-[#94a3b8]">
      {/* Sticky Header */}
      <GalleryDashboardHeader onSave={handleSave} onBack={handleBack} />

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-6 pb-8">
          {/* Gallery Fields Section */}
          <GalleryFieldsSection
            fields={fieldsWithState}
            onToggle={handleFieldToggle}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            onImageChange={handleImageChange}
            onReorder={handleFieldsReorder}
            getFieldDescription={GalleryDashboardAdapter.getFieldDescription}
          />
        </div>
      </main>
    </div>
  );
}
