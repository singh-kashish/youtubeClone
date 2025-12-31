import { supabase } from "../utils/supabase";

export async function getRecommendedVideos({
  page = 1,
  pageSize = 12,
}: {
  page?: number;
  pageSize?: number;
}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  return supabase
    .from("video")
    .select(`
      id,
      title,
      thumbnailUrl,
      viewCount,
      likes,
      created_at,
      profiles:profiles!video_user_id_fkey (
        id,
        username,
        avatar_url
      )
    `)
    .eq("videoStatus", true)
    .order("viewCount", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);
}
