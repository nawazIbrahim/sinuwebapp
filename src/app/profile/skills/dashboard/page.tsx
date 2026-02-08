'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SkillsApiService } from '@/services/skills-api.service';
import { SkillsDashboardAdapter, SkillsDashboardData, SkillsDashboardField } from '@/adapters/skills-dashboard.adapter';
import { SkillsDashboardHeader } from '@/components/skills-dashboard/SkillsDashboardHeader';
import { SkillsFieldsSection } from '@/components/skills-dashboard/SkillsFieldsSection';

interface SkillsDashboardState {
  fields: Record<string, { enabled: boolean; value: string; title?: string; duration?: string }>;
  fieldsOrder: string[];
}

export default function SkillsDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<SkillsDashboardData | null>(null);
  const [originalApiResponse, setOriginalApiResponse] = useState<any>(null);
  const [state, setState] = useState<SkillsDashboardState>({
    fields: {},
    fieldsOrder: [],
  });

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      console.log('=== SKILLS DASHBOARD LOADING ===');

      // Fetch from SAME API as Skills Screen
      const apiResponse = await SkillsApiService.getSkillsData();
      
      // Store original API response for updates
      setOriginalApiResponse(apiResponse);
      
      // Transform to dashboard format
      const dashboardData = SkillsDashboardAdapter.toDashboard(apiResponse);
      setData(dashboardData);

      // Initialize state
      const fieldsState: Record<string, { enabled: boolean; value: string; title?: string; duration?: string }> = {};
      const fieldsOrder: string[] = [];

      dashboardData.fields.forEach((field) => {
        fieldsState[field.id] = {
          enabled: field.enabled,
          value: field.value,
          title: field.label,
          duration: field.duration,
        };
        fieldsOrder.push(field.id);
      });

      setState({
        fields: fieldsState,
        fieldsOrder: fieldsOrder,
      });

      console.log('Skills dashboard loaded:', { fieldsCount: dashboardData.fields.length });
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

  const handleExperienceChange = (id: string, duration: string) => {
    console.log(`Update field ${id} experience:`, duration);
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [id]: {
          ...prev.fields[id],
          duration,
        },
      },
    }));
  };

  const handleFieldsReorder = (reorderedFields: SkillsDashboardField[]) => {
    const newOrder = reorderedFields.map((f) => f.id);
    console.log('Reorder fields:', newOrder);
    setState((prev) => ({
      ...prev,
      fieldsOrder: newOrder,
    }));
  };

  const handleSave = async () => {
    if (!data || !originalApiResponse) return;

    console.log('=== SAVING SKILLS CHANGES ===');
    console.log('Skills dashboard state:', state);

    // Convert dashboard state back to API format
    const apiUpdate = SkillsDashboardAdapter.toApiUpdate(data, state);
    console.log('API Update payload:', apiUpdate);

    // Save to API (updates mock data to persist changes)
    await SkillsApiService.updateSkillsData(apiUpdate);
    console.log('Skills data saved to API service');

    // Set flag to notify Skills page to refresh
    sessionStorage.setItem('skills-data-updated', 'true');
    console.log('Set skills-data-updated flag in sessionStorage');

    alert('Skills settings saved successfully!');
  };

  const handleBack = () => {
    router.push('/profile/skills');
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
        label: fieldState?.title ?? field.label,
        duration: fieldState?.duration ?? field.duration,
      };
    })
    .filter((f) => f !== null) as SkillsDashboardField[];

  return (
    <div className="h-screen flex flex-col bg-[#94a3b8]">
      {/* Sticky Header */}
      <SkillsDashboardHeader onSave={handleSave} onBack={handleBack} />

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-6 pb-8">
          {/* Skills Fields Section */}
          <SkillsFieldsSection
            fields={fieldsWithState}
            onToggle={handleFieldToggle}
            onTitleChange={handleTitleChange}
            onValueChange={handleFieldValueChange}
            onExperienceChange={handleExperienceChange}
            onReorder={handleFieldsReorder}
          />
        </div>
      </main>
    </div>
  );
}
