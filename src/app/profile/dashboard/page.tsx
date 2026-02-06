'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileApiService } from '@/services/profile-api.service';
import { DashboardAdapter, DashboardData } from '@/adapters/dashboard.adapter';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ProfileIdentityCard } from '@/components/dashboard/ProfileIdentityCard';
import { QuickActionsSection } from '@/components/dashboard/QuickActionsSection';
import { ProfileModulesSection } from '@/components/dashboard/ProfileModulesSection';
import { EmergencyToggleCard } from '@/components/dashboard/EmergencyToggleCard';

interface DashboardState {
  quickActions: Record<string, boolean>;
  modules: Record<string, boolean>;
  modulesOrder: string[]; // Track the order of module IDs
  emergencyEnabled: boolean;
  profile: {
    name: string;
    title: string;
    description: string;
    avatarUrl: string;
  };
}

export default function ProfileDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [originalApiResponse, setOriginalApiResponse] = useState<any>(null);
  const [state, setState] = useState<DashboardState>({
    quickActions: {},
    modules: {},
    modulesOrder: [],
    emergencyEnabled: true,
    profile: {
      name: '',
      title: '',
      description: '',
      avatarUrl: '',
    },
  });

  // Load data on mount - USES SAME API AS PROFILE SCREEN
  useEffect(() => {
    const loadData = async () => {
      // Fetch from SAME API as Profile Screen
      const apiResponse = await ProfileApiService.getProfileData();
      
      // Store original API response for updates
      setOriginalApiResponse(apiResponse);
      
      // Transform to dashboard format
      const dashboardData = DashboardAdapter.toDashboard(apiResponse);
      setData(dashboardData);

      // Initialize state from data
      const quickActionsState: Record<string, boolean> = {};
      dashboardData.quickActions.forEach((action) => {
        quickActionsState[action.id] = action.enabled;
      });

      const modulesState: Record<string, boolean> = {};
      const modulesOrder: string[] = [];
      dashboardData.modules.forEach((module) => {
        modulesState[module.id] = module.enabled;
        modulesOrder.push(module.id);
      });

      setState({
        quickActions: quickActionsState,
        modules: modulesState,
        modulesOrder: modulesOrder,
        emergencyEnabled: dashboardData.emergency.enabled,
        profile: {
          name: dashboardData.profile.name,
          title: dashboardData.profile.title,
          description: dashboardData.profile.description,
          avatarUrl: dashboardData.profile.avatarUrl,
        },
      });
    };

    loadData();
  }, []);

  // Handlers
  const handleQuickActionToggle = (id: string, enabled: boolean) => {
    setState((prev) => ({
      ...prev,
      quickActions: {
        ...prev.quickActions,
        [id]: enabled,
      },
    }));
  };

  const handleModuleToggle = (id: string, enabled: boolean) => {
    setState((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [id]: enabled,
      },
    }));
  };

  const handleModuleSettings = (id: string) => {
    console.log('Open settings for module:', id);
    
    // Map module ID to dashboard route
    const dashboardRoutes: Record<string, string> = {
      personal: '/profile/personal/dashboard',
      contact: '/profile/contact/dashboard',
      address: '/profile/address/dashboard',
      professional: '/profile/professional/dashboard',
      links: '/profile/links/dashboard',
      'social-media': '/profile/social-media/dashboard',
      skills: '/profile/skills/dashboard',
      documents: '/profile/documents/dashboard',
      gallery: '/profile/gallery/dashboard',
      customFields: '/profile/customFields/dashboard',
    };

    const route = dashboardRoutes[id];
    if (route) {
      console.log('Navigating to:', route);
      router.push(route);
    } else {
      console.warn(`No dashboard route found for module: ${id}`);
      alert(`Dashboard for "${id}" is not yet implemented.`);
    }
  };

  const handleEmergencyToggle = (enabled: boolean) => {
    setState((prev) => ({
      ...prev,
      emergencyEnabled: enabled,
    }));
  };

  const handleModulesReorder = (reorderedModules: any[]) => {
    const newOrder = reorderedModules.map(m => m.id);
    setState((prev) => ({
      ...prev,
      modulesOrder: newOrder,
    }));
  };

  const handleProfileUpdate = (updates: { name?: string; title?: string; description?: string; avatarUrl?: string }) => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updates,
      },
    }));
  };

  const handleSave = async () => {
    if (!data || !originalApiResponse) return;

    console.log('=== SAVING CHANGES ===');
    console.log('Dashboard state:', state);
    
    // Convert dashboard state back to API format
    const apiUpdate = DashboardAdapter.toApiUpdate(data, state, originalApiResponse);
    console.log('API Update payload:', apiUpdate);
    
    // Save to API (updates mock data to persist changes)
    await ProfileApiService.updateProfileData(apiUpdate);
    console.log('Data saved to API service');
    
    // Set flag to notify Profile page to refresh
    sessionStorage.setItem('profile-data-updated', 'true');
    console.log('Set profile-data-updated flag in sessionStorage');
    
    alert('Settings saved successfully!');
  };

  const handleBack = () => {
    router.push('/profile');
  };

  // Loading state
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#94a3b8]">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  // Apply quick action state to data
  const quickActionsWithState = data.quickActions.map((action) => ({
    ...action,
    enabled: state.quickActions[action.id] ?? action.enabled,
  }));

  // Apply module state to data and reorder based on state.modulesOrder
  const modulesWithState = state.modulesOrder
    .map((id) => {
      const moduleItem = data.modules.find((m) => m.id === id);
      if (!moduleItem) return null;
      return {
        ...moduleItem,
        enabled: state.modules[moduleItem.id] ?? moduleItem.enabled,
      };
    })
    .filter((m) => m !== null) as typeof data.modules;

  return (
    <div className="h-screen flex flex-col bg-[#94a3b8]">
      {/* Sticky Header */}
      <DashboardHeader onSave={handleSave} onBack={handleBack} />

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-6 pb-8 flex flex-col gap-4">
          {/* Profile Identity */}
          <ProfileIdentityCard
            name={state.profile.name}
            title={state.profile.title}
            description={state.profile.description}
            avatarUrl={state.profile.avatarUrl}
            onUpdate={handleProfileUpdate}
          />

          {/* Quick Actions */}
          <QuickActionsSection
            actions={quickActionsWithState}
            onToggle={handleQuickActionToggle}
          />

          {/* Profile Modules */}
          <ProfileModulesSection
            modules={modulesWithState}
            onToggle={handleModuleToggle}
            onSettings={handleModuleSettings}
            onReorder={handleModulesReorder}
          />

          {/* Emergency Info */}
          <EmergencyToggleCard
            enabled={state.emergencyEnabled}
            onChange={handleEmergencyToggle}
          />
        </div>
      </main>
    </div>
  );
}
