// src/hooks/useSubscribedProfiles.ts
import { useState } from "react";
import { useSafeEffect } from "./useSafeEffect";
import { getSubscribedProfiles } from "../supabase/queries/subscribers";
import { Profile } from "../types/db";

export function useSubscribedProfiles(
  userId?: string,
  enabled = true
) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  useSafeEffect(
    () => {
      if (!userId) return;

      setLoading(true);
      getSubscribedProfiles(userId).then(({ data }) => {
        setProfiles(
          data?.map((r: any) => r.profiles).filter(Boolean) ?? []
        );
        setLoading(false);
      });
    },
    [userId],
    enabled && !!userId
  );

  return { profiles, loading };
}
