// hooks/useUserPlaylists.ts

import { useEffect, useState } from "react";
import { playlistService } from "../modules/playlistService";
import { PublicPlaylistWithVideos } from "../types/PlaylistsTypes";

interface UserPlaylistsResult {
  publicPlaylists: PublicPlaylistWithVideos[];
  privatePlaylists: PublicPlaylistWithVideos[];
  error: any;
  loading: boolean;
}

export const useUserPlaylists = (userId: string | null): UserPlaylistsResult => {
  const [publicPlaylists, setPublicPlaylists] = useState<PublicPlaylistWithVideos[]>([]);
  const [privatePlaylists, setPrivatePlaylists] = useState<PublicPlaylistWithVideos[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      if (!userId) {
        if (isMounted) {
          setPublicPlaylists([]);
          setPrivatePlaylists([]);
          setLoading(false);
        }
        return;
      }
      try {
        const res = await playlistService.fetchAllUserPlaylists(userId);
        if (isMounted) {
          if (res.data) {
            setPublicPlaylists(res.data.filter(p => p.playlistVisibility === true));
            setPrivatePlaylists(res.data.filter(p => p.playlistVisibility === false));
          } else {
            setPublicPlaylists([]);
            setPrivatePlaylists([]);
          }
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
  }, [userId]);

  return { publicPlaylists, privatePlaylists, error, loading };
};
