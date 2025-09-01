// import React, { useState } from "react";
// import { Roboto } from "next/font/google";
// import Link from "next/link";
// import Avatar from "../Avatar";
// import ReactPlayer from "react-player";
// import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
// import { useDispatch } from "react-redux";
// import { addToPlaylist, deleteFromPlaylist } from "../../../reduxReducers/playlistSlice";
// import PlaylistModal from "../PlaylistModal";
// import { VideoWithProfile } from "../../types/VideoRedux";
// import styles from "../styles/VideoIcon.module.css";

// const roboto = Roboto({ weight: "700", subsets: ["latin"] });
// const r = Roboto({ weight: "500", subsets: ["latin"] });

// interface VideoIconProps {
//   video: VideoWithProfile;
//   where: string;
//   allowHover: boolean;
// }

// const VideoIcon: React.FC<VideoIconProps> = ({ video, where, allowHover }) => {
//   const [isHovering, setIsHovering] = useState<boolean>(false);
//   const [moreClicked, setMoreClicked] = useState<boolean>(false);
//   const dispatch = useDispatch();

//   const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => setIsHovering(true);
//   const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => setIsHovering(false);

//   const player = () => {
//     if (video.videoUrl?.includes("supabase")) {
//       const type = video.videoUrl.split('.').pop() ?? "";
//       return (
//         <video controls className="rounded-lg w-10 h-60" id={styles.video} src={video.videoUrl} />
//       );
//     }
//     return (
//       <div id={styles.reactPlayer}>
//         <ReactPlayer url={video.videoUrl || ""} loop={false} height="240px" width="415px" light />
//       </div>
//     );
//   };

//   const playerAtVideo = () => {
//     if (video.videoUrl?.includes("supabase")) {
//       const type = video.videoUrl.split('.').pop() ?? "";
//       return (
//         <div>
//           <video controls id={styles.videoAtVideo} width="150px" height="150px">
//             <source src={video.videoUrl} type={`video/${type}`} />
//           </video>
//         </div>
//       );
//     }
//     return (
//       <div id={styles.reactPlayerAtVideo}>
//         <ReactPlayer
//           url={video.videoUrl || ""}
//           playing={false}
//           loop={false}
//           controls
//           width="150px"
//           height="150px"
//           light
//         />
//       </div>
//     );
//   };

//   if (!video.videoStatus) return null;

//   const content = (
//     <div
//       id={styles.main}
//       className="mt-2"
//       onMouseOver={handleMouseOver}
//       onMouseOut={handleMouseOut}
//     >
//       {isHovering ? playerAtVideo() : (
//         <img
//           loading="lazy"
//           src={video.thumbnailUrl || "/default-thumbnail.png"}
//           height="150px"
//           width="150px"
//           id={styles.imageAtVideo}
//         />
//       )}
//       <div className="ml-1">
//         <h6 className={roboto.className} style={{ color: "#f9f6ee", whiteSpace: "pre-wrap", overflowWrap: "break-word", width: "80%" }}>
//           {video.title}
//         </h6>
//         <h1 className={r.className} id={styles.text} style={{ display: "flex", alignItems: "center" }}>
//           <span style={{ fontSize: "10px", fontWeight: "900" }}>@</span> {video?.profiles?.username}
//         </h1>
//         <h1 className={r.className} id={styles.text}>{video.viewCount} Views</h1>
//         <div id={styles.moreAtVideoIcon} className="absolute right-2">
//           <MoreVertRoundedIcon
//             onClick={(e) => {
//               e.preventDefault();
//               setMoreClicked((prev) => !prev);
//               setTimeout(() => setMoreClicked(false), 8000);
//             }}
//             id={styles.moreButtonForIconVideo}
//             className="bg-gray-500 rounded-full shadow-lg"
//           />
//           {moreClicked && (
//             <div className="relative bottom-2 right-30">
//               <h1
//                 onClick={(e) => {
//                   e.preventDefault();
//                   dispatch(addToPlaylist(video));
//                   setMoreClicked(false);
//                 }}
//                 id={styles.addToPlaylist}
//               >
//                 Add to Queue
//               </h1>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return <Link href={`/video/${video.id}`}>{content}</Link>;
// };

// export default VideoIcon;

