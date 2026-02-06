'use client';

import { useState } from 'react';
import { ToggleSwitch } from '../dashboard/ToggleSwitch';

interface ModuleFieldCardProps {
  label: string;
  value: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onValueChange: (value: string) => void;
  draggableProps?: any;
  dragHandleProps?: any;
  isDragging?: boolean;
}

export function ModuleFieldCard({
  label,
  value,
  description,
  enabled,
  onToggle,
  onValueChange,
  draggableProps,
  dragHandleProps,
  isDragging = false,
}: ModuleFieldCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = () => {
    if (editedValue.trim() && editedValue !== value) {
      onValueChange(editedValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(value);
    setIsEditing(false);
  };

  return (
    <div
      {...draggableProps}
      className={`bg-white rounded-[16px] p-4 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] transition-shadow ${
        isDragging ? 'shadow-[0px_12px_32px_0px_rgba(0,0,0,0.15)]' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Toggle Switch */}
        <div className="flex-shrink-0 mt-1">
          <div className="transform scale-75">
            <ToggleSwitch
              checked={enabled}
              onChange={onToggle}
              size="sm"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Label */}
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-gray-900 text-sm pointer-events-none">{label}</h4>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="opacity-60 hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded active:scale-90 touch-manipulation"
                aria-label="Edit value"
              >
                <span className="material-icons text-gray-500 text-base pointer-events-none">edit</span>
              </button>
            )}
          </div>

          {/* Description */}
          <p className="text-[11px] text-gray-500 mb-2 pointer-events-none">{description}</p>

          {/* Value */}
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') handleCancel();
                }}
                className="w-full text-sm text-gray-700 bg-blue-50 border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px] resize-none"
                autoFocus
                placeholder="Enter value"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all touch-manipulation"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded-lg font-medium hover:bg-gray-300 active:scale-95 transition-all touch-manipulation"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed break-words pointer-events-none">
              {value || 'No value provided'}
            </p>
          )}
        </div>

        {/* Drag Handle */}
        <div
          {...dragHandleProps}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing transition-colors mt-1"
          aria-label="Drag to reorder"
        >
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
