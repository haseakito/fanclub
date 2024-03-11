"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface ImageUploadProps {
  disabled?: boolean;
  fileType?: string;
  multiple?: boolean;
  onUpload: (value: FileList) => void;  
  onRemove: (value: string) => void;
  urls: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  fileType = "image/jpeg, image/png",
  multiple = false,
  onUpload,
  onRemove,
  urls,
}) => {
  // Boolean state handling component mount state
  const [isMounted, setIsMounted] = useState(false);

  // Lifecycle handling setting component mount state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {urls.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Suspense fallback={<Skeleton className="object-cover" />}>
              <Image fill src={url} alt="image" className="object-cover" />
            </Suspense>
          </div>
        ))}
      </div>
      {urls.length === 0 && (
        <Input
          accept={fileType}
          type="file"
          multiple={multiple}
          onChange={(e) => {
            if (e.target.files) {
              onUpload(e.target.files);
            }
          }}
          disabled={disabled}
        />
      )}
    </>
  );
};
