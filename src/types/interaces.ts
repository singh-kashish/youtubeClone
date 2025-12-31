export interface Profile_Icon{
    id:string;
    username: string;
    full_name: string;
    avatar_url: string;
   
}
export interface Video_Icon{
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    viewCount: number;
    likes: number;
    dislikes: number;
    videoStatus: boolean;
    created_at: string | null;
    user_id: string;
    profiles: Profile_Icon | null;
}
export interface Comment{
    id: string;
    created_at:string;
    text: string;
    video_id: string;
    likeCount: number;
    dislikeCount: number;
    user_id: string;
}
export interface OneVideo extends Video_Icon{
    comment: Array<Comment>;
}