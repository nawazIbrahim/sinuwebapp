'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LinkApiService } from '@/services/link-api.service';
import { LinksDashboardAdapter, LinksDashboardData, LinksDashboardField } from '@/adapters/links-dashboard.adapter';
import { LinksDashboardHeader } from '@/components/links-dashboard/LinksDashboardHeader';
import { LinksFieldsSection } from '@/components/links-dashboard/LinksFieldsSection';

interface LinksDashboardState {
  fields: Record<string, { enabled: boolean; label?: string; description?: string; linkText?: string; linkUrl?: string }>;
  fieldsOrder: string[];
}

export default function LinksDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<LinksDashboardData | null>(null);
  const [state, setState] = useState<LinksDashboardState>({
    fields: {},
    fieldsOrder: [],
  });

  useEffect(() => {
    const loadData = async () => {
      console.log('=== LINKS DASHBOARD LOADING ===');
      const apiResponse = await LinkApiService.getLinkData();
      const dashboardData = LinksDashboardAdapter.toDashboard(apiResponse);
      setData(dashboardData);

      const fieldsState: Record<string, { enabled: boolean; label?: string; description?: string; linkText?: string; linkUrl?: string }> = {};
      const fieldsOrder: string[] = [];

      dashboardData.fields.forEach((field) => {
        fieldsState[field.id] = {
          enabled: field.enabled,
          label: field.label,
          description: field.description,
          linkText: field.linkText,
          linkUrl: field.linkUrl,
        };
        fieldsOrder.push(field.id);
      });

      setState({ fields: fieldsState, fieldsOrder });
      console.log('Links dashboard loaded:', { fieldsCount: dashboardData.fields.length });
    };
    loadData();
  }, []);

  const handleFieldToggle = (id: string, enabled: boolean) => {
    setState((prev) => ({
      ...prev,
      fields: { ...prev.fields, [id]: { ...prev.fields[id], enabled } },
    }));
  };

  const handleLabelChange = (id: string, value: string) => {
    setState((prev) => ({
      ...prev,
      fields: { ...prev.fields, [id]: { ...prev.fields[id], label: value } },
    }));
  };

  const handleDescriptionChange = (id: string, value: string) => {
    setState((prev) => ({
      ...prev,
      fields: { ...prev.fields, [id]: { ...prev.fields[id], description: value } },
    }));
  };

  const handleLinkTextChange = (id: string, value: string) => {
    setState((prev) => ({
      ...prev,
      fields: { ...prev.fields, [id]: { ...prev.fields[id], linkText: value } },
    }));
  };

  const handleLinkUrlChange = (id: string, value: string) => {
    setState((prev) => ({
      ...prev,
      fields: { ...prev.fields, [id]: { ...prev.fields[id], linkUrl: value } },
    }));
  };

  const handleFieldsReorder = (reorderedFields: LinksDashboardField[]) => {
    setState((prev) => ({
      ...prev,
      fieldsOrder: reorderedFields.map((f) => f.id),
    }));
  };

  const handleSave = async () => {
    if (!data) return;
    console.log('=== SAVING LINKS CHANGES ===');
    const apiUpdate = LinksDashboardAdapter.toApiUpdate(data, state);
    await LinkApiService.updateLinkData(apiUpdate);
    sessionStorage.setItem('links-data-updated', 'true');
    alert('Link settings saved successfully!');
    router.push('/profile/links');
  };

  const handleBack = () => {
    router.push('/profile/links');
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
        label: fieldState?.label ?? field.label,
        description: fieldState?.description ?? field.description,
        linkText: fieldState?.linkText ?? field.linkText,
        linkUrl: fieldState?.linkUrl ?? field.linkUrl,
      };
    })
    .filter((f) => f !== null) as LinksDashboardField[];

  return (
    <div className="h-screen flex flex-col bg-[#94a3b8]">
      <LinksDashboardHeader onSave={handleSave} onBack={handleBack} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-6 pb-8">
          <LinksFieldsSection
            fields={fieldsWithState}
            onToggle={handleFieldToggle}
            onLabelChange={handleLabelChange}
            onDescriptionChange={handleDescriptionChange}
            onLinkTextChange={handleLinkTextChange}
            onLinkUrlChange={handleLinkUrlChange}
            onReorder={handleFieldsReorder}
          />
        </div>
      </main>
    </div>
  );
}
