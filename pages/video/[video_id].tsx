import React, { useEffect, useState } from "react";
import styles from "./[video_id].module.css";
import ReactPlayer from "react-player/lazy";
import { Roboto } from "next/font/google";
import Avatar from "../../src/components/Avatar";
import MusicNote from "@mui/icons-material/MusicNote";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ReplySharpIcon from "@mui/icons-material/ReplySharp";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Link from "next/link";
import Comment from "../../src/components/Comment";
import SuggestedVideo from "../../src/components/SuggestedVideos";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CurrentQueue from "../../src/components/CurrentQueue";
import VideoShimmer from "../../src/components/VideoShimmer.jsx";
import useVideoHook from "../../src/hooks/useVideoHook";

const roboto = Roboto({ weight: "700", subsets: ["latin"] });
const r = Roboto({ weight: "500", subsets: ["latin"] });
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
  const suggestProps = {
    where: "Video",
  };
  const {
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
    setOpen
  } = useVideoHook();
  const player = () => {
    if (video.videoUrl.includes("supabase")) {
      let toUseUrl = video.videoUrl;
      let lastDotIndx = toUseUrl.lastIndexOf(".") + 1;
      let toUseType = toUseUrl.substr(lastDotIndx);
      return (
        <div id={styles.video}>
          <video
            controls
            src={video.videoUrl}
            style={{ minWidth: "100%", height: "70vh" }}
            onEnded={(event)=>{onVideoEnd();}}
          >
            {/* // <source src={video.videoUrl} type={`video/${toUseType}`} /> */}
          </video>
        </div>
      );
    } else {
      return (
        <div id={styles.video}>
          <ReactPlayer
            url={video.videoUrl}
            playing={true}
            controls={true}
            loop={false}
            onEnded={() => {
              onVideoEnd();
              console.log("videoend");
            }}
            width="100%"
            height="100%"
          />
        </div>
      );
    }
  };
<<<<<<< HEAD
=======
  function checker(element:any) {
    for (let itr = 0; itr < playlist.length ; itr++) {
      console.log("k", playlist[itr]);
      console.log("p", element);
      if (String(element?.id) === String(playlist[itr]?.id)) {
        console.log('it',itr);
        setPosition(itr);
        return itr;
      }
    }
    return -1;
  }
  const onVideoEnd = () => {
    console.log(playlist);
    console.warn("fn start", video);
    console.warn("itr", position);
    if (playlist.length>0 && position === playlist.length-1 ) {
      console.warn("end");
      Router.push(`/video/${playlist[0].id}`);
    } else if(playlist.length>0) {
      let toGo = position + 1;
      console.warn("taking");
      let pushUrl = `/video/${playlist[toGo].id}`;
      console.log(toGo);
      console.log('y',pushUrl);
      Router.push(pushUrl);
    }
  };
  const playlist = useSelector((state:any) => state.playlist.value);
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
    console.warn("vide->", video);
    
  });
  useEffect(()=>{
    let abc = -1;
    if(playlist){
      console.log("here");
       abc = checker(video)
    }
    console.log('curr abc',abc);
    setPosition(abc);
    console.log('curr vid pos',position);
  },[playlist,video]);
  useEffect(()=>{
    if (video) {
      dispatch(addToPlaylist(video));
    }
  },[video])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updateVideo] = useMutation(UPDATE_VIDEO);
  const suggestProps = {
    where: "Video",
  };

>>>>>>> eb42cc4a041953e03bb2dac83cfbbef5be7febfb
  if (!video) {
    return <VideoShimmer />;
  } else if (video && video?.videoStatus === true) {
    const accountUrl: string = `/profiles/${video.user_id}`;

    return (
      <div className="min-h-screen md:pl-5 pt-5 w-full" id={styles.main}>
        <div className="w-[100vw]">
          <div>{player()}</div>
          <div className="mb-1">
            <h1 id={styles.title} className={roboto.className}>
              {video.title}
            </h1>
          </div>
          <div id={styles.belowVideo}>
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
                    <h1 className={roboto.className} style={{color:"white"}}>
                      {video.profiles.username}
                      <MusicNote fontSize="small" />
                    </h1>
                  </Link>
                  <div className="text-gray-300 font-extralight">
                    {`${video.profiles.subscribersUsingSubscribers_subscribed_to_id_fkey.length} subscribers`}
                  </div>
                </div>
                <div>
                  <button
                    id={subscribed ? styles.subscribed : styles.subscribe}
                    className="py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                    onClick={(e) => {
                      e.preventDefault();
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
                <div className="md:ml-2">
                  <button
                    id={styles.likeUnlikeButton}
                    className="md:mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
                  >
                    <div
                      id={liked ? styles.likeD : styles.like}
                      className="md:px-2 md:py-1"
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
                        <div id={styles.modalFirstLine}>
                          <div id={styles.shareText} className={r.className}>
                            Share
                          </div>
                          <div>
                            <CloseIcon
                              onClick={(e) => {
                                handleClose();
                              }}
                              id={styles.closeIcon}
                            />
                          </div>
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
                        <div
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          <a
                            href={`https://api.whatsapp.com/send?text=https://youtube-clone-singh-kashish.vercel.app${Router.asPath}`}
                            data-action="share/whatsapp/share"
                            target="to_blank"
                          >
                            <WhatsAppIcon />
                            Share via Whatsapp web
                          </a>
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
                <div className="hidden md:inline-block p-2 cursor-pointer shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm hover:bg-gray-900  focus:outline-none active:shadow-none">
                  <MoreHorizIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="" id={styles.description}>
            <div className={roboto.className}>
              <h1 className="text-lg">{video.viewCount} views</h1>
            </div>
            <div>{video.description}</div>
          </div>
          <Comment comments={video.comment} video={video} />
        </div>
        <div>
          <CurrentQueue />
          {/* suggestedVideo */}
          <SuggestedVideo {...suggestProps} />
        </div>
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
