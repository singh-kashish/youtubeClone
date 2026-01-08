import { supabase } from "../utils/supabase";

type RefetchFn = () => Promise<void>;

/* ---------------------------------- VIDEO ---------------------------------- */

export async function addVideo(payload: any, refetch?: RefetchFn) {
  const res = await supabase.from("video").insert(payload).single();
  if (refetch) await refetch();
  return res;
}

export async function updateVideo(id: string, payload: any, refetch?: RefetchFn) {
  const res = await supabase.from("video").update(payload).eq("id", id).single();
  if (refetch) await refetch();
  return res;
}

export async function deleteVideo(id: string, refetch?: RefetchFn) {
  const res = await supabase.from("video").delete().eq("id", id);
  if (refetch) await refetch();
  return res;
}



/* -------------------------------- COMMENTS -------------------------------- */

interface AddCommentInput {
  video_id: string;
  user_id: string;
  text: string;
}

export const addComment = async ({
  video_id,
  user_id,
  text,
}: AddCommentInput) => {
  const { data, error } = await supabase
    .from("comment")
    .insert({
      video_id,
      user_id,
      text,
      likeCount: 0,
      dislikeCount: 0,
    })
    .select(
      `
      id,
      text,
      created_at,
      user_id,
      video_id,
      likeCount,
      dislikeCount
    `
    )
    .single();

  if (error || !data) {
    throw error;
  }

  // ✅ RETURN CLEAN DOMAIN OBJECT
  return {data,error};
};

export async function updateComment(
  id: string,
  text: string,
  refetch?: RefetchFn
) {
  const res = await supabase.from("comment").update({ text }).eq("id", id).single();
  if (refetch) await refetch();
  return res;
}

export async function deleteComment(id: string, refetch?: RefetchFn) {
  const res = await supabase.from("comment").delete().eq("id", id);
  if (refetch) await refetch();
  return res;
}

/* ------------------------------ COMMENT LIKES ------------------------------ */

export async function addLikeOnComment(
  payload: {
    comment_id: string;
    user_id: string;
    like: boolean;
  },
  refetch?: RefetchFn
) {
  const res = await supabase.from("likedComments").insert(payload).single();
  if (refetch) await refetch();
  return res;
}

export async function updateLikeOnComment(
  id: string,
  like: boolean,
  refetch?: RefetchFn
) {
  const res = await supabase
    .from("likedComments")
    .update({ like })
    .eq("id", id)
    .single();

  if (refetch) await refetch();
  return res;
}

export async function removeLikeOnComment(
  id: string,
  refetch?: RefetchFn
) {
  const res = await supabase.from("likedComments").delete().eq("id", id);
  if (refetch) await refetch();
  return res;
}

/* ------------------------------- VIDEO LIKES ------------------------------- */

export async function addLikeOnVideo(
  payload: {
    video_id: string;
    user_id: string;
    liked: boolean;
  },
  refetch?: RefetchFn
) {
  const res = await supabase.from("likedVideos").insert(payload).single();
  if (refetch) await refetch();
  return res;
}

export async function updateLikeOnVideo(
  id: string,
  liked: boolean,
  refetch?: RefetchFn
) {
  const res = await supabase.from("likedVideos").update({ liked }).eq("id", id).single();
  if (refetch) await refetch();
  return res;
}

export async function removeLikeOnVideo(
  id: string,
  refetch?: RefetchFn
) {
  const res = await supabase.from("likedVideos").delete().eq("id", id);
  if (refetch) await refetch();
  return res;
}

/* ------------------------------- SUBSCRIBERS ------------------------------- */

export async function insertSubscriber(
  user_id: string,
  subscribed_to_id: string,
  refetch?: RefetchFn
) {
  const res = await supabase
    .from("subscribers")
    .insert({ user_id, subscribed_to_id })
    .single();

  if (refetch) await refetch();
  return res;
}

export async function deleteSubscriber(
  id: string,
  refetch?: RefetchFn
) {
  const res = await supabase.from("subscribers").delete().eq("id", id);
  if (refetch) await refetch();
  return res;
}
