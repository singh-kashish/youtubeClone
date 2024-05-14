import {useMemo} from "react";
import { useGetProfilesListQuery } from "../gql/graphql";
const useProfileSearchHook = (text: string) => {
  const { data, loading, error } = useGetProfilesListQuery();
  const profileSearchData = useMemo(() => {
    return (text && data)
      ? data?.profilesList?.filter((p) => {
          return (
            p?.username?.toLowerCase().includes(text.toLowerCase()) ||
            p?.full_name?.toLowerCase().includes(text.toLowerCase())
          );
        })
      : [];
  }, [text, data]);
  if(!loading)return profileSearchData;
};
export default useProfileSearchHook;
