import { useQuery } from "@apollo/client";
import { useUser } from "@supabase/auth-helpers-react";
import { LineWobble } from "@uiball/loaders";
import { useRouter } from "next/router";
import React from "react";
import { GET_VIDEO_BY_ID } from "../../graphql/queries";
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
  const video: any = data?.getVideo;
  console.log(video);
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
        <div className="w-[100px] md:w-auto ml-7">
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
                  <div id={styles.like} className="px-2 py-1"><ThumbUpIcon className="pr-2" />{video.likes}</div><p className="text-gray-800" id={styles.diwaar}>|</p>
                  <div id={styles.like} className="px-2 py-1"><ThumbDownOffAltIcon className="pr-2"/>{video.dislikes}</div>
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
        <div></div>
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
