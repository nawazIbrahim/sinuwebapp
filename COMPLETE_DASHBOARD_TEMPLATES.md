# Complete Dashboard Implementation Templates 🚀

## Implementation Status

| Module | Status | Files Created |
|--------|--------|---------------|
| **Personal** | ✅ **COMPLETE** | All files + sync working |
| **Contact** | ✅ **COMPLETE** | All files + sync working |
| **Professional** | ✅ Adapter created | Need: Page, Header update, Sync |
| **Address** | ✅ Adapter created | Need: Page, Header update, Sync |
| Links | ⏳ Pending | Need: Adapter, Page, Header, Sync |
| Social Media | ⏳ Pending | Need: Adapter, Page, Header, Sync |
| Skills | ⏳ Pending | Need: Adapter, Page, Header, Sync |
| Documents | ⏳ Pending | Need: Adapter, Page, Header, Sync |
| Gallery | ⏳ Pending | Need: Adapter, Page, Header, Sync |
| Emergency | ⏳ Pending | Need: Adapter, Page, Header, Sync |

---

## ✅ Completed & Working

###  1. **Personal Dashboard** - FULLY FUNCTIONAL
- ✅ Adapter: `src/adapters/personal-dashboard.adapter.ts`
- ✅ Components: Reusable module-dashboard components
- ✅ Page: `src/app/profile/personal/dashboard/page.tsx`
- ✅ Header: Settings icon added
- ✅ Sync: sessionStorage flag mechanism working
- ✅ **Status:** Production-ready, all features working!

### 2. **Contact Dashboard** - FULLY FUNCTIONAL
- ✅ Adapter: `src/adapters/contact-dashboard.adapter.ts`
- ✅ Page: `src/app/profile/contact/dashboard/page.tsx`
- ✅ Header: Settings icon added to `ContactHeader.tsx`
- ✅ Sync: Added to `src/app/profile/contact/page.tsx`
- ✅ **Status:** Production-ready, all features working!

---

## 📋 Template Files for Remaining Modules

### **Template 1: Dashboard Adapter**

Use this template for each module (replace [MODULE] with module name):

```typescript
// src/adapters/[module]-dashboard.adapter.ts

import { [Module]ApiResponse, [Module]FieldItem } from '@/types/[module]';

export interface [Module]DashboardField {
  id: string;
  field: string;
  label: string;
  value: string;
  enabled: boolean;
  displayOrder: number;
  originalData: [Module]FieldItem;
}

export interface [Module]DashboardData {
  accountID: number;
  group: string;
  fields: [Module]DashboardField[];
}

export class [Module]DashboardAdapter {
  static toDashboard(apiResponse: [Module]ApiResponse): [Module]DashboardData {
    const { accountID, group, fieldList } = apiResponse.data;
    const fields: [Module]DashboardField[] = fieldList
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((field) => ({
        id: field.field,
        field: field.field,
        label: field.label,
        value: field.value,
        enabled: field.isVisible,
        displayOrder: field.displayOrder,
        originalData: field,
      }));
    return { accountID, group, fields };
  }

  static toApiUpdate(
    dashboardData: [Module]DashboardData,
    updatedState: {
      fields: Record<string, { enabled: boolean; value: string }>;
      fieldsOrder: string[];
    }
  ): Partial<[Module]ApiResponse['data']> {
    const fieldsById = new Map(dashboardData.fields.map((field) => [field.id, field]));
    const updatedFields = updatedState.fieldsOrder
      .map((id, index) => {
        const field = fieldsById.get(id);
        if (!field) return null;
        const fieldState = updatedState.fields[id];
        return {
          ...field.originalData,
          value: fieldState?.value ?? field.value,
          isVisible: fieldState?.enabled ?? field.enabled,
          displayOrder: index + 1,
        };
      })
      .filter((f) => f !== null) as [Module]FieldItem[];
    return { fieldList: updatedFields };
  }

  static getFieldDescription(field: string): string {
    const descriptions: Record<string, string> = {
      // Add field descriptions here
    };
    return descriptions[field] || '[Module] information';
  }
}
```

---

### **Template 2: Dashboard Page**

Use this template for each module dashboard page:

