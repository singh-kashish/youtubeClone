import { useState, useEffect } from "react";
import { profileService } from "../modules/ProfileService";
import { Profile } from "../types/Profile";
import { PostgrestError } from "@supabase/supabase-js";

interface UseProfilesReturn {
  profiles: Profile[] | null;
  loading: boolean;
  error: PostgrestError | null;
}

export function useProfiles(): UseProfilesReturn {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const res = await profileService.fetchProfiles();
      setProfiles(res.profiles);
      setError(res.error);
      setLoading(false);
    }
    fetch();
  }, []);

  return { profiles, loading, error };
}

