import { Video } from "../types/db";
import { VideoRow } from "../types/dbRows";

export function mapVideoRow(row: VideoRow): Video {
  return {
    id: row.id,
    title: row.title,
    description: row.description!,
    videoUrl: row.videoUrl,
    thumbnailUrl: row.thumbnailUrl!,
    viewCount: row.viewCount,
    likes: row.likes,
    dislikes: row.dislikes,
    videoStatus: row.videoStatus,
    created_at: row.created_at,
    user_id: row.user_id,

    // ✅ collapse array → object
    profiles: row.profiles?.[0] ?? null,
  };
}
