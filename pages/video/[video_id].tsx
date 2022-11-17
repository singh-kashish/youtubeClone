import { useQuery,useMutation } from "@apollo/client";
import { useUser } from "@supabase/auth-helpers-react";
import { LineWobble } from "@uiball/loaders";
import { useRouter } from "next/router";
import React,{useEffect,useState} from "react";
import { GET_VIDEO_BY_ID,GET_LIKES_ON_VIDEO_USING_VIDEO_ID } from "../../graphql/queries";
import styles from "./[video_id].module.css";
import ReactPlayer from "react-player/lazy";
import { Roboto } from "@next/font/google";
import Avatar from "../../components/Avatar";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicNote from "@mui/icons-material/MusicNote";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReplySharpIcon from '@mui/icons-material/ReplySharp';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from "next/link";
import Comment from '../../components/Comment';
import SuggestedVideo from '../../components/SuggestedVideos';
import {UPDATE_VIDEO,ADD_LIKE_ON_VIDEO,REMOVE_LIKE_ON_VIDEO,MODIFY_LIKE_ON_VIDEO} from '../../graphql/mutations';
import toast from "react-hot-toast";

const roboto = Roboto({ weight: "700" });
const r = Roboto({ weight: "500" });
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
  const { data:likeData, loading:likeLoading, error:likeError } = useQuery(
    GET_LIKES_ON_VIDEO_USING_VIDEO_ID,
    {
      variables: {
        id: Router.query.video_id,
      },
    }
  );
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
  const upVote = async (typeOfLike) => {
    if (!user) {
      toast("Hey, You need to sign in to be able to vote!");
      return;
    }
    // UpVote exists , again hitting upvote removes your vote, thereby deleting it
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
    // DownVote exists, again hitting downvote removes your vote,thereby deleting it
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
    // upvote exists, but the user want to downvote ...  so we modify the existing row in the votes table
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
    // vote exists as a downvote but the user wants to change to upvote , so modify the row in the vote table
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

  const displayLikes = (data) => {
    const likes = data?.getLikedVideosUsingLikedVideos_video_id_fkey;
    const displayNumber = likes?.reduce(
      (total, vote) => (vote.liked ? (total += 1) : total),
      0
    );

    if (likes?.length === 0) return 0;
    return displayNumber;
  };
  const displayUnlikes = (data) => {
    const likes = data?.getLikedVideosUsingLikedVideos_video_id_fkey;
    const displayNumber = likes?.reduce(
      (total, vote) => (vote.liked === false ? (total += 1) : total),
      0
    );

    if (likes?.length === 0) return 0;
    return displayNumber;
  };
  useEffect(() => {
    console.log('likeData->',likeData);
    const likes = likeData?.getLikedVideosUsingLikedVideos_video_id_fkey;
    const liked = likes?.find((vote) => vote.user_id === user?.id)?.liked;
    const likeId = likes?.find((vote) => vote.user_id === user?.id)?.id;
    setLiked(liked);
    setLikedId(likeId);
  }, [likeData]);
  const video:any = data?.getVideo;
  const [updateVideo] = useMutation(UPDATE_VIDEO);
  if (!video) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xxl m-5">
        <LineWobble size={250} color="red" />
      </div>
    );
  } else if (video && video?.videoStatus === true) {
    let buttonText = "Subscribe";
    for (let x=0;x<video?.profiles?
      .subscribersUsingSubscribers_subscribed_to_id_fkey.length;x++) {
      if (
        video?.profiles?
      .subscribersUsingSubscribers_subscribed_to_id_fkey[x].user_id === user?.id &&
        video?.profiles?
      .subscribersUsingSubscribers_subscribed_to_id_fkey[x].subscribed_to_id === video.user_id
      ) {
        buttonText = "Subscribed";
        break;
      }
    }
  const accountUrl : string = `/account/${video.user_id}`;
    return (
      <div className="px-5 z-50 pt-7" id={styles.main}>
        <div className="w-[100px] md:w-[940px] ml-7">
          <ReactPlayer
            url={video.videoUrl}
            playing={true}
            controls={true}
            loop={true}
            width="940px"
            height="530px"
          />
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
                  id={styles.subscribe}
                  className="py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                >
                  {buttonText}
                </button>
                <NotificationsOutlinedIcon fontSize="medium" sx={{ color: 'lightgrey' }} className="hidden ml-2 md:inline-block" />
              </div>
              </div>
              <div className="hidden ml-2 md:inline-block">
                <button
                  id={styles.likeUnlikeButton}
                  className="mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                >
                  <div id={styles.like} className="px-2 py-1"><ThumbUpIcon className="pr-2"onClick={(e) => {
                e.preventDefault();
                upVote(true);
              }} />{displayLikes(likeData)}</div><p className="text-gray-800" id={styles.diwaar}>|</p>
                  <div id={styles.like} className="px-2 py-1"><ThumbDownOffAltIcon className="pr-2" onClick={(e) => {
                e.preventDefault();
                upVote(false);
              }}/>{displayUnlikes(likeData)}</div>
                </button>
              </div>
               <div className="hidden ml-2 md:inline-block">
                <button
                  id={styles.share}
                  className="py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                >
                    <ReplySharpIcon />
                  Share
                </button>
                </div>
                <div>
                <button
                  id={styles.download}
                  className="hidden ml-2 md:inline-block py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                >
                    < DownloadIcon />
                  Download
                </button>
                </div>
                <div className="hidden ml-2 md:inline-block p-4 mr-2 cursor-pointer shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm hover:bg-gray-900  focus:outline-none active:shadow-none"
               >
                    <MoreHorizIcon />
                </div>
            </div>
          </div>
          <div className="w-full" id={styles.description}>
            <div classname={roboto.className}><h1 className="text-lg">{video.viewCount} views</h1></div>
            <div>{video.description}</div></div>
            <Comment comments={video.comment} video={video} />
        </div>
        {/* suggestedVideo */}
        <SuggestedVideo where="Video"/>
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
