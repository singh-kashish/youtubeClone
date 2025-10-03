import { supabase } from "../components/utils/supabase";
import { LoadVideosResponse, typeOfList } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";
// Paginated video loader
export async function loadVideosPaginated({
  index,
  offset,
  order,
  displayListType,
}: {
  index: number;
  offset: number;
  order: boolean;
  displayListType: typeOfList;
}): Promise<LoadVideosResponse> {
  let loading = true;
  try {
    const { data: video, error, status } = await supabase
      .from("video")
      .select(`
        id,
        created_at,
        description,
        dislikes,
        likes,
        thumbnailUrl,
        title,
        videoStatus,
        videoUrl,
        viewCount,
        user_id,
        profiles(*),
        comment(*, profiles(*))
      `)
      .order(displayListType, { nullsFirst: false, ascending: order })
      .range(index, offset);
      console.log(video);
    loading = false;
    if (error || status !== 200) {
      throw new Error(error?.message || "Error fetching videos");
    }
    return { video, loading, error };
  } catch (error: any) {
    return { video: null, loading: false, error: { message: error.message } as PostgrestError };
  }
}
