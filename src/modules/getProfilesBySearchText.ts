import { supabase } from "../components/utils/supabase";
import { GetProfileResponse, ProfileWithSubscribers } from "../types/Profile";
import { PostgrestError } from "@supabase/supabase-js";

export interface GetProfilesResponse {
  Profiles: ProfileWithSubscribers[] | null;
  loading: boolean;
  error: PostgrestError | null;
}

export async function getProfilesBySearchText(text: string): Promise<GetProfilesResponse> {
  try {
    console.log("Loading Profiles with text:", text);

    // Use % for wildcard search
    const searchPattern = `%${text}%`;

    const { error, data, status } = await supabase
      .from("profiles")
      .select(`
        id,
        username,
        avatar_url,
        full_name,
        likedVideos (
          id,
          user_id,
          liked
        ),
        subscribersUsingSubscribers_subscribed_to_id_fkey (
          id,
          user_id
        )
      `)
      .or(`username.ilike.${searchPattern},full_name.ilike.${searchPattern}`);

    if (error || status !== 200) {
      console.error("Error loading profiles:", error);
      return { Profiles: null, loading: false, error };
    }

    console.log("Fetched Profiles:", data);
    return { Profiles: data as ProfileWithSubscribers[], loading: false, error: null };
  } catch (error: unknown) {
    console.error("Unexpected error loading profiles:", error);
    return {
      Profiles: null,
      loading: false,
      error: { message: (error as Error).message } as PostgrestError,
    };
  }
}