```typescript
// src/app/profile/[module]/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { [Module]ApiService } from '@/services/[module]-api.service';
import { [Module]DashboardAdapter, [Module]DashboardData, [Module]DashboardField } from '@/adapters/[module]-dashboard.adapter';
import { ModuleDashboardHeader } from '@/components/module-dashboard/ModuleDashboardHeader';
import { ModuleFieldsSection } from '@/components/module-dashboard/ModuleFieldsSection';

interface [Module]DashboardState {
  fields: Record<string, { enabled: boolean; value: string }>;
  fieldsOrder: string[];
}

export default function [Module]DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<[Module]DashboardData | null>(null);
  const [originalApiResponse, setOriginalApiResponse] = useState<any>(null);
  const [state, setState] = useState<[Module]DashboardState>({
    fields: {},
    fieldsOrder: [],
  });

  useEffect(() => {
    const loadData = async () => {
      const apiResponse = await [Module]ApiService.get[Module]Data();
      setOriginalApiResponse(apiResponse);
      
      const dashboardData = [Module]DashboardAdapter.toDashboard(apiResponse);
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

  const handleFieldsReorder = (reorderedFields: [Module]DashboardField[]) => {
    setState((prev) => ({
      ...prev,
      fieldsOrder: reorderedFields.map((f) => f.id),
    }));
  };

  const handleSave = async () => {
    if (!data || !originalApiResponse) return;

    const apiUpdate = [Module]DashboardAdapter.toApiUpdate(data, state);
    await [Module]ApiService.update[Module]Data(apiUpdate);

    sessionStorage.setItem('[module]-data-updated', 'true');
    alert('[Module] settings saved successfully!');
  };

  const handleBack = () => {
    router.push('/profile/[module]');
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
    .filter((f) => f !== null) as [Module]DashboardField[];

  return (
    <div className="h-screen flex flex-col bg-[#94a3b8]">
      <ModuleDashboardHeader 
        title="[Module] Settings" 
        onSave={handleSave} 
        onBack={handleBack} 
      />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-6 pb-8">
          <ModuleFieldsSection
            title="[Module] Information Fields"
            fields={fieldsWithState}
            onToggle={handleFieldToggle}
            onValueChange={handleFieldValueChange}
            onReorder={handleFieldsReorder}
            getFieldDescription={[Module]DashboardAdapter.getFieldDescription}
          />
        </div>
      </main>
    </div>
  );
}
```

---

### **Template 3: Update Module Header (Add Settings Icon)**

Add this to each module's header component:

```typescript
// src/components/[module]/[Module]Header.tsx

// Add to imports
import { useRouter } from 'next/navigation';

// Add handler
const handleSettings = () => {
  router.push('/profile/[module]/dashboard');
};

// Update header JSX to use justify-between and add Settings button:
<header className="sticky top-0 z-50 bg-gray-200 border-b border-gray-200 shadow-sm px-4 h-16 flex items-center justify-between">
  <div className="flex items-center gap-4">
    <button ... >Back button</button>
    <h1>[Module] Title</h1>
  </div>
  
  {/* Settings Button */}
  <button
    type="button"
    onClick={handleSettings}
    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300 transition-colors active:scale-95 touch-manipulation"
    aria-label="Settings"
  >
    <span className="material-symbols-outlined text-gray-800 pointer-events-none">settings</span>
  </button>
</header>
```

---

### **Template 4: Add Sync to Module Page**

Add this to each module's main page:

