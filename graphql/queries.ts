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
export const GET_LIKES_ON_COMMENT_USING_COMMENT_ID = gql`
  query q($id: ID!) {
    getLikedCommentsUsingLikedComments_comment_id_fkey(id: $id) {
      comment_id
      created_at
      id
      like
      user_id
      comment {
        text
      }
    }
  }
`;
export const GET_VIDEOS = gql`
  query q {
    getVideoList {
      dislikes
      id
      likes
      thumbnailUrl
      title
      user_id
      videoStatus
      videoUrl
      viewCount
      description
      profiles {
        avatar_url
        full_name
        id
        updated_at
        username
      }
    }
  }
`;
export const GET_LIKES_ON_VIDEO_USING_VIDEO_ID = gql`
  query q($id: ID!) {
    getLikedVideosUsingLikedVideos_video_id_fkey(id: $id) {
      liked
      id
      video_id
      user_id
    }
  }
`;
export const GET_SUBSCRIBERS_USING_USER_ID = gql`
  query q($id: ID!) {
    getSubscribersUsingSubscribers_user_id_fkey(id: $id) {
      id
      subscribed_to_id
      user_id
      profilesUsingSubscribers_subscribed_to_id_fkey {
        avatar_url
        full_name
        username
        id
        video {
          description
          title
          user_id
          videoStatus
          videoUrl
          viewCount
          thumbnailUrl
          id
          profiles {
            avatar_url
            full_name
            id
            username
          }
        }
      }
    }
  }
`;
export const GET_PROFILE = gql`
  query myq($id: ID!) {
    getProfiles(id: $id) {
      avatar_url
      full_name
      id
      username
      subscribersUsingSubscribers_subscribed_to_id_fkey {
        id
        subscribed_to_id
        user_id
      }
      video {
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
        profiles {
          avatar_url
          full_name
          id
          username
        }
      }
    }
  }
`;
export const GET_LIKED_VIDEOS_BY_USER_ID = gql`
  query q($id: ID!) {
    getLikedVideosUsingLikedVideos_user_id_fkey(id: $id) {
      liked
      video {
        description
        id
        thumbnailUrl
        title
        user_id
        videoStatus
        videoUrl
        viewCount
        profiles {
          avatar_url
          full_name
          id
          username
        }
      }
      video_id
    }
  }
`;