// src/components/videos/VideoIcon.tsx
// src/components/videos/VideoIcon.tsx
// import React, { useState } from "react";
// import { Roboto } from "next/font/google";
// import Link from "next/link";
// import Avatar from "../Avatar";
// import ReactPlayer from "react-player";
// import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
// import { useDispatch } from "react-redux";
// import { addToPlaylist } from "../../../reduxReducers/playlistSlice";
// import { VideoWithProfile } from "../../types/VideoRedux";
// import styles from "../styles/VideoIcon.module.css";

// const roboto = Roboto({ weight: "700", subsets: ["latin"] });
// const r = Roboto({ weight: "500", subsets: ["latin"] });

// export interface VideoIconProps {
//   video: VideoWithProfile;
//   where: string;
//   allowHover: boolean;
// }

// const VideoIcon: React.FC<VideoIconProps> = ({ video, where, allowHover }) => {
//   const [isHovering, setIsHovering] = useState<boolean>(false);
//   const [moreClicked, setMoreClicked] = useState<boolean>(false);
//   const dispatch = useDispatch();

//   const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => setIsHovering(true);
//   const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => setIsHovering(false);

//   const player = () => {
//     if (video.videoUrl?.includes("supabase")) {
//       const type = video.videoUrl.split('.').pop() ?? "";
//       return (
//         <video controls className="rounded-lg w-10 h-60" id={styles.video} src={video.videoUrl} />
//       );
//     }
//     return (
//       <div id={styles.reactPlayer}>
//         <ReactPlayer url={video.videoUrl || ""} loop={false} height="240px" width="415px" light />
//       </div>
//     );
//   };

//   const playerAtVideo = () => {
//     if (video.videoUrl?.includes("supabase")) {
//       const type = video.videoUrl.split('.').pop() ?? "";
//       return (
//         <div>
//           <video controls id={styles.videoAtVideo} width="150px" height="150px">
//             <source src={video.videoUrl} type={`video/${type}`} />
//           </video>
//         </div>
//       );
//     }
//     return (
//       <div id={styles.reactPlayerAtVideo}>
//         <ReactPlayer
//           url={video.videoUrl || ""}
//           playing={false}
//           loop={false}
//           controls
//           width="150px"
//           height="150px"
//           light
//         />
//       </div>
//     );
//   };

//   if (!video.videoStatus) return null;

//   const content = (
//     <div
//       id={styles.main}
//       className="mt-2"
//       onMouseOver={handleMouseOver}
//       onMouseOut={handleMouseOut}
//     >
//       {/* Creator's Avatar */}
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
//         <Avatar
//           uid={video.profiles?.id || ""}
//           url={video.profiles?.avatar_url || "/default-avatar.png"}
//           size={40}
//           where="video"
//         />
//         <span className={r.className} style={{ marginLeft: "8px", color: "#f9f6ee" }}>
//           {video.profiles?.username || "Unknown"}
//         </span>
//       </div>
//       {isHovering ? playerAtVideo() : (
//         <img
//           loading="lazy"
//           src={video.thumbnailUrl || "/default-thumbnail.png"}
//           height="150px"
//           width="150px"
//           id={styles.imageAtVideo}
//         />
//       )}
//       <div className="ml-1">
//         <h6 className={roboto.className} style={{ color: "#f9f6ee", whiteSpace: "pre-wrap", overflowWrap: "break-word", width: "80%" }}>
//           {video.title}
//         </h6>
//         <h1 className={r.className} id={styles.text} style={{ display: "flex", alignItems: "center" }}>
//           <span style={{ fontSize: "10px", fontWeight: "900" }}>@</span> {video?.profiles?.username}
//         </h1>
//         <h1 className={r.className} id={styles.text}>{video.viewCount} Views</h1>
//         <div id={styles.moreAtVideoIcon} className="absolute right-2">
//           <MoreVertRoundedIcon
//             onClick={(e) => {
//               e.preventDefault();
//               setMoreClicked((prev) => !prev);
//               setTimeout(() => setMoreClicked(false), 8000);
//             }}
//             id={styles.moreButtonForIconVideo}
//             className="bg-gray-500 rounded-full shadow-lg"
//           />
//           {moreClicked && (
//             <div className="relative bottom-2 right-30">
//               <h1
//                 onClick={(e) => {
//                   e.preventDefault();
//                   dispatch(addToPlaylist(video));
//                   setMoreClicked(false);
//                 }}
//                 id={styles.addToPlaylist}
//               >
//                 Add to Queue
//               </h1>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return <Link href={`/video/${video.id}`}>{content}</Link>;
// };

