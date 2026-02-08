'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactApiService } from '@/services/contact-api.service';
import { ContactDashboardAdapter, ContactDashboardData, ContactDashboardField } from '@/adapters/contact-dashboard.adapter';
import { ContactDashboardHeader } from '@/components/contact-dashboard/ContactDashboardHeader';
import { ContactFieldsSection } from '@/components/contact-dashboard/ContactFieldsSection';

interface ContactDashboardState {
  fields: Record<string, { enabled: boolean; value: string }>;
  fieldsOrder: string[];
}

export default function ContactDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<ContactDashboardData | null>(null);
  const [originalApiResponse, setOriginalApiResponse] = useState<any>(null);
  const [state, setState] = useState<ContactDashboardState>({
    fields: {},
    fieldsOrder: [],
  });

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      console.log('=== CONTACT DASHBOARD LOADING ===');

      // Fetch from SAME API as Contact Screen
      const apiResponse = await ContactApiService.getContactData();
      
      // Store original API response for updates
      setOriginalApiResponse(apiResponse);
      
      // Transform to dashboard format
      const dashboardData = ContactDashboardAdapter.toDashboard(apiResponse);
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

      console.log('Contact dashboard loaded:', { fieldsCount: dashboardData.fields.length });
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

  const handleFieldsReorder = (reorderedFields: ContactDashboardField[]) => {
    const newOrder = reorderedFields.map((f) => f.id);
    console.log('Reorder fields:', newOrder);
    setState((prev) => ({
      ...prev,
      fieldsOrder: newOrder,
    }));
  };

  const handleSave = async () => {
    if (!data || !originalApiResponse) return;

    console.log('=== SAVING CONTACT CHANGES ===');
    console.log('Contact dashboard state:', state);

    // Convert dashboard state back to API format
    const apiUpdate = ContactDashboardAdapter.toApiUpdate(data, state);
    console.log('API Update payload:', apiUpdate);

    // Save to API (updates mock data to persist changes)
    await ContactApiService.updateContactData(apiUpdate);
    console.log('Contact data saved to API service');

    // Set flag to notify Contact page to refresh
    sessionStorage.setItem('contact-data-updated', 'true');
    console.log('Set contact-data-updated flag in sessionStorage');

    alert('Contact settings saved successfully!');
  };

  const handleBack = () => {
    router.push('/profile/contact');
  };

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#94a3b8]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

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
    .filter((f) => f !== null) as ContactDashboardField[];

  return (
    <div className="h-screen flex flex-col bg-[#94a3b8]">
      {/* Sticky Header */}
      <ContactDashboardHeader onSave={handleSave} onBack={handleBack} />

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-6 pb-8">
          {/* Contact Fields Section */}
          <ContactFieldsSection
            fields={fieldsWithState}
            onToggle={handleFieldToggle}
            onValueChange={handleFieldValueChange}
            onReorder={handleFieldsReorder}
            getFieldDescription={ContactDashboardAdapter.getFieldDescription}
          />
        </div>
      </main>
    </div>
  );
}
