# Profile Data Synchronization Architecture

## 🎯 Core Principle

**Profile Dashboard is the SINGLE SOURCE OF TRUTH.**

Profile Screen is a READ-ONLY view of the same data.

---

## 📊 Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│          ProfileApiService (SINGLE SOURCE)          │
│               profile-api.service.ts                │
│                                                     │
│  • getProfileData() - Fetch profile                 │
│  • updateProfileData() - Save changes               │
│  • Mock data storage (simulates backend)            │
└──────────────┬──────────────────────┬───────────────┘
               │                      │
               │                      │
    ┌──────────▼──────────┐  ┌────────▼──────────┐
    │  Profile Adapter    │  │ Dashboard Adapter │
    │  (profile.adapter)  │  │ (dashboard.adapter)│
    │                     │  │                    │
    │  • Filters visible  │  │  • Maps to edit UI │
    │  • Sorts display    │  │  • Preserves refs  │
    │  • Generates routes │  │  • Converts back   │
    └──────────┬──────────┘  └────────┬───────────┘
               │                      │
               │                      │
    ┌──────────▼──────────┐  ┌────────▼──────────┐
    │   Profile Screen    │  │ Profile Dashboard │
    │   /profile          │  │ /profile/dashboard│
    │                     │  │                    │
    │   READ-ONLY VIEW    │  │  EDIT & MANAGE    │
    └─────────────────────┘  └────────────────────┘
```

---

## 🔄 Synchronization Flow

### 1. **Profile Screen** (READ-ONLY)

```typescript
// /app/profile/page.tsx
const apiResponse = await ProfileApiService.getProfileData();
const { profile, contactIcons, groups } = ProfileAdapter.adapt(apiResponse);

// Render:
// - ProfileHeader
// - ActionIconsRow (from contactIcons where isVisible=true)
// - ProfileSectionsGrid (from groups where isVisible=true)
// - ShareProfileButton
```

**Key Behaviors:**
- ✅ Refetches data on every visit
- ✅ Automatically reflects dashboard changes
- ✅ Settings icon → navigates to `/profile/dashboard`
- ✅ Filters `isVisible === false` items
- ✅ Sorts by `displayOrder`

---

### 2. **Profile Dashboard** (EDIT MODE)

```typescript
// /app/profile/dashboard/page.tsx
const apiResponse = await ProfileApiService.getProfileData();
const dashboardData = DashboardAdapter.toDashboard(apiResponse);

// User edits toggles
// User clicks Save

const apiUpdate = DashboardAdapter.toApiUpdate(dashboardData, state);
await ProfileApiService.updateProfileData(apiUpdate);
```

**Key Behaviors:**
- ✅ Uses SAME API as Profile Screen
- ✅ Manages `isVisible` flags
- ✅ Saves changes back to API
- ✅ Back button → navigates to `/profile`
- ✅ Updates persist (via mock data storage)

---

## 🔑 Key Files

### **Single API Service** (Shared)

**File:** `src/services/profile-api.service.ts`

```typescript
class ProfileApiService {
  static async getProfileData() // Used by both screens
  static async updateProfileData() // Used by dashboard
}
```

### **Two Adapters** (Different Purposes)

#### Profile Adapter (Profile Screen)
**File:** `src/adapters/profile.adapter.ts`

```typescript
class ProfileAdapter {
  // Transforms API → UI format for Profile Screen
  // - Filters isVisible
  // - Sorts by displayOrder
  // - Generates routes
  adapt(apiResponse) → AdaptedProfileData
}
```

#### Dashboard Adapter (Dashboard Screen)
**File:** `src/adapters/dashboard.adapter.ts`

```typescript
class DashboardAdapter {
  // Transforms API → Dashboard UI
  toDashboard(apiResponse) → DashboardData
  