```typescript
// src/app/profile/[module]/page.tsx

// Add to state
const [refreshKey, setRefreshKey] = useState(0);

// Extract load function
const load[Module] = async () => {
  setIsLoading(true);
  try {
    const apiResponse = await [Module]ApiService.get[Module]Data();
    const adapted = [Module]Adapter.adapt(apiResponse);
    set[Module]Data(adapted);
  } catch (error) {
    console.error('Error loading [module]:', error);
  } finally {
    setIsLoading(false);
  }
};

// Replace useEffect
useEffect(() => {
  load[Module]();
}, [refreshKey]);

// Add sessionStorage check
useEffect(() => {
  const checkForUpdates = () => {
    const shouldRefresh = sessionStorage.getItem('[module]-data-updated');
    if (shouldRefresh === 'true') {
      console.log('=== [MODULE] DATA UPDATED - REFETCHING ===');
      sessionStorage.removeItem('[module]-data-updated');
      setRefreshKey(prev => prev + 1);
    }
  };
  checkForUpdates();
  const interval = setInterval(checkForUpdates, 500);
  return () => clearInterval(interval);
}, []);

// Add visibility listener
useEffect(() => {
  const handleVisibilityChange = () => {
    if (!document.hidden) setRefreshKey(prev => prev + 1);
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

---

## 🎯 Quick Implementation Checklist

For each remaining module, follow these steps:

### Professional Dashboard
- [x] Create adapter: `src/adapters/professional-dashboard.adapter.ts` ✅
- [ ] Create page: `src/app/profile/professional/dashboard/page.tsx`
- [ ] Update header: `src/components/professional/ProfessionalHeader.tsx`
- [ ] Add sync: `src/app/profile/professional/page.tsx`
- [ ] Test: Settings → Dashboard → Edit → Save → Back → Changes reflected

### Address Dashboard
- [x] Create adapter: `src/adapters/address-dashboard.adapter.ts` ✅
- [ ] Create page: `src/app/profile/address/dashboard/page.tsx`
- [ ] Update header: `src/components/address/AddressHeader.tsx`
- [ ] Add sync: `src/app/profile/address/page.tsx`
- [ ] Test: Settings → Dashboard → Edit → Save → Back → Changes reflected

### Links Dashboard
- [ ] Create adapter: `src/adapters/links-dashboard.adapter.ts`
- [ ] Create page: `src/app/profile/links/dashboard/page.tsx`
- [ ] Update header: `src/components/link/LinkHeader.tsx`
- [ ] Add sync: `src/app/profile/links/page.tsx`
- [ ] Test: Settings → Dashboard → Edit → Save → Back → Changes reflected

### Skills Dashboard
- [ ] Create adapter: `src/adapters/skills-dashboard.adapter.ts`
- [ ] Create page: `src/app/profile/skills/dashboard/page.tsx`
- [ ] Update header: `src/components/skills/SkillsHeader.tsx`
- [ ] Add sync: `src/app/profile/skills/page.tsx`
- [ ] Test: Settings → Dashboard → Edit → Save → Back → Changes reflected

### Documents Dashboard
- [ ] Create adapter: `src/adapters/documents-dashboard.adapter.ts`
- [ ] Create page: `src/app/profile/documents/dashboard/page.tsx`
- [ ] Update header: `src/components/document/DocumentHeader.tsx`
- [ ] Add sync: `src/app/profile/documents/page.tsx`
- [ ] Test: Settings → Dashboard → Edit → Save → Back → Changes reflected

### Social Media Dashboard
- [ ] Create adapter: `src/adapters/social-media-dashboard.adapter.ts`
- [ ] Create page: `src/app/profile/social-media/dashboard/page.tsx`
- [ ] Update header: `src/components/socialMedia/SocialMediaHeader.tsx`
- [ ] Add sync: `src/app/profile/social-media/page.tsx`
- [ ] Test: Settings → Dashboard → Edit → Save → Back → Changes reflected

### Gallery Dashboard
- [ ] Create adapter: `src/adapters/gallery-dashboard.adapter.ts`
- [ ] Create page: `src/app/profile/gallery/dashboard/page.tsx`
- [ ] Update header: `src/components/gallery/GalleryHeader.tsx`
- [ ] Add sync: `src/app/profile/gallery/page.tsx`
- [ ] Test: Settings → Dashboard → Edit → Save → Back → Changes reflected

### Emergency Dashboard
- [ ] Create adapter: `src/adapters/emergency-dashboard.adapter.ts`
- [ ] Create page: `src/app/profile/emergency/dashboard/page.tsx`
- [ ] Update header: `src/components/emergency/EmergencyHeader.tsx`
- [ ] Add sync: `src/app/profile/emergency/page.tsx`
- [ ] Test: Settings → Dashboard → Edit → Save → Back → Changes reflected

---

## 📝 Implementation Notes

### Key Points:
1. **Reusable Components**: All dashboards use the same components:
   - `ModuleDashboardHeader`
   - `ModuleFieldCard`
   - `ModuleFieldsSection`

2. **Consistent Pattern**: Every dashboard follows the exact same structure:
   - State management
   - Load data → Adapter → Display
   - Edit → Save → sessionStorage flag → Sync

3. **Field Descriptions**: Update `getFieldDescription()` in each adapter with appropriate descriptions for that module's fields.

4. **SessionStorage Keys**: Use pattern `'[module]-data-updated'` (e.g., `'links-data-updated'`)

5. **Type Safety**: Ensure type imports match your existing types for each module.

---

## 🚀 Next Steps

1. **Use templates above** to create remaining adapters
2. **Use templates above** to create remaining dashboard pages
3. **Use templates above** to update headers (add Settings icon)
4. **Use templates above** to add sync to module pages
5. **Test each dashboard** individually
6. **Verify data flow**: Module → Dashboard → Edit → Save → Module (changes visible)

---

## ✅ Success Criteria (Per Module)

- [ ] Settings icon in header navigates to dashboard
- [ ] Dashboard loads with all fields
- [ ] Toggle switches work
- [ ] Edit icon opens textarea
- [ ] Field values can be modified
- [ ] Save button persists changes
- [ ] Back button returns to module screen
- [ ] Module screen automatically reflects changes
- [ ] No page refresh needed
- [ ] sessionStorage flag works
- [ ] No linter errors

---

## 📊 Current Progress

**Complete:** 2/10 modules (20%)
- ✅ Personal Dashboard
- ✅ Contact Dashboard

**Partial:** 2/10 modules (Adapters created)
- 🟡 Professional Dashboard (adapter done)
- 🟡 Address Dashboard (adapter done)

**Pending:** 6/10 modules (60%)
- ⏳ Links Dashboard
- ⏳ Skills Dashboard
- ⏳ Documents Dashboard
- ⏳ Social Media Dashboard
- ⏳ Gallery Dashboard
- ⏳ Emergency Dashboard

---

## 🎉 When Complete

All 10 module dashboards will have:
- ✅ Full CRUD operations
- ✅ Field visibility toggle
- ✅ Inline editing
- ✅ Drag-and-drop reordering
- ✅ Real-time sync between screens
- ✅ Consistent UX across all modules
- ✅ Production-ready implementation

**Use these templates to complete the remaining implementations!** 🚀✨
