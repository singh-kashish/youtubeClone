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
    if (!user_id) {
      setProfileWithVideos(null);
      setError(null);
      setLoading(false);
      setSubscriberCount(0);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const [profileRes, subCount] = await Promise.all([
          profileService.fetchProfileById(user_id),
          profileService.fetchSubscriberCount(user_id),
        ]);

        if (cancelled) return;

        if (profileRes.error || subCount.error) {
          setError(profileRes.error || subCount.error);
        } else {
          setError(null);
        }

        setProfileWithVideos(profileRes.profileWithVideos);
        setSubscriberCount(subCount.count ?? 0);
      } catch (err) {
        if (cancelled) return;
        setError(
          (err as PostgrestError) ??
          ({
            message: (err as Error)?.message || "Unknown error",
            details: "",
            hint: "",
            code: "unknown",
          } as PostgrestError)
        );
        setProfileWithVideos(null);
        setSubscriberCount(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user_id]);

  return { profileWithVideos, loading, error, subscriberCount };
}
