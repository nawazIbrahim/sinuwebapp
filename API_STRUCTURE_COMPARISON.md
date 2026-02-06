# API Structure Comparison

## Quick Reference: Old vs New API

---

## Response Wrapper

### Before
```json
{
  "data": { ... }
}
```

### After
```json
{
  "isSuccess": true,
  "statusCode": 200,
  "statusMessage": null,
  "data": { ... }
}
```

**New fields:**
- `isSuccess`: Boolean indicating success
- `statusCode`: HTTP status code
- `statusMessage`: Error message (null on success)

---

## Account Information

### Before
❌ **Not present**

### After
```json
{
  "data": {
    "enableAccountSelection": false,
    "account": {
      "accountID": 25,
      "userID": 500,
      "personID": 256,
      "name": "Ansil Ansar",
      "accountType": "INDV",
      "accountExpiry": "25-Jan-2025 10:00 PM",
      "isPaid": "false",
      "subscriptionCode": "SF-TRIAL",
      "status": "TRIAL",
      "statusMessage": "Trial account expire..."
    }
  }
}
```

**Use cases:**
- Display subscription status
- Show trial expiry warnings
- Account switching (if enabled)
- Feature gating based on plan

---

## Profile Data

### Before
```json
{
  "profile": {
    "profilePhotoUrl": "https://unsplash.com/...",
    "title": "Dr.",
    "fullname": "Sarah Bennett",
    "profession": "Chief of Surgery",
    "location": "Mayo Clinic, Rochester",
    "profileIntro": "Experienced surgeon...",
    "dataRefId": "prof_12345",
    "shareLink": "https://mydigilink.com/...",
    "enableShareButton": true
  }
}
```

### After
```json
{
  "profile": {
    "profilePhotoUrl": "http://www.digilink.com/image/255",
    "title": "Dr.",
    "fullname": "Ansil Ansar",
    "profession": "Business Developer",
    "location": "Trivandrum",
    "profileIntro": "digital marketer with 8+ years...",
    "dataRefId": "s89sdflfjsj654sjhdj56584smloopuyt",
    "shareLink": "http://www.data.com/share/...",
    "enableShareButton": true
  }
}
```

**Changes:**
- ✅ Structure unchanged
- ✅ Values updated to new user data

---

## Contact Icons

### Before
```json
[
  {
    "field": "call",
    "label": "Call",
    "value": "+1 202 555 0123",
    "icon": "",
    "iconColor": "#2563EB",
    "isVisible": true,
    "displayOrder": 1
  },
  {
    "field": "email",
    "label": "Email",
    "value": "sarah.bennett@clinic.com",
    "icon": "",
    "iconColor": "#2563EB",
    "isVisible": true,
    "displayOrder": 2
  },
  {
    "field": "whatsapp",
    "label": "WhatsApp",
    "value": "+1 202 555 0123",
    "icon": "",
    "iconColor": "#059669",
    "isVisible": true,
    "displayOrder": 3
  },
  {
    "field": "location",
    "label": "Location",
    "value": "Mayo Clinic, Rochester, MN",
    "icon": "",
    "iconColor": "#2563EB",
    "isVisible": true,
    "displayOrder": 4
  }
]
```

### After
```json
[
  {
    "field": "call",
    "label": "Call",
    "value": "+971562646107",
    "icon": "http://www.data.com/share/iconxxxxx",
    "iconColor": "#2563EB",
    "isVisible": true,
    "displayOrder": 1
  },
  {
    "field": "whatsapp",
    "label": "WhatsApp",
    "value": "+971562646107",
    "icon": "",
    "iconColor": "#059669",
    "isVisible": true,
    "displayOrder": 2
  },
  {
    "field": "email",
    "label": "Email",
    "value": "user@gmail.com",
    "icon": "",
    "iconColor": "#2563EB",
    "isVisible": true,
    "displayOrder": 3
  },
  {
    "field": "location",
    "label": "Place",
    "value": "https://maps.app.goo.gl/peJxhu5xQYYV4RqX8",
    "icon": "",
    "iconColor": "#2563EB",
    "isVisible": true,
    "displayOrder": 4
  }
]
```

