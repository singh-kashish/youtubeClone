// src/hooks/useAllPlaylist.ts
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { loadAllPlaylists } from "../modules/playlistService";

const useAllPlaylist = () => {
  const user = useUser();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    loadAllPlaylists()
      .then((res) => {
        setData(res.playlists);
        setLoading(false);
        setError(res.error);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const userPlaylists = useMemo(() => {
    return user
      ? data
        ? data.filter((p: any) => p?.user === user?.id)
        : "loading"
      : "User Not Found";
  }, [user, data]);

  const publicPlaylists = useMemo(() => {
    return data
      ? data.filter((p: any) => !user || p?.user !== user?.id)
      : "loading";
  }, [user, data]);

  if (loading) {
    return {
      userPlaylists: "loading",
      publicPlaylists: "loading",
      user,
      loading,
    };
  } else if (!error) {
    return { userPlaylists, publicPlaylists, user, loading };
  } else {
    return { userPlaylists: [], publicPlaylists: [], user, loading, error };
  }
};

export default useAllPlaylist;
