'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersonalApiService } from '@/services/personal-api.service';
import { PersonalDashboardAdapter, PersonalDashboardData, PersonalDashboardField } from '@/adapters/personal-dashboard.adapter';
import { PersonalDashboardHeader } from '@/components/personal-dashboard/PersonalDashboardHeader';
import { PersonalFieldsSection } from '@/components/personal-dashboard/PersonalFieldsSection';

interface PersonalDashboardState {
  fields: Record<string, { enabled: boolean; value: string }>;
  fieldsOrder: string[];
}

export default function PersonalDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<PersonalDashboardData | null>(null);
  const [originalApiResponse, setOriginalApiResponse] = useState<any>(null);
  const [state, setState] = useState<PersonalDashboardState>({
    fields: {},
    fieldsOrder: [],
  });

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      console.log('=== PERSONAL DASHBOARD LOADING ===');

      // Fetch from SAME API as Personal Screen
      const apiResponse = await PersonalApiService.getPersonalData();
      
      // Store original API response for updates
      setOriginalApiResponse(apiResponse);
      
      // Transform to dashboard format
      const dashboardData = PersonalDashboardAdapter.toDashboard(apiResponse);
      setData(dashboardData);

      // Initialize state
      const fieldsState: Record<string, { enabled: boolean; value: string }> = {};
      const fieldsOrder: string[] = [];

      dashboardData.fields.forEach((field) => {
        fieldsState[field.id] = {
          enabled: field.enabled,
          value: field.value,
        };
        fieldsOrder.push(field.id);
      });

      setState({
        fields: fieldsState,
        fieldsOrder: fieldsOrder,
      });

      console.log('Personal dashboard loaded:', { fieldsCount: dashboardData.fields.length });
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

  const handleFieldValueChange = (id: string, value: string) => {
    console.log(`Update field ${id} value:`, value);
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [id]: {
          ...prev.fields[id],
          value,
        },
      },
    }));
  };

  const handleFieldsReorder = (reorderedFields: PersonalDashboardField[]) => {
    const newOrder = reorderedFields.map((f) => f.id);
    console.log('Reorder fields:', newOrder);
    setState((prev) => ({
      ...prev,
      fieldsOrder: newOrder,
    }));
  };

  const handleSave = async () => {
    if (!data || !originalApiResponse) return;

    console.log('=== SAVING PERSONAL CHANGES ===');
    console.log('Personal dashboard state:', state);

    // Convert dashboard state back to API format
    const apiUpdate = PersonalDashboardAdapter.toApiUpdate(data, state);
    console.log('API Update payload:', apiUpdate);

    // Save to API (updates mock data to persist changes)
    await PersonalApiService.updatePersonalData(apiUpdate);
    console.log('Personal data saved to API service');

    // Set flag to notify Personal page to refresh
    sessionStorage.setItem('personal-data-updated', 'true');
    console.log('Set personal-data-updated flag in sessionStorage');

    alert('Personal settings saved successfully!');
  };

  const handleBack = () => {
    router.push('/profile/personal');
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
        value: fieldState?.value ?? field.value,
      };
    })
    .filter((f) => f !== null) as PersonalDashboardField[];

  return (
    <div className="h-screen flex flex-col bg-[#94a3b8]">
      {/* Sticky Header */}
      <PersonalDashboardHeader onSave={handleSave} onBack={handleBack} />

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-6 pb-8">
          {/* Personal Fields Section */}
          <PersonalFieldsSection
            fields={fieldsWithState}
            onToggle={handleFieldToggle}
            onValueChange={handleFieldValueChange}
            onReorder={handleFieldsReorder}
            getFieldDescription={PersonalDashboardAdapter.getFieldDescription}
          />
        </div>
      </main>
    </div>
  );
}
