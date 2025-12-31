import { useState, useEffect } from "react";
import { getProfileById } from "../supabase/queries";
import { Profile } from "../types/Profile";
import { PostgrestError } from "@supabase/supabase-js";

interface UseProfilesReturn {
  profiles: Profile[] | null;
  loading: boolean;
  error: PostgrestError | null;
}

export function useProfiles(profileId:string): UseProfilesReturn {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const res = await getProfileById(profileId);
      // setProfiles(res);
      console.log(res);
      setError(res.error);
      setLoading(false);
    }
    fetch();
  }, []);

  return { profiles, loading, error };
}

