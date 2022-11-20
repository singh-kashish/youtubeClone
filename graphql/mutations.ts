import { gql } from "@apollo/client";

export const ADD_VIDEO = gql`
  mutation MyMutation(
    $description: String
    $viewCount: Int
    $user_id: ID!
    $title: String!
    $videoStatus: Boolean!
    $videoUrl: String
    $thumbnailUrl: String
    $likes: Int
    $dislikes: Int
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
  mutation MyMutation(
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
  mutation MyMutation(
    $video_id: ID!
    $text: String!
    $user_id: ID!
    $likeCount: Int
    $dislikeCount: Int
  ) {
    insertComment(
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
  mutation MyMutation($id: ID!, $text: String!) {
    updateComment(id: $id, text: $text) {
      id
      text
      user_id
    }
  }
`;
export const DELETE_COMMENT = gql`
  mutation MyMutation($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;
export const ADD_LIKE_ON_COMMENT = gql`
  mutation MyMutation($like: Boolean!, $comment_id: ID!, $user_id: ID!) {
    insertLikedComments(
      comment_id: $comment_id
      user_id: $user_id
      like: $like
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
  mutation myMutation($id: ID!) {
    deleteLikedComments(id: $id) {
      id
    }
  }
`;

export const MODIFY_LIKE_ON_COMMENT = gql`
  mutation myMutation($id: ID!, $like: Boolean) {
    updateLikedComments(id: $id, like: $like) {
      id
      like
    }
  }
`;
export const ADD_LIKE_ON_VIDEO = gql`
  mutation MyMutation($liked: Boolean!, $video_id: ID!, $user_id: ID!) {
    insertLikedVideos(video_id: $video_id, user_id: $user_id, liked: $liked) {
      id
      created_at
      video_id
      liked
      user_id
    }
  }
`;

export const REMOVE_LIKE_ON_VIDEO = gql`
  mutation myMutation($id: ID!) {
    deleteLikedVideos(id: $id) {
      id
    }
  }
`;

export const MODIFY_LIKE_ON_VIDEO = gql`
  mutation myMutation($id: ID!, $liked: Boolean) {
    updateLikedVideos(id: $id, liked: $liked) {
      id
      liked
    }
  }
`;
export const INSERT_SUBSCRIBER = gql`
  mutation myMutation($user_id: ID!, $subscribed_to_id: ID!) {
    insertSubscribers(subscribed_to_id: $subscribed_to_id, user_id: $user_id) {
      id
      user_id
      subscribed_to_id
    }
  }
`;
export const DELETE_SUBSCRIBER = gql`
  mutation myMutation($id: ID!) {
    deleteSubscribers(id: $id) {
      id
      user_id
      subscribed_to_id
    }
  }
`;
export const DELETE_VIDEO = gql`
  mutation myMutation($id: ID!){
    deleteVideo(id: $id){
      id
    }
  }
`