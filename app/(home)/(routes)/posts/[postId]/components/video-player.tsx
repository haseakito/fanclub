"use client";

import { Lock } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

type VideoPlayerProps = {
  post: Post;
  userId: string;
  isLocked: boolean;
  isOwned: boolean;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  post,
  userId,
  isLocked,
  isOwned,
}) => {
  return (
    <div className="relative aspect-video">
      {isLocked || !isOwned ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2">
          <Lock className="w-5 h-5" />
          <p className="text-white">
            This Post is only available after your purchase
          </p>
        </div>
      ) : null}
      {!isLocked || isOwned ? (
        <MuxPlayer
          title={post.title}
          streamType="on-demand"
          playbackId={post.mux_playback_id}
          autoPlay={false}
          metadataVideoTitle={post.title}
          metadataVideoId={post.id}
          metadataViewerUserId={userId}
          disablePictureInPicture
          maxResolution="720p"
        />
      ) : null}
    </div>
  );
};