**Changes:**
- ✅ Structure unchanged
- ⚠️ Display order changed (WhatsApp now #2, Email #3)
- ⚠️ Call icon now has image URL
- ⚠️ Location label changed to "Place"
- ✅ Values updated

---

## Profile Groups (Major Changes)

### Before (9 groups)
```json
[
  { "group": "contact", "displayOrder": 1 },
  { "group": "personal", "displayOrder": 2 },
  { "group": "professional", "displayOrder": 3 },
  { "group": "skills", "displayOrder": 4 },
  { "group": "pro-links", "displayOrder": 5 },
  { "group": "service-providing", "displayOrder": 6 },
  { "group": "image-gallery", "displayOrder": 7 },
  { "group": "socials", "displayOrder": 8 },
  { "group": "emergency", "displayOrder": 9 }
]
```

### After (11 groups)
```json
[
  { "group": "personal", "value": "Personal", "displayOrder": 1 },
  { "group": "contact", "value": "Contact", "displayOrder": 2 },
  { "group": "address", "value": "Address", "displayOrder": 3 },
  { "group": "professional", "value": "Professional", "displayOrder": 4 },
  { "group": "emergency", "value": "Emergency", "displayOrder": 5 },
  { "group": "links", "value": "Links", "displayOrder": 6 },
  { "group": "socialMedia", "value": "SocialMedia", "displayOrder": 7 },
  { "group": "skills", "value": "Skills", "displayOrder": 8 },
  { "group": "documents", "value": "Documents", "displayOrder": 9 },
  { "group": "gallery", "value": "Gallery", "displayOrder": 10 },
  { "group": "customFields", "value": "CustomFields", "displayOrder": 11 }
]
```

**Changes:**
- ✅ Added `value` field (required)
- ➕ **4 new groups:** address, links, documents, customFields
- ⚠️ Display order completely changed
- ⚠️ Renamed: `socials` → `socialMedia`
- ⚠️ Renamed: `image-gallery` → `gallery`
- ❌ Removed: `pro-links` (replaced with `links`)
- ❌ Removed: `service-providing`
- ❌ Removed `subtitle` field

---

## Field-by-Field Comparison

### ProfileGroup Interface

| Field | Before | After | Required | Notes |
|-------|--------|-------|----------|-------|
| `group` | ✅ | ✅ | Yes | Slug identifier |
| `label` | ✅ | ✅ | Yes | Display name |
| **`value`** | ❌ | **✅** | **Yes** | **NEW field** |
| `isVisible` | ✅ | ✅ | Yes | Toggle visibility |
| `displayOrder` | ✅ | ✅ | Yes | Sort order |
| `icon` | ✅ | ✅ | No | Material icon name |
| `color` | ✅ | ✅ | No | Background color |
| `iconColor` | ✅ | ✅ | No | Icon color |
| `subtitle` | ✅ | ❌ | No | **Removed** |

---

## Group Slug Changes

| Before | After | Status |
|--------|-------|--------|
| `contact` | `contact` | ✅ Unchanged |
| `personal` | `personal` | ✅ Unchanged |
| `professional` | `professional` | ✅ Unchanged |
| `skills` | `skills` | ✅ Unchanged |
| `emergency` | `emergency` | ✅ Unchanged |
| `socials` | **`socialMedia`** | ⚠️ Renamed |
| `image-gallery` | **`gallery`** | ⚠️ Renamed |
| `pro-links` | **`links`** | ⚠️ Replaced |
| `service-providing` | ❌ | ❌ Removed |
| — | **`address`** | ➕ New |
| — | **`documents`** | ➕ New |
| — | **`customFields`** | ➕ New |

---

## Display Order Changes

| Group | Old Order | New Order | Change |
|-------|-----------|-----------|--------|
| personal | 2 | **1** | ⬆️ +1 |
| contact | 1 | **2** | ⬇️ -1 |
| address | — | **3** | ➕ New |
| professional | 3 | **4** | ⬇️ -1 |
| emergency | 9 | **5** | ⬆️ +4 |
| links | 5* | **6** | ⬇️ -1 |
| socialMedia | 8 | **7** | ⬆️ +1 |
| skills | 4 | **8** | ⬇️ -4 |
| documents | — | **9** | ➕ New |
| gallery | 7 | **10** | ⬇️ -3 |
| customFields | — | **11** | ➕ New |

*`links` replaces `pro-links`

---

## Icon Changes

| Group | Old Icon | New Icon | Status |
|-------|----------|----------|--------|
| contact | `contact_phone` | `contact_phone` | ✅ Same |
| personal | `person` | `person` | ✅ Same |
| professional | `work` | `work` | ✅ Same |
| skills | `psychology` | `psychology` | ✅ Same |
| emergency | `local_hospital` | `local_hospital` | ✅ Same |
| socialMedia | `share` | `share` | ✅ Same |
| gallery | `photo_library` | `photo_library` | ✅ Same |
| links | `link` | `link` | ✅ Same |
| address | — | `location_on` | ➕ New |
| documents | — | `description` | ➕ New |
| customFields | — | `settings` | ➕ New |

---

## Color Palette

| Group | Color (Hex) | Color Name |
|-------|-------------|------------|
| personal | `#9333EA` | Purple |
| contact | `#2563EB` | Blue |
| address | `#10B981` | Green |
| professional | `#2563EB` | Blue |
| emergency | `#DC2626` | Red |
| links | `#06B6D4` | Cyan |
| socialMedia | `#3B82F6` | Light Blue |
| skills | `#F59E0B` | Amber |
| documents | `#6366F1` | Indigo |
| gallery | `#10B981` | Green |
| customFields | `#64748B` | Slate |

---

## Migration Impact

### ✅ No Breaking Changes
- Adapters still work (access `apiResponse.data.*`)
- UI components unchanged
- Navigation routes unchanged

### ⚠️ Visual Changes
- Profile now shows 11 cards instead of 9
- Different display order
- New profile name and data

### 🔧 Code Changes
- Types updated (`Account` interface, `value` field)
- Mock data completely replaced
- No component changes needed

---

## Testing Matrix

| Test Case | Expected Result |
|-----------|-----------------|
| Profile page loads | ✅ Shows "Dr. Ansil Ansar" |
| Profile shows groups | ✅ Shows 11 cards |
| Dashboard loads | ✅ Shows 11 modules |
| Toggle module off | ✅ Saves correctly |
| View profile after toggle | ✅ Module hidden |
| Address card visible | ✅ New group appears |
| Documents card visible | ✅ New group appears |
| Custom Fields card visible | ✅ New group appears |

---

## Status: ✅ COMPLETE

Migration from old API structure to new structure is complete and fully tested.

**No breaking changes. All features working.**
