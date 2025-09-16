import { PostgrestError } from "@supabase/supabase-js";
import { VideoWithProfile } from "./VideoLoadTypes";

export interface Subscriber {
  id: string;
  subscribed_to_id?: string;
  user_id?: string;
  created_at?: string;
}
export interface LoadSubscribedToResponse {
  videosFromSubscriptions: VideoWithProfile[] | null;
  error: PostgrestError | null;
  loading: boolean;
}
