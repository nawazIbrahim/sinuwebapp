'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactApiService } from '@/services/contact-api.service';
import { ContactDashboardAdapter, ContactDashboardData, ContactDashboardField } from '@/adapters/contact-dashboard.adapter';
import { ModuleDashboardHeader } from '@/components/module-dashboard/ModuleDashboardHeader';
import { ModuleFieldsSection } from '@/components/module-dashboard/ModuleFieldsSection';

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

  useEffect(() => {
    const loadData = async () => {
      const apiResponse = await ContactApiService.getContactData();
      setOriginalApiResponse(apiResponse);
      
      const dashboardData = ContactDashboardAdapter.toDashboard(apiResponse);
      setData(dashboardData);

      const fieldsState: Record<string, { enabled: boolean; value: string }> = {};
      const fieldsOrder: string[] = [];

      dashboardData.fields.forEach((field) => {
        fieldsState[field.id] = { enabled: field.enabled, value: field.value };
        fieldsOrder.push(field.id);
      });

      setState({ fields: fieldsState, fieldsOrder });
    };
    loadData();
  }, []);

  const handleFieldToggle = (id: string, enabled: boolean) => {
    setState((prev) => ({
      ...prev,
      fields: { ...prev.fields, [id]: { ...prev.fields[id], enabled } },
    }));
  };

  const handleFieldValueChange = (id: string, value: string) => {
    setState((prev) => ({
      ...prev,
      fields: { ...prev.fields, [id]: { ...prev.fields[id], value } },
    }));
  };

  const handleFieldsReorder = (reorderedFields: ContactDashboardField[]) => {
    setState((prev) => ({
      ...prev,
      fieldsOrder: reorderedFields.map((f) => f.id),
    }));
  };

  const handleSave = async () => {
    if (!data || !originalApiResponse) return;

    const apiUpdate = ContactDashboardAdapter.toApiUpdate(data, state);
    await ContactApiService.updateContactData(apiUpdate);

    sessionStorage.setItem('contact-data-updated', 'true');
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
      <ModuleDashboardHeader title="Contact Settings" onSave={handleSave} onBack={handleBack} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-6 pb-8">
          <ModuleFieldsSection
            title="Contact Information Fields"
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
