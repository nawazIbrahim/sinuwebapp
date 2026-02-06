# MyDigiLink - Profile Main Screen

High-performance Progressive Web App (PWA) for professional digital profiles.

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Material Icons
- **Language**: TypeScript
- **Image Optimization**: next/image

### Folder Structure

```
src/
├── adapters/           # API → UI data transformation
│   └── profile.adapter.ts
├── app/                # Next.js App Router
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx       # Root → redirects to /profile
│   └── profile/
│       ├── page.tsx   # Profile Main Screen
│       ├── [group]/   # Dynamic routes for sections
│       │   └── page.tsx
│       └── settings/
│           └── page.tsx
├── components/         # React components
│   └── profile/
│       ├── ProfileHeader.tsx
│       ├── ProfileAvatar.tsx
│       ├── ActionIconButton.tsx
│       ├── ActionIconsRow.tsx
│       ├── ProfileSectionCard.tsx
│       ├── ProfileSectionsGrid.tsx
│       └── ShareProfileButton.tsx
├── services/           # API services
│   └── profile-api.service.ts
└── types/              # TypeScript types
    └── profile.ts
```

## 🎯 Key Features

### 1. **API-Driven Architecture**
- Dummy API service with production-ready structure
- Adapter pattern for clean data transformation
- Type-safe interfaces for API and UI data

### 2. **Component-Based Design**
- Reusable, single-responsibility components
- Server Components by default
- Client Components only where needed (interactions)

### 3. **Performance Optimizations**
- Server-side rendering
- Optimized images with next/image
- Mobile-first responsive design
- Clean Tailwind utilities (no inline styles)

### 4. **Navigation Architecture**
- Dynamic routes: `/profile/[group]`
- Settings route: `/profile/settings`
- Stub implementations ready for expansion

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the profile.

### Build for Production

```bash
npm run build
npm start
```

## 📋 API Structure

### Response Shape

```typescript
{
  data: {
    profile: {
      profilePhotoUrl: string;
      title: string;
      fullname: string;
      profession: string;
      location?: string;
      profileIntro?: string;
      dataRefId: string;
      shareLink: string;
      enableShareButton: boolean;
    },
    contactIcons: [
      {
        field: 'call' | 'email' | 'whatsapp' | 'location';
        label: string;
        value: string;
        icon?: string; // Font icon, image URL, or empty
        isVisible: boolean;
        displayOrder: number;
      }
    ],
    groupList: [
      {
        group: string; // Slug
        label: string;
        subtitle?: string;
        isVisible: boolean;
        displayOrder: number;
        icon?: string;
        color?: string;
      }
    ]
  }
}
```

### Adapter Responsibilities

1. **Filter** items where `isVisible === false`
2. **Sort** by `displayOrder`
3. **Resolve icons**:
   - Font icon if starts with `fa-`
   - Image if valid URL
   - Material Icon fallback
4. **Generate routes**: `/profile/[group]`

## 🎨 Design System

### Colors
- **Primary**: `#136dec` (Blue)
- **Primary Light**: `#4b94f7`
- **Secondary**: `#94a3b8` (Gray)
- **Text Primary**: `#0f172a`
- **Text Secondary**: `#6b7280`

### Icon Colors (From Figma)
- **Action Icons**: `#0f172a` (Dark/Black)
- **Contact**: `#2563EB` (Royal Blue)
- **Personal**: `#9333EA` (Electric Violet/Purple)
- **Professional**: `#2563EB` (Royal Blue)
- **Skills**: `#0D9488` (Teal)
- **Pro Links**: `#2563EB` (Royal Blue)
- **Service Providing**: `#059669` (Green)
- **Image Gallery**: `#D97706` (Orange)
- **Socials**: `#DB2777` (Pink)
- **Emergency**: `#DC2626` (Red)

### Typography
- **Font**: Inter
- **Weights**: 300, 400, 500, 600, 700

### Components

#### ProfileHeader
- Gradient background with decorative elements
- Profile avatar with online status
- Navigation icons (back, home, settings)

#### ActionIconsRow
- Circular icon buttons for quick actions
- Material Icons with proper fallbacks
- Hover and active states

#### ProfileSectionCard
- Two layouts: grid (2-column) and wide (full-width)
- Icon, label, subtitle
- Navigation on click

#### ShareProfileButton
- Gradient background
- Web Share API ready
- Fallback to clipboard

## 🔄 Data Flow

```
API Service → Adapter → UI Components
     ↓           ↓            ↓
  Raw JSON   Transform   Clean Props
```

## 🚧 Future Enhancements

- [ ] Implement section detail pages
- [ ] Add Web Share API
- [ ] Implement action handlers (call, email, WhatsApp)
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] Implement actual backend API
- [ ] Add analytics
- [ ] Add PWA offline support
- [ ] Add edit mode/CMS

## 📱 PWA Features

- Mobile-first design
- Responsive layout (optimized for 390px width)
- Touch-friendly interactions
- Fast page loads
- Manifest.json configured

## 🧪 Testing

Currently no tests. Future additions:
- Unit tests for adapter
- Component tests
- E2E tests for navigation

## 📄 License

Proprietary - All rights reserved

## 👥 Team

Built with production-quality standards and best practices.
