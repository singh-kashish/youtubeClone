import {
  UPDATE_VIDEO,
  ADD_LIKE_ON_VIDEO,
  REMOVE_LIKE_ON_VIDEO,
  MODIFY_LIKE_ON_VIDEO,
  INSERT_SUBSCRIBER,
  DELETE_SUBSCRIBER,
} from "../../graphql/mutations";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { addToPlaylist } from "../../reduxReducers/playlistSlice";
import { rootState } from "../../store";
import { ApolloError } from "@apollo/client/errors";
import {
  GetLikesOnVideoUsingVideoIdDocument,
  GetVideoByIdDocument,
  ModifyLikeOnVideoMutationDocument,
  Subscribers,
  UpdateVideoMutationDocument,
  useAddLikeOnVideoMutationMutation,
  useDeleteSubscriberMutationMutation,
  useGetLikesOnVideoUsingVideoIdQuery,
  useGetVideoByIdQuery,
  useInsertSubscriberMutationMutation,
  useModifyLikeOnVideoMutationMutation,
  useRemoveLikeOnVideoMutationMutation,
  useUpdateVideoMutationMutation,
  Video,
} from "../gql/graphql";
import uuid from "../components/uuid";
const useVideoHook = () => {
  const Router = useRouter();
  const user = useUser();
  const routerQueryId: string = Router?.query?.video_id as string;
  const { loading, error, data } = useGetVideoByIdQuery({
    variables: { id: routerQueryId || "" },
  });
  const [liked, setLiked] = useState<boolean>();
  const [likedId, setLikedId] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [subscribedId, setSubscribedId] = useState<string>();
  const [viewsChanged, setViewsChanged] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    data: likeData,
    loading: likeLoading,
    error: likeError,
  } = useGetLikesOnVideoUsingVideoIdQuery({
    variables: {
      id: routerQueryId,
    },
  });

  const video: Video = data?.video as Video;
  const prevViewCount: number = video?.viewCount as number;
  const toBeInsertedViewCount: number = (prevViewCount || 0) + 1;
  const [updateVideoMutationMutation, updateVideoMutationRef] =
    useUpdateVideoMutationMutation();
  const [removeLikeOnVideoMutationMutation, videoRef] =
    useRemoveLikeOnVideoMutationMutation({
      refetchQueries: [
        GetLikesOnVideoUsingVideoIdDocument,
        "getLikedVideosUsingLikedVideos_video_id_fkey",
      ],
      variables: {
        id: likedId as string,
      },
    });
  const [modifyLikeOnVideoMutation] = useMutation(
    ModifyLikeOnVideoMutationDocument,
    {
      refetchQueries: [
        GetLikesOnVideoUsingVideoIdDocument,
        "getLikedVideosUsingLikedVideos_video_id_fkey",
      ],
      variables: {
        id: likedId,
        liked,
      },
    }
  );
  const [addLikeOnVideoMutation, addLikeOnVideoRef] =
    useAddLikeOnVideoMutationMutation({
      refetchQueries: [
        GetLikesOnVideoUsingVideoIdDocument,
        "getLikedVideosUsingLikedVideos_video_id_fkey",
      ],
      variables: {
        liked: liked as boolean,
        video_id: routerQueryId,
        user_id: user?.id as string,
      },
    });
  const [insertSubscriberMutationMutation, insertSubscriberMutationRef] =
    useInsertSubscriberMutationMutation({
      refetchQueries: [
        GetVideoByIdDocument,
        "getLikedVideosUsingLikedVideos_video_id_fkey",
      ],
    });
  const onOpen = async () => {
    if (prevViewCount != undefined && viewsChanged === false) {
      const notification = toast.loading(
        "Updating view count for this video..."
      );
      try {
        updateVideoMutationMutation({
          variables: {
            id: routerQueryId,
            viewCount: toBeInsertedViewCount,
          },
        });
        toast.success("View Count was updated!", {
          id: notification,
        });
        setViewsChanged(true);
        toast.dismiss();
      } catch (error: any) {
        toast.error(
          "Whoops something went wrong while updating view count!",
          error?.message
        );
      }
    }
  };
  const { value } = useSelector((state: rootState) => state.playlist);
  const dispatch = useDispatch();
  useEffect(() => {
    const likes = likeData?.likedVideosUsingLikedVideos_video_id_fkey;
    const liked = likes?.find((vote: any) => vote.user_id === user?.id)?.liked;
    const likeId = likes?.find((vote: any) => vote.user_id === user?.id)
      ?.id as string;
    setLiked(liked as boolean);
    console.log(likedId);
    setLikedId(likeId);
  }, [likeData]);
  useEffect(() => {
    onOpen();
    const subs = video?.profiles
      ?.subscribersUsingSubscribers_subscribed_to_id_fkey as Subscribers[];
    const subbed: boolean =
      subs?.find((sub: any) => sub.user_id === user?.id) !== undefined
        ? true
        : false;
    const subbedId = subs?.find((sub: any) => sub.user_id === user?.id)?.id;
    setSubscribed(subbed);
    setSubscribedId(subbedId);
    if (video !== undefined) {
      dispatch(addToPlaylist(video));
    }
  }, [video]);

  // const [insertLikedVideos] = useMutation(ADD_LIKE_ON_VIDEO, {
  //   refetchQueries: [
  //     useGetLikesOnVideoUsingVideoIdQuery,
  //     "getLikedVideosUsingLikedVideos_video_id_fkey",
  //   ],
  // });

  // const [deleteLikedVideos] = useMutation(REMOVE_LIKE_ON_VIDEO, {
  //   refetchQueries: [
  //     GET_LIKES_ON_VIDEO_USING_VIDEO_ID,
  //     "getLikedVideosUsingLikedVideos_video_id_fkey",
  //   ],
  // });

  // const [updateLikedVideos] = useMutation(MODIFY_LIKE_ON_VIDEO, {
  //   refetchQueries: [
  //     GET_LIKES_ON_VIDEO_USING_VIDEO_ID,
  //     "getLikedVideosUsingLikedVideos_video_id_fkey",
  //   ],
  // });
  // const [insertSubscribers] = useMutation(INSERT_SUBSCRIBER, {
  //   refetchQueries: [GET_VIDEO_BY_ID, "getVideo"],
  // });
  // const [deleteSubscribers] = useMutation(DELETE_SUBSCRIBER, {
  //   refetchQueries: [GET_VIDEO_BY_ID, "getVideo"],
  // });

  const useUpVote = async (typeOfLike: boolean) => {
    if (!user) {
      toast("Hey, You need to sign in to be able to vote!");
      return;
    }
    // UpVote exists , again hitting like removes your like, thereby deleting it
    else if (user && liked === true && typeOfLike === true) {
      try {
        const toastId = toast("Removing your Like!");
        removeLikeOnVideoMutationMutation({
          variables: {
            id: likedId as string,
          },
        });
        toast.dismiss(toastId);
        toast.success("Your like was successfully removed!");
        return;
      } catch (error) {
        toast.error(error?.message);
      }
    }
    // Unlike exists, again hitting unlike removes your vote,thereby deleting it
    else if (user && liked === false && typeOfLike === false) {
      try {
        const toastId = toast("Removing your Unlike");
        removeLikeOnVideoMutationMutation({
          variables: {
            id: likedId,
          },
        });
        toast.dismiss(toastId);
        toast.success("Your unlike was removed successfully!");
      } catch (error) {
        toast.error(error?.message);
      }
    }
    // like exists, but the user want to unlike ...  so we modify the existing row in the votes table
    else if (user && liked === true && typeOfLike === false) {
      try {
        const toastId = toast("Changing your Like to Unlike");
        modifyLikeOnVideoMutation({
          variables: {
            id: likedId,
            liked: typeOfLike,
          },
        });
        toast.dismiss(toastId);
        toast.success("Changed to Unlike!");
      } catch (error: ApolloError) {
        toast.error(error.message);
      }
    }
    // unlike exists but the user wants to change to like , so modify the row in the vote table
    else if (user && liked === false && typeOfLike === true) {
      try {
        const toastId = toast("Changing your Unlike to Like!");
        modifyLikeOnVideoMutation({
          variables: {
            id: likedId,
            liked: typeOfLike,
          },
        });
        toast.dismiss(toastId);
        toast.success("Changed to Like!");
      } catch (error: ApolloError) {
        toast.error(error.message);
      }
    } else {
      const toastId = toast.loading(
        `Inserting your ${typeOfLike ? "Like" : "Unlike"}!`
      );
      const insertId = uuid();
      addLikeOnVideoMutation({
        variables: {
          id:insertId,
          video_id: routerQueryId,
          user_id: user.id,
          liked: typeOfLike as boolean,
        },
      });
      toast.dismiss(toastId);
      toast.success(`Your ${typeOfLike ? "Like" : "Unlike"} was inserted`);
    }
  };
  const [deleteSubscriberMutationMutation, deleteSubscriberRef] =
    useDeleteSubscriberMutationMutation();
  const subscribe = async () => {
    if (!user) {
      toast("Hey, You need to sign in to be able to subscribe!");
    }
    // Subscription exists , again hitting subscribe enables deletion
    else if (subscribed) {
      try {
        toast("Removing your Subscription!");
        deleteSubscriberMutationMutation({
          variables: {
            id: subscribedId as string,
          },
        });
        toast("Your subscription was successfully removed!");
        setSubscribed(false);
      } catch (error: ApolloError) {
        toast.error(error.message);
      }
    } else {
      try {
        toast("Inserting your Subscription!");
        insertSubscriberMutationMutation({
          variables: {
            user_id: user.id,
            subscribed_to_id: video?.user_id as string,
          },
        });
        toast("You are now subscribed to this user!");
        setSubscribed(true);
        setSubscribedId(data?.id);
      } catch (error: ApolloError) {
        toast.error(error.message);
      }
    }
  };
  const displayLikes = (data: any) => {
    const likes = data?.likedVideosUsingLikedVideos_video_id_fkey;
    const displayNumber = likes?.reduce(
      (total: any, vote: any) => (vote.liked ? (total += 1) : total),
      0
    );

    if (likes?.length === 0) return 0;
    return displayNumber;
  };
  const displayUnlikes = (data: any) => {
    const likes = data.likedVideosUsingLikedVideos_video_id_fkey;
    const displayNumber = likes?.reduce(
      (total: any, vote: any) => (vote.liked === false ? (total += 1) : total),
      0
    );

    if (likes?.length === 0) return 0;
    return displayNumber;
  };
  function checker(element: Video): number {
    for (let itr = 0; itr < value.length; itr++) {
      if (element.id === value[itr]?.["id"]) {
        return itr;
      }
    }
    return -1;
  }
  const onVideoEnd = () => {
    if (!video) return;
    let currVidPosition = checker(video);
    if (currVidPosition === value?.length - 1) {
      const toGoToURL = `/video/${value[0]?.["id"]}`;
      Router.push(toGoToURL);
    } else {
      const toGoToURL = `/video/${value[currVidPosition + 1]?.["id"]}`;
      Router.push(toGoToURL);
    }
  };

  return {
    video,
    loading,
    likeLoading,
    error,
    likeError,
    likeData,
    onVideoEnd,
    subscribe,
    subscribed,
    liked,
    useUpVote,
    displayLikes,
    displayUnlikes,
    handleClose,
    handleOpen,
    Router,
    open,
    setOpen,
  };
};
export default useVideoHook;
