import {
  UPDATE_VIDEO,
  ADD_LIKE_ON_VIDEO,
  REMOVE_LIKE_ON_VIDEO,
  MODIFY_LIKE_ON_VIDEO,
  INSERT_SUBSCRIBER,
  DELETE_SUBSCRIBER,
} from "../../graphql/mutations";
import {
  GET_VIDEO_BY_ID,
  GET_LIKES_ON_VIDEO_USING_VIDEO_ID,
} from "../../graphql/queries";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { addToPlaylist } from "../../reduxReducers/playlistSlice";
import { Video } from "../types/Video";
import { rootState } from "../../store";
type VideoDataType = {getVideo:Video;id:string}
const useVideoHook = () => {
  const Router = useRouter();
  const user = useUser();
  const { loading, error, data } = useQuery<VideoDataType>(GET_VIDEO_BY_ID, {
    variables: {
      id: Router.query.video_id,
    },
  });
  const [liked, setLiked] = useState<boolean>();
  const [likedId, setLikedId] = useState<string>();
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [subscribedId, setSubscribedId] = useState<string>();
  const [viewsChanged, setViewsChanged] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updateVideo] = useMutation(UPDATE_VIDEO);
  const {
    data: likeData,
    loading: likeLoading,
    error: likeError,
  } = useQuery(GET_LIKES_ON_VIDEO_USING_VIDEO_ID, {
    variables: {
      id: Router.query.video_id,
    },
  });
  const video = data?.getVideo;
  const prevViewCount = video?.viewCount;
  const toBeInsertedViewCount: number = (prevViewCount||0) + 1;
  const onOpen = async () => {
    if (prevViewCount != undefined && viewsChanged === false) {
      const notification = toast.loading(
        "Updating view count for this video..."
      );
      try {
        const {
          data: { updateVideo: updatedvideo },
        } = await updateVideo({
          variables: {
            id: Router.query.video_id,
            viewCount: toBeInsertedViewCount,
          },
        });
        toast.success("View Count was updated!", {
          id: notification,
        });
        setViewsChanged(true);
        toast.dismiss();
      } catch (error) {
        toast.error("Whoops something went wrong while updating view count!", {
          id: notification,
        });
      }
    }
  };
  const {value} = useSelector((state: rootState) => state.playlist);
  const dispatch = useDispatch();
  useEffect(() => {
    const likes = likeData?.getLikedVideosUsingLikedVideos_video_id_fkey;
    const liked = likes?.find((vote: any) => vote.user_id === user?.id)?.liked;
    const likeId = likes?.find((vote: any) => vote.user_id === user?.id)?.id;
    setLiked(liked);
    setLikedId(likeId);
  }, [likeData]);
  useEffect(() => {
    onOpen();
    const subs =
      video?.profiles?.subscribersUsingSubscribers_subscribed_to_id_fkey;
    const subbed =
      subs?.find((sub: any) => sub.user_id === user?.id) != undefined
        ? true
        : false;
    const subbedId = subs?.find((sub: any) => sub.user_id === user?.id)?.id;
    setSubscribed(subbed);
    setSubscribedId(subbedId);
    if (video!==undefined) {
      dispatch(addToPlaylist(video));
    }
    }, [video]);
  const [insertLikedVideos] = useMutation(ADD_LIKE_ON_VIDEO, {
    refetchQueries: [
      GET_LIKES_ON_VIDEO_USING_VIDEO_ID,
      "getLikedVideosUsingLikedVideos_video_id_fkey",
    ],
  });

  const [deleteLikedVideos] = useMutation(REMOVE_LIKE_ON_VIDEO, {
    refetchQueries: [
      GET_LIKES_ON_VIDEO_USING_VIDEO_ID,
      "getLikedVideosUsingLikedVideos_video_id_fkey",
    ],
  });

  const [updateLikedVideos] = useMutation(MODIFY_LIKE_ON_VIDEO, {
    refetchQueries: [
      GET_LIKES_ON_VIDEO_USING_VIDEO_ID,
      "getLikedVideosUsingLikedVideos_video_id_fkey",
    ],
  });
  const [insertSubscribers] = useMutation(INSERT_SUBSCRIBER, {
    refetchQueries: [GET_VIDEO_BY_ID, "getVideo"],
  });
  const [deleteSubscribers] = useMutation(DELETE_SUBSCRIBER, {
    refetchQueries: [GET_VIDEO_BY_ID, "getVideo"],
  });
  const upVote = async (typeOfLike: Boolean) => {
    if (!user) {
      toast("Hey, You need to sign in to be able to vote!");
      return;
    }
    // UpVote exists , again hitting like removes your like, thereby deleting it
    else if (liked && typeOfLike) {
      toast("Removing your Like!");
      const {
        data: { deleteLikedVideos: oldLike },
      } = await deleteLikedVideos({
        variables: {
          id: likedId,
        },
      });
      toast("Your like was successfully removed!");
      return;
    }
    // Unlike exists, again hitting unlike removes your vote,thereby deleting it
    else if (liked === false && !typeOfLike) {
      toast("Removing your Unlike");
      const {
        data: { deleteLikedVideos: oldLike },
      } = await deleteLikedVideos({
        variables: {
          id: likedId,
        },
      });
      toast("Your unlike was removed successfully!");
      return;
    }
    // like exists, but the user want to unlike ...  so we modify the existing row in the votes table
    else if (liked === true && typeOfLike === false) {
      toast("Changing your Like to Unlike");
      await updateLikedVideos({
        variables: {
          id: likedId,
          liked: typeOfLike,
        },
      });
      toast("Changed to Unlike!");
    }
    // unlike exists but the user wants to change to like , so modify the row in the vote table
    else if (liked === false && typeOfLike === true) {
      toast("Changing your Unlike to Like!");
      await updateLikedVideos({
        variables: {
          id: likedId,
          liked: typeOfLike,
        },
      });
      toast("Changed to Like!");
    } else {
      toast("Inserting your Like!");
      const {
        data: { addLike: newLike },
      } = await insertLikedVideos({
        variables: {
          video_id: Router.query.video_id,
          user_id: user.id,
          liked: typeOfLike,
        },
      });
      toast("Your like was inserted!");
    }
  };
  const subscribe = async () => {
    if (!user) {
      toast("Hey, You need to sign in to be able to subscribe!");
      return;
    }
    // Subscription exists , again hitting subscribe enables deletion
    else if (subscribed) {
      toast("Removing your Subscription!");
      const {
        data: { deleteSubsription: oldSubscription },
      } = await deleteSubscribers({
        variables: {
          id: subscribedId,
        },
      });
      toast("Your subscription was successfully removed!");
      setSubscribed(false);
      return;
    } else {
      toast("Inserting your Subscription!");
      const {
        data: { insertSubscribers: newSubscription },
      } = await insertSubscribers({
        variables: {
          user_id: user.id,
          subscribed_to_id: video?.user_id,
        },
      });
      toast("You are now subscribed to this user!");
      setSubscribed(true);
      setSubscribedId(data?.id);
    }
  };
  const displayLikes = (data: any) => {
    const likes = data?.getLikedVideosUsingLikedVideos_video_id_fkey;
    const displayNumber = likes?.reduce(
      (total: any, vote: any) => (vote.liked ? (total += 1) : total),
      0
    );

    if (likes?.length === 0) return 0;
    return displayNumber;
  };
  const displayUnlikes = (data: any) => {
    const likes = data?.getLikedVideosUsingLikedVideos_video_id_fkey;
    const displayNumber = likes?.reduce(
      (total: any, vote: any) => (vote.liked === false ? (total += 1) : total),
      0
    );

    if (likes?.length === 0) return 0;
    return displayNumber;
  };
  function checker(element:Video):number {
    for (let itr = 0; itr < value.length; itr++) {
      if (element.id === value[itr]?.['id']) {
        return itr;
      }
    }
    return -1;
  }
  const onVideoEnd = () => {
    if(!video)return;
    let currVidPosition = checker(video);
    if (currVidPosition === value?.length-1) {
      const toGoToURL=`/video/${value[0]?.['id']}`;
      Router.push(toGoToURL);
    } else {
      const toGoToURL = `/video/${value[currVidPosition+1]?.['id']}`;
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
    upVote,
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
