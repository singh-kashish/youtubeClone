// import {Subscriber} from './Subscriber';
// import { Database } from "../../lib/database.types";
// import { PostgrestError } from "@supabase/supabase-js";
// import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
// export type ProfileWithSubscribers = Database['public']['Tables']['profiles']['Row'] & {
//   subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{
//     id: string;
//     user_id: string;
//   }>;
// };
// export interface GetProfileResponse {
//   Profile: ProfileWithSubscribers | null;
//   loading: boolean;
//   error: PostgrestError | null;
// }
// src/types/Profile.ts
// import { Database } from "../../lib/database.types";
// import { PostgrestError } from "@supabase/supabase-js";

// export type ProfileWithSubscribers = Database['public']['Tables']['profiles']['Row'] & {
//   subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{
//     id: string;
//     user_id: string;
//   }>;
// };

// export interface GetProfileResponse {
//   Profile: ProfileWithSubscribers | null;
//   loading: boolean;
//   error: PostgrestError | null;
// }

// chatgpt code below:-
import { Database } from "../../lib/database.types";
import { PostgrestError } from "@supabase/supabase-js";

export type ProfileFromDb = Database["public"]["Tables"]["profiles"]["Row"];

// export interface LoadProfilesResponse {
//   profiles: Profile[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

// export interface LoadProfileResponse {
//   profile: Profile | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

export interface Profile {
    avatar_url: string | null;
    full_name: string | null;
    id: string;
    updated_at: string | null;
    username: string | null;
}

export interface LoadProfilesResponse {
  profiles: Profile[] | null;
  error: PostgrestError | null;
  loading: boolean;
}
