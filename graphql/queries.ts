import { gql } from "@apollo/client";

export const GET_VIDEO_BY_ID = gql`
  query MyQuery($id: ID!) {
    getVideo(id: $id) {
      created_at
      description
      dislikes
      id
      likes
      thumbnailUrl
      title
      user_id
      videoStatus
      videoUrl
      viewCount
      comment {
        created_at
        dislikeCount
        id
        likeCount
        text
        user_id
        video_id
        profiles {
          avatar_url
          full_name
          id
          username
        }
      }
      profiles {
        avatar_url
        full_name
        id
        updated_at
        username
        subscribersUsingSubscribers_subscribed_to_id_fkey {
          id
          subscribed_to_id
          user_id
        }
      }
    }
  }
`;
