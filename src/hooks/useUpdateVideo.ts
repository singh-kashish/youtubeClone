// src/hooks/useUpdateVideo.ts

import { useCallback, useState } from "react";
import { videoService } from "../modules/videoService";
import {
  HookResult,
  VideoUpdateInput,
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

export function useUpdateVideo(): HookResult<Video> & {
  submit: (input: VideoUpdateInput) => Promise<void>;
} {
  const [data, setData] = useState<Video | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submit = useCallback(async (input: VideoUpdateInput) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      if (!input.id) throw new Error("id is required to update video");

      // optional normalization for edit step too
      const normalized: VideoUpdateInput = { ...input };
      if (typeof input.thumbnailUrl !== "undefined") {
        normalized.thumbnailUrl =
          isValidHttpUrl(input.thumbnailUrl || undefined) === false ? "" : input.thumbnailUrl ?? "";
      }
      if (typeof input.videoUrl !== "undefined") {
        normalized.videoUrl =
          isValidHttpUrl(input.videoUrl || undefined) === false ? "" : input.videoUrl ?? "";
      }

      const res = await videoService.updateVideo(normalized);
      setData(res.data);
      setError(res.error);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, submit };
}
