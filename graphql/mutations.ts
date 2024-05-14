import { gql } from "@apollo/client";

export const ADD_VIDEO = gql`
  mutation addVideoMutation(
    $description: String
    $viewCount: Int
    $user_id: ID!
    $title: String!
    $videoStatus: Boolean!
    $videoUrl: String
    $thumbnailUrl: String
    $likes: Int
    $dislikes: Int
    $id: ID
  ) {
    insertVideo(
      description: $description
      user_id: $user_id
      title: $title
      videoStatus: $videoStatus
      viewCount: $viewCount
      videoUrl: $videoUrl
      thumbnailUrl: $thumbnailUrl
      likes: $likes
      dislikes: $dislikes
      id: $id
    ) {
      created_at
      id
      title
      viewCount
      videoUrl
      thumbnailUrl
      likes
      dislikes
      user_id
      description
    }
  }
`;
export const UPDATE_VIDEO = gql`
  mutation updateVideoMutation(
    $description: String
    $id: ID!
    $user_id: ID
    $title: String
    $videoStatus: Boolean
    $videoUrl: String
    $thumbnailUrl: String
    $viewCount: Int
  ) {
    updateVideo(
      id: $id
      description: $description
      title: $title
      user_id: $user_id
      videoStatus: $videoStatus
      videoUrl: $videoUrl
      thumbnailUrl: $thumbnailUrl
      viewCount: $viewCount
    ) {
      id
      description
      title
      user_id
      videoStatus
      videoUrl
      thumbnailUrl
      viewCount
    }
  }
`;
export const MAKE_COMMENT = gql`
  mutation makeCommentMutation(
    $video_id: ID!
    $text: String!
    $user_id: ID!
    $likeCount: Int
    $dislikeCount: Int
    $id: ID
  ) {
    insertComment(
      id: $id
      video_id: $video_id
      text: $text
      user_id: $user_id
      dislikeCount: $dislikeCount
      likeCount: $likeCount
    ) {
      id
      text
      user_id
    }
  }
`;
export const UPDATE_COMMENT = gql`
  mutation updateCommentMutation($id: ID!, $text: String!) {
    updateComment(id: $id, text: $text) {
      id
      text
      user_id
    }
  }
`;
export const DELETE_COMMENT = gql`
  mutation deleteCommentMutation($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;
export const ADD_LIKE_ON_COMMENT = gql`
  mutation addLikeOnCommentMutation(
    $like: Boolean!
    $comment_id: ID!
    $user_id: ID!
    $id: ID
  ) {
    insertLikedComments(
      comment_id: $comment_id
      user_id: $user_id
      like: $like
      id: $id
    ) {
      id
      created_at
      comment_id
      like
      user_id
    }
  }
`;

export const REMOVE_LIKE_ON_COMMENT = gql`
  mutation removeLikeOnCommentMutation($id: ID!) {
    deleteLikedComments(id: $id) {
      id
    }
  }
`;

export const MODIFY_LIKE_ON_COMMENT = gql`
  mutation modifyLikeOnCommentMutation($id: ID!, $like: Boolean) {
    updateLikedComments(id: $id, like: $like) {
      id
      like
    }
  }
`;
export const ADD_LIKE_ON_VIDEO = gql`
  mutation addLikeOnVideoMutation(
    $liked: Boolean!
    $video_id: ID!
    $user_id: ID!
    $id: ID
  ) {
    insertLikedVideos(
      id: $id
      video_id: $video_id
      user_id: $user_id
      liked: $liked
    ) {
      id
      created_at
      video_id
      liked
      user_id
    }
  }
`;

export const REMOVE_LIKE_ON_VIDEO = gql`
  mutation removeLikeOnVideoMutation($id: ID!) {
    deleteLikedVideos(id: $id) {
      id
    }
  }
`;

export const MODIFY_LIKE_ON_VIDEO = gql`
  mutation modifyLikeOnVideoMutation($id: ID!, $liked: Boolean) {
    updateLikedVideos(id: $id, liked: $liked) {
      id
      liked
    }
  }
`;
export const INSERT_SUBSCRIBER = gql`
  mutation insertSubscriberMutation($user_id: ID!, $subscribed_to_id: ID!) {
    insertSubscribers(subscribed_to_id: $subscribed_to_id, user_id: $user_id) {
      id
      user_id
      subscribed_to_id
    }
  }
`;
export const DELETE_SUBSCRIBER = gql`
  mutation deleteSubscriberMutation($id: ID!) {
    deleteSubscribers(id: $id) {
      id
      user_id
      subscribed_to_id
    }
  }
`;
export const DELETE_VIDEO = gql`
  mutation deleteVideoMutation($id: ID!) {
    deleteVideo(id: $id) {
      id
    }
  }
`;
export const ADD_PLAYLIST = gql`
  mutation insertPlaylist(
    $playlist_name: String!
    $user: ID!
    $playlistVisibility: Boolean!
    $id: ID
  ) {
    insertPlaylist(
      playlist_name: $playlist_name
      user: $user
      playlistVisibility: $playlistVisibility
      id: $id
    ) {
      id
      playlist_name
      playlistVisibility
    }
  }
`;
export const ADD_VIDEOS_TO_PLAYLIST = gql`
  mutation insertPlaylistVideos(
    $video_id: ID!
    $playlist_id: ID!
    $id: ID
    $positionInPlaylist: Int
  ) {
    insertPlaylistVideos(
      id: $id
      video_id: $video_id
      playlist_id: $playlist_id
      positionInPlaylist: $positionInPlaylist
    ) {
      id
      video_id
      playlist_id
      positionInPlaylist
    }
  }
`;
export const UPDATE_PROFILE = gql`
  mutation updateProfiles(
    $id: ID!
    $avatar_url: string
    $full_name: string
    $username: string
  ) {
    updateProfiles(
      id: $id
      avatar_url: $avatar_url
      full_name: $full_name
      username: $username
    ) {
      id
      username
      full_name
      avatar_url
    }
  }
`;
export const DELETE_PLAYLIST = gql`
  mutation deletePlaylist($id: ID!) {
    deletePlaylist(id: $id) {
      id
      playlistVideos {
        id
      }
    }
  }
`;
export const DELETE_PLAYLIST_VIDEO = gql`
  mutation deletePlaylistVideo($id: ID!) {
    deletePlaylistVideos(id: $id) {
      id
    }
  }
`;
export const UPDATE_PLAYLIST = gql`
  mutation updatePlaylist(
    $id: ID!
    $playlist_name: String
    $playlistVisibility: Boolean
    $user: ID
  ) {
    updatePlaylist(
      id: $id
      playlist_name: $playlist_name
      playlistVisibility: $playlistVisibility
      user: $user
    ) {
      id
      playlist_name
      playlistVisibility
      user
    }
  }
`;
