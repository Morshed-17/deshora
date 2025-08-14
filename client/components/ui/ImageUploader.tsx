"use client";
import React, { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";

function SortableItem({
  id,
  file,
  remove,
}: {
  id: string;
  file: File;
  remove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      
      className="relative group"
    >
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        {...listeners}
        className="w-32 h-32 object-cover rounded-lg border"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // stop DnD drag from starting
          remove();
        }}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      >
        <X size={12} />
      </button>
    </div>
  );
}

export default function ImageUploader({
  value,
  onChange,
}: {
  value: File[];
  onChange: (files: File[]) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDropFiles = (files: FileList | null) => {
    if (files) {
      onChange([...value, ...Array.from(files)]);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = value.findIndex((f) => f.name === active.id);
      const newIndex = value.findIndex((f) => f.name === over.id);
      onChange(arrayMove(value, oldIndex, newIndex));
    }
  };

  const removeFile = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Upload Box */}
      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleDropFiles(e.target.files)}
          className="hidden"
        />
        <span className="text-gray-500">Click or drag images here</span>
      </label>

      {/* Sortable Images */}
      {value.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={value.map((f) => f.name)}
            strategy={rectSortingStrategy}
          >
            <div className="flex flex-wrap gap-4 mt-4 cursor-grab">
              {value.map((file, idx) => (
                <SortableItem
                  key={file.name}
                  id={file.name}
                  file={file}
                  remove={() => removeFile(idx)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
