// src/hooks/useProfileSearchHook.ts
import { useMemo, useState, useEffect } from "react";
import { fetchProfilesByName } from "../modules/profile";

const useProfileSearchHook = (text: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!text) {
      setData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    console.log("Fetching profiles for text:", text);
    let tada = fetchProfilesByName("rus");
    console.log(tada);
    fetchProfilesByName(text).then((res) => {
      setData(res.Profiles || []);
      setLoading(false);
    });
  }, [text]);

  return useMemo(() => (loading ? [] : data), [data, loading]);
};

export default useProfileSearchHook;
