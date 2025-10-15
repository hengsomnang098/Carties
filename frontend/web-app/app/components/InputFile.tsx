'use client';

import { Label, HelperText, FileInput as FBFileInput } from "flowbite-react";
import { useController, UseControllerProps } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

type Props = {
  label?: string;
  type?: string;
  showLabel?: boolean;
  accept?: string;
} & UseControllerProps;

export default function InputFile(props: Props) {
  const { field, fieldState } = useController({ ...props });
  const [preview, setPreview] = useState<string | null>(null);

  const convertToWebP = useCallback(async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Canvas not supported");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("Failed to convert image");
            const webpFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(webpFile);
          },
          "image/webp",
          0.8 // compression quality
        );
      };

      img.onerror = reject;
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        let file = files[0];

        if (file.type.startsWith("image/")) {
          try {
            const webpFile = await convertToWebP(file);
            field.onChange(webpFile); // ✅ send converted file
            setPreview(URL.createObjectURL(webpFile));
          } catch (err) {
            console.error("Failed to convert image:", err);
            field.onChange(file);
            setPreview(URL.createObjectURL(file));
          }
        } else {
          // non-image file
          field.onChange(file);
          setPreview(null);
        }
      } else {
        field.onChange(null);
        setPreview(null);
      }
    },
    [field, convertToWebP]
  );
  
  // Update preview if field.value changes (e.g., when editing a form)
  useEffect(() => {
    if (field.value && typeof field.value === "string") {
      setPreview(field.value);
    }
  }, [field.value]);
  
  return (
    <div className="mb-3 block">
      {props.showLabel && (
        <div className="mb-2 block">
          <Label htmlFor={field.name}>{props.label}</Label>
        </div>
      )}

      <FBFileInput
        id={field.name}
        accept={props.accept || "image/*"}
        color={fieldState?.error ? "failure" : !fieldState.isDirty ? "" : "success"}
        onChange={handleChange}
      />

      {preview && (
        <div className="mt-2">
          {/* <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
          /> */}
          <Image 
            src={preview}
            alt="Preview"
            width={100}
            height={100}
            className="w-full h-full object-cover rounded-lg border border-gray-200"
            priority
          />
        </div>
      )}

      {fieldState.error && (
        <HelperText color="failure">{fieldState.error.message}</HelperText>
      )}
    </div>
  );
}
