import { VideoWithProfile } from "../types/VideoRedux";

export const normalizeVideos = (data: any[]) => {
  return data.map((video) => ({
    ...video,
    profiles: video.profiles ?? null, // KEEP OBJECT
  }));
};

