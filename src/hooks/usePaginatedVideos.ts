import { useEffect, useState } from "react";
import {
  getPaginatedVideos,
  PaginatedVideosParams,
} from "../../src/supabase/paginatedVideos";

export function usePaginatedVideos(params: PaginatedVideosParams) {
  const [videos, setVideos] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    getPaginatedVideos(params)
      .then((res) => {
        if (!isMounted) return;
        setVideos(res.videos);
        setTotalPages(res.totalPages);
        setTotalCount(res.totalCount);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [
    params.page,
    params.pageSize,
    params.sortBy,
    params.ascending,
  ]);

  return {
    videos,
    loading,
    error,
    totalPages,
    totalCount,
  };
}
