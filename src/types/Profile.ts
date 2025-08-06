import {Subscriber} from './Subscriber';
import { Database } from "../../lib/database.types";
import { PostgrestError } from "@supabase/supabase-js";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
export type Profile = Database['public']['Tables']['profiles']['Row'] & {
  subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{
    id: string;
    user_id: string;
  }>;
};
export type ProfileWithSubscribers = Profile & {
  subscribersUsingSubscribers_subscribed_to_id_fkey: Subscriber[] | null;
};
export interface GetProfileResponse {
  Profile: ProfileWithSubscribers | null;
  loading: boolean;
  error: PostgrestError | null;
}
