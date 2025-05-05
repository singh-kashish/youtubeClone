import { Database } from "../../lib/database.types";
import { typeOfList } from "./VideoLoadTypes";
export type Video = Database['public']['Tables']['video']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];

export type VideosWithProfile = Array<(Video | null & { profiles: Profile | null })> | [] | null; // Array of videos with profiles
export type VideoWithProfile = (Video | null & { profiles: Profile | null });
export interface CacheData {
  videos: VideosWithProfile;
  timestamp: number;  // timestamp when the data was fetched
}
// SuggestedVideoState structure
export interface SuggestedVideoState {
  videos: Record<typeOfList, VideosWithProfile | null>; // Allow null for listType
  cache: Record<string, CacheData>;
  displayList: typeOfList;
  currentDisplayListIndex: number,
  currentDisplayListOffset:10,
}
