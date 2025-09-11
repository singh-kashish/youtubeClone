import { useState, useEffect } from "react";
import { profileService } from "../modules/ProfileService";
import { ProfileWithVideos } from "../types/Profile";
import { PostgrestError } from "@supabase/supabase-js";

interface UseProfileReturn {
  profileWithVideos: ProfileWithVideos | null;
  subscriberCount?: number;
  loading: boolean;
  error: PostgrestError | null;
}

export function useProfile(user_id: string): UseProfileReturn {
  const [profileWithVideos, setProfileWithVideos] = useState<ProfileWithVideos | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [subscriberCount, setSubscriberCount] = useState<number>(0);
  useEffect(() => {
    // Guard: don’t fetch until we have a non-empty id
    if (!user_id) {
      setProfileWithVideos(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      const profileRes = await profileService.fetchProfileById(user_id);
      const subCount = await profileService.fetchSubscriberCount(user_id);
      if(subCount.error ){
        setError(subCount.error);
      } else{

      }
      if (cancelled) return;
      setProfileWithVideos(profileRes.profileWithVideos);
      setError(profileRes.error || subCount.error);
      if(!profileRes.error && !subCount.error){
        setSubscriberCount(subCount.count || 0);
      }
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [user_id]);

  return { profileWithVideos, loading, error, subscriberCount };
}
