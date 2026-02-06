'use client';

import { useEffect, useState } from 'react';
import { CustomFieldsHeader } from '@/components/custom-fields/CustomFieldsHeader';
import { CustomFieldCard } from '@/components/custom-fields/CustomFieldCard';
import { CustomFieldsApiService } from '@/services/custom-fields-api.service';
import { CustomFieldsAdapter } from '@/adapters/custom-fields.adapter';
import { AdaptedCustomFieldsData } from '@/types/custom-fields';

export default function CustomFieldsPage() {
  const [data, setData] = useState<AdaptedCustomFieldsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiResponse = await CustomFieldsApiService.getCustomFields();
        const adaptedData = CustomFieldsAdapter.toUI(apiResponse);
        setData(adaptedData);
      } catch (error) {
        console.error('Failed to load custom fields:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#94a3b8] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!data || data.fields.length === 0) {
    return (
      <div className="min-h-screen bg-[#94a3b8] flex flex-col">
        <CustomFieldsHeader />
        <main className="flex-1 px-4 py-6">
          <div className="bg-white rounded-xl p-8 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
              label_off
            </span>
            <p className="text-gray-500">No custom fields available</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#94a3b8] flex flex-col">
      <CustomFieldsHeader />
      
      <main className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {data.fields.map((field) => (
            <CustomFieldCard key={field.id} field={field} />
          ))}
        </div>
      </main>
    </div>
  );
}
