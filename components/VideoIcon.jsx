import React from "react";
import styles from "./styles/VideoIcon.module.css";
import { Roboto } from "@next/font/google";
import Link from "next/link";
import Avatar from "./Avatar";

const roboto = Roboto({ weight: "700" });
const r = Roboto({ weight: "500" });
const rb = Roboto({ weight: "300" });
const rt = Roboto({ weight: "100" });
function VideoIcon({ video, where }) {
  let linkUrl = `/video/${video.id}`;
  if (video.videoStatus == true && where === "video") {
    return (
      <Link href={linkUrl}>
        <div id={styles.main} className="mt-2">
          <img
            src={video.thumbnailUrl}
            width="250px"
            height="150px"
            id={styles.image}
          />
          <div className="ml-2">
            <h6 className={roboto.className}>{video.title}</h6>
            <h1 className={r.className} id={styles.text}>
              {video.profiles.username}
            </h1>
            <h1 className={r.className} id={styles.text}>
              {video.viewCount} Views
            </h1>
          </div>
        </div>
      </Link>
    );
  } else if (video.videoStatus == true && where === "home") {
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
  } else if (video.videoStatus && where == "subs") {
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
                uid={video?.profiles?.user_id}
                url={video?.profiles?.avatar_url}
                size={35}
                where="video"
              />
              <h6 className={roboto.className}>{video.title}</h6>
            </div>
            <h1 className={r.className} id={styles.text}>
              {video?.profiles?.username}
            </h1>
            <h1 className={r.className} id={styles.text}>
              {video.viewCount} views
            </h1>
          </div>
        </div>
      </Link>
    );
  } else if (where === "library") {
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
                  console.log("ek aur dukh");
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
      <div id={styles.searchHome} className="mt-1">
        <Link href={linkUrl}>
          <img
            src={video.thumbnailUrl}
            width="450px"
            height="350px"
            id={styles.searchImage}
          />
        </Link>
        <div className="mt-2 ml-2">
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
                  console.log("ek aur dukh");
                  return 0;
                }}
              />
              <h1 className={rb.className} id={styles.text}>
                {video.profiles.username}
              </h1>
            </div>
          </Link>
          <h1 id={styles.text} className={rt.className}>
            {video.description}
          </h1>
        </div>
      </div>
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
