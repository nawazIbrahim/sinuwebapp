'use client';

import { useState } from 'react';
import { ToggleSwitch } from '../dashboard/ToggleSwitch';

interface LinkFieldCardProps {
  label: string;
  description: string;
  linkText: string;
  linkUrl: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onLabelChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onLinkTextChange: (value: string) => void;
  onLinkUrlChange: (value: string) => void;
  draggableProps?: any;
  dragHandleProps?: any;
  isDragging?: boolean;
}

export function LinkFieldCard({
  label,
  description,
  linkText,
  linkUrl,
  enabled,
  onToggle,
  onLabelChange,
  onDescriptionChange,
  onLinkTextChange,
  onLinkUrlChange,
  draggableProps,
  dragHandleProps,
  isDragging = false,
}: LinkFieldCardProps) {
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingLinkText, setIsEditingLinkText] = useState(false);
  const [isEditingLinkUrl, setIsEditingLinkUrl] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedLinkText, setEditedLinkText] = useState(linkText);
  const [editedLinkUrl, setEditedLinkUrl] = useState(linkUrl);

  const handleSaveLabel = () => {
    if (editedLabel.trim() !== label) onLabelChange(editedLabel.trim());
    setIsEditingLabel(false);
  };
  const handleCancelLabel = () => {
    setEditedLabel(label);
    setIsEditingLabel(false);
  };

  const handleSaveDescription = () => {
    if (editedDescription.trim() !== description) onDescriptionChange(editedDescription.trim());
    setIsEditingDescription(false);
  };
  const handleCancelDescription = () => {
    setEditedDescription(description);
    setIsEditingDescription(false);
  };

  const handleSaveLinkText = () => {
    if (editedLinkText.trim() !== linkText) onLinkTextChange(editedLinkText.trim());
    setIsEditingLinkText(false);
  };
  const handleCancelLinkText = () => {
    setEditedLinkText(linkText);
    setIsEditingLinkText(false);
  };

  const handleSaveLinkUrl = () => {
    if (editedLinkUrl.trim() !== linkUrl) onLinkUrlChange(editedLinkUrl.trim());
    setIsEditingLinkUrl(false);
  };
  const handleCancelLinkUrl = () => {
    setEditedLinkUrl(linkUrl);
    setIsEditingLinkUrl(false);
  };

  const renderEditableField = (
    labelText: string,
    value: string,
    isEditing: boolean,
    onEdit: () => void,
    editedValue: string,
    setEditedValue: (v: string) => void,
    onSave: () => void,
    onCancel: () => void,
    placeholder: string,
    isTextarea = false
  ) => (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pointer-events-none">{labelText}</label>
        {!isEditing && (
          <button type="button" onClick={onEdit} className="flex items-center gap-1 px-2 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all active:scale-95 touch-manipulation" aria-label={`Edit ${labelText.toLowerCase()}`}>
            <span className="material-icons text-sm pointer-events-none">edit</span>
            <span className="text-xs font-medium pointer-events-none">Edit</span>
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 space-y-3">
          {isTextarea ? (
            <textarea value={editedValue} onChange={(e) => setEditedValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Escape') onCancel(); }} className="w-full text-sm text-gray-900 bg-white border-2 border-blue-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px] resize-none placeholder-gray-400" autoFocus placeholder={placeholder} />
          ) : (
            <input type="text" value={editedValue} onChange={(e) => setEditedValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Escape') onCancel(); if (e.key === 'Enter') onSave(); }} className="w-full text-sm text-gray-900 bg-white border-2 border-blue-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" autoFocus placeholder={placeholder} />
          )}
          <div className="flex items-center gap-2">
            <button type="button" onClick={onSave} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-sm touch-manipulation"><span className="material-icons text-base">check</span><span>Save</span></button>
            <button type="button" onClick={onCancel} className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-50 active:scale-95 transition-all border border-gray-300 touch-manipulation"><span className="material-icons text-base">close</span><span>Cancel</span></button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed break-words pointer-events-none">{value || `No ${labelText.toLowerCase()} provided`}</p>
        </div>
      )}
    </div>
  );

  return (
    <div
      {...draggableProps}
      className={`bg-white rounded-[20px] p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] transition-all duration-200 border border-gray-100 ${isDragging ? 'shadow-[0px_8px_24px_0px_rgba(0,0,0,0.16)] scale-[1.02]' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-2">
          <ToggleSwitch checked={enabled} onChange={onToggle} size="sm" />
        </div>

        <div className="flex-1 min-w-0">
          {renderEditableField('Name', label, isEditingLabel, () => setIsEditingLabel(true), editedLabel, setEditedLabel, handleSaveLabel, handleCancelLabel, 'Link name...', false)}
          {renderEditableField('Description', description, isEditingDescription, () => setIsEditingDescription(true), editedDescription, setEditedDescription, handleSaveDescription, handleCancelDescription, 'Link description...', true)}
          {renderEditableField('Link Text', linkText, isEditingLinkText, () => setIsEditingLinkText(true), editedLinkText, setEditedLinkText, handleSaveLinkText, handleCancelLinkText, 'e.g. Visit Website', false)}
          {renderEditableField('Link URL', linkUrl, isEditingLinkUrl, () => setIsEditingLinkUrl(true), editedLinkUrl, setEditedLinkUrl, handleSaveLinkUrl, handleCancelLinkUrl, 'https://...', false)}
        </div>

        <div {...dragHandleProps} className="flex-shrink-0 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing transition-colors hover:bg-gray-100 rounded-lg p-2" aria-label="Drag to reorder">
          <div className="flex flex-col items-center gap-1">
            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
