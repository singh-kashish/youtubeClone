// modules/subscriberService.ts
import { LoadSubscribedToResponse, Subscriber } from "../types/Subscriber";
import { supabase } from "../components/utils/supabase";
import { VideoWithProfile } from "../types/VideoLoadTypes";

export const subscriberService = {
  async getSubscriptionsByUserId(userId: string): Promise<LoadSubscribedToResponse> {
    // Step 1: Get all subscribed_to_id for this user
    const { data: subscriptions, error: subError } = await supabase
      .from("subscribers")
      .select("subscribed_to_id")
      .eq("user_id", userId);

    if (subError) {
      return { videosFromSubscriptions: null, error: subError, loading: false };
    }

    // Filter out nulls to avoid type errors
    const subscribedIds = (subscriptions ?? [])
      .map((s: { subscribed_to_id: string | null }) => s.subscribed_to_id)
      .filter((id): id is string => typeof id === "string" && id.length > 0);

    if (subscribedIds.length === 0) {
      return { videosFromSubscriptions: [], error: null, loading: false };
    }

    // Step 2: Get all videos for those subscribed_to_id (i.e., channels the user is subscribed to)
    const { data: videos, error: videoError } = await supabase
      .from("video")
      .select("*, profiles(*)")
      .in("user_id", subscribedIds);

    if (videoError) {
      return { videosFromSubscriptions: null, error: videoError, loading: false };
    }

    return { videosFromSubscriptions: videos as VideoWithProfile[], error: null, loading: false };
  },
};
