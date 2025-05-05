// import {
//   UPDATE_VIDEO,
//   ADD_LIKE_ON_VIDEO,
//   REMOVE_LIKE_ON_VIDEO,
//   MODIFY_LIKE_ON_VIDEO,
//   INSERT_SUBSCRIBER,
//   DELETE_SUBSCRIBER,
// } from "../../graphql/mutations";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { addToPlaylist } from "../../reduxReducers/playlistSlice";
import { rootState } from "../../store";
// import { ApolloError } from "@apollo/client/errors";
// import {
//   GetLikesOnVideoUsingVideoIdDocument,
//   GetVideoByIdDocument,
//   ModifyLikeOnVideoMutationDocument,
//   Subscribers,
//   UpdateVideoMutationDocument,
//   useAddLikeOnVideoMutationMutation,
//   useDeleteSubscriberMutationMutation,
//   useGetLikesOnVideoUsingVideoIdQuery,
//   useGetVideoByIdQuery,
//   useInsertSubscriberMutationMutation,
//   useModifyLikeOnVideoMutationMutation,
//   useRemoveLikeOnVideoMutationMutation,
//   useUpdateVideoMutationMutation,
//   Video,
// } from "../gql/graphql";
import uuid from "../components/uuid";
import { useSearchParams, usePathname } from "next/navigation";
const useVideoHook = (user) => {
  const Router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [routerQueryId, setRouterQueryId] = useState("");
  const [video, setVideo] = useState({ loading: "loading" });
  useEffect(() => {
    if (pathname) setRouterQueryId(`${`${searchParams}`.substring(9)}`);
  }, [pathname, searchParams]);
  const { loading, error, data } = useGetVideoByIdQuery({
    variables: { id: routerQueryId || "" },
  });
  useEffect(() => {
    if (!loading && data) setVideo(data?.video);
  }, [data, loading]);
  const [liked, setLiked] = useState();
  const [likedId, setLikedId] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribedId, setSubscribedId] = useState();
  const [viewsChanged, setViewsChanged] = useState(false);
  const [position, setPosition] = useState(0);
  const [open, setOpen] = useState(false);
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

  const prevViewCount = video?.viewCount;
  const toBeInsertedViewCount = (prevViewCount || 0) + 1;
  const [updateVideoMutationMutation, updateVideoRef] = useUpdateVideoMutationMutation({
       variables: {
        id: routerQueryId,
        },
     });
  const [removeLikeOnVideoMutationMutation, videoRef] =
    useRemoveLikeOnVideoMutationMutation({
      refetchQueries: [
        GetLikesOnVideoUsingVideoIdDocument,
        "getLikedVideosUsingLikedVideos_video_id_fkey",
      ],
      variables: {
        id: likedId,
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
  const [addLikeOnVideoMutationMutation, addLikeOnVideoRef] =
    useAddLikeOnVideoMutationMutation({
      refetchQueries: [
        GetLikesOnVideoUsingVideoIdDocument,
        "getLikedVideosUsingLikedVideos_video_id_fkey",
      ],
      variables: {
        liked: liked,
        video_id: routerQueryId,
        user_id: user?.id,
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
    console.log("prev>", prevViewCount, viewsChanged);
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
      } catch (error) {
        toast.error("Whoops something went wrong while updating view count!");
      } finally {
        toast.success("View Count was updated!", {
          id: notification,
        });
        setViewsChanged(true);
        toast.dismiss();
      }
    }
  };
  const { value } = useSelector((state) => state?.playlist);
  const dispatch = useDispatch();
  useEffect(() => {
    const likes = likeData?.likedVideosUsingLikedVideos_video_id_fkey;
    const liked = likes?.find((vote) => vote.user_id === user?.id)?.liked;
    const likeId = likes?.find((vote) => vote.user_id === user?.id)?.id;
    setLiked(liked);
    console.log(likedId);
    setLikedId(likeId);
  }, [likeData]);
  useEffect(() => {
    if (video) onOpen();
    const subs =
      video?.profiles?.subscribersUsingSubscribers_subscribed_to_id_fkey;
    const subbed =
      subs?.find((sub) => sub.user_id === user?.id) !== undefined
        ? true
        : false;
    const subbedId = subs?.find((sub) => sub.user_id === user?.id)?.id;
    setSubscribed(subbed);
    setSubscribedId(subbedId);
    if (video !== undefined && video?.loading!=="loading") {
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

  const useUpVote = async (typeOfLike) => {
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
            id: likedId,
          },
        });
        toast.dismiss(toastId);
        toast.success("Your like was successfully removed!");
        return;
      } catch (error) {
        console.error(error);
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
        console.error(error);
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
      } catch (error) {
        console.error(error);
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
      } catch (error) {
        console.error(error);
      }
    } else if(user && typeOfLike){
      const toastId = toast.loading(
        `Inserting your ${typeOfLike ? "Like" : "Unlike"}!`
      );
      var app=addLikeOnVideoMutationMutation({
        variables: {
          video_id: routerQueryId,
          user_id: user?.id,
          liked: typeOfLike,
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
            id: subscribedId,
          },
        });
        toast("Your subscription was successfully removed!");
        setSubscribed(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        toast("Inserting your Subscription!");
        insertSubscriberMutationMutation({
          variables: {
            user_id: user?.id,
            subscribed_to_id: video?.user_id,
          },
        });
        toast("You are now subscribed to this user!");
        setSubscribed(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const displayLikes = (data) => {
    const likes = data?.likedVideosUsingLikedVideos_video_id_fkey;
    const displayNumber = likes?.reduce(
      (total, vote) => (vote?.liked ? (total += 1) : total),
      0
    );

    if (likes?.length === 0) return 0;
    return displayNumber;
  };
  const displayUnlikes = (data) => {
    const likes = data?.likedVideosUsingLikedVideos_video_id_fkey;
    const displayNumber = likes?.reduce(
      (total, vote) => (vote?.liked === false ? (total += 1) : total),
      0
    );

    if (likes?.length === 0) return 0;
    return displayNumber;
  };
  function checker(element) {
    for (let itr = 0; itr < value.length; itr++) {
      if (element?.id === value[itr]?.["id"]) {
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
 