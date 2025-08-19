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

export type GalleryItem = { type: "file"; file: File } | { type: "url"; url: string };

// Single sortable image item
function SortableItem({
  item,
  remove,
}: {
  item: GalleryItem;
  remove: () => void;
}) {
  // DnD setup
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.type === "file" ? item.file.name : item.url, // unique id
    });

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
        src={item.type === "file" ? URL.createObjectURL(item.file) : item.url}
        alt={item.type === "file" ? item.file.name : "image"}
        {...listeners}
        className="w-32 h-32 object-cover rounded-lg border"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // prevent drag when removing
          remove();
        }}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      >
        <X size={12} />
      </button>
    </div>
  );
}

// Main uploader component
export default function ImageUploader({
  value, // GalleryItem[]
  onChange, // (items: GalleryItem[]) => void
}: {
  value: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  // Add new uploaded files
  const handleDropFiles = (files: FileList | null) => {
    if (files) {
      const newItems: GalleryItem[] = Array.from(files).map((f) => ({
        type: "file",
        file: f,
      }));
      onChange([...value, ...newItems]);
    }
  };

  // Drag & drop reordering
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = value.findIndex(
        (i) => (i.type === "file" ? i.file.name : i.url) === active.id
      );
      const newIndex = value.findIndex(
        (i) => (i.type === "file" ? i.file.name : i.url) === over.id
      );
      onChange(arrayMove(value, oldIndex, newIndex));
    }
  };

  // Remove an item by index
  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Upload box */}
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

      {/* Sortable images */}
      {value.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={value.map((i) => (i.type === "file" ? i.file.name : i.url))}
            strategy={rectSortingStrategy}
          >
            <div className="flex flex-wrap gap-4 mt-4 cursor-grab">
              {value.map((item, idx) => (
                <SortableItem
                  key={item.type === "file" ? item.file.name : item.url}
                  item={item}
                  remove={() => removeItem(idx)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
