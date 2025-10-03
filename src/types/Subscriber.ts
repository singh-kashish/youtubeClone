import { PostgrestError } from "@supabase/supabase-js";
import { VideoWithProfile } from "./VideoLoadTypes";
import { StdioNull } from "child_process";

export interface Subscriber {
  id: string;
  user_id: string| null;
  subscribed_to_id: string| null;
  created_at?: string|null;
}

export interface LoadSubscribedToResponse {
  videosFromSubscriptions: VideoWithProfile[] | null;
  error: PostgrestError | null;
  loading: boolean;
}
  
