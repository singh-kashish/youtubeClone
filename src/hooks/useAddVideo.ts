// src/hooks/useAddVideo.ts

import { useCallback, useState } from "react";
import { videoService } from "../modules/videoService";
import {
  HookResult,
  VideoInsertInput,
  Video,
} from "../types/UnifiedVideoTypes";

function isValidHttpUrl(candidate?: string): boolean {
  if (!candidate) return false;
  try {
    const u = new URL(candidate);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function useAddVideo(): HookResult<Video> & {
  submitAuthenticated: (
    userId: string,
    input: Omit<VideoInsertInput, "user_id">
  ) => Promise<Video | null>;
} {
  const [data, setData] = useState<Video | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submit = useCallback(async (input: VideoInsertInput): Promise<Video | null> => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      if (!input.user_id) throw new Error("User ID is required to create a video");
      if (!input.title?.trim()) throw new Error("Title is required");

      const normalizedThumbnailUrl =
        isValidHttpUrl(input.thumbnailUrl || undefined) === false ? "" : (input.thumbnailUrl ?? "");
      const normalizedVideoUrl =
        isValidHttpUrl(input.videoUrl || undefined) === false ? "" : (input.videoUrl ?? "");

      const createdAt = new Date().toISOString();
      console.log("Creating video at:", createdAt);
      const payload: VideoInsertInput = {
        ...input,
        thumbnailUrl: normalizedThumbnailUrl,
        videoUrl: normalizedVideoUrl,
        created_at: createdAt,
      };

      const res = await videoService.addVideo(payload);
      setData(res.data);
      setError(res.error);
      if (res.error) return null;
      return res.data;
    } catch (e: any) {
      setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAuthenticated = useCallback(
    async (
      userId: string,
      input: Omit<VideoInsertInput, "user_id">
    ): Promise<Video | null> => {
      if (!userId) throw new Error("User ID is required");
      return await submit({ ...input, user_id: userId });
    },
    [submit]
  );

  return { data, error, loading, submitAuthenticated };
}
