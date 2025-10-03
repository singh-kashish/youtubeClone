import { supabase } from "../components/utils/supabase";
import { Profile } from "../types/models";
import { PostgrestError } from "@supabase/supabase-js";
interface GetProfilesResponse {
  Profiles: Profile[] | null;
  loading: boolean;
  error: PostgrestError | null;
}

export async function getProfilesBySearchText(text: string): Promise<GetProfilesResponse> {
  try {
    const searchPattern = `%${text}%`;

    const { error, data, status } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, full_name")
      .or(`username.ilike.${searchPattern},full_name.ilike.${searchPattern}`);

    if (error || status !== 200) {
      return { Profiles: null, loading: false, error };
    }

    return {
      Profiles: data,
      loading: false,
      error: null,
    };

  } catch (error: unknown) {
    return {
      Profiles: null,
      loading: false,
      error: { message: (error as Error).message } as PostgrestError,
    };
  }
}
