import { supabase } from "../../utils/supabase";
import { Video_Icon } from "../../types/interaces";

type Params = {
  offset: number;
  limit: number;
  sortBy: "recent" | "older" | "high" | "low";
};

export async function fetchVideosFromSupabase({
  offset,
  limit,
  sortBy,
}: Params): Promise<{
  data: Video_Icon[] | null;
  error: any;
}> {
  let query = supabase
    .from("video")
    .select(
      `
      id,
      title,
      description,
      videoUrl,
      thumbnailUrl,
      viewCount,
      likes,
      dislikes,
      videoStatus,
      created_at,
      user_id,
      profiles (
        id,
        username,
        full_name,
        avatar_url
      )
    `
    )
    .eq("videoStatus", true);

  switch (sortBy) {
  case "recent":
    query = query.order("created_at", {
      ascending: false,
      nullsFirst: false, // ✅ NULLS LAST
    });
    break;

  case "older":
    query = query.order("created_at", {
      ascending: true,
      nullsFirst: false, // ✅ NULLS LAST
    });
    break;

  case "high":
    query = query.order("viewCount", { ascending: false });
    break;

  case "low":
    query = query.order("viewCount", { ascending: true });
    break;
}



  const { data, error } = await query.range(
    offset,
    offset + limit - 1
  );

  if (error || !data) {
    return { data: null, error };
  }

  // ✅ NORMALIZATION STEP (THIS FIXES YOUR ERROR)
  const normalized: Video_Icon[] = data.map((row: any) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    videoUrl: row.videoUrl,
    thumbnailUrl: row.thumbnailUrl,
    viewCount: row.viewCount ?? 0,
    likes: row.likes ?? 0,
    dislikes: row.dislikes ?? 0,
    videoStatus: row.videoStatus,
    created_at: row.created_at,
    user_id: row.user_id,
    profiles: row.profiles ?? null, // ✅ OBJECT
  }));

  return { data: normalized, error: null };
}
