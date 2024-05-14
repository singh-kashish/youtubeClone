import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  dislikeCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  likeCount?: Maybe<Scalars['Int']['output']>;
  likedComments?: Maybe<Array<Maybe<LikedComments>>>;
  profiles?: Maybe<Profiles>;
  text?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['ID']['output']>;
  video?: Maybe<Video>;
  video_id?: Maybe<Scalars['ID']['output']>;
};

export type LikedComments = {
  __typename?: 'LikedComments';
  comment?: Maybe<Comment>;
  comment_id?: Maybe<Scalars['ID']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  like?: Maybe<Scalars['Boolean']['output']>;
  profiles?: Maybe<Profiles>;
  user_id?: Maybe<Scalars['ID']['output']>;
};

export type LikedVideos = {
  __typename?: 'LikedVideos';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  liked?: Maybe<Scalars['Boolean']['output']>;
  profiles?: Maybe<Profiles>;
  user_id?: Maybe<Scalars['ID']['output']>;
  video?: Maybe<Video>;
  video_id?: Maybe<Scalars['ID']['output']>;
};

/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type Mutation = {
  __typename?: 'Mutation';
  /**  Mutations for type 'Comment'  */
  deleteComment?: Maybe<Comment>;
  /**  Mutations for type 'LikedComments'  */
  deleteLikedComments?: Maybe<LikedComments>;
  /**  Mutations for type 'LikedVideos'  */
  deleteLikedVideos?: Maybe<LikedVideos>;
  /**  Mutations for type 'Playlist'  */
  deletePlaylist?: Maybe<Playlist>;
  /**  Mutations for type 'PlaylistVideos'  */
  deletePlaylistVideos?: Maybe<PlaylistVideos>;
  /**  Mutations for type 'Profiles'  */
  deleteProfiles?: Maybe<Profiles>;
  /**  Mutations for type 'Subscribers'  */
  deleteSubscribers?: Maybe<Subscribers>;
  /**  Mutations for type 'Video'  */
  deleteVideo?: Maybe<Video>;
  insertComment?: Maybe<Comment>;
  insertLikedComments?: Maybe<LikedComments>;
  insertLikedVideos?: Maybe<LikedVideos>;
  insertPlaylist?: Maybe<Playlist>;
  insertPlaylistVideos?: Maybe<PlaylistVideos>;
  insertProfiles?: Maybe<Profiles>;
  insertSubscribers?: Maybe<Subscribers>;
  insertVideo?: Maybe<Video>;
  updateComment?: Maybe<Comment>;
  updateLikedComments?: Maybe<LikedComments>;
  updateLikedVideos?: Maybe<LikedVideos>;
  updatePlaylist?: Maybe<Playlist>;
  updatePlaylistVideos?: Maybe<PlaylistVideos>;
  updateProfiles?: Maybe<Profiles>;
  updateSubscribers?: Maybe<Subscribers>;
  updateVideo?: Maybe<Video>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteLikedCommentsArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteLikedVideosArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeletePlaylistArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeletePlaylistVideosArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteProfilesArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteSubscribersArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteVideoArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertCommentArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  dislikeCount?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  likeCount?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
  video_id?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertLikedCommentsArgs = {
  comment_id?: InputMaybe<Scalars['ID']['input']>;
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  like?: InputMaybe<Scalars['Boolean']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertLikedVideosArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  liked?: InputMaybe<Scalars['Boolean']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
  video_id?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertPlaylistArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  playlistVisibility: Scalars['Boolean']['input'];
  playlist_name: Scalars['String']['input'];
  user: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertPlaylistVideosArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  playlist_id?: InputMaybe<Scalars['ID']['input']>;
  positionInPlaylist?: InputMaybe<Scalars['Int']['input']>;
  video_id?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertProfilesArgs = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  updated_at?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertSubscribersArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  subscribed_to_id?: InputMaybe<Scalars['ID']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertVideoArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dislikes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  likes?: InputMaybe<Scalars['Int']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
  videoStatus?: InputMaybe<Scalars['Boolean']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
  viewCount?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateCommentArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  dislikeCount?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  likeCount?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
  video_id?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateLikedCommentsArgs = {
  comment_id?: InputMaybe<Scalars['ID']['input']>;
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  like?: InputMaybe<Scalars['Boolean']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateLikedVideosArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  liked?: InputMaybe<Scalars['Boolean']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
  video_id?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdatePlaylistArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  playlistVisibility?: InputMaybe<Scalars['Boolean']['input']>;
  playlist_name?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdatePlaylistVideosArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  playlist_id?: InputMaybe<Scalars['ID']['input']>;
  positionInPlaylist?: InputMaybe<Scalars['Int']['input']>;
  video_id?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateProfilesArgs = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  updated_at?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateSubscribersArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  subscribed_to_id?: InputMaybe<Scalars['ID']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateVideoArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dislikes?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  likes?: InputMaybe<Scalars['Int']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
  videoStatus?: InputMaybe<Scalars['Boolean']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
  viewCount?: InputMaybe<Scalars['Int']['input']>;
};

export type Playlist = {
  __typename?: 'Playlist';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  playlistVideos?: Maybe<Array<Maybe<PlaylistVideos>>>;
  playlistVisibility: Scalars['Boolean']['output'];
  playlist_name: Scalars['String']['output'];
  profiles?: Maybe<Profiles>;
  user: Scalars['ID']['output'];
};

export type PlaylistVideos = {
  __typename?: 'PlaylistVideos';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  playlist?: Maybe<Playlist>;
  playlist_id?: Maybe<Scalars['ID']['output']>;
  positionInPlaylist?: Maybe<Scalars['Int']['output']>;
  video?: Maybe<Video>;
  video_id?: Maybe<Scalars['ID']['output']>;
};

export type Profiles = {
  __typename?: 'Profiles';
  avatar_url?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Array<Maybe<Comment>>>;
  full_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  likedComments?: Maybe<Array<Maybe<LikedComments>>>;
  likedVideos?: Maybe<Array<Maybe<LikedVideos>>>;
  playlist?: Maybe<Array<Maybe<Playlist>>>;
  subscribersUsingSubscribers_subscribed_to_id_fkey?: Maybe<Array<Maybe<Subscribers>>>;
  subscribersUsingSubscribers_user_id_fkey?: Maybe<Array<Maybe<Subscribers>>>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Array<Maybe<Video>>>;
};

/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type Query = {
  __typename?: 'Query';
  /**  Queries for type 'Comment'  */
  comment?: Maybe<Comment>;
  commentList?: Maybe<Array<Maybe<Comment>>>;
  commentPaginatedList?: Maybe<Array<Maybe<Comment>>>;
  commentUsingComment_user_id_fkey?: Maybe<Array<Maybe<Comment>>>;
  commentUsingComment_video_id_fkey?: Maybe<Array<Maybe<Comment>>>;
  commentUsingLikedComments_comment_id_fkey?: Maybe<Comment>;
  /**  Queries for type 'LikedComments'  */
  likedComments?: Maybe<LikedComments>;
  likedCommentsList?: Maybe<Array<Maybe<LikedComments>>>;
  likedCommentsPaginatedList?: Maybe<Array<Maybe<LikedComments>>>;
  likedCommentsUsingLikedComments_comment_id_fkey?: Maybe<Array<Maybe<LikedComments>>>;
  likedCommentsUsingLikedComments_user_id_fkey?: Maybe<Array<Maybe<LikedComments>>>;
  /**  Queries for type 'LikedVideos'  */
  likedVideos?: Maybe<LikedVideos>;
  likedVideosList?: Maybe<Array<Maybe<LikedVideos>>>;
  likedVideosPaginatedList?: Maybe<Array<Maybe<LikedVideos>>>;
  likedVideosUsingLikedVideos_user_id_fkey?: Maybe<Array<Maybe<LikedVideos>>>;
  likedVideosUsingLikedVideos_video_id_fkey?: Maybe<Array<Maybe<LikedVideos>>>;
  /**  Queries for type 'Playlist'  */
  playlist?: Maybe<Playlist>;
  playlistList?: Maybe<Array<Maybe<Playlist>>>;
  playlistPaginatedList?: Maybe<Array<Maybe<Playlist>>>;
  playlistUsingPublic_playlistVideos_playlist_id_fkey?: Maybe<Playlist>;
  playlistUsingPublic_playlist_user_fkey?: Maybe<Array<Maybe<Playlist>>>;
  /**  Queries for type 'PlaylistVideos'  */
  playlistVideos?: Maybe<PlaylistVideos>;
  playlistVideosList?: Maybe<Array<Maybe<PlaylistVideos>>>;
  playlistVideosPaginatedList?: Maybe<Array<Maybe<PlaylistVideos>>>;
  playlistVideosUsingPublic_playlistVideos_playlist_id_fkey?: Maybe<Array<Maybe<PlaylistVideos>>>;
  playlistVideosUsingPublic_playlistVideos_video_id_fkey?: Maybe<Array<Maybe<PlaylistVideos>>>;
  /**  Queries for type 'Profiles'  */
  profiles?: Maybe<Profiles>;
  profilesList?: Maybe<Array<Maybe<Profiles>>>;
  profilesPaginatedList?: Maybe<Array<Maybe<Profiles>>>;
  profilesUsingComment_user_id_fkey?: Maybe<Profiles>;
  profilesUsingLikedComments_user_id_fkey?: Maybe<Profiles>;
  profilesUsingLikedVideos_user_id_fkey?: Maybe<Profiles>;
  profilesUsingPublic_playlist_user_fkey?: Maybe<Profiles>;
  profilesUsingSubscribers_subscribed_to_id_fkey?: Maybe<Profiles>;
  profilesUsingSubscribers_user_id_fkey?: Maybe<Profiles>;
  profilesUsingVideo_user_id_fkey?: Maybe<Profiles>;
  profilesUsingprofiles_username_key?: Maybe<Profiles>;
  /**  Queries for type 'Subscribers'  */
  subscribers?: Maybe<Subscribers>;
  subscribersList?: Maybe<Array<Maybe<Subscribers>>>;
  subscribersPaginatedList?: Maybe<Array<Maybe<Subscribers>>>;
  subscribersUsingSubscribers_subscribed_to_id_fkey?: Maybe<Array<Maybe<Subscribers>>>;
  subscribersUsingSubscribers_user_id_fkey?: Maybe<Array<Maybe<Subscribers>>>;
  /**  Queries for type 'Video'  */
  video?: Maybe<Video>;
  videoList?: Maybe<Array<Maybe<Video>>>;
  videoPaginatedList?: Maybe<Array<Maybe<Video>>>;
  videoUsingComment_video_id_fkey?: Maybe<Video>;
  videoUsingLikedVideos_video_id_fkey?: Maybe<Video>;
  videoUsingPublic_playlistVideos_video_id_fkey?: Maybe<Video>;
  videoUsingVideo_user_id_fkey?: Maybe<Array<Maybe<Video>>>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryCommentPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryCommentUsingComment_User_Id_FkeyArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryCommentUsingComment_Video_Id_FkeyArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryCommentUsingLikedComments_Comment_Id_FkeyArgs = {
  comment_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryLikedCommentsArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryLikedCommentsPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryLikedCommentsUsingLikedComments_Comment_Id_FkeyArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryLikedCommentsUsingLikedComments_User_Id_FkeyArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryLikedVideosArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryLikedVideosPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryLikedVideosUsingLikedVideos_User_Id_FkeyArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryLikedVideosUsingLikedVideos_Video_Id_FkeyArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPlaylistArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPlaylistPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPlaylistUsingPublic_PlaylistVideos_Playlist_Id_FkeyArgs = {
  playlist_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPlaylistUsingPublic_Playlist_User_FkeyArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPlaylistVideosArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPlaylistVideosPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPlaylistVideosUsingPublic_PlaylistVideos_Playlist_Id_FkeyArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPlaylistVideosUsingPublic_PlaylistVideos_Video_Id_FkeyArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryProfilesArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryProfilesPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryProfilesUsingComment_User_Id_FkeyArgs = {
  user_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryProfilesUsingLikedComments_User_Id_FkeyArgs = {
  user_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryProfilesUsingLikedVideos_User_Id_FkeyArgs = {
  user_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryProfilesUsingPublic_Playlist_User_FkeyArgs = {
  user: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryProfilesUsingSubscribers_Subscribed_To_Id_FkeyArgs = {
  subscribed_to_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryProfilesUsingSubscribers_User_Id_FkeyArgs = {
  user_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryProfilesUsingVideo_User_Id_FkeyArgs = {
  user_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryProfilesUsingprofiles_Username_KeyArgs = {
  username: Scalars['String']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QuerySubscribersArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QuerySubscribersPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QuerySubscribersUsingSubscribers_Subscribed_To_Id_FkeyArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QuerySubscribersUsingSubscribers_User_Id_FkeyArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryVideoArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryVideoPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryVideoUsingComment_Video_Id_FkeyArgs = {
  video_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryVideoUsingLikedVideos_Video_Id_FkeyArgs = {
  video_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryVideoUsingPublic_PlaylistVideos_Video_Id_FkeyArgs = {
  video_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryVideoUsingVideo_User_Id_FkeyArgs = {
  id: Scalars['ID']['input'];
};

export type Subscribers = {
  __typename?: 'Subscribers';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  profilesUsingSubscribers_subscribed_to_id_fkey?: Maybe<Profiles>;
  profilesUsingSubscribers_user_id_fkey?: Maybe<Profiles>;
  subscribed_to_id?: Maybe<Scalars['ID']['output']>;
  user_id?: Maybe<Scalars['ID']['output']>;
};

export type Video = {
  __typename?: 'Video';
  comment?: Maybe<Array<Maybe<Comment>>>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dislikes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  likedVideos?: Maybe<Array<Maybe<LikedVideos>>>;
  likes?: Maybe<Scalars['Int']['output']>;
  playlistVideos?: Maybe<Array<Maybe<PlaylistVideos>>>;
  profiles?: Maybe<Profiles>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['ID']['output']>;
  videoStatus?: Maybe<Scalars['Boolean']['output']>;
  videoUrl?: Maybe<Scalars['String']['output']>;
  viewCount?: Maybe<Scalars['Int']['output']>;
};

export type AddVideoMutationMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']['input']>;
  viewCount?: InputMaybe<Scalars['Int']['input']>;
  user_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  videoStatus: Scalars['Boolean']['input'];
  videoUrl?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  likes?: InputMaybe<Scalars['Int']['input']>;
  dislikes?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddVideoMutationMutation = { __typename?: 'Mutation', insertVideo?: { __typename?: 'Video', created_at?: any | null, id: string, title?: string | null, viewCount?: number | null, videoUrl?: string | null, thumbnailUrl?: string | null, likes?: number | null, dislikes?: number | null, user_id?: string | null, description?: string | null } | null };

export type UpdateVideoMutationMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  user_id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  videoStatus?: InputMaybe<Scalars['Boolean']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  viewCount?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateVideoMutationMutation = { __typename?: 'Mutation', updateVideo?: { __typename?: 'Video', id: string, description?: string | null, title?: string | null, user_id?: string | null, videoStatus?: boolean | null, videoUrl?: string | null, thumbnailUrl?: string | null, viewCount?: number | null } | null };

export type MakeCommentMutationMutationVariables = Exact<{
  video_id: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  user_id: Scalars['ID']['input'];
  likeCount?: InputMaybe<Scalars['Int']['input']>;
  dislikeCount?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MakeCommentMutationMutation = { __typename?: 'Mutation', insertComment?: { __typename?: 'Comment', id: string, text?: string | null, user_id?: string | null } | null };

export type UpdateCommentMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type UpdateCommentMutationMutation = { __typename?: 'Mutation', updateComment?: { __typename?: 'Comment', id: string, text?: string | null, user_id?: string | null } | null };

export type DeleteCommentMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCommentMutationMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'Comment', id: string } | null };

export type AddLikeOnCommentMutationMutationVariables = Exact<{
  like: Scalars['Boolean']['input'];
  comment_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
}>;


export type AddLikeOnCommentMutationMutation = { __typename?: 'Mutation', insertLikedComments?: { __typename?: 'LikedComments', id: string, created_at?: any | null, comment_id?: string | null, like?: boolean | null, user_id?: string | null } | null };

export type RemoveLikeOnCommentMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveLikeOnCommentMutationMutation = { __typename?: 'Mutation', deleteLikedComments?: { __typename?: 'LikedComments', id: string } | null };

export type ModifyLikeOnCommentMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  like?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ModifyLikeOnCommentMutationMutation = { __typename?: 'Mutation', updateLikedComments?: { __typename?: 'LikedComments', id: string, like?: boolean | null } | null };

export type AddLikeOnVideoMutationMutationVariables = Exact<{
  liked: Scalars['Boolean']['input'];
  video_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
}>;


export type AddLikeOnVideoMutationMutation = { __typename?: 'Mutation', insertLikedVideos?: { __typename?: 'LikedVideos', id: string, created_at?: any | null, video_id?: string | null, liked?: boolean | null, user_id?: string | null } | null };

export type RemoveLikeOnVideoMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveLikeOnVideoMutationMutation = { __typename?: 'Mutation', deleteLikedVideos?: { __typename?: 'LikedVideos', id: string } | null };

export type ModifyLikeOnVideoMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  liked?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ModifyLikeOnVideoMutationMutation = { __typename?: 'Mutation', updateLikedVideos?: { __typename?: 'LikedVideos', id: string, liked?: boolean | null } | null };

export type InsertSubscriberMutationMutationVariables = Exact<{
  user_id: Scalars['ID']['input'];
  subscribed_to_id: Scalars['ID']['input'];
}>;


export type InsertSubscriberMutationMutation = { __typename?: 'Mutation', insertSubscribers?: { __typename?: 'Subscribers', id: string, user_id?: string | null, subscribed_to_id?: string | null } | null };

export type DeleteSubscriberMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSubscriberMutationMutation = { __typename?: 'Mutation', deleteSubscribers?: { __typename?: 'Subscribers', id: string, user_id?: string | null, subscribed_to_id?: string | null } | null };

export type DeleteVideoMutationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteVideoMutationMutation = { __typename?: 'Mutation', deleteVideo?: { __typename?: 'Video', id: string } | null };

export type InsertPlaylistMutationVariables = Exact<{
  playlist_name: Scalars['String']['input'];
  user: Scalars['ID']['input'];
  playlistVisibility: Scalars['Boolean']['input'];
}>;


export type InsertPlaylistMutation = { __typename?: 'Mutation', insertPlaylist?: { __typename?: 'Playlist', id: string, playlist_name: string, playlistVisibility: boolean } | null };

export type InsertPlaylistVideosMutationVariables = Exact<{
  video_id: Scalars['ID']['input'];
  playlist_id: Scalars['ID']['input'];
}>;


export type InsertPlaylistVideosMutation = { __typename?: 'Mutation', insertPlaylistVideos?: { __typename?: 'PlaylistVideos', id: string, video_id?: string | null, playlist_id?: string | null } | null };

export type GetVideoByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetVideoByIdQuery = { __typename?: 'Query', video?: { __typename?: 'Video', created_at?: any | null, description?: string | null, dislikes?: number | null, id: string, likes?: number | null, thumbnailUrl?: string | null, title?: string | null, user_id?: string | null, videoStatus?: boolean | null, videoUrl?: string | null, viewCount?: number | null, comment?: Array<{ __typename?: 'Comment', created_at?: any | null, dislikeCount?: number | null, id: string, likeCount?: number | null, text?: string | null, user_id?: string | null, video_id?: string | null, profiles?: { __typename?: 'Profiles', avatar_url?: string | null, full_name?: string | null, id: string, username?: string | null } | null } | null> | null, profiles?: { __typename?: 'Profiles', avatar_url?: string | null, full_name?: string | null, id: string, updated_at?: any | null, username?: string | null, subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{ __typename?: 'Subscribers', id: string, subscribed_to_id?: string | null, user_id?: string | null } | null> | null } | null } | null };

export type GetLikesOnCommentUsingCommentIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetLikesOnCommentUsingCommentIdQuery = { __typename?: 'Query', likedCommentsUsingLikedComments_comment_id_fkey?: Array<{ __typename?: 'LikedComments', comment_id?: string | null, created_at?: any | null, id: string, like?: boolean | null, user_id?: string | null, comment?: { __typename?: 'Comment', text?: string | null } | null } | null> | null };

export type GetVideosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVideosQuery = { __typename?: 'Query', videoList?: Array<{ __typename?: 'Video', dislikes?: number | null, id: string, likes?: number | null, thumbnailUrl?: string | null, title?: string | null, user_id?: string | null, videoStatus?: boolean | null, videoUrl?: string | null, viewCount?: number | null, description?: string | null, profiles?: { __typename?: 'Profiles', avatar_url?: string | null, full_name?: string | null, id: string, updated_at?: any | null, username?: string | null } | null } | null> | null };

export type GetLikesOnVideoUsingVideoIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetLikesOnVideoUsingVideoIdQuery = { __typename?: 'Query', likedVideosUsingLikedVideos_video_id_fkey?: Array<{ __typename?: 'LikedVideos', liked?: boolean | null, id: string, video_id?: string | null, user_id?: string | null } | null> | null };

export type GetSubscribersUsingUserIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSubscribersUsingUserIdQuery = { __typename?: 'Query', subscribersUsingSubscribers_user_id_fkey?: Array<{ __typename?: 'Subscribers', id: string, subscribed_to_id?: string | null, user_id?: string | null, profilesUsingSubscribers_subscribed_to_id_fkey?: { __typename?: 'Profiles', avatar_url?: string | null, full_name?: string | null, username?: string | null, id: string, video?: Array<{ __typename?: 'Video', description?: string | null, title?: string | null, user_id?: string | null, videoStatus?: boolean | null, videoUrl?: string | null, viewCount?: number | null, thumbnailUrl?: string | null, id: string, profiles?: { __typename?: 'Profiles', avatar_url?: string | null, full_name?: string | null, id: string, username?: string | null } | null } | null> | null } | null } | null> | null };

export type GetProfileQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProfileQuery = { __typename?: 'Query', profiles?: { __typename?: 'Profiles', avatar_url?: string | null, full_name?: string | null, id: string, username?: string | null, subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{ __typename?: 'Subscribers', id: string, subscribed_to_id?: string | null, user_id?: string | null } | null> | null, video?: Array<{ __typename?: 'Video', created_at?: any | null, description?: string | null, dislikes?: number | null, id: string, likes?: number | null, thumbnailUrl?: string | null, title?: string | null, user_id?: string | null, videoStatus?: boolean | null, videoUrl?: string | null, viewCount?: number | null, profiles?: { __typename?: 'Profiles', avatar_url?: string | null, full_name?: string | null, id: string, username?: string | null } | null } | null> | null } | null };

export type GetProfilesListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfilesListQuery = { __typename?: 'Query', profilesList?: Array<{ __typename?: 'Profiles', avatar_url?: string | null, full_name?: string | null, id: string, updated_at?: any | null, username?: string | null, playlist?: Array<{ __typename?: 'Playlist', id: string, playlistVisibility: boolean, playlist_name: string, user: string, created_at?: any | null } | null> | null, subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{ __typename?: 'Subscribers', subscribed_to_id?: string | null, user_id?: string | null, id: string } | null> | null, video?: Array<{ __typename?: 'Video', id: string, viewCount?: number | null } | null> | null } | null> | null };

export type GetLikedVideosByUserIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetLikedVideosByUserIdQuery = { __typename?: 'Query', likedVideosUsingLikedVideos_user_id_fkey?: Array<{ __typename?: 'LikedVideos', liked?: boolean | null, video_id?: string | null, video?: { __typename?: 'Video', description?: string | null, id: string, thumbnailUrl?: string | null, title?: string | null, user_id?: string | null, videoStatus?: boolean | null, videoUrl?: string | null, viewCount?: number | null, profiles?: { __typename?: 'Profiles', avatar_url?: string | null, full_name?: string | null, id: string, username?: string | null } | null } | null } | null> | null };

export type PlaylistListQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaylistListQuery = { __typename?: 'Query', playlistList?: Array<{ __typename?: 'Playlist', id: string, playlistVisibility: boolean, playlist_name: string, user: string, playlistVideos?: Array<{ __typename?: 'PlaylistVideos', id: string, video_id?: string | null, positionInPlaylist?: number | null, video?: { __typename?: 'Video', description?: string | null, created_at?: any | null, dislikes?: number | null, id: string, likes?: number | null, thumbnailUrl?: string | null, title?: string | null, user_id?: string | null, videoStatus?: boolean | null, videoUrl?: string | null, viewCount?: number | null, profiles?: { __typename?: 'Profiles', avatar_url?: string | null, full_name?: string | null, id: string, username?: string | null, updated_at?: any | null } | null } | null } | null> | null, profiles?: { __typename?: 'Profiles', avatar_url?: string | null, full_name?: string | null, id: string, username?: string | null, updated_at?: any | null } | null } | null> | null };


export const AddVideoMutationDocument = gql`
    mutation addVideoMutation($description: String, $viewCount: Int, $user_id: ID!, $title: String!, $videoStatus: Boolean!, $videoUrl: String, $thumbnailUrl: String, $likes: Int, $dislikes: Int) {
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
export type AddVideoMutationMutationFn = Apollo.MutationFunction<AddVideoMutationMutation, AddVideoMutationMutationVariables>;

/**
 * __useAddVideoMutationMutation__
 *
 * To run a mutation, you first call `useAddVideoMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVideoMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVideoMutationMutation, { data, loading, error }] = useAddVideoMutationMutation({
 *   variables: {
 *      description: // value for 'description'
 *      viewCount: // value for 'viewCount'
 *      user_id: // value for 'user_id'
 *      title: // value for 'title'
 *      videoStatus: // value for 'videoStatus'
 *      videoUrl: // value for 'videoUrl'
 *      thumbnailUrl: // value for 'thumbnailUrl'
 *      likes: // value for 'likes'
 *      dislikes: // value for 'dislikes'
 *   },
 * });
 */
export function useAddVideoMutationMutation(baseOptions?: Apollo.MutationHookOptions<AddVideoMutationMutation, AddVideoMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddVideoMutationMutation, AddVideoMutationMutationVariables>(AddVideoMutationDocument, options);
      }
export type AddVideoMutationMutationHookResult = ReturnType<typeof useAddVideoMutationMutation>;
export type AddVideoMutationMutationResult = Apollo.MutationResult<AddVideoMutationMutation>;
export type AddVideoMutationMutationOptions = Apollo.BaseMutationOptions<AddVideoMutationMutation, AddVideoMutationMutationVariables>;
export const UpdateVideoMutationDocument = gql`
    mutation updateVideoMutation($description: String, $id: ID!, $user_id: ID, $title: String, $videoStatus: Boolean, $videoUrl: String, $thumbnailUrl: String, $viewCount: Int) {
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
export type UpdateVideoMutationMutationFn = Apollo.MutationFunction<UpdateVideoMutationMutation, UpdateVideoMutationMutationVariables>;

/**
 * __useUpdateVideoMutationMutation__
 *
 * To run a mutation, you first call `useUpdateVideoMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideoMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideoMutationMutation, { data, loading, error }] = useUpdateVideoMutationMutation({
 *   variables: {
 *      description: // value for 'description'
 *      id: // value for 'id'
 *      user_id: // value for 'user_id'
 *      title: // value for 'title'
 *      videoStatus: // value for 'videoStatus'
 *      videoUrl: // value for 'videoUrl'
 *      thumbnailUrl: // value for 'thumbnailUrl'
 *      viewCount: // value for 'viewCount'
 *   },
 * });
 */
export function useUpdateVideoMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVideoMutationMutation, UpdateVideoMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVideoMutationMutation, UpdateVideoMutationMutationVariables>(UpdateVideoMutationDocument, options);
      }
export type UpdateVideoMutationMutationHookResult = ReturnType<typeof useUpdateVideoMutationMutation>;
export type UpdateVideoMutationMutationResult = Apollo.MutationResult<UpdateVideoMutationMutation>;
export type UpdateVideoMutationMutationOptions = Apollo.BaseMutationOptions<UpdateVideoMutationMutation, UpdateVideoMutationMutationVariables>;
export const MakeCommentMutationDocument = gql`
    mutation makeCommentMutation($video_id: ID!, $text: String!, $user_id: ID!, $likeCount: Int, $dislikeCount: Int) {
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
export type MakeCommentMutationMutationFn = Apollo.MutationFunction<MakeCommentMutationMutation, MakeCommentMutationMutationVariables>;

/**
 * __useMakeCommentMutationMutation__
 *
 * To run a mutation, you first call `useMakeCommentMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeCommentMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeCommentMutationMutation, { data, loading, error }] = useMakeCommentMutationMutation({
 *   variables: {
 *      video_id: // value for 'video_id'
 *      text: // value for 'text'
 *      user_id: // value for 'user_id'
 *      likeCount: // value for 'likeCount'
 *      dislikeCount: // value for 'dislikeCount'
 *   },
 * });
 */
export function useMakeCommentMutationMutation(baseOptions?: Apollo.MutationHookOptions<MakeCommentMutationMutation, MakeCommentMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeCommentMutationMutation, MakeCommentMutationMutationVariables>(MakeCommentMutationDocument, options);
      }
export type MakeCommentMutationMutationHookResult = ReturnType<typeof useMakeCommentMutationMutation>;
export type MakeCommentMutationMutationResult = Apollo.MutationResult<MakeCommentMutationMutation>;
export type MakeCommentMutationMutationOptions = Apollo.BaseMutationOptions<MakeCommentMutationMutation, MakeCommentMutationMutationVariables>;
export const UpdateCommentMutationDocument = gql`
    mutation updateCommentMutation($id: ID!, $text: String!) {
  updateComment(id: $id, text: $text) {
    id
    text
    user_id
  }
}
    `;
export type UpdateCommentMutationMutationFn = Apollo.MutationFunction<UpdateCommentMutationMutation, UpdateCommentMutationMutationVariables>;

/**
 * __useUpdateCommentMutationMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutationMutation, { data, loading, error }] = useUpdateCommentMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdateCommentMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutationMutation, UpdateCommentMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutationMutation, UpdateCommentMutationMutationVariables>(UpdateCommentMutationDocument, options);
      }
export type UpdateCommentMutationMutationHookResult = ReturnType<typeof useUpdateCommentMutationMutation>;
export type UpdateCommentMutationMutationResult = Apollo.MutationResult<UpdateCommentMutationMutation>;
export type UpdateCommentMutationMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutationMutation, UpdateCommentMutationMutationVariables>;
export const DeleteCommentMutationDocument = gql`
    mutation deleteCommentMutation($id: ID!) {
  deleteComment(id: $id) {
    id
  }
}
    `;
export type DeleteCommentMutationMutationFn = Apollo.MutationFunction<DeleteCommentMutationMutation, DeleteCommentMutationMutationVariables>;

/**
 * __useDeleteCommentMutationMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutationMutation, { data, loading, error }] = useDeleteCommentMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutationMutation, DeleteCommentMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutationMutation, DeleteCommentMutationMutationVariables>(DeleteCommentMutationDocument, options);
      }
export type DeleteCommentMutationMutationHookResult = ReturnType<typeof useDeleteCommentMutationMutation>;
export type DeleteCommentMutationMutationResult = Apollo.MutationResult<DeleteCommentMutationMutation>;
export type DeleteCommentMutationMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutationMutation, DeleteCommentMutationMutationVariables>;
export const AddLikeOnCommentMutationDocument = gql`
    mutation addLikeOnCommentMutation($like: Boolean!, $comment_id: ID!, $user_id: ID!) {
  insertLikedComments(comment_id: $comment_id, user_id: $user_id, like: $like) {
    id
    created_at
    comment_id
    like
    user_id
  }
}
    `;
export type AddLikeOnCommentMutationMutationFn = Apollo.MutationFunction<AddLikeOnCommentMutationMutation, AddLikeOnCommentMutationMutationVariables>;

/**
 * __useAddLikeOnCommentMutationMutation__
 *
 * To run a mutation, you first call `useAddLikeOnCommentMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLikeOnCommentMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLikeOnCommentMutationMutation, { data, loading, error }] = useAddLikeOnCommentMutationMutation({
 *   variables: {
 *      like: // value for 'like'
 *      comment_id: // value for 'comment_id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useAddLikeOnCommentMutationMutation(baseOptions?: Apollo.MutationHookOptions<AddLikeOnCommentMutationMutation, AddLikeOnCommentMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLikeOnCommentMutationMutation, AddLikeOnCommentMutationMutationVariables>(AddLikeOnCommentMutationDocument, options);
      }
export type AddLikeOnCommentMutationMutationHookResult = ReturnType<typeof useAddLikeOnCommentMutationMutation>;
export type AddLikeOnCommentMutationMutationResult = Apollo.MutationResult<AddLikeOnCommentMutationMutation>;
export type AddLikeOnCommentMutationMutationOptions = Apollo.BaseMutationOptions<AddLikeOnCommentMutationMutation, AddLikeOnCommentMutationMutationVariables>;
export const RemoveLikeOnCommentMutationDocument = gql`
    mutation removeLikeOnCommentMutation($id: ID!) {
  deleteLikedComments(id: $id) {
    id
  }
}
    `;
export type RemoveLikeOnCommentMutationMutationFn = Apollo.MutationFunction<RemoveLikeOnCommentMutationMutation, RemoveLikeOnCommentMutationMutationVariables>;

/**
 * __useRemoveLikeOnCommentMutationMutation__
 *
 * To run a mutation, you first call `useRemoveLikeOnCommentMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLikeOnCommentMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLikeOnCommentMutationMutation, { data, loading, error }] = useRemoveLikeOnCommentMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveLikeOnCommentMutationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLikeOnCommentMutationMutation, RemoveLikeOnCommentMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLikeOnCommentMutationMutation, RemoveLikeOnCommentMutationMutationVariables>(RemoveLikeOnCommentMutationDocument, options);
      }
export type RemoveLikeOnCommentMutationMutationHookResult = ReturnType<typeof useRemoveLikeOnCommentMutationMutation>;
export type RemoveLikeOnCommentMutationMutationResult = Apollo.MutationResult<RemoveLikeOnCommentMutationMutation>;
export type RemoveLikeOnCommentMutationMutationOptions = Apollo.BaseMutationOptions<RemoveLikeOnCommentMutationMutation, RemoveLikeOnCommentMutationMutationVariables>;
export const ModifyLikeOnCommentMutationDocument = gql`
    mutation modifyLikeOnCommentMutation($id: ID!, $like: Boolean) {
  updateLikedComments(id: $id, like: $like) {
    id
    like
  }
}
    `;
export type ModifyLikeOnCommentMutationMutationFn = Apollo.MutationFunction<ModifyLikeOnCommentMutationMutation, ModifyLikeOnCommentMutationMutationVariables>;

/**
 * __useModifyLikeOnCommentMutationMutation__
 *
 * To run a mutation, you first call `useModifyLikeOnCommentMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyLikeOnCommentMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyLikeOnCommentMutationMutation, { data, loading, error }] = useModifyLikeOnCommentMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      like: // value for 'like'
 *   },
 * });
 */
export function useModifyLikeOnCommentMutationMutation(baseOptions?: Apollo.MutationHookOptions<ModifyLikeOnCommentMutationMutation, ModifyLikeOnCommentMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyLikeOnCommentMutationMutation, ModifyLikeOnCommentMutationMutationVariables>(ModifyLikeOnCommentMutationDocument, options);
      }
export type ModifyLikeOnCommentMutationMutationHookResult = ReturnType<typeof useModifyLikeOnCommentMutationMutation>;
export type ModifyLikeOnCommentMutationMutationResult = Apollo.MutationResult<ModifyLikeOnCommentMutationMutation>;
export type ModifyLikeOnCommentMutationMutationOptions = Apollo.BaseMutationOptions<ModifyLikeOnCommentMutationMutation, ModifyLikeOnCommentMutationMutationVariables>;
export const AddLikeOnVideoMutationDocument = gql`
    mutation addLikeOnVideoMutation($id:ID,$liked: Boolean!, $video_id: ID!, $user_id: ID!) {
  insertLikedVideos(id:$id,video_id: $video_id, user_id: $user_id, liked: $liked) {
    id
    created_at
    video_id
    liked
    user_id
  }
}
    `;
export type AddLikeOnVideoMutationMutationFn = Apollo.MutationFunction<AddLikeOnVideoMutationMutation, AddLikeOnVideoMutationMutationVariables>;

/**
 * __useAddLikeOnVideoMutationMutation__
 *
 * To run a mutation, you first call `useAddLikeOnVideoMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLikeOnVideoMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLikeOnVideoMutationMutation, { data, loading, error }] = useAddLikeOnVideoMutationMutation({
 *   variables: {
 *      liked: // value for 'liked'
 *      video_id: // value for 'video_id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useAddLikeOnVideoMutationMutation(baseOptions?: Apollo.MutationHookOptions<AddLikeOnVideoMutationMutation, AddLikeOnVideoMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLikeOnVideoMutationMutation, AddLikeOnVideoMutationMutationVariables>(AddLikeOnVideoMutationDocument, options);
      }
export type AddLikeOnVideoMutationMutationHookResult = ReturnType<typeof useAddLikeOnVideoMutationMutation>;
export type AddLikeOnVideoMutationMutationResult = Apollo.MutationResult<AddLikeOnVideoMutationMutation>;
export type AddLikeOnVideoMutationMutationOptions = Apollo.BaseMutationOptions<AddLikeOnVideoMutationMutation, AddLikeOnVideoMutationMutationVariables>;
export const RemoveLikeOnVideoMutationDocument = gql`
    mutation removeLikeOnVideoMutation($id: ID!) {
  deleteLikedVideos(id: $id) {
    id
  }
}
    `;
export type RemoveLikeOnVideoMutationMutationFn = Apollo.MutationFunction<RemoveLikeOnVideoMutationMutation, RemoveLikeOnVideoMutationMutationVariables>;

/**
 * __useRemoveLikeOnVideoMutationMutation__
 *
 * To run a mutation, you first call `useRemoveLikeOnVideoMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLikeOnVideoMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLikeOnVideoMutationMutation, { data, loading, error }] = useRemoveLikeOnVideoMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveLikeOnVideoMutationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLikeOnVideoMutationMutation, RemoveLikeOnVideoMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLikeOnVideoMutationMutation, RemoveLikeOnVideoMutationMutationVariables>(RemoveLikeOnVideoMutationDocument, options);
      }
export type RemoveLikeOnVideoMutationMutationHookResult = ReturnType<typeof useRemoveLikeOnVideoMutationMutation>;
export type RemoveLikeOnVideoMutationMutationResult = Apollo.MutationResult<RemoveLikeOnVideoMutationMutation>;
export type RemoveLikeOnVideoMutationMutationOptions = Apollo.BaseMutationOptions<RemoveLikeOnVideoMutationMutation, RemoveLikeOnVideoMutationMutationVariables>;
export const ModifyLikeOnVideoMutationDocument = gql`
    mutation modifyLikeOnVideoMutation($id: ID!, $liked: Boolean) {
  updateLikedVideos(id: $id, liked: $liked) {
    id
    liked
  }
}
    `;
export type ModifyLikeOnVideoMutationMutationFn = Apollo.MutationFunction<ModifyLikeOnVideoMutationMutation, ModifyLikeOnVideoMutationMutationVariables>;

/**
 * __useModifyLikeOnVideoMutationMutation__
 *
 * To run a mutation, you first call `useModifyLikeOnVideoMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyLikeOnVideoMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyLikeOnVideoMutationMutation, { data, loading, error }] = useModifyLikeOnVideoMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      liked: // value for 'liked'
 *   },
 * });
 */
export function useModifyLikeOnVideoMutationMutation(baseOptions?: Apollo.MutationHookOptions<ModifyLikeOnVideoMutationMutation, ModifyLikeOnVideoMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyLikeOnVideoMutationMutation, ModifyLikeOnVideoMutationMutationVariables>(ModifyLikeOnVideoMutationDocument, options);
      }
export type ModifyLikeOnVideoMutationMutationHookResult = ReturnType<typeof useModifyLikeOnVideoMutationMutation>;
export type ModifyLikeOnVideoMutationMutationResult = Apollo.MutationResult<ModifyLikeOnVideoMutationMutation>;
export type ModifyLikeOnVideoMutationMutationOptions = Apollo.BaseMutationOptions<ModifyLikeOnVideoMutationMutation, ModifyLikeOnVideoMutationMutationVariables>;
export const InsertSubscriberMutationDocument = gql`
    mutation insertSubscriberMutation($user_id: ID!, $subscribed_to_id: ID!) {
  insertSubscribers(subscribed_to_id: $subscribed_to_id, user_id: $user_id) {
    id
    user_id
    subscribed_to_id
  }
}
    `;
export type InsertSubscriberMutationMutationFn = Apollo.MutationFunction<InsertSubscriberMutationMutation, InsertSubscriberMutationMutationVariables>;

/**
 * __useInsertSubscriberMutationMutation__
 *
 * To run a mutation, you first call `useInsertSubscriberMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertSubscriberMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertSubscriberMutationMutation, { data, loading, error }] = useInsertSubscriberMutationMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      subscribed_to_id: // value for 'subscribed_to_id'
 *   },
 * });
 */
export function useInsertSubscriberMutationMutation(baseOptions?: Apollo.MutationHookOptions<InsertSubscriberMutationMutation, InsertSubscriberMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertSubscriberMutationMutation, InsertSubscriberMutationMutationVariables>(InsertSubscriberMutationDocument, options);
      }
export type InsertSubscriberMutationMutationHookResult = ReturnType<typeof useInsertSubscriberMutationMutation>;
export type InsertSubscriberMutationMutationResult = Apollo.MutationResult<InsertSubscriberMutationMutation>;
export type InsertSubscriberMutationMutationOptions = Apollo.BaseMutationOptions<InsertSubscriberMutationMutation, InsertSubscriberMutationMutationVariables>;
export const DeleteSubscriberMutationDocument = gql`
    mutation deleteSubscriberMutation($id: ID!) {
  deleteSubscribers(id: $id) {
    id
    user_id
    subscribed_to_id
  }
}
    `;
export type DeleteSubscriberMutationMutationFn = Apollo.MutationFunction<DeleteSubscriberMutationMutation, DeleteSubscriberMutationMutationVariables>;

/**
 * __useDeleteSubscriberMutationMutation__
 *
 * To run a mutation, you first call `useDeleteSubscriberMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubscriberMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubscriberMutationMutation, { data, loading, error }] = useDeleteSubscriberMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSubscriberMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubscriberMutationMutation, DeleteSubscriberMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubscriberMutationMutation, DeleteSubscriberMutationMutationVariables>(DeleteSubscriberMutationDocument, options);
      }
export type DeleteSubscriberMutationMutationHookResult = ReturnType<typeof useDeleteSubscriberMutationMutation>;
export type DeleteSubscriberMutationMutationResult = Apollo.MutationResult<DeleteSubscriberMutationMutation>;
export type DeleteSubscriberMutationMutationOptions = Apollo.BaseMutationOptions<DeleteSubscriberMutationMutation, DeleteSubscriberMutationMutationVariables>;
export const DeleteVideoMutationDocument = gql`
    mutation deleteVideoMutation($id: ID!) {
  deleteVideo(id: $id) {
    id
  }
}
    `;
export type DeleteVideoMutationMutationFn = Apollo.MutationFunction<DeleteVideoMutationMutation, DeleteVideoMutationMutationVariables>;

/**
 * __useDeleteVideoMutationMutation__
 *
 * To run a mutation, you first call `useDeleteVideoMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVideoMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVideoMutationMutation, { data, loading, error }] = useDeleteVideoMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVideoMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVideoMutationMutation, DeleteVideoMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVideoMutationMutation, DeleteVideoMutationMutationVariables>(DeleteVideoMutationDocument, options);
      }
export type DeleteVideoMutationMutationHookResult = ReturnType<typeof useDeleteVideoMutationMutation>;
export type DeleteVideoMutationMutationResult = Apollo.MutationResult<DeleteVideoMutationMutation>;
export type DeleteVideoMutationMutationOptions = Apollo.BaseMutationOptions<DeleteVideoMutationMutation, DeleteVideoMutationMutationVariables>;
export const InsertPlaylistDocument = gql`
    mutation insertPlaylist($playlist_name: String!, $user: ID!, $playlistVisibility: Boolean!) {
  insertPlaylist(
    playlist_name: $playlist_name
    user: $user
    playlistVisibility: $playlistVisibility
  ) {
    id
    playlist_name
    playlistVisibility
  }
}
    `;
export type InsertPlaylistMutationFn = Apollo.MutationFunction<InsertPlaylistMutation, InsertPlaylistMutationVariables>;

/**
 * __useInsertPlaylistMutation__
 *
 * To run a mutation, you first call `useInsertPlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertPlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertPlaylistMutation, { data, loading, error }] = useInsertPlaylistMutation({
 *   variables: {
 *      playlist_name: // value for 'playlist_name'
 *      user: // value for 'user'
 *      playlistVisibility: // value for 'playlistVisibility'
 *   },
 * });
 */
export function useInsertPlaylistMutation(baseOptions?: Apollo.MutationHookOptions<InsertPlaylistMutation, InsertPlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertPlaylistMutation, InsertPlaylistMutationVariables>(InsertPlaylistDocument, options);
      }
export type InsertPlaylistMutationHookResult = ReturnType<typeof useInsertPlaylistMutation>;
export type InsertPlaylistMutationResult = Apollo.MutationResult<InsertPlaylistMutation>;
export type InsertPlaylistMutationOptions = Apollo.BaseMutationOptions<InsertPlaylistMutation, InsertPlaylistMutationVariables>;
export const InsertPlaylistVideosDocument = gql`
    mutation insertPlaylistVideos($video_id: ID!, $playlist_id: ID!) {
  insertPlaylistVideos(video_id: $video_id, playlist_id: $playlist_id) {
    id
    video_id
    playlist_id
  }
}
    `;
export type InsertPlaylistVideosMutationFn = Apollo.MutationFunction<InsertPlaylistVideosMutation, InsertPlaylistVideosMutationVariables>;

/**
 * __useInsertPlaylistVideosMutation__
 *
 * To run a mutation, you first call `useInsertPlaylistVideosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertPlaylistVideosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertPlaylistVideosMutation, { data, loading, error }] = useInsertPlaylistVideosMutation({
 *   variables: {
 *      video_id: // value for 'video_id'
 *      playlist_id: // value for 'playlist_id'
 *   },
 * });
 */
export function useInsertPlaylistVideosMutation(baseOptions?: Apollo.MutationHookOptions<InsertPlaylistVideosMutation, InsertPlaylistVideosMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertPlaylistVideosMutation, InsertPlaylistVideosMutationVariables>(InsertPlaylistVideosDocument, options);
      }
export type InsertPlaylistVideosMutationHookResult = ReturnType<typeof useInsertPlaylistVideosMutation>;
export type InsertPlaylistVideosMutationResult = Apollo.MutationResult<InsertPlaylistVideosMutation>;
export type InsertPlaylistVideosMutationOptions = Apollo.BaseMutationOptions<InsertPlaylistVideosMutation, InsertPlaylistVideosMutationVariables>;
export const GetVideoByIdDocument = gql`
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

/**
 * __useGetVideoByIdQuery__
 *
 * To run a query within a React component, call `useGetVideoByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVideoByIdQuery(baseOptions: Apollo.QueryHookOptions<GetVideoByIdQuery, GetVideoByIdQueryVariables> & ({ variables: GetVideoByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoByIdQuery, GetVideoByIdQueryVariables>(GetVideoByIdDocument, options);
      }
export function useGetVideoByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoByIdQuery, GetVideoByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoByIdQuery, GetVideoByIdQueryVariables>(GetVideoByIdDocument, options);
        }
export function useGetVideoByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetVideoByIdQuery, GetVideoByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVideoByIdQuery, GetVideoByIdQueryVariables>(GetVideoByIdDocument, options);
        }
export type GetVideoByIdQueryHookResult = ReturnType<typeof useGetVideoByIdQuery>;
export type GetVideoByIdLazyQueryHookResult = ReturnType<typeof useGetVideoByIdLazyQuery>;
export type GetVideoByIdSuspenseQueryHookResult = ReturnType<typeof useGetVideoByIdSuspenseQuery>;
export type GetVideoByIdQueryResult = Apollo.QueryResult<GetVideoByIdQuery, GetVideoByIdQueryVariables>;
export const GetLikesOnCommentUsingCommentIdDocument = gql`
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

/**
 * __useGetLikesOnCommentUsingCommentIdQuery__
 *
 * To run a query within a React component, call `useGetLikesOnCommentUsingCommentIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLikesOnCommentUsingCommentIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLikesOnCommentUsingCommentIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLikesOnCommentUsingCommentIdQuery(baseOptions: Apollo.QueryHookOptions<GetLikesOnCommentUsingCommentIdQuery, GetLikesOnCommentUsingCommentIdQueryVariables> & ({ variables: GetLikesOnCommentUsingCommentIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLikesOnCommentUsingCommentIdQuery, GetLikesOnCommentUsingCommentIdQueryVariables>(GetLikesOnCommentUsingCommentIdDocument, options);
      }
export function useGetLikesOnCommentUsingCommentIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLikesOnCommentUsingCommentIdQuery, GetLikesOnCommentUsingCommentIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLikesOnCommentUsingCommentIdQuery, GetLikesOnCommentUsingCommentIdQueryVariables>(GetLikesOnCommentUsingCommentIdDocument, options);
        }
export function useGetLikesOnCommentUsingCommentIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLikesOnCommentUsingCommentIdQuery, GetLikesOnCommentUsingCommentIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLikesOnCommentUsingCommentIdQuery, GetLikesOnCommentUsingCommentIdQueryVariables>(GetLikesOnCommentUsingCommentIdDocument, options);
        }
export type GetLikesOnCommentUsingCommentIdQueryHookResult = ReturnType<typeof useGetLikesOnCommentUsingCommentIdQuery>;
export type GetLikesOnCommentUsingCommentIdLazyQueryHookResult = ReturnType<typeof useGetLikesOnCommentUsingCommentIdLazyQuery>;
export type GetLikesOnCommentUsingCommentIdSuspenseQueryHookResult = ReturnType<typeof useGetLikesOnCommentUsingCommentIdSuspenseQuery>;
export type GetLikesOnCommentUsingCommentIdQueryResult = Apollo.QueryResult<GetLikesOnCommentUsingCommentIdQuery, GetLikesOnCommentUsingCommentIdQueryVariables>;
export const GetVideosDocument = gql`
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

/**
 * __useGetVideosQuery__
 *
 * To run a query within a React component, call `useGetVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVideosQuery(baseOptions?: Apollo.QueryHookOptions<GetVideosQuery, GetVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideosQuery, GetVideosQueryVariables>(GetVideosDocument, options);
      }
export function useGetVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideosQuery, GetVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideosQuery, GetVideosQueryVariables>(GetVideosDocument, options);
        }
export function useGetVideosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetVideosQuery, GetVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVideosQuery, GetVideosQueryVariables>(GetVideosDocument, options);
        }
export type GetVideosQueryHookResult = ReturnType<typeof useGetVideosQuery>;
export type GetVideosLazyQueryHookResult = ReturnType<typeof useGetVideosLazyQuery>;
export type GetVideosSuspenseQueryHookResult = ReturnType<typeof useGetVideosSuspenseQuery>;
export type GetVideosQueryResult = Apollo.QueryResult<GetVideosQuery, GetVideosQueryVariables>;
export const GetLikesOnVideoUsingVideoIdDocument = gql`
    query getLikesOnVideoUsingVideoId($id: ID!) {
  likedVideosUsingLikedVideos_video_id_fkey(id: $id) {
    liked
    id
    video_id
    user_id
  }
}
    `;

/**
 * __useGetLikesOnVideoUsingVideoIdQuery__
 *
 * To run a query within a React component, call `useGetLikesOnVideoUsingVideoIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLikesOnVideoUsingVideoIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLikesOnVideoUsingVideoIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLikesOnVideoUsingVideoIdQuery(baseOptions: Apollo.QueryHookOptions<GetLikesOnVideoUsingVideoIdQuery, GetLikesOnVideoUsingVideoIdQueryVariables> & ({ variables: GetLikesOnVideoUsingVideoIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLikesOnVideoUsingVideoIdQuery, GetLikesOnVideoUsingVideoIdQueryVariables>(GetLikesOnVideoUsingVideoIdDocument, options);
      }
export function useGetLikesOnVideoUsingVideoIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLikesOnVideoUsingVideoIdQuery, GetLikesOnVideoUsingVideoIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLikesOnVideoUsingVideoIdQuery, GetLikesOnVideoUsingVideoIdQueryVariables>(GetLikesOnVideoUsingVideoIdDocument, options);
        }
export function useGetLikesOnVideoUsingVideoIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLikesOnVideoUsingVideoIdQuery, GetLikesOnVideoUsingVideoIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLikesOnVideoUsingVideoIdQuery, GetLikesOnVideoUsingVideoIdQueryVariables>(GetLikesOnVideoUsingVideoIdDocument, options);
        }
export type GetLikesOnVideoUsingVideoIdQueryHookResult = ReturnType<typeof useGetLikesOnVideoUsingVideoIdQuery>;
export type GetLikesOnVideoUsingVideoIdLazyQueryHookResult = ReturnType<typeof useGetLikesOnVideoUsingVideoIdLazyQuery>;
export type GetLikesOnVideoUsingVideoIdSuspenseQueryHookResult = ReturnType<typeof useGetLikesOnVideoUsingVideoIdSuspenseQuery>;
export type GetLikesOnVideoUsingVideoIdQueryResult = Apollo.QueryResult<GetLikesOnVideoUsingVideoIdQuery, GetLikesOnVideoUsingVideoIdQueryVariables>;
export const GetSubscribersUsingUserIdDocument = gql`
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

/**
 * __useGetSubscribersUsingUserIdQuery__
 *
 * To run a query within a React component, call `useGetSubscribersUsingUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscribersUsingUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscribersUsingUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSubscribersUsingUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetSubscribersUsingUserIdQuery, GetSubscribersUsingUserIdQueryVariables> & ({ variables: GetSubscribersUsingUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubscribersUsingUserIdQuery, GetSubscribersUsingUserIdQueryVariables>(GetSubscribersUsingUserIdDocument, options);
      }
export function useGetSubscribersUsingUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubscribersUsingUserIdQuery, GetSubscribersUsingUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubscribersUsingUserIdQuery, GetSubscribersUsingUserIdQueryVariables>(GetSubscribersUsingUserIdDocument, options);
        }
export function useGetSubscribersUsingUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSubscribersUsingUserIdQuery, GetSubscribersUsingUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubscribersUsingUserIdQuery, GetSubscribersUsingUserIdQueryVariables>(GetSubscribersUsingUserIdDocument, options);
        }
export type GetSubscribersUsingUserIdQueryHookResult = ReturnType<typeof useGetSubscribersUsingUserIdQuery>;
export type GetSubscribersUsingUserIdLazyQueryHookResult = ReturnType<typeof useGetSubscribersUsingUserIdLazyQuery>;
export type GetSubscribersUsingUserIdSuspenseQueryHookResult = ReturnType<typeof useGetSubscribersUsingUserIdSuspenseQuery>;
export type GetSubscribersUsingUserIdQueryResult = Apollo.QueryResult<GetSubscribersUsingUserIdQuery, GetSubscribersUsingUserIdQueryVariables>;
export const GetProfileDocument = gql`
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

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables> & ({ variables: GetProfileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export function useGetProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileSuspenseQueryHookResult = ReturnType<typeof useGetProfileSuspenseQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const GetProfilesListDocument = gql`
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

/**
 * __useGetProfilesListQuery__
 *
 * To run a query within a React component, call `useGetProfilesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfilesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfilesListQuery(baseOptions?: Apollo.QueryHookOptions<GetProfilesListQuery, GetProfilesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfilesListQuery, GetProfilesListQueryVariables>(GetProfilesListDocument, options);
      }
export function useGetProfilesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfilesListQuery, GetProfilesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfilesListQuery, GetProfilesListQueryVariables>(GetProfilesListDocument, options);
        }
export function useGetProfilesListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProfilesListQuery, GetProfilesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProfilesListQuery, GetProfilesListQueryVariables>(GetProfilesListDocument, options);
        }
export type GetProfilesListQueryHookResult = ReturnType<typeof useGetProfilesListQuery>;
export type GetProfilesListLazyQueryHookResult = ReturnType<typeof useGetProfilesListLazyQuery>;
export type GetProfilesListSuspenseQueryHookResult = ReturnType<typeof useGetProfilesListSuspenseQuery>;
export type GetProfilesListQueryResult = Apollo.QueryResult<GetProfilesListQuery, GetProfilesListQueryVariables>;
export const GetLikedVideosByUserIdDocument = gql`
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

/**
 * __useGetLikedVideosByUserIdQuery__
 *
 * To run a query within a React component, call `useGetLikedVideosByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLikedVideosByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLikedVideosByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLikedVideosByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetLikedVideosByUserIdQuery, GetLikedVideosByUserIdQueryVariables> & ({ variables: GetLikedVideosByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLikedVideosByUserIdQuery, GetLikedVideosByUserIdQueryVariables>(GetLikedVideosByUserIdDocument, options);
      }
export function useGetLikedVideosByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLikedVideosByUserIdQuery, GetLikedVideosByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLikedVideosByUserIdQuery, GetLikedVideosByUserIdQueryVariables>(GetLikedVideosByUserIdDocument, options);
        }
export function useGetLikedVideosByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLikedVideosByUserIdQuery, GetLikedVideosByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLikedVideosByUserIdQuery, GetLikedVideosByUserIdQueryVariables>(GetLikedVideosByUserIdDocument, options);
        }
export type GetLikedVideosByUserIdQueryHookResult = ReturnType<typeof useGetLikedVideosByUserIdQuery>;
export type GetLikedVideosByUserIdLazyQueryHookResult = ReturnType<typeof useGetLikedVideosByUserIdLazyQuery>;
export type GetLikedVideosByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetLikedVideosByUserIdSuspenseQuery>;
export type GetLikedVideosByUserIdQueryResult = Apollo.QueryResult<GetLikedVideosByUserIdQuery, GetLikedVideosByUserIdQueryVariables>;
export const PlaylistListDocument = gql`
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

/**
 * __usePlaylistListQuery__
 *
 * To run a query within a React component, call `usePlaylistListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistListQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlaylistListQuery(baseOptions?: Apollo.QueryHookOptions<PlaylistListQuery, PlaylistListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaylistListQuery, PlaylistListQueryVariables>(PlaylistListDocument, options);
      }
export function usePlaylistListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaylistListQuery, PlaylistListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaylistListQuery, PlaylistListQueryVariables>(PlaylistListDocument, options);
        }
export function usePlaylistListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PlaylistListQuery, PlaylistListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlaylistListQuery, PlaylistListQueryVariables>(PlaylistListDocument, options);
        }
export type PlaylistListQueryHookResult = ReturnType<typeof usePlaylistListQuery>;
export type PlaylistListLazyQueryHookResult = ReturnType<typeof usePlaylistListLazyQuery>;
export type PlaylistListSuspenseQueryHookResult = ReturnType<typeof usePlaylistListSuspenseQuery>;
export type PlaylistListQueryResult = Apollo.QueryResult<PlaylistListQuery, PlaylistListQueryVariables>;