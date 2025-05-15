import { supabase } from "../components/utils/supabase";
import { LoadVideosResponse, typeOfList } from "../types/VideoLoadTypes";

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
  let loading: boolean = true;
  try {
    const { data: video, error, status } = await supabase
      .from("video")
      .select(
        `
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
        profiles(*)
      `
      )
      .order(displayListType, { nullsFirst: false, ascending: order })
      .range(index, offset);

    if (error || status !== 200) {
      throw new Error(error?.message || "Error fetching videos");
    } else {
      loading = false;
      console.log(
        "jh",order
      );
      return { video, loading, error };
    }
  } catch (error: unknown) {
    throw new Error("Error fetching videos");
  } finally {
    loading = false;
  }
}
