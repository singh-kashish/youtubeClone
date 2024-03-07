import Comment from "../components/Comment"
import { Profile } from "./Profile";
export interface Video{
    comment: Array<Comment>;
    created_at:string
    description:string;
    dislikes:number;
    id:string;
    likes:number;
    profiles: Profile;
    thumbnailUrl: string,
    title:string,
    user_id:string,
    videoStatus:boolean,
    videoUrl:string,
    viewCount: number,
    __typename:"Video",
}