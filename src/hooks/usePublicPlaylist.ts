// hooks/usePublicPlaylists.ts

import { useEffect, useState } from "react";
import { playlistService } from "../modules/playlistService";
import { PublicPlaylistWithVideos } from "../types/PlaylistsTypes";

export const usePublicPlaylists = (excludeUserId?: string) => {
  const [publicPlaylists, setPublicPlaylists] = useState<PublicPlaylistWithVideos[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await playlistService.fetchPublicPlaylists(excludeUserId);
        if (isMounted) {
          setPublicPlaylists(res.data);
          setError(res.error);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [excludeUserId]);

  return { publicPlaylists, error, loading };
};
