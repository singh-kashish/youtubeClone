import React from "react";
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
import { usePathname } from "next/navigation";
const roboto = Roboto({ weight: "700", subsets: ["latin"] });
const r = Roboto({ weight: "500", subsets: ["latin"] });
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#3d3d3d",
  boxShadow: '24',
  padding: 2,
};
const Video = () => {
  const suggestProps = {
    where: "Video",
  };
  const pathname = usePathname();
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
    useUpVote,
    displayLikes,
    displayUnlikes,
    handleClose,
    handleOpen,
    Router,
    open,
    setOpen
  } = useVideoHook();
  const player = () => {
    if ((video!==null || video!==undefined) && video.videoUrl && video?.videoUrl.includes("supabase")) {
      let toUseUrl = video?.videoUrl;
      let lastDotIndx = toUseUrl?.lastIndexOf(".") + 1;
      let toUseType = toUseUrl?.substr(lastDotIndx);
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
    } else if(video && video?.videoUrl){
      return (
        <div id={styles.video}>
          <ReactPlayer
            url={video?.videoUrl}
            playing={true}
            controls={true}
            loop={false}
            onEnded={() => {
              onVideoEnd();
            }}
            width="100%"
            height="100%"
          />
        </div>
      );
    }
  };
  if (!video) {
    return <VideoShimmer/>;
  } else if (video && video?.videoStatus === true) {
    const accountUrl = `/profiles/${video.user_id}`;

    return (
      <div className="min-h-screen md:pl-3 pt-5 lg:dvw" id={styles.main}>
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
                    uid={video?.user_id}
                    url={video?.profiles?.avatar_url}
                    size={55}
                    where="video"
                    onUpload={(e) => {
                      return 0;
                    }}
                  />
                </Link>
                <div>
                  <Link href={accountUrl}>
                    <h1 className={roboto.className} style={{color:"white"}}>
                      {video?.profiles?.username}
                      <MusicNote fontSize="small" />
                    </h1>
                  </Link>
                  <div className="text-gray-300 font-extralight">
                    {`${video?.profiles?.subscribersUsingSubscribers_subscribed_to_id_fkey?.length} subscribers`}
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
                          useUpVote(true);
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
                          useUpVote(false);
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
                            value={`https://youtube-clone-singh-kashish.vercel.app${pathname}`}
                            id={styles.showInput}
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `https://youtube-clone-singh-kashish.vercel.app${pathname}`
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
                            href={`https://api.whatsapp.com/send?text=https://youtube-clone-singh-kashish.vercel.app${pathname}`}
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
        <div className="">
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
