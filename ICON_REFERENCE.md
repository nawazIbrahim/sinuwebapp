# Icon Reference Guide

This document lists all Material Icons used in the Profile Main Screen.

## Icon Loading

Material Icons are loaded via `<link>` tag in `src/app/layout.tsx`:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Icons Used

### Header Navigation Icons
- `arrow_back` - Back button
- `home` - Home button  
- `settings` - Settings button
- `verified` - Verification badge next to name

### Contact Action Icons (via Adapter)
These icons are resolved in `profile.adapter.ts`:
- `phone` - Call action
- `email` - Email action
- `chat` - WhatsApp action
- `location_on` - Location action

### Profile Section Icons
- `contact_phone` - Contact section
- `person` - Personal section
- `work` - Professional section
- `psychology` - Skills section
- `link` - Pro Links section
- `medical_services` - Service Providing section
- `photo_library` - Image Gallery section
- `share` - Socials section
- `local_hospital` - Emergency section (wide card)

### Other Icons
- `chevron_right` - Arrow for wide cards
- `share` - Share Profile button

## Icon Usage

### In Components

```tsx
// Standard usage
<span className="material-icons">icon_name</span>

// With size and color
<span className="material-icons text-2xl text-blue-500">icon_name</span>
```

### In API Service

Icons are stored as strings in the API response:
```typescript
{
  icon: 'local_hospital', // Material Icon name
  // OR
  icon: 'https://example.com/icon.png', // Image URL
  // OR  
  icon: 'fa-home', // Font Awesome (if available)
}
```

### Icon Resolution Priority (Adapter)

1. **Font Icon** - Starts with `fa-` → Uses FontAwesome
2. **Image URL** - Valid HTTP(S) URL → Uses `<Image>` component
3. **Material Icon** - Fallback → Uses Material Icons

## Troubleshooting

### Icons Not Showing?

1. **Check font loading** - Open DevTools Network tab, look for Material Icons font file
2. **Verify icon names** - Visit [Material Icons Library](https://fonts.google.com/icons)
3. **Check CSS** - Ensure `.material-icons` class is applied
4. **Clear cache** - Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### Common Issues

- ❌ Using underscores wrong: `arrow-back` → ✅ `arrow_back`
- ❌ Invalid icon name: `emergency` → ✅ `local_hospital`
- ❌ Wrong class: `material-icon` → ✅ `material-icons` (plural)

## Valid Material Icons Reference

All icons used in this app are from the official Material Icons library. To find more icons or verify names:

🔗 https://fonts.google.com/icons

## Adding New Icons

1. Find the icon on [Material Icons](https://fonts.google.com/icons)
2. Copy the exact icon name (use underscores, not hyphens)
3. Use in component:
```tsx
<span className="material-icons">new_icon_name</span>
```

## Performance Notes

- Material Icons font is ~140KB (cached by browser)
- Icons render as glyphs (vector, infinite scaling)
- Zero runtime JavaScript overhead
- Optimized with ligature support
