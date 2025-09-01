// src/modules/profile.ts
// import { supabase } from "../components/utils/supabase";
// import { Profile, LoadProfilesResponse } from "../types/VideoLoadTypes";
// import { PostgrestError } from "@supabase/supabase-js";

// export async function loadProfileById(id: string): Promise<Profile | null> {
//   const { data, error } = await supabase
//     .from("profiles")
//     .select(`
//       id,
//       username,
//       avatar_url,
//       full_name,
//       updated_at,
//       video (
//         id,
//         title,
//         description,
//         videoUrl,
//         thumbnailUrl,
//         viewCount,
//         likes,
//         dislikes
//       ),
//       subscribersUsingSubscribers_subscribed_to_id_fkey (
//         id,
//         user_id,
//         subscribed_to_id
//       )
//     `)
//     .eq("id", id)
//     .single();
//   if (error) return null;
//   return {
//     ...data,
//     subscribersUsingSubscribers_subscribed_to_id_fkey: data.subscribersUsingSubscribers_subscribed_to_id_fkey?.map((subscriber: any) => ({
//       id: subscriber.id,
//       user_id: subscriber.user_id,
//       subscribed_to_id: subscriber.subscribed_to_id,
//     })),
//   } as Profile;
// }

// export async function getProfilesBySearchText(text: string) {
//   try {
//     const searchPattern = `%${text}%`;
//     const { error, data, status } = await supabase
//       .from("profiles")
//       .select(`
//         id,
//         username,
//         avatar_url,
//         full_name
//       `)
//       .or(`username.ilike.${searchPattern},full_name.ilike.${searchPattern}`);

//     if (error || status !== 200) {
//       return { Profiles: null, loading: false, error };
//     }
//     return { Profiles: data, loading: false, error: null };
//   } catch (error: any) {
//     return {
//       Profiles: null,
//       loading: false,
//       error: { message: error.message },
//     };
//   }
// }

// import { supabase } from "../components/utils/supabase";
// import { Profile, LoadProfilesResponse } from "../types/Profile";

// export const profileService = {
//   async fetchProfiles(): Promise<LoadProfilesResponse> {
//     const { data, error } = await supabase.from("profiles").select("*");

//     return {
//       profiles: data as Profile[] | null,
//       error,
//       loading: false,
//     };
//   },

//   async fetchProfileById(id: string): Promise<{ profile: Profile | null; error: Error | null; loading: boolean }> {
//     const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();

//     return {
//       profile: data as Profile | null,
//       error,
//       loading: false,
//     };
//   },
// };


// import { PostgrestError } from "@supabase/supabase-js";

// export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// export interface LoadProfilesResponse {
//   profiles: Profile[] | null;
//   error: PostgrestError | null;  // use PostgrestError here
//   loading: boolean;
// }

// export interface LoadProfileResponse {
//   profile: Profile | null;
//   error: PostgrestError | null;  // use PostgrestError here too
//   loading: boolean;
// }
import { supabase } from "../components/utils/supabase";
import { Profile, LoadProfilesResponse } from "../types/Profile";
import { PostgrestError } from "@supabase/supabase-js";

export const profileService = {
  async fetchProfiles(): Promise<LoadProfilesResponse> {
    const { data, error } = await supabase.from("profiles").select("*");
    return {
      profiles: data ?? null,
      error,
      loading: false,
    };
  },

  async fetchProfileById(id: string): Promise<{ profile: Profile | null; error: PostgrestError | null; loading: boolean }> {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();

    return {
      profile: data ?? null,
      error,
      loading: false,
    };
  },

  async fetchProfilesByName(searchTerm: string): Promise<LoadProfilesResponse> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .ilike("full_name", `%${searchTerm}%`);

    return {
      profiles: data ?? null,
      error,
      loading: false,
    };
  },
};
// Chatgpt code above:-   