  // Transforms Dashboard State → API format
  toApiUpdate(dashboardData, state) → ApiUpdate
}
```

**Why Two Adapters?**
- Different UI requirements
- Dashboard needs reverse transformation
- Profile screen is display-only
- Clean separation of concerns

---

## 🔄 How Sync Works

### Scenario: User Disables "WhatsApp" in Dashboard

1. **User visits Dashboard:**
   ```
   GET /api/profile
   → contactIcons[whatsapp].isVisible = true
   ```

2. **User toggles WhatsApp off:**
   ```
   state.quickActions.whatsapp = false
   ```

3. **User clicks Save:**
   ```
   DashboardAdapter.toApiUpdate()
   → contactIcons[whatsapp].isVisible = false
   
   ProfileApiService.updateProfileData()
   → Updates mock data
   ```

4. **User navigates back to Profile Screen:**
   ```
   GET /api/profile
   → contactIcons[whatsapp].isVisible = false
   
   ProfileAdapter.adapt()
   → Filters out WhatsApp
   
   Result: WhatsApp icon no longer shows
   ```

✅ **Automatic sync - no page refresh needed!**

---

## 🧩 Unified Type System

### API Response Type (Shared)

**File:** `src/types/profile.ts`

```typescript
interface ProfileApiResponse {
  data: {
    profile: ProfileData;
    contactIcons: ContactIcon[];  // has isVisible, displayOrder
    groupList: ProfileGroup[];     // has isVisible, displayOrder
  };
}
```

Both screens consume the SAME API response type.

---

## 🎯 Navigation Flow

### Profile Screen → Dashboard

```typescript
// ProfileHeader.tsx
const handleSettings = () => {
  router.push('/profile/dashboard');
};
```

Click Settings icon → Opens Dashboard

### Dashboard → Profile Screen

```typescript
// DashboardHeader.tsx
const handleBack = () => {
  router.push('/profile');
};
```

Click Back → Returns to Profile Screen

**Result:** Clean bidirectional navigation

---

## ✅ What Was Changed

### 1. **Unified API Service**
- ✅ Removed separate `dashboard-api.service.ts`
- ✅ Both screens now use `ProfileApiService`
- ✅ Dashboard can save changes via `updateProfileData()`
- ✅ Mock data storage simulates backend persistence

### 2. **Dashboard Adapter Created**
- ✅ `DashboardAdapter.toDashboard()` - API → Dashboard UI
- ✅ `DashboardAdapter.toApiUpdate()` - Dashboard State → API
- ✅ Preserves original data references
- ✅ Clean bidirectional transformation

### 3. **Navigation Updated**
- ✅ Profile Settings icon → `/profile/dashboard`
- ✅ Dashboard Back button → `/profile`
- ✅ Clean routing between screens

### 4. **Type System Unified**
- ✅ Removed duplicate `dashboard.ts` types
- ✅ Dashboard types now in `dashboard.adapter.ts`
- ✅ Both screens share `profile.ts` types

---

## 🔧 Files Modified

1. ✅ `src/services/profile-api.service.ts` - Added update & persistence
2. ✅ `src/adapters/dashboard.adapter.ts` - NEW: Bidirectional adapter
3. ✅ `src/app/profile/dashboard/page.tsx` - Uses unified API
4. ✅ `src/components/profile/ProfileHeader.tsx` - Settings → Dashboard
5. ✅ `src/components/dashboard/QuickActionsSection.tsx` - Updated imports
6. ✅ `src/components/dashboard/ProfileModulesSection.tsx` - Updated imports

### Files Deleted
- ❌ `src/services/dashboard-api.service.ts` (duplicate removed)
- ❌ `src/types/dashboard.ts` (consolidated)

---

## 🧪 Testing the Sync

### Test Flow:

1. **Start at Profile Screen:**
   ```
   http://localhost:3000/profile
   ```
   - See all enabled modules and actions

2. **Click Settings icon:**
   - Navigates to `/profile/dashboard`

3. **Toggle off "WhatsApp" in Quick Actions**

4. **Click Save button:**
   - Shows "Settings saved successfully!" alert

5. **Click Back button:**
   - Navigates to `/profile`

6. **Verify:**
   - ✅ WhatsApp action icon should be GONE
   - ✅ Other icons still visible
   - ✅ No page refresh needed

7. **Test Module Toggle:**
   - Go back to Dashboard
   - Toggle off "Skills" module
   - Save
   - Return to Profile
   - ✅ Skills card should be GONE

---

## 🎯 Key Synchronization Rules

### ✅ BOTH Screens Must:
1. Fetch from `ProfileApiService.getProfileData()`
2. Respect `isVisible` flags
3. Sort by `displayOrder`
4. Use same icon resolution logic

### ✅ Dashboard-Only:
1. Manage toggle states
2. Save changes via `ProfileApiService.updateProfileData()`
3. Convert state back to API format

### ✅ Profile Screen-Only:
1. Display data (read-only)
2. Navigate to dashboard from settings

---

## 🚀 Production Migration

When connecting to real API:

### 1. Update API Service

```typescript
static async getProfileData() {
  const response = await fetch('/api/profile');
  return response.json();
}

static async updateProfileData(updates) {
  await fetch('/api/profile', {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}
```

### 2. No Changes Needed Elsewhere!

The adapter layer and components remain unchanged.

---

## ✨ Architecture Benefits

✅ **Single Source of Truth** - One API service  
✅ **Zero Duplication** - No copied transformation logic  
✅ **Type-Safe** - Shared TypeScript types  
✅ **Maintainable** - Changes in one place  
✅ **Testable** - Clear data flow  
✅ **Scalable** - Easy to extend  

---

## 📋 Summary

### Before (Broken)
- ❌ Two separate API services
- ❌ Duplicate data models
- ❌ No synchronization
- ❌ Separate navigation paths

### After (Synchronized)
- ✅ Single API service (ProfileApiService)
- ✅ Two adapters (different purposes, same source)
- ✅ Automatic synchronization
- ✅ Clean bidirectional navigation
- ✅ Dashboard changes instantly reflect in Profile Screen

---

**Status:** 🟢 COMPLETE - Profile Screen and Dashboard are now FULLY SYNCHRONIZED!

Test the flow:
```bash
npm run dev
```

Visit `/profile` → Click Settings → Toggle items → Save → Go Back → See changes!
