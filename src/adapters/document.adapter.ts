/**
 * Document Adapter
 * 
 * Transforms raw API document data into UI-ready format
 * Maps file types to appropriate icons and colors
 */

import { DocumentApiResponse, AdaptedDocumentData, UIDocumentField } from '@/types/document';

/**
 * File Type to Icon Mapping
 * Maps file extensions/types to Material Icons
 */
const FILE_TYPE_CONFIG: Record<string, {
  icon: string;
  iconColor: string;
  iconBgColor: string;
}> = {
  // Documents
  PDF: {
    icon: 'picture_as_pdf',    // PDF icon
    iconColor: '#DC2626',       // Red
    iconBgColor: '#FEE2E2',     // Light red
  },
  DOC: {
    icon: 'description',        // Document icon
    iconColor: '#2563EB',       // Blue
    iconBgColor: '#DBEAFE',     // Light blue
  },
  DOCX: {
    icon: 'description',        // Document icon
    iconColor: '#2563EB',       // Blue
    iconBgColor: '#DBEAFE',     // Light blue
  },
  TXT: {
    icon: 'article',            // Text icon
    iconColor: '#64748B',       // Slate
    iconBgColor: '#F1F5F9',     // Light slate
  },
  
  // Spreadsheets
  XLS: {
    icon: 'table_chart',        // Spreadsheet icon
    iconColor: '#059669',       // Green
    iconBgColor: '#D1FAE5',     // Light green
  },
  XLSX: {
    icon: 'table_chart',        // Spreadsheet icon
    iconColor: '#059669',       // Green
    iconBgColor: '#D1FAE5',     // Light green
  },
  CSV: {
    icon: 'grid_on',            // Grid icon
    iconColor: '#059669',       // Green
    iconBgColor: '#D1FAE5',     // Light green
  },
  
  // Images
  JPG: {
    icon: 'image',              // Image icon
    iconColor: '#7C3AED',       // Purple
    iconBgColor: '#EDE9FE',     // Light purple
  },
  JPEG: {
    icon: 'image',              // Image icon
    iconColor: '#7C3AED',       // Purple
    iconBgColor: '#EDE9FE',     // Light purple
  },
  PNG: {
    icon: 'image',              // Image icon
    iconColor: '#7C3AED',       // Purple
    iconBgColor: '#EDE9FE',     // Light purple
  },
  GIF: {
    icon: 'gif',                // GIF icon
    iconColor: '#7C3AED',       // Purple
    iconBgColor: '#EDE9FE',     // Light purple
  },
  
  // Presentations
  PPT: {
    icon: 'slideshow',          // Presentation icon
    iconColor: '#DC2626',       // Red
    iconBgColor: '#FEE2E2',     // Light red
  },
  PPTX: {
    icon: 'slideshow',          // Presentation icon
    iconColor: '#DC2626',       // Red
    iconBgColor: '#FEE2E2',     // Light red
  },
  
  // Archives
  ZIP: {
    icon: 'folder_zip',         // Zip icon
    iconColor: '#CA8A04',       // Yellow
    iconBgColor: '#FEF3C7',     // Light yellow
  },
  RAR: {
    icon: 'folder_zip',         // Zip icon
    iconColor: '#CA8A04',       // Yellow
    iconBgColor: '#FEF3C7',     // Light yellow
  },
};

/**
 * Default configuration for unknown file types
 */
const DEFAULT_CONFIG = {
  icon: 'insert_drive_file',   // Generic file icon
  iconColor: '#617289',         // Lynch (gray-blue)
  iconBgColor: '#F3F4F6',       // Light gray
};

export class DocumentAdapter {
  /**
   * Transforms API response into UI-ready document data
   * 
   * @param apiResponse - Raw API response
   * @returns UI-ready document data with icons, colors, and display properties
   */
  static toUI(apiResponse: DocumentApiResponse): AdaptedDocumentData {
    const documents = apiResponse.data.fieldList
      .filter(field => field.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(field => this.adaptField(field));

    return { documents };
  }

  /**
   * Adapts a single document field with visual metadata
   */
  private static adaptField(field: DocumentApiResponse['data']['fieldList'][0]): UIDocumentField {
    // Normalize file type to uppercase for matching
    const fileType = field.fileType.toUpperCase();
    
    // Get config for this file type
    const config = FILE_TYPE_CONFIG[fileType] || DEFAULT_CONFIG;

    return {
      documentID: field.documentID,
      name: field.name,
      fileType: field.fileType,
      fileUrl: field.fileUrl,
      fileSize: field.fileSize,
      title: field.title,
      description: field.description,
      icon: config.icon,
      iconColor: config.iconColor,
      iconBgColor: config.iconBgColor,
    };
  }
}
