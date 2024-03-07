import { Profile } from "./Profile";
export interface Comment {
  created_at?: string;
  dislikeCount: number;
  id: string;
  likeCount: number;
  profiles: Profile;
  text: string;
  user_id: string;
  video_id: string;
  __typename: "Comment";
}