// export default VideoIcon;


// src/components/videos/VideoIcon.tsx
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import React, { useState } from "react";
import { Roboto } from "next/font/google";
import Link from "next/link";
import Avatar from "../Avatar";
import ReactPlayer from "react-player";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useDispatch } from "react-redux";
import { addToPlaylist } from "../../../reduxReducers/playlistSlice";
import { VideoWithProfile } from "../../types/VideoRedux";
import styles from "../styles/VideoIcon.module.css";

const roboto = Roboto({ weight: "700", subsets: ["latin"] });
const r = Roboto({ weight: "500", subsets: ["latin"] });

export interface VideoIconProps {
  video: VideoWithProfile;
  where: string;
  allowHover: boolean;
}

const VideoIcon: React.FC<VideoIconProps> = ({ video, where, allowHover }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [moreClicked, setMoreClicked] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => setIsHovering(true);
  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => setIsHovering(false);

  const player = () => {
    if (video.videoUrl?.includes("supabase")) {
      const type = video.videoUrl.split('.').pop() ?? "";
      return (
        <video controls className="rounded-lg w-10 h-60" id={styles.video} src={video?.videoUrl} />
      );
    }
    return (
      <div id={styles.reactPlayer}>
        <ReactPlayer url={video?.videoUrl || ""} loop={false} height="250px" width="250px" light />
      </div>
    );
  };

  const playerAtVideo = () => {
    if (video.videoUrl?.includes("supabase")) {
      const type = video.videoUrl.split('.').pop() ?? "";
      return (
        <div>
          <video controls id={styles.videoAtVideo} width="250px" height="150px">
            <source src={video?.videoUrl} type={`video/${type}`} />
          </video>
        </div>
      );
    }
    return (
      <div id={styles.reactPlayerAtVideo}>
        <ReactPlayer
          url={video?.videoUrl || ""}
          playing={true}
          loop={false}
          controls={true}
          width="250px"
          height="250px"
          light
        />
      </div>
    );
  };

  if (!video?.videoStatus) return <></>;

  const content = (
    <div
      id={where==="video"?styles.main:styles.home}
      className="mt-2"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isHovering ? playerAtVideo() : (
        video.thumbnailUrl ? (
          <img
            loading="lazy"
            src={video.thumbnailUrl}
            id={styles.imageAtVideo}
            alt="Video thumbnail"
          />
        ) : (
          <div className={styles.brokenThumbnailContainer}>
            <BrokenImageIcon style={{ fontSize: 64, color: "#888" }} />
            <span className={styles.brokenText}>Video unavailable</span>
          </div>
        )
      )}
      <div className="ml-1">
        <Link href={`/video/${video.id}`} style={{ textDecoration: "none" }}>
        <h6 className={roboto.className} style={{ color: "#f9f6ee", whiteSpace: "pre-wrap", overflowWrap: "break-word", width: "80%" }}>
          {video?.title}
        </h6>
        </Link>
        <Link href={`/profiles/${video.profiles?.id || `/video/${video?.id}`}`} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <div style={{ display: "flex", alignItems: "center", margin: "2px 0" }}>
          <Avatar
            uid={video.profiles?.id || ""}
            url={video.profiles?.avatar_url || "/default-avatar.png"}
            size={30}
            where="video"
          />
          <span className={r.className} id={styles.text} style={{ marginLeft: "8px" }}>
            <span style={{ fontSize: "10px", fontWeight: "900" }}>@</span> {video?.profiles?.username}
          </span>
        </div>
        </Link>
        <Link href={`/video/${video.id}`} style={{ textDecoration: "none" }}>
        <h1 className={r.className} id={styles.text}>{video.viewCount} Views</h1>
        </Link>
        <div id={styles.moreAtVideoIcon} className="absolute right-2">
          <MoreVertRoundedIcon
            onClick={(e) => {
              e.preventDefault();
              setMoreClicked((prev) => !prev);
              setTimeout(() => setMoreClicked(false), 8000);
            }}
            id={styles.moreButtonForIconVideo}
            className="bg-gray-500 rounded-full shadow-lg"
          />
          {moreClicked && (
            <div className="relative bottom-2 right-30">
              <h1
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addToPlaylist(video));
                  setMoreClicked(false);
                }}
                id={styles.addToPlaylist}
              >
                Add to Queue
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return <>{content}</>;
};

export default VideoIcon;
