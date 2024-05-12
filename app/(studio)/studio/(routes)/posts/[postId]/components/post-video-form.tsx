"use client";

import axios from "@/lib/axios";
import { AxiosProgressEvent } from "axios";
import { useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import MuxPlayer from "@mux/mux-player-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadCloud } from "lucide-react";
import { Upload } from "lucide-react";

interface VideoUploadProps {
  initialData: Post | null;
  userId: string | undefined;
  token: string | null;
}

export const VideoUploadForm: React.FC<VideoUploadProps> = ({
  initialData,
  userId,
  token,
}) => {
  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Number state handling upload progress
  const [progress, setProgress] = useState(0);

  // Hooks handling url param
  const params = useParams();

  // Funcstion handling showing the upload progress
  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    if (progressEvent.total) {
      // Calculate the progress
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentage);
    }
  };

  // Function handling showing preview image
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoading(true);

        // POST request to server
        await axios.post(`/posts/${params.postId}/upload/video`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: onUploadProgress,
        });

        // Show a success toast
        toast.success("Successfully uploaded the video!");

        // Refresh the page
        window.location.reload();
      } catch (error) {
        console.log(error);

        // Show an error toast
        toast.error("Ooops! There was a problem with your request!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Upload this post content. Note the video may take a few minutes for
        processing and encoding.
      </p>
      {initialData?.mux_asset_id && (
        <div className="relative aspect-video w-[500px] h-auto">
          <MuxPlayer
            streamType="on-demand"
            autoPlay={false}
            title={initialData.title}
            playbackId={initialData.mux_playback_id}
            accentColor="#ea580c"
            metadataVideoId={initialData.id}
            metadataVideoTitle={initialData.title}
            metadataViewerUserId={userId}
            maxResolution="720p"
          />
        </div>
      )}

      {!initialData?.mux_asset_id && (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="mt-5 flex gap-x-2">
              <Upload className="w-5 h-5" />
              Upload Video
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Post Video</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center w-full">
              <label className="relative flex flex-col items-center justify-center w-full py-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 duration-150">
                {loading && (
                  <div className=" text-center max-w-md  ">
                    <Progress progress={progress} />
                    <p className=" text-sm font-semibold">Uploading Picture</p>
                    <p className=" text-xs text-gray-400">
                      Do not refresh your page while performing upload
                    </p>
                  </div>
                )}

                {!loading && (
                  <div className="text-center">
                    <div className="p-2 rounded-md max-w-min mx-auto">
                      <UploadCloud className="w-5 h-5 hover:text-muted-foreground duration-150" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Upload a video</span>
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-400">
                      MP4 or MOV (MAX. 1GB)
                    </p>
                  </div>
                )}
                <Input
                  type="file"
                  accept="video/mp4, video/quicktime"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </label>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
