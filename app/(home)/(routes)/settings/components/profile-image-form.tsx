"use client";

import axios from "@/lib/axios";
import { AxiosProgressEvent } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadCloud } from "lucide-react";
import { Upload } from "lucide-react";

interface ProfileFormProps {
  initialData: string | null;
  token: string | null;
}

export const ProfileImageForm: React.FC<ProfileFormProps> = ({
  initialData,
  token,
}) => {
  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Number state handling upload progress
  const [progress, setProgress] = useState(0);

  // String state storing profile image url
  const [imageSrc, setImageSrc] = useState("");

  // File state handling uploaded file
  const [file, setFile] = useState<File | null>(null);

  // Funcstion handling showing the upload progress
  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    if (progressEvent.total) {
      //
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentage);
    }
  };

  // Function handling showing preview image
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      setFile(file);
      const src = URL.createObjectURL(file);
      setImageSrc(src);
    }
  };

  // Function handling removing preview image
  const removeImagePreview = () => {
    URL.revokeObjectURL(imageSrc); // Clean up the object URL
    setImageSrc("");
    setFile(null);
  };

  //
  const onSubmit = async () => {
    if (!file) return;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      //
      await axios.post("/users/upload/profile_picture", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: onUploadProgress,
      });

      // Show a success toast
      toast.success("Successfully uploaded the profile image!");

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.log(error);

      // Show an error toast
      toast.error("Ooops! There was a problem with your request!");
    } finally {
      setLoading(false);
    }
  };

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
      {initialData && (
        <Image
          width={130}
          height={130}
          src={initialData}
          alt="profile"
          className="p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        />
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="mt-5 flex gap-x-2">
            <Upload className="w-5 h-5" />
            Upload Image
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center w-full">
            <label className="relative flex flex-col items-center justify-center w-full py-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              {loading && (
                <div className=" text-center max-w-md  ">
                  <Progress progress={progress} />
                  <p className=" text-sm font-semibold">Uploading Picture</p>
                  <p className=" text-xs text-gray-400">
                    Do not refresh your page while performing upload
                  </p>
                </div>
              )}

              {!loading && !imageSrc && (
                <div className="text-center">
                  <div className="p-2 rounded-md max-w-min mx-auto">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Upload an image</span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-400">
                    PNG or JPG (MAX. 5MB)
                  </p>
                </div>
              )}

              {imageSrc && (
                <div className="text-center">
                  <Image
                    width={500}
                    height={500}
                    src={imageSrc}
                    className="w-full object-contain max-h-16 mx-auto mt-2 mb-3 opacity-70 rounded-full"
                    alt="uploaded image"
                  />
                  <p className=" text-sm font-semibold">Picture Uploaded</p>
                  <p className=" text-xs text-gray-400">
                    Next, click submit to upload the picture
                  </p>
                </div>
              )}
              <Input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileChange}
                disabled={loading}
              />
            </label>
          </div>
          <DialogFooter>
            <Button
              size="sm"
              variant="secondary"
              disabled={!imageSrc || loading}
              onClick={removeImagePreview}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!imageSrc || loading}
              onClick={onSubmit}
            >
              {loading ? "Uploading..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
