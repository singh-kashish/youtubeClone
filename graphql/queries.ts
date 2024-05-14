import { gql } from "@apollo/client";

export const GET_VIDEO_BY_ID = gql`
  query getVideoById($id: ID!) {
    video(id: $id) {
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
  query getLikesOnCommentUsingCommentId($id: ID!) {
    likedCommentsUsingLikedComments_comment_id_fkey(id: $id) {
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
  query getVideos {
    videoList {
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
  query getLikesOnVideoUsingVideoId($id: ID!) {
    likedVideosUsingLikedVideos_video_id_fkey(id: $id) {
      liked
      id
      video_id
      user_id
    }
  }
`;
export const GET_SUBSCRIBERS_USING_USER_ID = gql`
  query getSubscribersUsingUserId($id: ID!) {
    subscribersUsingSubscribers_user_id_fkey(id: $id) {
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
  query getProfile($id: ID!) {
    profiles(id: $id) {
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
export const GET_ALL_PROFILES = gql`
  query getProfilesList {
    profilesList {
      avatar_url
      full_name
      id
      updated_at
      username
      playlist {
        id
        playlistVisibility
        playlist_name
        user
        created_at
      }
      subscribersUsingSubscribers_subscribed_to_id_fkey {
        subscribed_to_id
        user_id
        id
      }
      video {
        id
        viewCount
      }
    }
  }
`;
export const GET_LIKED_VIDEOS_BY_USER_ID = gql`
  query getLikedVideosByUserId($id: ID!) {
    likedVideosUsingLikedVideos_user_id_fkey(id: $id) {
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
export const GET_ALL_PLAYLISTS = gql`
  query playlistList {
    playlistList {
      id
      playlistVideos {
        id
        video_id
        positionInPlaylist
        video {
          description
          created_at
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
            updated_at
          }
        }
      }
      playlistVisibility
      playlist_name
      user
      profiles {
        avatar_url
        full_name
        id
        username
        updated_at
      }
    }
  }
`;
export const GET_PLAYLIST_FOR_USER = gql`
  query getPlaylistByUser($id: ID) {
    playlistUsingPublic_playlist_user_fkey(
      id: $id
    ) {
      created_at
      id
      playlistVideos {
        id
        playlist_id
        video_id
      }
      playlistVisibility
      playlist_name
      user
    }
  }
`;
export const GET_PLAYLIST_BY_ID = gql`
  query getPlaylistById($id: ID!) {
    playlist(id: $id) {
      id
      created_at
      playlistVisibility
      playlist_name
      user
      profiles {
        avatar_url
        full_name
        id
      }
      playlistVideos {
        id
        created_at
        playlist_id
        positionInPlaylist
        video_id
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
          }
        }
      }
    }
  }
`;