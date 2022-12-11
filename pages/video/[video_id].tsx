import { useQuery, useMutation } from "@apollo/client";
import { useUser } from "@supabase/auth-helpers-react";
import { LineWobble } from "@uiball/loaders";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  GET_VIDEO_BY_ID,
  GET_LIKES_ON_VIDEO_USING_VIDEO_ID,
} from "../../graphql/queries";
import styles from "./[video_id].module.css";
import ReactPlayer from "react-player/lazy";
import { Roboto } from "@next/font/google";
import Avatar from "../../components/Avatar";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicNote from "@mui/icons-material/MusicNote";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ReplySharpIcon from "@mui/icons-material/ReplySharp";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Link from "next/link";
import Comment from "../../components/Comment";
import SuggestedVideo from "../../components/SuggestedVideos";
import {
  UPDATE_VIDEO,
  ADD_LIKE_ON_VIDEO,
  REMOVE_LIKE_ON_VIDEO,
  MODIFY_LIKE_ON_VIDEO,
  INSERT_SUBSCRIBER,
  DELETE_SUBSCRIBER,
} from "../../graphql/mutations";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

const roboto = Roboto({ weight: "700" });
const r = Roboto({ weight: "500" });
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#3d3d3d",
  boxShadow: 24,
  p: 2,
};
function Video() {
  const Router = useRouter();
  const user = useUser();
  const { loading, error, data } = useQuery(GET_VIDEO_BY_ID, {
    variables: {
      id: Router.query.video_id,
    },
  });
  const [liked, setLiked] = useState<boolean>();
  const [likedId, setLikedId] = useState<any>();
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [subscribedId, setSubscribedId] = useState<any>();
  const [viewsChanged, setViewsChanged] = useState<boolean>(false);
  const {
    data: likeData,
    loading: likeLoading,
    error: likeError,
  } = useQuery(GET_LIKES_ON_VIDEO_USING_VIDEO_ID, {
    variables: {
      id: Router.query.video_id,
    },
  });
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
          subscribed_to_id: video.user_id,
        },
      });
      toast("You are now subscribed to this user!");
      setSubscribed(true);
      setSubscribedId(data.id);
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
  const video: any = data?.getVideo;
  const prevViewCount: number = video?.viewCount;
  const toBeInsertedViewCount: number = prevViewCount + 1;
  const onOpen = async () => {
    if (prevViewCount != undefined && viewsChanged === false) {
      const notification = toast.loading(
        "Updating view Count for this video..."
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
  const player = () => {
    let pidth = window.screen.availWidth > 390 ? 940 : window.screen.availWidth;
    if (video.videoUrl.includes("supabase")) {
      let toUseUrl = video.videoUrl;
      let lastDotIndx = toUseUrl.lastIndexOf(".") + 1;
      let toUseType = toUseUrl.substr(lastDotIndx);
      return (
        <div>
          <video
            controls
            width={pidth}
            height="530"
            id={styles.video}
            src={video.videoUrl}
          >
            {/* // <source src={video.videoUrl} type={`video/${toUseType}`} /> */}
          </video>
        </div>
      );
    } else {
      return (
        <ReactPlayer
          url={video.videoUrl}
          playing={true}
          controls={true}
          loop={true}
          width={pidth}
          height="530px"
        />
      );
    }
  };
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
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updateVideo] = useMutation(UPDATE_VIDEO);
  if (!video) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xxl m-5">
        <LineWobble size={250} color="red" />
      </div>
    );
  } else if (video && video?.videoStatus === true) {
    const accountUrl: string = `/profiles/${video.user_id}`;
    return (
      <div className="md:px-5 z-50 pt-7" id={styles.main}>
        <div className="md:ml-7">
          {/* <ReactPlayer
             url={video.videoUrl}
            playing={true}
            controls={true}
            loop={true}
            width="940px"
            height="530px"
          /> */}
          <div>
            {/* <video controls width="940" height="530">
              <source
                src="https://jsoabxvsywdylbhbxecn.supabase.co/storage/v1/object/public/video/d7fe6234-4957-470a-8cc9-27abf18ad5f7.MP4"
                type="video/mp4"
              />
            </video> */}
            {player()}
          </div>
          <div id={styles.belowVideo}>
            <div>
              <h1 id={styles.title} className={roboto.className}>
                {video.title}
              </h1>
            </div>
            <div id={styles.row_icons}>
              <div id={styles.left}>
                <Link href={accountUrl}>
                  <Avatar
                    uid={video.user_id}
                    url={video.profiles.avatar_url}
                    size={55}
                    where="video"
                    onUpload={(e: any) => {
                      console.log("ek aur dukh");
                      return 0;
                    }}
                  />
                </Link>
                <div>
                  <Link href={accountUrl}>
                    <h1 className={roboto.className}>
                      {video.profiles.username}
                      <MusicNote fontSize="small" />
                    </h1>
                  </Link>
                  <p className="text-gray-500 font-extralight">
                    {`${video.profiles.subscribersUsingSubscribers_subscribed_to_id_fkey.length}
                   subscribers`}
                  </p>
                </div>
                <div>
                  <button
                    id={subscribed ? styles.subscribed : styles.subscribe}
                    className="py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                    onClick={(e) => {
                      e.preventDefault;
                      subscribe();
                    }}
                  >
                    {subscribed === true ? "Subscribed" : "Subscribe"}
                  </button>
                  <NotificationsOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "lightgrey" }}
                    className="hidden ml-2 md:inline-block"
                  />
                </div>
              </div>
              <div className="ml-2">
                <button
                  id={styles.likeUnlikeButton}
                  className="mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                >
                  <div
                    id={liked ? styles.likeD : styles.like}
                    className="px-2 py-1"
                  >
                    <ThumbUpIcon
                      className="pr-2"
                      onClick={(e) => {
                        e.preventDefault();
                        upVote(true);
                      }}
                    />
                    {displayLikes(likeData)}
                  </div>
                  <p className="text-gray-800" id={styles.diwaar}>
                    |
                  </p>
                  <div
                    id={liked === false ? styles.likeD : styles.like}
                    className="px-2 py-1"
                  >
                    <ThumbDownOffAltIcon
                      className="pr-2"
                      onClick={(e) => {
                        e.preventDefault();
                        upVote(false);
                      }}
                    />
                    {displayUnlikes(likeData)}
                  </div>
                </button>
              </div>
              <div className="hidden ml-2 md:inline-block">
                <button
                  id={styles.share}
                  onClick={handleOpen}
                  className="py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                >
                  <ReplySharpIcon />
                  Share
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: 600 }}>
                    <div id={styles.modal}>
                      <div>
                        <CloseIcon onClick={(e)=>{handleClose();}} id={styles.closeIcon}/>
                      </div>
                      <div>
                        <input
                          value={`https://youtube-clone-singh-kashish.vercel.app${Router.asPath}`}
                          id={styles.showInput}
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `https://youtube-clone-singh-kashish.vercel.app${Router.asPath}`
                            );
                            toast.success("Link copied to clipboard");
                            handleClose();
                          }}
                          className="py-2 px-4 shadow-md no-underline rounded-full bg-blue text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
                          id={styles.copyButton}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
              <div>
                <button
                  id={styles.download}
                  className="hidden ml-2 md:inline-block py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                >
                  <DownloadIcon />
                  Download
                </button>
              </div>
              <div className="hidden ml-2 md:inline-block p-4 mr-2 cursor-pointer shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm hover:bg-gray-900  focus:outline-none active:shadow-none">
                <MoreHorizIcon />
              </div>
            </div>
          </div>
          <div className="w-full" id={styles.description}>
            <div className={roboto.className}>
              <h1 className="text-lg">{video.viewCount} views</h1>
            </div>
            <div>{video.description}</div>
          </div>
          <Comment comments={video.comment} video={video} />
        </div>
        {/* suggestedVideo */}
        <SuggestedVideo where="Video" />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Video Not Found</h1>
        <h6 className="text-red-600">ERROR!</h6>
      </div>
    );
  }
}

export default Video;
