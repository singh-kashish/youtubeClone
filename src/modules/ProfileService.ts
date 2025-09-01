// import { supabase } from "../components/utils/supabase";
// import { Profile, LoadProfilesResponse } from "../types/Profile";
// import { PostgrestError } from "@supabase/supabase-js";

// export const profileService = {
//   async fetchProfiles(): Promise<LoadProfilesResponse> {
//     const { data, error } = await supabase.from("profiles").select("*");
//     return {
//       profiles: data ?? null,
//       error,
//       loading: false,
//     };
//   },

//   async fetchProfileById(id: string): Promise<{ profile: Profile | null; error: PostgrestError | null; loading: boolean }> {
//     const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();
//     return {
//       profile: data ?? null,
//       error,
//       loading: false,
//     };
//   },

//   async fetchProfilesByName(name: string): Promise<LoadProfilesResponse> {
//     const { data, error } = await supabase.from("profiles").select("*").ilike("full_name", `%${name}%`);
//     return {
//       profiles: data ?? null,
//       error,
//       loading: false,
//     };
//   },
// };

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

  async fetchProfilesByName(name: string): Promise<LoadProfilesResponse> {
    const { data, error } = await supabase.from("profiles").select("*").ilike("full_name", `%${name}%`);
    return {
      profiles: data ?? null,
      error,
      loading: false,
    };
  },
};
