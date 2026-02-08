'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddressApiService } from '@/services/address-api.service';
import { AddressDashboardAdapter, AddressDashboardData, AddressDashboardField } from '@/adapters/address-dashboard.adapter';
import { AddressDashboardHeader } from '@/components/address-dashboard/AddressDashboardHeader';
import { AddressFieldsSection } from '@/components/address-dashboard/AddressFieldsSection';

interface AddressDashboardState {
  fields: Record<string, { enabled: boolean; value: string }>;
  fieldsOrder: string[];
}

export default function AddressDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<AddressDashboardData | null>(null);
  const [originalApiResponse, setOriginalApiResponse] = useState<any>(null);
  const [state, setState] = useState<AddressDashboardState>({
    fields: {},
    fieldsOrder: [],
  });

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      console.log('=== ADDRESS DASHBOARD LOADING ===');

      // Fetch from SAME API as Address Screen
      const apiResponse = await AddressApiService.getAddressData();
      
      // Store original API response for updates
      setOriginalApiResponse(apiResponse);
      
      // Transform to dashboard format
      const dashboardData = AddressDashboardAdapter.toDashboard(apiResponse);
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

      console.log('Address dashboard loaded:', { fieldsCount: dashboardData.fields.length });
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

  const handleFieldsReorder = (reorderedFields: AddressDashboardField[]) => {
    const newOrder = reorderedFields.map((f) => f.id);
    console.log('Reorder fields:', newOrder);
    setState((prev) => ({
      ...prev,
      fieldsOrder: newOrder,
    }));
  };

  const handleSave = async () => {
    if (!data || !originalApiResponse) return;

    console.log('=== SAVING ADDRESS CHANGES ===');
    console.log('Address dashboard state:', state);

    // Convert dashboard state back to API format
    const apiUpdate = AddressDashboardAdapter.toApiUpdate(data, state);
    console.log('API Update payload:', apiUpdate);

    // Save to API (updates mock data to persist changes)
    await AddressApiService.updateAddressData(apiUpdate);
    console.log('Address data saved to API service');

    // Set flag to notify Address page to refresh
    sessionStorage.setItem('address-data-updated', 'true');
    console.log('Set address-data-updated flag in sessionStorage');

    alert('Address settings saved successfully!');
  };

  const handleBack = () => {
    router.push('/profile/address');
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
    .filter((f) => f !== null) as AddressDashboardField[];

  return (
    <div className="h-screen flex flex-col bg-[#94a3b8]">
      {/* Sticky Header */}
      <AddressDashboardHeader onSave={handleSave} onBack={handleBack} />

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-6 pb-8">
          {/* Address Fields Section */}
          <AddressFieldsSection
            fields={fieldsWithState}
            onToggle={handleFieldToggle}
            onValueChange={handleFieldValueChange}
            onReorder={handleFieldsReorder}
            getFieldDescription={AddressDashboardAdapter.getFieldDescription}
          />
        </div>
      </main>
    </div>
  );
}
