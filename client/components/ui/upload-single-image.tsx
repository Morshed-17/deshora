import { Label } from "@radix-ui/react-dropdown-menu";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
interface UploadSingleImageProps {
  onFileSelect: (file: File | null) => void;
  label?: string;
}

function UploadSingleImage({
  onFileSelect,
  label = "Upload image",
}: UploadSingleImageProps) {
  const [preview, setPreview] = useState<string | null>(null);


  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      onFileSelect(file);

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Clean up the url object when component unmounts or file changes
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/avif": [],
      "image/png": [],
      "image/webp": [],
    },
    multiple: false,
  });
  //  Cleanup when preview changes or component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}

      <div
        {...getRootProps()}
        className={`border border-dashed p-6 rounded-lg text-center cursor-pointer transition ${
          isDragActive ? "border-primary bg-gray-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <p>Drag & drop an image here, or click to select</p>
        )}
      </div>

      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-xs rounded-lg border"
          />
        </div>
      )}
    </div>
  );
}

export default UploadSingleImage;
