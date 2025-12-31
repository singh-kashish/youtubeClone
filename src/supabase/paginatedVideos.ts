import { supabase } from "../utils/supabase";

export async function getPaginatedVideos({
  page,
  pageSize,
  sortBy,
  ascending,
}: any) {
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
      profiles (
        id,
        username,
        avatar_url
      )
    `, { count: "exact" })
    .eq("videoStatus", true)
    .order(sortBy, { ascending })
    .range(from, to);
}
