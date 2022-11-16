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
  ) {
    updateVideo(
      id: $id
      description: $description
      title: $title
      user_id: $user_id
      videoStatus: $videoStatus
      videoUrl: $videoUrl
      thumbnailUrl: $thumbnailUrl
    ) {
      id
      description
      title
      user_id
      videoStatus
      videoUrl
      thumbnailUrl
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
  mutation MyMutation(
    $id: ID!
    $text: String!
    $dislikeCount: Int
    $likeCount: Int
  ) {
    updateComment(
      id: $id
      dislikeCount: $dislikeCount
      likeCount: $likeCount
      text: $text
    ) {
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
