import { SkillsApiResponse, SkillField } from '@/types/skills';

export interface SkillsDashboardField {
  id: string;
  field: string;
  label: string;
  value: string;
  enabled: boolean;
  displayOrder: number;
  description: string;
  duration: string;
  level: string;
  originalData: SkillField;
}

export interface SkillsDashboardData {
  accountID: number;
  group: string;
  fields: SkillsDashboardField[];
}

export class SkillsDashboardAdapter {
  static toDashboard(apiResponse: SkillsApiResponse): SkillsDashboardData {
    const { accountID, group, fieldList } = apiResponse.data;
    const fields: SkillsDashboardField[] = fieldList
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((field) => ({
        id: `skill-${field.skillSetID}`,
        field: field.name,
        label: field.name,
        value: field.description,
        enabled: field.isVisible,
        displayOrder: field.displayOrder,
        description: field.description,
        duration: field.duration,
        level: field.level,
        originalData: field,
      }));
    return { accountID, group, fields };
  }

  static toApiUpdate(
    dashboardData: SkillsDashboardData,
    updatedState: {
      fields: Record<string, { enabled: boolean; value: string; title?: string; duration?: string }>;
      fieldsOrder: string[];
    }
  ): Partial<SkillsApiResponse['data']> {
    const fieldsById = new Map(dashboardData.fields.map((field) => [field.id, field]));
    const updatedFields = updatedState.fieldsOrder
      .map((id, index) => {
        const field = fieldsById.get(id);
        if (!field) return null;
        const fieldState = updatedState.fields[id];
        return {
          ...field.originalData,
          name: fieldState?.title ?? field.label,
          description: fieldState?.value ?? field.value,
          duration: fieldState?.duration ?? field.duration,
          isVisible: fieldState?.enabled ?? field.enabled,
          displayOrder: index + 1,
        };
      })
      .filter((f) => f !== null) as SkillField[];
    return { fieldList: updatedFields };
  }

  static getFieldDescription(level: string, duration: string): string {
    return `${level} level skill • ${duration} experience`;
  }
}
