# Implementation Guide: All Module Dashboards 🚀

## Quick Implementation Status

| Module | Adapter | Page | Header | Sync | Status |
|--------|---------|------|--------|------|--------|
| Personal | ✅ | ✅ | ✅ | ✅ | **COMPLETE** |
| Contact | ✅ | ✅ | ✅ | ⏳ | **IN PROGRESS** |
| Professional | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Address | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Links | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Social Media | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Skills | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Documents | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Gallery | ⏳ | ⏳ | ⏳ | ⏳ | Pending |
| Emergency | ⏳ | ⏳ | ⏳ | ⏳ | Pending |

---

## Reusable Components Created ✅

### 1. **ModuleDashboardHeader** (`src/components/module-dashboard/ModuleDashboardHeader.tsx`)
- Generic header for all module dashboards
- Props: `title`, `onSave`, `onBack`
- Consistent design across all modules

### 2. **ModuleFieldCard** (`src/components/module-dashboard/ModuleFieldCard.tsx`)
- Generic field card with toggle, edit, drag
- Inline editing with textarea
- Reusable across all modules

### 3. **ModuleFieldsSection** (`src/components/module-dashboard/ModuleFieldsSection.tsx`)
- Fields list with drag-and-drop
- Generic section component
- Uses `@hello-pangea/dnd`

---

## Implementation Pattern

### For Each Module, Create:

#### 1. **Dashboard Adapter** (`src/adapters/[module]-dashboard.adapter.ts`)
```typescript
export interface [Module]DashboardField {
  id: string;
  field: string;
  label: string;
  value: string;
  enabled: boolean;
  displayOrder: number;
  originalData: [Module]FieldItem;
}

export class [Module]DashboardAdapter {
  static toDashboard(apiResponse): [Module]DashboardData { ... }
  static toApiUpdate(dashboardData, updatedState): Partial<ApiResponse> { ... }
  static getFieldDescription(field: string): string { ... }
}
```

#### 2. **Dashboard Page** (`src/app/profile/[module]/dashboard/page.tsx`)
```typescript
export default function [Module]DashboardPage() {
  // State management
  // Load data
  // Handlers (toggle, edit, reorder)
  // Save logic with sessionStorage flag
  // Render with ModuleDashboardHeader + ModuleFieldsSection
}
```

#### 3. **Update Module Header** (Add Settings icon)
```typescript
const handleSettings = () => {
  router.push('/profile/[module]/dashboard');
};

// Add Settings button to header
```

#### 4. **Update Module Page** (Add sync mechanism)
```typescript
const [refreshKey, setRefreshKey] = useState(0);

// Check for sessionStorage flag
useEffect(() => {
  const checkForUpdates = () => {
    const shouldRefresh = sessionStorage.getItem('[module]-data-updated');
    if (shouldRefresh === 'true') {
      sessionStorage.removeItem('[module]-data-updated');
      setRefreshKey(prev => prev + 1);
    }
  };
  checkForUpdates();
  const interval = setInterval(checkForUpdates, 500);
  return () => clearInterval(interval);
}, []);

// Refetch when refreshKey changes
useEffect(() => {
  loadData();
}, [refreshKey]);
```

---

## Module-Specific Field Descriptions

### Contact
```typescript
{
  mobile: 'Your primary mobile number',
  mobileAlt: 'Alternate mobile number',
  phone: 'Your phone number',
  whatsapp: 'Your WhatsApp contact number',
  email: 'Your email address',
}
```

### Professional
```typescript
{
  company: 'Your company name',
  designation: 'Your job title',
  professionSpecialization: 'Your area of specialization',
  serviceProviding: 'Services you provide',
  compAddress: 'Company address',
  compPlace: 'Company location',
  compEmail: 'Company email address',
  compMobile: 'Company mobile number',
  compPhone: 'Company phone number',
  compWhatsApp: 'Company WhatsApp number',
  compWebsite: 'Company website URL',
}
```

### Address
```typescript
{
  address: 'Your full address',
  place: 'Your location/city',
  LocationMapUrl: 'Google Maps location link',
}
```

### Links
```typescript
{
  name: 'Link title',
  description: 'Link description',
  linkText: 'Button text',
  linkUrl: 'URL address',
}
```

### Skills
```typescript
{
  name: 'Skill name',
  description: 'Skill description',
  duration: 'Experience duration',
  level: 'Skill level (Beginner/Intermediate/Advanced)',
}
```

### Social Media
```typescript
{
  platform: 'Social media platform name',
  url: 'Profile URL',
  category: 'Category (Professional/Personal/Community)',
}
```

### Documents
```typescript
{
  name: 'Document name',
  title: 'Document title',
  description: 'Document description',
  fileType: 'File type (PDF/JPEG/etc.)',
  fileUrl: 'Download URL',
  fileSize: 'File size',
}
```

### Gallery
```typescript
{
  title: 'Image title',
  description: 'Image description',
  imageUrl: 'Image URL',
  thumbnailUrl: 'Thumbnail URL',
  fileSize: 'File size',
  fileType: 'File type',
}
```

### Emergency
```typescript
{
  emerContactName: 'Emergency contact name',
  emerContactNo: 'Emergency contact number',
  emerContactRelation: 'Relationship to you',
}
```

---

## Batch Implementation Commands

I'm creating all remaining dashboards in this session. The implementation includes:

1. ✅ **Contact Dashboard** - Complete
2. ⏳ **Professional Dashboard** - Creating now
3. ⏳ **Address Dashboard** - Creating now
4. ⏳ **Links Dashboard** - Creating now
5. ⏳ **Social Media Dashboard** - Creating now
6. ⏳ **Skills Dashboard** - Creating now
7. ⏳ **Documents Dashboard** - Creating now
8. ⏳ **Gallery Dashboard** - Creating now
9. ⏳ **Emergency Dashboard** - Creating now

---

## Testing Checklist (Per Module)

- [ ] Settings icon in module header navigates to dashboard
- [ ] Dashboard loads with all fields
- [ ] Toggle switches work
- [ ] Field editing works (click edit icon → modify → save)
- [ ] Drag-and-drop reordering works
- [ ] Save button persists changes
- [ ] Back button returns to module screen
- [ ] Module screen reflects changes after save
- [ ] sessionStorage flag mechanism works
- [ ] No linter errors

---

## Next: Implementing All Dashboards

I'm now creating all the remaining dashboards systematically using the reusable components and following the established pattern.
