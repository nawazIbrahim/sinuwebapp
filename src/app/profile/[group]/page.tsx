/**
 * Dynamic route for profile group pages
 * 
 * This is a stub - actual implementation will be built later
 */

interface ProfileGroupPageProps {
  params: {
    group: string;
  };
}

export default function ProfileGroupPage({ params }: ProfileGroupPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {params.group.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
        </h1>
        <p className="text-gray-600">This page will be implemented later</p>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { group: 'contact' },
    { group: 'personal' },
    { group: 'professional' },
    { group: 'skills' },
    { group: 'pro-links' },
    { group: 'service-providing' },
    { group: 'image-gallery' },
    { group: 'socials' },
    { group: 'emergency' },
  ];
}
