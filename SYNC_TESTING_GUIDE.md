# Data Sync Testing Guide

Quick guide to verify Profile Screen ↔ Dashboard synchronization works correctly.

---

## 🧪 Test Scenarios

### Test 1: Disable Quick Action

**Steps:**
1. Visit `http://localhost:3000/profile`
2. Note the 4 action icons: Call, Email, WhatsApp, Location
3. Click Settings icon (top right)
4. You're now at `/profile/dashboard`
5. Toggle OFF "WhatsApp" in Quick Actions section
6. Click "Save" button (top right)
7. Click "Back" button (top left)
8. You're back at `/profile`

**Expected Result:**
- ✅ Only 3 action icons visible: Call, Email, Location
- ✅ WhatsApp icon is GONE
- ✅ No page refresh needed

---

### Test 2: Disable Profile Module

**Steps:**
1. At `/profile` - note the profile section cards
2. Click Settings icon
3. At `/profile/dashboard`
4. Toggle OFF "Skills" module
5. Click Save
6. Click Back
7. Back at `/profile`

**Expected Result:**
- ✅ Skills card is GONE from grid
- ✅ Other cards remain visible
- ✅ Layout adjusts automatically

---

### Test 3: Disable Emergency

**Steps:**
1. At `/profile` - note the Emergency card (red, wide)
2. Click Settings
3. At `/profile/dashboard`
4. Toggle OFF "Emergency Info" (red card at bottom)
5. Save
6. Back

**Expected Result:**
- ✅ Emergency card disappears from Profile Screen
- ✅ Other sections unaffected

---

### Test 4: Enable Previously Disabled Item

**Steps:**
1. At Dashboard
2. Toggle ON an item you previously disabled
3. Save
4. Back to Profile

**Expected Result:**
- ✅ Item reappears on Profile Screen
- ✅ Appears in correct order (by displayOrder)

---

### Test 5: Multiple Changes

**Steps:**
1. At Dashboard
2. Toggle multiple items:
   - Disable Email (quick action)
   - Disable Gallery (module)
   - Disable Professional (module)
3. Save
4. Back

**Expected Result:**
- ✅ All 3 items gone from Profile Screen
- ✅ Remaining items still visible
- ✅ Grid layout adjusts

---

## 🔍 Verification Checklist

After each save:

- [ ] Changes persist when navigating back to Profile
- [ ] No browser console errors
- [ ] No duplicate API calls
- [ ] Layout adjusts correctly (no empty spaces)
- [ ] Icons maintain correct colors
- [ ] Order remains consistent
- [ ] Emergency card behavior correct (wide layout)

---

## 🐛 Common Issues & Solutions

### Issue: Changes don't appear on Profile Screen

**Cause:** Profile Screen not refetching data

**Solution:** Profile page is a Server Component that refetches on navigation. This should work automatically. If not, check:

```typescript
// In /app/profile/page.tsx
const apiResponse = await ProfileApiService.getProfileData();
// ^ This runs on every page load
```

### Issue: Dashboard shows old data after Profile changes

**Cause:** Dashboard caching state

**Solution:** Dashboard refetches on mount. Hard refresh if needed.

### Issue: Save doesn't persist

**Cause:** `updateProfileData()` not updating mock storage

**Solution:** Verify in `profile-api.service.ts`:

```typescript
static async updateProfileData(updates) {
  if (updates.contactIcons) {
    this.mockData.data.contactIcons = updates.contactIcons;
  }
  // ... updates mock data
}
```

---

## 📊 Data Flow Verification

### Check Console Logs

When saving, you should see:

```
Saving dashboard state: {
  quickActions: { call: true, email: false, ... },
  modules: { contact: true, skills: false, ... },
  emergencyEnabled: true
}

Profile data updated: {
  contactIcons: [...],
  groupList: [...]
}
```

### Check Network Tab

- **Profile Screen:** 1 API call on load
- **Dashboard:** 1 API call on load, 1 on save

No duplicate or unnecessary calls.

---

## 🎯 Success Criteria

✅ **Navigation:**
- Profile Settings → Dashboard ✓
- Dashboard Back → Profile ✓

✅ **Data Sync:**
- Dashboard changes appear on Profile ✓
- No page refresh needed ✓
- Uses same API ✓
- Uses shared types ✓

✅ **State Management:**
- Toggle changes tracked ✓
- Save persists changes ✓
- Profile reflects updates ✓

✅ **Performance:**
- No duplicate API calls ✓
- No prop drilling ✓
- Clean component architecture ✓

---

## 🚀 Quick Test Command

```bash
# Terminal 1: Start dev server
npm run dev

# Browser: Follow Test 1 above
# Should complete in < 30 seconds
```

---

## 📝 Manual Verification

If automated tests aren't available, manually verify:

1. **Profile Screen renders correctly:**
   - Header with avatar
   - 4 action icons (if all enabled)
   - 8-9 section cards (if all enabled)
   - Share button

2. **Dashboard renders correctly:**
   - Profile identity card
   - Quick Actions section (4 toggles)
   - Profile Modules section (6-8 cards)
   - Emergency toggle card

3. **Sync works:**
   - Disable item in dashboard
   - Save
   - Return to profile
   - Item is gone
   - Re-enable in dashboard
   - Item reappears on profile

---

**If all tests pass:** 🟢 Synchronization is working correctly!

**If any test fails:** Check `DATA_SYNC_ARCHITECTURE.md` for troubleshooting.
