import React, { useState } from "react";
import styles from "./styles/VideoIcon.module.css";
import { Roboto } from "next/font/google";
import Link from "next/link";
import Avatar from "./Avatar";
import ReactPlayer from "react-player";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useSelector, useDispatch } from "react-redux";
import {
  addToPlaylist,
  deleteFromPlaylist,
} from "../../reduxReducers/playlistSlice";
import PlaylistModal from "./PlaylistModal";

const roboto = Roboto({ weight: "700", subsets: ["latin"] });
const r = Roboto({ weight: "500", subsets: ["latin"] });
const rb = Roboto({ weight: "300", subsets: ["latin"] });
const rt = Roboto({ weight: "100", subsets: ["latin"] });

function VideoIcon({ video, where, allowHover }) {
  let linkUrl = `/video/${video.id}`;
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = (e) => {
    e.preventDefault();
    setIsHovering(true);
  };
  const handleMouseOut = (e) => {
    e.preventDefault();
    setIsHovering(false);
  };
  const playlist = useSelector((state) => state.playlist.value);
  const dispatch = useDispatch();
  const [moreClicked, setMoreClicked] = useState(false);
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
            autoStart="0"
            width="415px"
            height="240px"
            id={styles.video}
            src={video.videoUrl}
          >
            {/* // <source src={video.videoUrl} type={`video/${toUseType}`} /> */}
          </video>
        </div>
      );
    } else {
      return (
        <div id={styles.reactPlayer}>
          <ReactPlayer
            url={video.videoUrl}
            loop={false}
            height="240px"
            width="415px"
            light={true}
          />
        </div>
      );
    }
  };
  const playerAtVideo = () => {
    let pidth = window.screen.availWidth > 390 ? 940 : window.screen.availWidth;
    if (video.videoUrl.includes("supabase")) {
      let toUseUrl = video.videoUrl;
      let lastDotIndx = toUseUrl.lastIndexOf(".") + 1;
      let toUseType = toUseUrl.substr(lastDotIndx);
      return (
        <div>
          <video
            controls
            autoStart="0"
            width="150px"
            height="150px"
            id={styles.videoAtVideo}
            src={video.videoUrl}
          >
            {/* // <source src={video.videoUrl} type={`video/${toUseType}`} /> */}
          </video>
        </div>
      );
    } else {
      return (
        <div id={styles.reactPlayerAtVideo}>
          <ReactPlayer
            url={video.videoUrl}
            playing={false}
            loop={false}
            controls={true}
            width="150px"
            height="150px"
            light={true}
          />
        </div>
      );
    }
  };
  if (video.videoStatus == true && where === "video") {
    return (
      <Link href={linkUrl}>
        <div
          id={styles.main}
          className="mt-2"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {isHovering ? (
            playerAtVideo()
          ) : (
            <img
              src={video.thumbnailUrl}
              height="150px"
              width="150px"
              id={styles.imageAtVideo}
            />
          )}
          <div className="ml-1">
            <h6
              className={roboto.className}
              style={{
                color: "#f9f6ee",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                width: "80%",
              }}
            >
              {video.title}
            </h6>
            <h1
              className={r.className}
              id={styles.text}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "10px", fontWeight: "900" }}>@</span>{" "}
              {video.profiles.username}
            </h1>
            <h1 className={r.className} id={styles.text}>
              {video.viewCount} Views
            </h1>
            <div id={styles.moreAtVideoIcon} className="absolute right-2">
              <MoreVertRoundedIcon
                onClick={(e) => {
                  e.preventDefault();
                  setMoreClicked(!moreClicked);
                  setTimeout(() => {
                    setMoreClicked(false);
                  }, 8000);
                }}
                id={styles.moreButtonForIconVideo}
                className="bg-gray-500 rounded-full shadow-lg"
              />
              <div hidden={!moreClicked} className="relative bottom-2 right-30">
                <h1
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(addToPlaylist(video));
                    setMoreClicked(!moreClicked);
                  }}
                  id={styles.addToPlaylist}
                >
                  Add to Queue
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  } else if (video.videoStatus == true && where === "home") {
    return (
      <div
        id={styles.home}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isHovering ? (
          player()
        ) : (
          <Link href={linkUrl}>
            <img
              src={video.thumbnailUrl}
              width="250px"
              height="150px"
              id={styles.image}
            />
          </Link>
        )}
        <div className="mt-2 ml-0.5" id={styles.row}>
          <Avatar
            uid={video?.user_id}
            url={video?.profiles.avatar_url}
            size={45}
            where="video"
          />
          <div style={{ marginLeft: "5px" }}>
            <Link href={linkUrl}>
              <h6 className={roboto.className} style={{ color: "#f9f6ee" }}>
                {video.title}
              </h6>
            </Link>
            <div className="flex justify-start">
              <div className="flex flex-col mr-16">
                <h1
                  className={r.className}
                  id={styles.text}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "10px", fontWeight: "900" }}>@</span>
                  {video.profiles.username}
                </h1>
                <h1 className={r.className} id={styles.text}>
                  {video.viewCount} views
                </h1>
              </div>
              <div id={styles.moreAtVideoIcon}>
                <MoreVertRoundedIcon
                  onClick={(e) => {
                    e.preventDefault();
                    setMoreClicked(!moreClicked);
                    setTimeout(() => {
                      setMoreClicked(false);
                    }, 8000);
                  }}
                  id={styles.moreButtonAtVideoIcon}
                />
                <div hidden={!moreClicked}>
                  <h1
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(addToPlaylist(video));
                      setMoreClicked(!moreClicked);
                    }}
                    id={styles.addToPlaylist}
                  >
                    Add to queue
                  </h1>
                  <PlaylistModal
                    why="Add video to playlist"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMoreClicked(!moreClicked);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (video.videoStatus && where == "subs") {
    return (
      <Link href={linkUrl}>
        <div
          id={styles.home}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {isHovering ? (
            player()
          ) : (
            <img
              src={video.thumbnailUrl}
              width="250px"
              height="150px"
              id={styles.image}
            />
          )}
          <div className="mt-2">
            <div id={styles.row}>
              <Avatar
                uid={video?.profiles?.user_id}
                url={video?.profiles?.avatar_url}
                size={45}
                where="video"
              />
              <div id={styles.col}>
                <h6 className={roboto.className}>{video.title}</h6>
                <h1 className={r.className} id={styles.text}>
                  {video?.profiles?.username}
                </h1>
                <h1 className={r.className} id={styles.text}>
                  {video.viewCount} views
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  } else if (where === "library") {
    return (
      <Link href={linkUrl}>
        <div
          id={styles.home}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {isHovering ? (
            player()
          ) : (
            <img
              src={video.thumbnailUrl}
              width="250px"
              height="150px"
              id={styles.image}
            />
          )}
          <div className="mt-2">
            <div id={styles.row}>
              <Avatar
                uid={video?.user_id}
                url={video?.profiles.avatar_url}
                size={45}
                where="video"
              />
              <div id={styles.col}>
                <h6 className={roboto.className}>{video.title}</h6>
                <h1 className={r.className} id={styles.text}>
                  {video.profiles.username}
                </h1>
                <h1 className={r.className} id={styles.text}>
                  {video.viewCount} views
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  } else if (video.videoStatus && where === "profile") {
    return (
      <Link href={linkUrl}>
        <div id={styles.home}>
          <img
            src={video.thumbnailUrl}
            width="250px"
            height="150px"
            id={styles.image}
          />
          <div className="mt-2">
            <div id={styles.row}>
              <Avatar
                uid={video?.user_id}
                url={video?.profiles.avatar_url}
                size={35}
                where="video"
                onUpload={(e) => {
                  return 0;
                }}
              />
              <h6 className={roboto.className}>{video.title}</h6>
            </div>
            <h1 className={r.className} id={styles.text}>
              {video.profiles.username}
            </h1>
            <h1 className={r.className} id={styles.text}>
              {video.viewCount} views
            </h1>
          </div>
        </div>
      </Link>
    );
  } else if (video.videoStatus && where === "search") {
    return (
      <div id={styles.searchHome} className="mt-1 w-full">
        <Link href={linkUrl}>
          <img
            src={video.thumbnailUrl}
            width="370px"
            height="230px"
            id={styles.searchImage}
          />
        </Link>
        <div className="mt-2 ml-2 w-2/3">
          <Link href={linkUrl}>
            <h6 className={r.className} id={styles.searchVideoTitle}>
              {video.title}
            </h6>
          </Link>
          <h1 className={rb.className} id={styles.text}>
            {video.viewCount} views
          </h1>
          <Link href={`/profiles/${video.profiles.id}`}>
            <div id={styles.row}>
              <Avatar
                uid={video?.user_id}
                url={video?.profiles.avatar_url}
                size={35}
                where="video"
                onUpload={(e) => {
                  return 0;
                }}
              />
              <h1 className={rb.className} id={styles.text}>
                {video.profiles.username}
              </h1>
            </div>
          </Link>
          <h1 id={styles.text} className={rt.className}>
            {video.description.substring(0, 400)}
          </h1>
        </div>
      </div>
    );
  } else if (video.videoStatus == true && where === "playlist") {
    return (
      <Link href={linkUrl}>
        <div
          id={styles.home_play}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {isHovering && allowHover ? (
            player()
          ) : (
            <img
              src={video.thumbnailUrl}
              width="150px"
              height="150px"
              id={styles.imageAtVideo}
            />
          )}
          <div className="mt-2 ml-0.5" id={styles.row_play}>
            <div style={{ marginLeft: "5px" }}>
              <h6
                className={roboto.className}
                style={{
                  color: "#f9f6ee",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "break-word",
                  width: "80%",
                }}
              >
                {video.title}
              </h6>
              <h1
                className={r.className}
                id={styles.text}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  uid={video?.user_id}
                  url={video?.profiles.avatar_url}
                  size={45}
                  where="video"
                />
                <span style={{ fontSize: "10px", fontWeight: "900" }}>@</span>
                {video.profiles.username}
              </h1>
              <h1 className={r.className} id={styles.text}>
                {video.viewCount} views
              </h1>
              <div id={styles.moreAtVideoIcon}>
                <MoreVertRoundedIcon
                  onClick={(e) => {
                    e.preventDefault();
                    setMoreClicked(!moreClicked);
                    setTimeout(() => {
                      setMoreClicked(false);
                    }, 8000);
                  }}
                  id={styles.moreButtonAtVideoIcon}
                />
                <div hidden={!moreClicked}>
                  <h1
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(addToPlaylist(video));
                      setMoreClicked(!moreClicked);
                    }}
                    id={styles.addToPlaylist}
                  >
                    Add to Queue
                  </h1>
                  <h1
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteFromPlaylist(video));
                      setMoreClicked(!moreClicked);
                    }}
                    id={styles.addToPlaylist}
                  >
                    Remove from Queue
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <div className="hidden">
        <h1>
          I had to created because jsx was saying you can't return empty,
          although it's the same shit... bas pakad dusre taraf se rakha hai
          resolution ke liye
        </h1>
      </div>
    );
  }
}

export default VideoIcon;
