// // import { Database } from "../../lib/database.types";
// // import { typeOfList } from "./VideoLoadTypes";
// // export type Video = Database['public']['Tables']['video']['Row'];
// // export type Profile = Database['public']['Tables']['profiles']['Row'];

// // export type VideosWithProfile = Array<(Video | null & { profiles: Profile | null })> | [] | null; // Array of videos with profiles
// // export type VideoWithProfile = (Video | null & { profiles: Profile | null });
// // export interface CacheData {
// //   videos: VideosWithProfile;
// //   timestamp: number;  // timestamp when the data was fetched
// // }
// // // SuggestedVideoState structure
// // export interface SuggestedVideoState {
// //   videos: Record<typeOfList, VideosWithProfile | null>; // Allow null for listType
// //   cache: Record<string, CacheData>;
// //   displayList: typeOfList;
// //   currentDisplayListIndex: number,
// //   currentDisplayListOffset:10,
// // }

// // src/types/VideoRedux.ts
// import { Database } from "../../lib/database.types";
// import { typeOfList } from "./VideoLoadTypes";

// export type Video = Database['public']['Tables']['video']['Row'];
// export type Profile = Database['public']['Tables']['profiles']['Row'];

// export type VideosWithProfile =
//   | Array<Video & { profiles: Profile | null }>
//   | [] 
//   | null;

// export type VideoWithProfile = Video & { profiles: Profile | null };

// export interface CacheData {
//   videos: VideosWithProfile;
//   timestamp: number;
// }

// export interface SuggestedVideoState {
//   videos: Record<typeOfList, VideosWithProfile | null>;
//   cache: Record<string, CacheData>;
//   displayList: typeOfList;
//   currentDisplayListIndex: number;
//   currentDisplayListOffset: number;
// }

// chatGpt generated code below:-
import { Database } from "../../lib/database.types";
import { typeOfList } from "./VideoLoadTypes";

export type Video = Database["public"]["Tables"]["video"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type VideoWithProfile = Video & { profiles: Profile | null };
export type VideosWithProfile = Array<VideoWithProfile> | null;

export interface CacheData {
  videos: VideosWithProfile;
  timestamp: number;
}

export interface SuggestedVideoState {
  videos: Record<typeOfList, VideosWithProfile>;
  cache: Record<string, CacheData>;
  displayList: typeOfList;
  currentDisplayListIndex: number;
  currentDisplayListOffset: number;
}
