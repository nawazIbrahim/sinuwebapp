# Document Dashboard Upload/Replace Feature

## Overview
The Document Dashboard now includes complete document management capabilities, allowing users to upload new documents or replace existing ones. This feature supports 15+ file formats and provides real-time visual feedback, making it a powerful tool for managing business documents.

---

## 🎯 Key Features

### 1. Document Upload/Replace
- **Upload Button**: Click "Replace File" to upload new documents
- **File Picker**: Opens with pre-filtered file types
- **Real-time Updates**: Icon, type, and size update immediately after upload
- **Visual Feedback**: Progress indicator and loading states

### 2. Multi-Format Support

#### Supported File Formats (15+ types):

**Images** (4 formats):
- JPG, JPEG, PNG, GIF
- Purple theme (#7C3AED / #EDE9FE)

**Documents** (4 formats):
- PDF (Red theme: #DC2626 / #FEE2E2)
- DOC, DOCX (Blue theme: #2563EB / #DBEAFE)
- TXT (Gray theme: #64748B / #F1F5F9)

**Spreadsheets** (3 formats):
- XLS, XLSX, CSV
- Green theme (#059669 / #D1FAE5)

**Presentations** (2 formats):
- PPT, PPTX
- Red theme (#DC2626 / #FEE2E2)

**Archives** (2 formats):
- ZIP, RAR
- Yellow theme (#CA8A04 / #FEF3C7)

### 3. File Validation

#### Type Validation
```typescript
const allowedTypes = [
  'JPG', 'JPEG', 'PNG', 'GIF',           // Images
  'PDF',                                   // PDF
  'DOC', 'DOCX', 'TXT',                   // Documents
  'XLS', 'XLSX', 'CSV',                   // Spreadsheets
  'PPT', 'PPTX',                          // Presentations
  'ZIP', 'RAR'                            // Archives
];
```
- Validates file extension before upload
- Case-insensitive matching
- User-friendly error message listing all supported types

#### Size Validation
- **Maximum file size**: 1 MB (ensures fast uploads and optimal performance)
- Enhanced error message shows actual file size vs. limit
- Format: "❌ File Too Large\n\nYour file size: X.XX MB\nMaximum allowed: 1 MB"
- Prevents large uploads that could impact performance

### 4. Upload States

#### Idle State
- Shows current document icon with color coding
- Displays "Replace File" button on hover
- Shows both upload and download buttons in overlay

#### Uploading State
```tsx
{isUploading ? (
  <>
    <span className="material-icons animate-spin">refresh</span>
    <span>Uploading...</span>
  </>
) : (
  <>
    <span className="material-icons">upload</span>
    <span>Replace File</span>
  </>
)}
```
- Spinning refresh icon for visual feedback
- "Uploading..." text replaces button text
- Button is disabled (`disabled:opacity-50 disabled:cursor-not-allowed`)
- Progress bar appears at top of preview container

#### Success State
- Icon updates to match new file type
- Icon color and background color change automatically
- File type badge updates (e.g., "PDF" → "DOCX")
- File size recalculates and displays
- Console log confirms successful upload
- Ready for another upload immediately

#### Error State
- User-friendly alert dialogs with clear formatting
- Specific messages for each error type:
  - **Invalid file type**: 
    ```
    ❌ Invalid File Type
    
    Please select a valid file format:
    • Images: JPG, JPEG, PNG, GIF
    • Documents: PDF, DOC, DOCX, TXT
    • Spreadsheets: XLS, XLSX, CSV
    • Presentations: PPT, PPTX
    • Archives: ZIP, RAR
    ```
  - **File too large**: 
    ```
    ❌ File Too Large
    
    Your file size: 2.45 MB
    Maximum allowed: 1 MB
    
    Please select a smaller file.
    ```
  - **Read error**: "Failed to read file"
- Original document remains unchanged
- Upload button returns to idle state

---

## 🔧 Technical Implementation

### Component Updates

#### DocumentFieldCard Props
```typescript
interface DocumentFieldCardProps {
  label: string;
  title: string;
  description: string;
  fieldDescription: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onFileChange: (fileUrl: string, fileType: string, fileSize: string) => void;  // NEW
  draggableProps?: any;
  dragHandleProps?: any;
  isDragging?: boolean;
}
```

#### State Management
```typescript
// Component state for managing upload
const [currentIcon, setCurrentIcon] = useState(icon);
const [currentIconColor, setCurrentIconColor] = useState(iconColor);
const [currentIconBgColor, setCurrentIconBgColor] = useState(iconBgColor);
const [currentFileType, setCurrentFileType] = useState(fileType);
const [currentFileSize, setCurrentFileSize] = useState(fileSize);
const [isUploading, setIsUploading] = useState(false);
const fileInputRef = useRef<HTMLInputElement>(null);
```

### Upload Implementation

```typescript
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // Get file extension
  const extension = file.name.split('.').pop()?.toUpperCase() || '';
  
  // Validate file type
  const allowedTypes = ['JPG', 'JPEG', 'PNG', 'GIF', 'PDF', 'DOC', 'DOCX', 'TXT', 'XLS', 'XLSX', 'CSV', 'PPT', 'PPTX', 'ZIP', 'RAR'];
  if (!allowedTypes.includes(extension)) {
    alert('❌ Invalid File Type\n\nPlease select a valid file format:\n• Images: JPG, JPEG, PNG, GIF\n• Documents: PDF, DOC, DOCX, TXT\n• Spreadsheets: XLS, XLSX, CSV\n• Presentations: PPT, PPTX\n• Archives: ZIP, RAR');
    return;
  }

    // Validate file size (max 1MB)
    const maxSizeBytes = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSizeBytes) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      alert(`❌ File Too Large\n\nYour file size: ${fileSizeMB} MB\nMaximum allowed: 1 MB\n\nPlease select a smaller file.`);
      return;
    }

  setIsUploading(true);

  // Read file as data URL
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target?.result as string;
    
    // Get icon configuration for new file type
    const iconData = getFileTypeIcon(extension);
    
    // Update local state immediately for UI feedback
    setCurrentIcon(iconData.icon);
    setCurrentIconColor(iconData.iconColor);
    setCurrentIconBgColor(iconData.iconBgColor);
    setCurrentFileType(extension);
    setCurrentFileSize(formatFileSize(file.size));
    
    // Notify parent component of file change
    setTimeout(() => {
      onFileChange(dataUrl, extension, formatFileSize(file.size));
      setIsUploading(false);
      console.log('Document uploaded successfully:', { 
        type: extension, 
        size: formatFileSize(file.size) 
      });
    }, 500); // Simulate upload delay for UX
  };

  reader.onerror = () => {
    alert('Failed to read file');
    setIsUploading(false);
  };

  reader.readAsDataURL(file);
};
```

**Key Features:**
- Uses FileReader API for client-side file reading
- Converts to data URL for immediate display
- Simulates upload delay (500ms) for smooth UX
- Updates local state for instant visual feedback
- Proper error handling for read failures

### File Size Formatting
```typescript
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
};
```
- Converts bytes to human-readable format
- Appropriate units (B, KB, MB)
- Correct precision for each unit

### Icon Configuration
```typescript
const getFileTypeIcon = (type: string): { 
  icon: string; 
  iconColor: string; 
  iconBgColor: string 
} => {
  const upperType = type.toUpperCase();
  const configs: Record<string, { icon: string; iconColor: string; iconBgColor: string }> = {
    PDF: { icon: 'picture_as_pdf', iconColor: '#DC2626', iconBgColor: '#FEE2E2' },
    DOC: { icon: 'description', iconColor: '#2563EB', iconBgColor: '#DBEAFE' },
    DOCX: { icon: 'description', iconColor: '#2563EB', iconBgColor: '#DBEAFE' },
    // ... more configurations
  };
  return configs[upperType] || { 
    icon: 'insert_drive_file', 
    iconColor: '#617289', 
    iconBgColor: '#F3F4F6' 
  };
};
```
- Centralized icon configuration
- Color-coded by file type
- Fallback for unknown types
- Material Icons for consistency

### UI Components

#### Hidden File Input
```tsx
<input
  ref={fileInputRef}
  type="file"
  accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt,.xls,.xlsx,.csv,.ppt,.pptx,.zip,.rar"
  onChange={handleFileUpload}
  className="hidden"
/>
```
- Hidden from view, triggered programmatically
- `accept` attribute filters to allowed file types
- Managed via React ref

#### Upload/Download Overlay
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent 
  opacity-0 group-hover:opacity-100 transition-opacity duration-300 
  flex items-end justify-center pb-4 gap-2">
  
  {/* Upload Button */}
  <button onClick={handleUploadClick} disabled={isUploading}
    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm 
    shadow-lg hover:bg-gray-100 active:scale-95 transition-all flex items-center gap-2">
    <span className="material-icons text-base">upload</span>
    <span>Replace File</span>
  </button>
  
  {/* Download Button */}
  <a href={fileUrl} target="_blank" rel="noopener noreferrer"
    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm 
    shadow-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2">
    <span className="material-icons text-base">download</span>
    <span>Download</span>
  </a>
</div>
```

**Features:**
- Gradient overlay appears on hover
- Two distinct actions: Upload (white) and Download (blue)
- Material Icons for visual clarity
- Smooth transitions (300ms)
- Active scale feedback (0.95)
- Disabled state during upload

#### Progress Indicator
```tsx
{isUploading && (
  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse"></div>
)}
```
- Thin bar at top of preview container
- Blue color matches theme
- Pulse animation for attention
- Only visible during upload

#### Upload Hint
```tsx
<p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
  <span className="material-icons text-sm">info</span>
  <span>Click "Replace File" to upload a new document (max 1 MB) • 
        Click "Download" to view current file</span>
</p>
```
- Clear instructions for both actions
- Info icon for visibility
- Specifies size limit

---

## 🏗️ Dashboard State Management

### State Interface
```typescript
interface DocumentDashboardState {
  fields: Record<string, { 
    enabled: boolean; 
    title: string; 
    description: string;
    fileUrl?: string;       // NEW
    fileType?: string;      // NEW
    fileSize?: string;      // NEW
  }>;
  fieldsOrder: string[];
}
```

### File Change Handler
```typescript
const handleFileChange = (
  id: string, 
  fileUrl: string, 
  fileType: string, 
  fileSize: string
) => {
  console.log(`Update field ${id} file:`, { 
    fileType, 
    fileSize, 
    url: fileUrl.substring(0, 50) + '...' 
  });
  
  // Update state
  setState((prev) => ({
    ...prev,
    fields: {
      ...prev.fields,
      [id]: {
        ...prev.fields[id],
        fileUrl,
        fileType,
        fileSize,
      },
    },
  }));

  // Update data for immediate UI refresh
  if (data) {
    const updatedFields = data.fields.map(field => 
      field.id === id 
        ? { ...field, fileUrl, fileType, fileSize }
        : field
    );
    setData({ ...data, fields: updatedFields });
  }
};
```

**Features:**
- Updates state with new file information
- Immediate UI refresh by updating data
- Console logging for debugging
- Preserves other field properties

---

## 📡 Adapter Updates

### Updated toApiUpdate Method
```typescript
static toApiUpdate(
  dashboardData: DocumentDashboardData,
  updatedState: {
    fields: Record<string, { 
      enabled: boolean; 
      title: string; 
      description: string;
      fileUrl?: string;      // NEW
      fileType?: string;     // NEW
      fileSize?: string;     // NEW
    }>;
    fieldsOrder: string[];
  }
): Partial<DocumentApiResponse['data']> {
  const fieldsById = new Map(dashboardData.fields.map((field) => [field.id, field]));
  const updatedFields = updatedState.fieldsOrder
    .map((id, index) => {
      const field = fieldsById.get(id);
      if (!field) return null;
      const fieldState = updatedState.fields[id];
      return {
        ...field.originalData,
        title: fieldState?.title ?? field.title,
        description: fieldState?.description ?? field.description,
        fileUrl: fieldState?.fileUrl ?? field.fileUrl,          // NEW
        fileType: fieldState?.fileType ?? field.fileType,       // NEW
        fileSize: fieldState?.fileSize ?? field.fileSize,       // NEW
        isVisible: fieldState?.enabled ?? field.enabled,
        displayOrder: index + 1,
      };
    })
    .filter((f) => f !== null) as DocumentField[];
  return { fieldList: updatedFields };
}
```

**Features:**
- Includes new file properties in API update
- Falls back to original values if not changed
- Maintains proper data structure for API

---

## 💡 User Experience

### Upload Flow
1. **Hover over document card** → Overlay with two buttons appears
2. **Click "Replace File"** → File picker opens (filtered to allowed types)
3. **Select file** → Validation runs automatically
4. **If valid** → Upload begins:
   - Progress bar appears at top
   - Button shows "Uploading..." with spinning icon
   - Button is disabled
5. **Upload completes** (500ms simulation):
   - Icon changes to match new file type
   - Icon color updates
   - File type badge updates
   - File size recalculates
   - Console logs success
   - Ready for next action
6. **If invalid** → Alert shows detailed error:
   - Wrong type → Shows categorized list of supported formats
   - Too large → Shows actual file size vs. 1 MB limit
   - Read error → Shows generic error

### Download Flow
1. **Hover over document card** → Overlay appears
2. **Click "Download"** → File opens in new tab
3. **Download/view** → Browser handles file display or download

### Error Handling
- **Invalid file type**: 
  - Alert title: "❌ Invalid File Type"
  - Categorized list by type (Images, Documents, Spreadsheets, etc.)
  - All 15+ supported formats displayed
- **File too large**: 
  - Alert title: "❌ File Too Large"
  - Shows actual file size (e.g., "Your file size: 2.45 MB")
  - Shows limit: "Maximum allowed: 1 MB"
  - Actionable message: "Please select a smaller file"
- **Read failure**: Alert with error message
- **No file selected**: Silently handled (no error)

---

## 🎨 Visual Design

### Color Themes by File Type

| File Type | Icon | Color | Background | Use Case |
|-----------|------|-------|------------|----------|
| PDF | `picture_as_pdf` | #DC2626 (Red) | #FEE2E2 | PDFs |
| DOC/DOCX | `description` | #2563EB (Blue) | #DBEAFE | Word documents |
| TXT | `article` | #64748B (Gray) | #F1F5F9 | Text files |
| XLS/XLSX | `table_chart` | #059669 (Green) | #D1FAE5 | Spreadsheets |
| JPG/PNG | `image` | #7C3AED (Purple) | #EDE9FE | Images |
| PPT/PPTX | `slideshow` | #DC2626 (Red) | #FEE2E2 | Presentations |
| ZIP/RAR | `folder_zip` | #CA8A04 (Yellow) | #FEF3C7 | Archives |
| Unknown | `insert_drive_file` | #617289 (Gray) | #F3F4F6 | Fallback |

### Animation & Transitions
- **Overlay fade**: 300ms opacity transition
- **Icon scale**: 1.1x on hover (300ms)
- **Button scale**: 0.95x on active
- **Progress bar**: Pulse animation
- **Spinner**: 360° rotation (continuous)

---

## ✅ Testing Checklist

### Upload Functionality
- [ ] Upload button appears on hover
- [ ] File picker opens with correct file types
- [ ] Upload accepts valid file types (JPG, PNG, PDF, DOC, etc.)
- [ ] Upload rejects invalid file types
- [ ] Upload rejects files larger than 1 MB
- [ ] Upload accepts files smaller than 1 MB
- [ ] Error message shows actual file size when too large
- [ ] Progress indicator shows during upload
- [ ] Button disables during upload
- [ ] Spinner animates during upload

### UI Updates
- [ ] Icon changes to match new file type
- [ ] Icon color updates correctly
- [ ] Icon background color updates correctly
- [ ] File type badge updates
- [ ] File size calculates and displays correctly
- [ ] Changes persist after save
- [ ] Changes appear on main documents page after save

### Error Handling
- [ ] Invalid file type shows categorized format list
- [ ] Large file shows actual size vs. limit (1 MB)
- [ ] Error messages are well-formatted and clear
- [ ] Read failure shows error message
- [ ] Original document preserved after error
- [ ] Upload button returns to idle after error

### Download Functionality
- [ ] Download button appears on hover
- [ ] Download opens in new tab
- [ ] Download link works correctly
- [ ] Both buttons visible simultaneously

---

## 🚀 Benefits

### For Users
1. **Complete Control**: Upload, replace, edit, and download documents
2. **Multi-Format Support**: Works with all common business file types
3. **Real-time Feedback**: Immediate visual updates when files change
4. **Clear Validation**: Helpful error messages guide correct usage
5. **Professional Experience**: Polished UI inspires confidence
6. **Easy Management**: All actions in one place

### For Business
1. **Self-Service**: Users manage their own documents
2. **Format Flexibility**: Supports all standard business formats
3. **Data Control**: File validation ensures quality
4. **Modern Experience**: Competitive with industry standards
5. **Complete Management**: Upload, organize, edit, and share
6. **Consistent Design**: Matches other dashboard patterns

---

## 🔮 Future Enhancements (Optional)

- [ ] Multiple file upload at once
- [ ] Drag-and-drop file upload
- [ ] File preview before upload
- [ ] Cloud storage integration
- [ ] File compression for large documents
- [ ] Batch operations (delete, move, copy)
- [ ] File versioning and history
- [ ] Share/download links generation
- [ ] Advanced file type detection (MIME types)
- [ ] Custom file type themes

---

**The Document Dashboard now offers a complete, professional document management experience with upload, download, edit, and organize capabilities that rival modern SaaS applications!** 🎉
