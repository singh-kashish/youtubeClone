// // import React, { useState, useCallback } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import Link from "next/link";
// // import Avatar from "../Avatar";
// // import ReactPlayer from "react-player";
// // import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
// // import { addToPlaylist, deleteFromPlaylist } from "../../../reduxReducers/playlistSlice";
// // import PlaylistModal from "../PlaylistModal";
// // import { Roboto } from "next/font/google";
// // import styles from "../styles/VideoIcon.module.css";

// // const roboto = Roboto({ weight: "700", subsets: ["latin"] });
// // const r = Roboto({ weight: "500", subsets: ["latin"] });

// // // Type definitions
// // interface VideoIconProps {
// //   video: Video;
// //   where: "home" | "video" | "subs" | "library" | "profile" | "search" | "playlist";
// //   allowHover?: boolean;
// // }

// // interface Video {
// //   id: string;
// //   videoUrl: string;
// //   thumbnailUrl: string;
// //   title: string;
// //   profiles: {
// //     username: string;
// //     avatar_url: string;
// //     user_id: string;
// //   };
// //   viewCount: number;
// //   videoStatus: boolean;
// // }

// // // Custom Hook for hover state
// // function useHover() {
// //   const [isHovering, setIsHovering] = useState(false);

// //   const handleMouseOver = useCallback(() => setIsHovering(true), []);
// //   const handleMouseOut = useCallback(() => setIsHovering(false), []);

// //   return {
// //     isHovering,
// //     handleMouseOver,
// //     handleMouseOut
// //   };
// // }

// // // Custom Hook for Playlist actions
// // function usePlaylist(video: Video) {
// //   const dispatch = useDispatch();
// //   const [moreClicked, setMoreClicked] = useState(false);

// //   const handleAddToPlaylist = () => {
// //     dispatch(addToPlaylist(video));
// //     setMoreClicked(false);
// //   };

// //   const handleRemoveFromPlaylist = () => {
// //     dispatch(deleteFromPlaylist(video));
// //     setMoreClicked(false);
// //   };

// //   const toggleMoreMenu = (e: React.MouseEvent) => {
// //     e.preventDefault();
// //     setMoreClicked((prev) => !prev);
// //     setTimeout(() => setMoreClicked(false), 8000);
// //   };

// //   return {
// //     moreClicked,
// //     handleAddToPlaylist,
// //     handleRemoveFromPlaylist,
// //     toggleMoreMenu
// //   };
// // }

// // // Video Player Component
// // const VideoPlayer: React.FC<{ videoUrl: string; width: number; height: number }> = ({ videoUrl, width, height }) => {
// //   if (videoUrl.includes("supabase")) {
// //     return <video controls width={width} height={height} src={videoUrl}></video>;
// //   } else {
// //     return <ReactPlayer url={videoUrl} width={width} height={height} playing={false} controls />;
// //   }
// // };

// // // Video Icon Component
// // const VideoIcon: React.FC<VideoIconProps> = ({ video, where, allowHover = true }) => {
// //   const { isHovering, handleMouseOver, handleMouseOut } = useHover();
// //   const { moreClicked, handleAddToPlaylist, handleRemoveFromPlaylist, toggleMoreMenu } = usePlaylist(video);

// //   const linkUrl = `/video/${video.id}`;

// //   // Render video player for different screen sizes
// //   const renderPlayer = (width: number, height: number) => (
// //     <VideoPlayer videoUrl={video.videoUrl} width={width} height={height} />
// //   );

// //   const renderVideoThumbnail = () => (
// //     <img
// //       loading="lazy"
// //       src={video.thumbnailUrl}
// //       width="250px"
// //       height="150px"
// //       className={styles.image}
// //     />
// //   );

// //   const renderHoverContent = () => {
// //     if (isHovering) {
// //       return renderPlayer(415, 240); // Larger player on hover
// //     } else {
// //       return renderVideoThumbnail();
// //     }
// //   };

// //   const renderTextContent = () => (
// //     <div>
// //       <h6 className={roboto.className} style={{ color: "#f9f6ee" }}>{video.title}</h6>
// //       <h1 className={r.className}>{video.profiles.username}</h1>
// //       <h1 className={r.className}>{video.viewCount} Views</h1>
// //     </div>
// //   );

// //   const renderMoreMenu = () => (
// //     moreClicked && (
// //       <div className="relative bottom-2 right-30">
// //         <h1 onClick={handleAddToPlaylist} className={styles.addToPlaylist}>Add to Queue</h1>
// //         <h1 onClick={handleRemoveFromPlaylist} className={styles.addToPlaylist}>Remove from Queue</h1>
// //       </div>
// //     )
// //   );

// //   const commonProps = {
// //     onMouseOver: handleMouseOver,
// //     onMouseOut: handleMouseOut
// //   };

// //   return (
// //     <div className={styles.home} {...commonProps}>
// //       {renderHoverContent()}
// //       <div className="mt-2 ml-0.5">
// //         {renderTextContent()}
// //         <div className={styles.moreAtVideoIcon}>
// //           <MoreVertRoundedIcon onClick={toggleMoreMenu} className="bg-gray-500 rounded-full shadow-lg" />
// //           {renderMoreMenu()}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VideoIcon;


// // 2. Extracting Reusable Components
// // Let's refactor your VideoIcon component into these smaller components.

// // 1. VideoPlayer Component
// // tsx
// // Copy code
// // import React from "react";
// // import ReactPlayer from "react-player";

// // type VideoPlayerProps = {
// //   videoUrl: string;
// //   isHovering?: boolean;
// //   width?: string;
// //   height?: string;
// // };

// // const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, isHovering, width = "415px", height = "240px" }) => {
// //   if (videoUrl.includes("supabase")) {
// //     return (
// //       <video controls width={width} height={height} autoPlay={isHovering ? true : false}>
// //         <source src={videoUrl} />
// //       </video>
// //     );
// //   } else {
// //     return (
// //       <ReactPlayer url={videoUrl} playing={isHovering} loop={false} controls width={width} height={height} />
// //     );
// //   }
// // };

// // export default VideoPlayer;
// // 2. HoverImage Component
// // This component is used to show either the thumbnail or the VideoPlayer based on whether the user is hovering or not.

// // tsx
// // Copy code
// // import React from "react";
// // import { useState } from "react";
// // import VideoPlayer from "./VideoPlayer"; // Import the new VideoPlayer component

// // type HoverImageProps = {
// //   videoUrl: string;
// //   thumbnailUrl: string;
// //   width: string;
// //   height: string;
// // };

// // const HoverImage: React.FC<HoverImageProps> = ({ videoUrl, thumbnailUrl, width, height }) => {
// //   const [isHovering, setIsHovering] = useState(false);

// //   return (
// //     <div
// //       onMouseOver={() => setIsHovering(true)}
// //       onMouseOut={() => setIsHovering(false)}
// //     >
// //       {isHovering ? (
// //         <VideoPlayer videoUrl={videoUrl} isHovering={isHovering} width={width} height={height} />
// //       ) : (
// //         <img loading="lazy" src={thumbnailUrl} width={width} height={height} />
// //       )}
// //     </div>
// //   );
// // };

// // export default HoverImage;
// // 3. VideoMeta Component
// // This component is used to display the video metadata (title, username, view count).

// // tsx
// // Copy code
// // import React from "react";
// // import { Roboto } from "next/font/google";

// // const roboto = Roboto({ weight: "700", subsets: ["latin"] });

// // type VideoMetaProps = {
// //   title: string;
// //   username: string;
// //   viewCount: number;
// // };

// // const VideoMeta: React.FC<VideoMetaProps> = ({ title, username, viewCount }) => (
// //   <div>
// //     <h6 className={roboto.className} style={{ color: "#f9f6ee", whiteSpace: "pre-wrap", overflowWrap: "break-word", width: "80%" }}>
// //       {title}
// //     </h6>
// //     <h1 className={roboto.className} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
// //       <span style={{ fontSize: "10px", fontWeight: "900" }}>@</span> {username}
// //     </h1>
// //     <h1 className={roboto.className}>{viewCount} views</h1>
// //   </div>
// // );

// // export default VideoMeta;
// // 4. MoreButton Component
// // This component handles the "More" button functionality for adding/removing videos from the playlist.

// // tsx
// // Copy code
// // import React, { useState } from "react";
// // import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
// // import { useDispatch } from "react-redux";
// // import { addToPlaylist, deleteFromPlaylist } from "../../../reduxReducers/playlistSlice";
// // import PlaylistModal from "../PlaylistModal";

// // type MoreButtonProps = {
// //   video: any;
// // };

// // const MoreButton: React.FC<MoreButtonProps> = ({ video }) => {
// //   const [moreClicked, setMoreClicked] = useState(false);
// //   const dispatch = useDispatch();

// //   const handleMoreClick = (e: React.MouseEvent) => {
// //     e.preventDefault();
// //     setMoreClicked(!moreClicked);
// //     setTimeout(() => {
// //       setMoreClicked(false);
// //     }, 8000);
// //   };

// //   return (
// //     <div className="relative">
// //       <MoreVertRoundedIcon onClick={handleMoreClick} />
// //       <div hidden={!moreClicked} className="absolute bottom-2 right-30">
// //         <h1 onClick={(e) => { e.preventDefault(); dispatch(addToPlaylist(video)); setMoreClicked(false); }}>
// //           Add to Queue
// //         </h1>
// //         <h1 onClick={(e) => { e.preventDefault(); dispatch(deleteFromPlaylist(video)); setMoreClicked(false); }}>
// //           Remove from Queue
// //         </h1>
// //         <PlaylistModal
// //           why="Add video to playlist"
// //           onClick={(e) => { e.preventDefault(); setMoreClicked(false); }}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default MoreButton;
// // 5. VideoIcon Component
// // Now the VideoIcon component will become more focused and modular by combining these reusable components.

// // tsx
// // Copy code
// // import React from "react";
// // import Link from "next/link";
// // import HoverImage from "./HoverImage"; // Reuse HoverImage
// // import VideoMeta from "./VideoMeta"; // Reuse VideoMeta
// // import MoreButton from "./MoreButton"; // Reuse MoreButton

// // type VideoIconProps = {
// //   video: any;
// //   where: string;
// //   allowHover: boolean;
// // };

// // const VideoIcon: React.FC<VideoIconProps> = ({ video, where, allowHover }) => {
// //   const linkUrl = `/video/${video.id}`;

// //   if (!video.videoStatus) return null; // Quick exit if video is unavailable

// //   return (
// //     <Link href={linkUrl}>
// //       <div className="mt-2">
// //         <HoverImage
// //           videoUrl={video.videoUrl}
// //           thumbnailUrl={video.thumbnailUrl}
// //           width="250px"
// //           height="150px"
// //         />
// //         <div className="mt-2 ml-0.5">
// //           <VideoMeta title={video.title} username={video.profiles.username} viewCount={video.viewCount} />
// //           {where !== "profile" && <MoreButton video={video} />}
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // };

// // export default VideoIcon;
// // 6. Benefits of the Refactor
// // Separation of Concerns: Each component has a single responsibility (e.g., VideoPlayer for rendering videos, MoreButton for handling actions).
// // Readability: Code is easier to read and reason about. You can clearly see what each component does.
// // Reusability: Components like HoverImage, VideoMeta, and MoreButton can be reused in other parts of the app.
// // Scalability: If you need to add new features (e.g., different video player types), you can modify just the VideoPlayer component without affecting other components.
// // Performance: Since ReactPlayer might not always be needed (only on hover), it’s lazy-loaded and only used when necessary, reducing the overall bundle size when the player isn’t required.
// // Optional - Making the VideoPlayer Component Simpler
// // If you want to simplify the video player and reduce external dependencies (like ReactPlayer), you can also create a more generic custom player component that directly uses HTML5 <video> tags for all cases, making your bundle smaller by eliminating the need for the react-player package.

// // Let me know if you'd like to move forward with further improvements, such as adding additional optimizations or adjusting any of these components!



// // You said:
// // Let's complete this with optional and all in ts
// // ChatGPT said:
// // ChatGPT
// // Absolutely! Let's complete this structure by ensuring everything is typed correctly in TypeScript. We'll also include the option to simplify the VideoPlayer component and make everything more cohesive by leveraging TypeScript features. Below is the final implementation in TypeScript, including optional props where necessary.

// // 1. VideoPlayer Component
// // This component will conditionally render a <video> element or use the ReactPlayer component based on the video URL. The isHovering prop is optional and is used to control whether the video is autoplaying or not.

// // tsx
// // Copy code
// // import React from "react";
// // import ReactPlayer from "react-player";

// // interface VideoPlayerProps {
// //   videoUrl: string;
// //   isHovering?: boolean;
// //   width?: string;
// //   height?: string;
// // }

// // const VideoPlayer: React.FC<VideoPlayerProps> = ({
// //   videoUrl,
// //   isHovering = false,
// //   width = "415px",
// //   height = "240px",
// // }) => {
// //   // Optionally check if the URL includes a specific string (e.g., for Supabase URLs)
// //   if (videoUrl.includes("supabase")) {
// //     return (
// //       <video controls width={width} height={height} autoPlay={isHovering}>
// //         <source src={videoUrl} />
// //       </video>
// //     );
// //   } else {
// //     return (
// //       <ReactPlayer
// //         url={videoUrl}
// //         playing={isHovering}
// //         loop={false}
// //         controls
// //         width={width}
// //         height={height}
// //       />
// //     );
// //   }
// // };

// // export default VideoPlayer;
// // 2. HoverImage Component
// // This component switches between displaying an image and a video player when hovering. It uses useState to track the hover state.

// // tsx
// // Copy code
// // import React, { useState } from "react";
// // import VideoPlayer from "./VideoPlayer";

// // interface HoverImageProps {
// //   videoUrl: string;
// //   thumbnailUrl: string;
// //   width: string;
// //   height: string;
// // }

// // const HoverImage: React.FC<HoverImageProps> = ({
// //   videoUrl,
// //   thumbnailUrl,
// //   width,
// //   height,
// // }) => {
// //   const [isHovering, setIsHovering] = useState(false);

// //   return (
// //     <div
// //       onMouseOver={() => setIsHovering(true)}
// //       onMouseOut={() => setIsHovering(false)}
// //     >
// //       {isHovering ? (
// //         <VideoPlayer videoUrl={videoUrl} isHovering={isHovering} width={width} height={height} />
// //       ) : (
// //         <img loading="lazy" src={thumbnailUrl} width={width} height={height} alt="thumbnail" />
// //       )}
// //     </div>
// //   );
// // };

// // export default HoverImage;
// // 3. VideoMeta Component
// // This component is responsible for displaying the metadata like title, username, and view count.

// // tsx
// // Copy code
// // import React from "react";

// // interface VideoMetaProps {
// //   title: string;
// //   username: string;
// //   viewCount: number;
// // }

// // const VideoMeta: React.FC<VideoMetaProps> = ({ title, username, viewCount }) => (
// //   <div>
// //     <h6 style={{ color: "#f9f6ee", whiteSpace: "pre-wrap", overflowWrap: "break-word", width: "80%" }}>
// //       {title}
// //     </h6>
// //     <h1 style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
// //       <span style={{ fontSize: "10px", fontWeight: "900" }}>@</span> {username}
// //     </h1>
// //     <h1>{viewCount} views</h1>
// //   </div>
// // );

// // export default VideoMeta;
// // 4. MoreButton Component
// // This component allows adding/removing a video from a playlist or queue. It uses useDispatch from redux to dispatch actions like addToPlaylist or deleteFromPlaylist.

// // tsx
// // Copy code
// // import React, { useState } from "react";
// // import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
// // import { useDispatch } from "react-redux";
// // import { addToPlaylist, deleteFromPlaylist } from "../../../reduxReducers/playlistSlice";
// // import PlaylistModal from "../PlaylistModal";

// // interface MoreButtonProps {
// //   video: any;
// // }

// // const MoreButton: React.FC<MoreButtonProps> = ({ video }) => {
// //   const [moreClicked, setMoreClicked] = useState(false);
// //   const dispatch = useDispatch();

// //   const handleMoreClick = (e: React.MouseEvent) => {
// //     e.preventDefault();
// //     setMoreClicked(!moreClicked);
// //     setTimeout(() => {
// //       setMoreClicked(false);
// //     }, 8000);
// //   };

// //   return (
// //     <div className="relative">
// //       <MoreVertRoundedIcon onClick={handleMoreClick} />
// //       <div hidden={!moreClicked} className="absolute bottom-2 right-30">
// //         <h1
// //           onClick={(e) => {
// //             e.preventDefault();
// //             dispatch(addToPlaylist(video));
// //             setMoreClicked(false);
// //           }}
// //         >
// //           Add to Queue
// //         </h1>
// //         <h1
// //           onClick={(e) => {
// //             e.preventDefault();
// //             dispatch(deleteFromPlaylist(video));
// //             setMoreClicked(false);
// //           }}
// //         >
// //           Remove from Queue
// //         </h1>
// //         <PlaylistModal
// //           why="Add video to playlist"
// //           onClick={(e) => {
// //             e.preventDefault();
// //             setMoreClicked(false);
// //           }}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default MoreButton;
// // 5. VideoIcon Component
// // This component ties everything together, using HoverImage, VideoMeta, and MoreButton components to render a complete video item. It receives a video object and a where prop to determine whether it should show additional functionality like the "More" button.

// // tsx
// // Copy code
// // import React from "react";
// // import Link from "next/link";
// // import HoverImage from "./HoverImage"; // Reuse HoverImage
// // import VideoMeta from "./VideoMeta"; // Reuse VideoMeta
// // import MoreButton from "./MoreButton"; // Reuse MoreButton

// // interface VideoIconProps {
// //   video: any;
// //   where: string;
// //   allowHover: boolean;
// // }

// // const VideoIcon: React.FC<VideoIconProps> = ({ video, where, allowHover }) => {
// //   const linkUrl = `/video/${video.id}`;

// //   // If video is unavailable, return null
// //   if (!video.videoStatus) return null;

// //   return (
// //     <Link href={linkUrl}>
// //       <div className="mt-2">
// //         <HoverImage
// //           videoUrl={video.videoUrl}
// //           thumbnailUrl={video.thumbnailUrl}
// //           width="250px"
// //           height="150px"
// //         />
// //         <div className="mt-2 ml-0.5">
// //           <VideoMeta title={video.title} username={video.profiles.username} viewCount={video.viewCount} />
// //           {where !== "profile" && <MoreButton video={video} />}
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // };

// // export default VideoIcon;
// // 6. Optional Improvements
// // Lazy Loading: You can improve performance further by using React.lazy or React Suspense to load the VideoPlayer only when it's needed.

// // VideoPlayer Simplification: If you want to simplify the VideoPlayer further (for example, to remove the dependency on ReactPlayer), you can replace it with a pure HTML <video> tag for all cases:

// // tsx
// // Copy code
// // // Simplified VideoPlayer without ReactPlayer (if you want to remove the dependency)
// // const VideoPlayer: React.FC<VideoPlayerProps> = ({
// //   videoUrl,
// //   isHovering = false,
// //   width = "415px",
// //   height = "240px",
// // }) => {
// //   return (
// //     <video controls autoPlay={isHovering} width={width} height={height}>
// //       <source src={videoUrl} />
// //     </video>
// //   );
// // };
// // Summary of the Final Structure:
// // VideoPlayer: Custom video player that adapts based on the video URL.
// // HoverImage: Switches between a video player and a thumbnail image when hovering.
// // VideoMeta: Displays metadata such as the title, username, and view count.
// // MoreButton: Provides actions to add/remove videos from a playlist.
// // VideoIcon: Combines everything into one cohesive video card with optional "More" actions.
// // TypeScript Benefits:
// // Type Safety: By using TypeScript's static typing, you avoid errors like passing incorrect props, and the IDE provides helpful auto-completions.
// // Optional Props: For flexibility, props like isHovering and width/height are made optional with default values.
// // Reusable Components: Each component is now focused on a single task, making it easier to maintain and extend.


// =======================
// =======================
// Video Page
// ---------0------------
// To replicate a similar `VideoPlayer` component structure that you use for the `Video` component in the example you provided, we need to keep things modular and follow a pattern that allows us to easily handle both `video` and `ReactPlayer` for different video URLs. Here's a detailed breakdown of how to refactor the current video player logic into a reusable `VideoPlayer` component:

// ### **1. Create a VideoPlayer Component**

// This component will handle both video types (regular `<video>` tag and `ReactPlayer`), making it reusable across different parts of your app.

// ```tsx
// import React from "react";
// import ReactPlayer from "react-player/lazy";

// interface VideoPlayerProps {
//   videoUrl: string;
//   onEnded?: () => void;
//   width?: string;
//   height?: string;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({
//   videoUrl,
//   onEnded,
//   width = "100%",
//   height = "70vh",
// }) => {
//   // If the URL is from Supabase, use a simple <video> tag
//   if (videoUrl.includes("supabase")) {
//     return (
//       <div>
//         <video
//           controls
//           src={videoUrl}
//           style={{ minWidth: width, height: height }}
//           onEnded={onEnded}
//         />
//       </div>
//     );
//   }

//   // Otherwise, use ReactPlayer for other sources (like YouTube, Vimeo, etc.)
//   return (
//     <div>
//       <ReactPlayer
//         url={videoUrl}
//         playing={true}
//         controls={true}
//         onEnded={onEnded}
//         width={width}
//         height={height}
//       />
//     </div>
//   );
// };

// export default VideoPlayer;
// ```

// ### **2. Update Your Main `Video` Component**

// Now, you can replace the logic in your `Video` component to use the newly created `VideoPlayer` component. This simplifies the main component by delegating the video-playing logic to the `VideoPlayer`.

// Here’s how you can integrate it into your current `Video` component:

// ```tsx
// import React from "react";
// import styles from "./[video_id].module.css";
// import { Roboto } from "next/font/google";
// import Avatar from "../../src/components/Avatar";
// import MusicNote from "@mui/icons-material/MusicNote";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
// import ReplySharpIcon from "@mui/icons-material/ReplySharp";
// import DownloadIcon from "@mui/icons-material/Download";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import Link from "next/link";
// import Comment from "../../src/components/Comment";
// import SuggestedVideo from "../../src/components/SuggestedVideos";
// import toast from "react-hot-toast";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import CloseIcon from "@mui/icons-material/Close";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import CurrentQueue from "../../src/components/CurrentQueue";
// import VideoShimmer from "../../src/components/VideoShimmer.jsx";
// import useVideoHook from "../../src/hooks/useVideoHook";
// import { usePathname } from "next/navigation";
// import { useUser } from "@supabase/auth-helpers-react";
// import VideoPlayer from "../../src/components/VideoPlayer"; // Import the new VideoPlayer component

// const roboto = Roboto({ weight: "700", subsets: ["latin"] });
// const r = Roboto({ weight: "500", subsets: ["latin"] });

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   backgroundColor: "#3d3d3d",
//   boxShadow: '24',
//   padding: 2,
// };

// const Video = () => {
//   const suggestProps = {
//     where: "Video",
//   };
//   const pathname = usePathname();
//   const user = useUser();
//   const {
//     video,
//     loading,
//     likeLoading,
//     error,
//     likeError,
//     likeData,
//     onVideoEnd,
//     subscribe,
//     subscribed,
//     liked,
//     useUpVote,
//     displayLikes,
//     displayUnlikes,
//     handleClose,
//     handleOpen,
//     Router,
//     open,
//     setOpen
//   } = useVideoHook(user);

//   if (loading) {
//     return <VideoShimmer />;
//   } else if (video && video?.videoStatus === true) {
//     const accountUrl = `/profiles/${video.user_id}`;

//     return (
//       <div className="min-h-screen md:pl-3 pt-5 lg:dvw" id={styles.main}>
//         <div className="w-[100vw]">
//           {/* Use the VideoPlayer component here */}
//           <VideoPlayer
//             videoUrl={video.videoUrl}
//             onEnded={onVideoEnd}
//             width="100%"
//             height="70vh"
//           />
//           <div className="mb-1">
//             <h1 id={styles.title} className={roboto.className}>
//               {video.title}
//             </h1>
//           </div>
//           <div id={styles.belowVideo}>
//             <div id={styles.row_icons}>
//               <div id={styles.left}>
//                 <Link href={accountUrl}>
//                   <Avatar
//                     uid={video?.user_id}
//                     url={video?.profiles?.avatar_url}
//                     size={55}
//                     where="video"
//                     onUpload={(e) => {
//                       return 0;
//                     }}
//                   />
//                 </Link>
//                 <div>
//                   <Link href={accountUrl}>
//                     <h1 className={roboto.className} style={{color:"white"}}>
//                       {video?.profiles?.username}
//                       <MusicNote fontSize="small" />
//                     </h1>
//                   </Link>
//                   <div className="text-gray-300 font-extralight">
//                     {`${video?.profiles?.subscribersUsingSubscribers_subscribed_to_id_fkey?.length} subscribers`}
//                   </div>
//                 </div>
//                 <div>
//                   <button
//                     id={subscribed ? styles.subscribed : styles.subscribe}
//                     className="py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       subscribe();
//                     }}
//                   >
//                     {subscribed === true ? "Subscribed" : "Subscribe"}
//                   </button>
//                   <NotificationsOutlinedIcon
//                     fontSize="medium"
//                     sx={{ color: "lightgrey" }}
//                     className="hidden ml-2 md:inline-block"
//                   />
//                 </div>
//                 <div className="md:ml-2">
//                   <button
//                     id={styles.likeUnlikeButton}
//                     className="md:mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
//                   >
//                     <div
//                       id={liked ? styles.likeD : styles.like}
//                       className="md:px-2 md:py-1"
//                     >
//                       <ThumbUpIcon
//                         className="pr-2"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           useUpVote(true);
//                         }}
//                       />
//                       {displayLikes(likeData)}
//                     </div>
//                     <p className="text-gray-800" id={styles.diwaar}>
//                       |
//                     </p>
//                     <div
//                       id={liked === false ? styles.likeD : styles.like}
//                       className="px-2 py-1"
//                     >
//                       <ThumbDownOffAltIcon
//                         className="pr-2"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           useUpVote(false);
//                         }}
//                       />
//                       {displayUnlikes(likeData)}
//                     </div>
//                   </button>
//                 </div>
//                 <div className="hidden ml-2 md:inline-block">
//                   <button
//                     id={styles.share}
//                     onClick={handleOpen}
//                     className="py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
//                   >
//                     <ReplySharpIcon />
//                     Share
//                   </button>
//                   <Modal
//                     open={open}
//                     onClose={handleClose}
//                     aria-labelledby="parent-modal-title"
//                     aria-describedby="parent-modal-description"
//                   >
//                     <Box sx={{ ...style, width: 600 }}>
//                       <div id={styles.modal}>
//                         <div id={styles.modalFirstLine}>
//                           <div id={styles.shareText} className={r.className}>
//                             Share
//                           </div>
//                           <div>
//                             <CloseIcon
//                               onClick={(e) => {
//                                 handleClose();
//                               }}
//                               id={styles.closeIcon}
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <input
//                             value={`https://youtube-clone-singh-kashish.vercel.app${pathname}`}
//                             id={styles.showInput}
//                           />
//                           <button
//                             onClick={() => {
//                               navigator.clipboard.writeText(
//                                 `https://youtube-clone-singh-kashish.vercel.app${pathname}`
//                               );
//                               toast.success("Link copied to clipboard");
//                               handleClose();
//                             }}
//                             className="py-2 px-4 shadow-md no-underline rounded-full bg-blue text-white font-sans font-semibold text-sm border-blue btn-primary hover:text

// -white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
//                             id={styles.copyButton}
//                           >
//                             Copy
//                           </button>
//                         </div>
//                         <div
//                           onClick={() => {
//                             handleClose();
//                           }}
//                         >
//                           <a
//                             href={`https://api.whatsapp.com/send?text=https://youtube-clone-singh-kashish.vercel.app${pathname}`}
//                             data-action="share/whatsapp/share"
//                             target="to_blank"
//                           >
//                             <WhatsAppIcon />
//                             Share via Whatsapp web
//                           </a>
//                         </div>
//                       </div>
//                     </Box>
//                   </Modal>
//                 </div>
//                 <div>
//                   <button
//                     id={styles.download}
//                     className="hidden ml-2 md:inline-block py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
//                   >
//                     <DownloadIcon />
//                     Download
//                   </button>
//                 </div>
//                 <div className="hidden md:inline-block p-2 cursor-pointer shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm hover:bg-gray-900  focus:outline-none active:shadow-none">
//                   <MoreHorizIcon />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="" id={styles.description}>
//             <div className={roboto.className}>
//               <h1 className="text-lg">{video.viewCount} views</h1>
//             </div>
//             <div>{video.description}</div>
//           </div>
//           <Comment comments={video.comment} video={video} />
//         </div>
//         <div className="">
//           <CurrentQueue />
//           {/* suggestedVideo */}
//           <SuggestedVideo {...suggestProps} />
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <h1>Video Not Found</h1>
//         <h6 className="text-red-600">ERROR!</h6>
//       </div>
//     );
//   }
// }

// export default Video;
// ```

// ### **Explanation of Changes:**

// 1. **Reusable VideoPlayer Component:** 
//    - The `VideoPlayer` handles both `video` and `ReactPlayer`. 
//    - It checks if the URL is from Supabase and selects the appropriate player.

// 2. **Simplified Main Video Component:**
//    - The logic for the video display is moved to the `VideoPlayer` component.
//    - This makes the main `Video` component cleaner and focuses it on other logic, such as handling likes, comments, subscriptions, and sharing.

// This approach makes it easy to maintain and reuse the video player across your application.

{/*} build a custom video player using the HTML5 `<video>` tag, with a fully customized design, dark and light modes, and the necessary functionalities like play, pause, volume control, seek, full-screen toggle, and more. Let's break it down:

### Key Features for the Custom Video Player:
1. **Play/Pause Toggle**
2. **Volume Control**
3. **Seekbar/Progressbar**
4. **Fullscreen Toggle**
5. **Light/Dark Mode**
6. **Event Handlers (e.g., `onEnded`, `onTimeUpdate`)**
7. **Custom Controls (buttons and UI components)**

### 1. **Custom Video Player Component**

We will create a custom `VideoPlayer` component that will handle the player logic, including the light and dark mode support.

### 2. **Light/Dark Mode Support**

The custom player will adapt its style depending on the current theme (light or dark mode). We'll use a simple `theme` state to toggle between these modes.

Here’s a complete implementation:

### **VideoPlayer Component** (Custom HTML5 Video Player with Light/Dark Mode)

```tsx
import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpandArrowsAlt, FaCompressArrowsAlt } from 'react-icons/fa';

interface VideoPlayerProps {
  videoUrl: string;
  width?: string;
  height?: string;
  onEnded?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, width = "100%", height = "70vh", onEnded }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      setIsMuted((prev) => !prev);
      videoRef.current.muted = !isMuted;
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    setIsFullscreen(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      // Handle time update logic here (e.g., updating progress bar)
    }
  };

  const handleEnded = () => {
    if (onEnded) onEnded();
  };

  return (
    <div className={`video-container ${theme}`} style={{ width, height }}>
      <video
        ref={videoRef}
        src={videoUrl}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlayPause}
        className="video-player"
        style={{ width: '100%', height: '100%', cursor: 'pointer' }}
      />
      <div className="controls">
        <button onClick={togglePlayPause} className="play-pause-btn">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={toggleMute} className="mute-btn">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-control"
        />
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'dark' ? '🌞' : '🌜'}
        </button>
        {!isFullscreen ? (
          <button onClick={toggleFullscreen} className="fullscreen-btn">
            <FaExpandArrowsAlt />
          </button>
        ) : (
          <button onClick={exitFullscreen} className="fullscreen-btn">
            <FaCompressArrowsAlt />
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
```

### 3. **CSS for the Player (Light/Dark Mode)**

Here’s the CSS to handle the video player controls with light and dark modes.

```css
.video-container {
  position: relative;
  display: inline-block;
}

.video-container.light {
  background-color: #f0f0f0;
  color: #000;
}

.video-container.dark {
  background-color: #333;
  color: #fff;
}

.video-player {
  width: 100%;
  height: 100%;
  background-color: #000;
}

.controls {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
}

button {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
}

.play-pause-btn,
.mute-btn,
.fullscreen-btn {
  font-size: 24px;
}

.volume-control {
  width: 100px;
}

.theme-toggle-btn {
  font-size: 18px;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
  background: #ccc;
  outline: none;
  border-radius: 5px;
}

input[type="range"]:focus {
  background: #888;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-runnable-track {
  background: #888;
}
```

### 4. **Explanation of Key Features:**

1. **Custom Play/Pause Button:**
   - Uses `<FaPlay />` and `<FaPause />` from `react-icons` to toggle the play state of the video.

2. **Volume Control:**
   - A slider (`<input type="range">`) adjusts the volume. The `muted` state is controlled by clicking the volume icon.

3. **Fullscreen Toggle:**
   - A fullscreen button toggles between entering and exiting fullscreen mode using browser-specific API calls (`requestFullscreen`/`exitFullscreen`).

4. **Theme Switcher:**
   - A simple button (`🌞` for dark mode and `🌜` for light mode) toggles between light and dark themes. The CSS dynamically adjusts based on the selected theme.

5. **Custom Styles:**
   - The `video-container` changes its background and text color based on whether the theme is light or dark.

### 5. **Integrating the Player in Your Main Component**

Now, you can use the `VideoPlayer` component anywhere in your app, and it will work with the light/dark modes.

```tsx
import React from 'react';
import VideoPlayer from './VideoPlayer';

const VideoPage = () => {
  const videoUrl = "https://path/to/your/video.mp4";
  return (
    <div>
      <h1>Custom Video Player</h1>
      <VideoPlayer
        videoUrl={videoUrl}
        width="80%"
        height="auto"
      />
    </div>
  );
};

export default VideoPage;
```

### Conclusion

- **Custom Player:** This custom video player uses the HTML5 `<video>` tag with full control over play, pause, volume, and fullscreen.
- **Light/Dark Mode:** Toggling between light and dark mode is easy to implement, and the UI adapts accordingly.
- **Reusable:** This `VideoPlayer` component can be reused anywhere in your app for different video URLs. 

Let me know if

 you need further adjustments or additions!

 Yes, you can implement dark mode and light mode globally with **Tailwind CSS** by leveraging its built-in dark mode support. Tailwind makes it really easy to handle dark mode via the `dark` class, which you can apply at the root level and toggle based on the user's preference.

### Steps to Set Up Dark Mode and Light Mode with Tailwind CSS:

1. **Enable Dark Mode in Tailwind CSS Configuration**: Tailwind has built-in support for dark mode, but you need to enable it in your configuration file.
   
2. **Manage Theme State in React**: You can still manage the theme state using React Context or even `localStorage` to persist the user's choice.

3. **Apply Tailwind Dark Mode Classes**: Tailwind provides the `dark` class that automatically enables dark mode styles when added to an element.

4. **Toggle Dark/Light Mode**: You'll need a way to toggle the theme and persist it (e.g., with `localStorage`).

### 1. **Tailwind Configuration for Dark Mode**

First, ensure that dark mode is enabled in your `tailwind.config.js`. You can use the `class` strategy, which allows you to manually toggle the `dark` class.

#### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
// {/*module.exports = {
//     content: [
//       "./pages/**/*.{js,ts,jsx,tsx}",
//       "./src/**/*.{js,ts,jsx,tsx}",
//     ],
//     darkMode: 'class', // This enables dark mode via a CSS class
//     theme: {
//       extend: {
//         colors: {
//           primary: '#6200ee', // Custom primary color
//           secondary: '#018786', // Custom secondary color
//         },
//       },
//     },
//     plugins: [],
//   }
//   ```
  
//   ### 2. **Theme Context to Manage Dark Mode (React)**
  
//   We’ll use the **React Context API** to manage the theme state and apply the `dark` class globally.
  
//   #### `ThemeContext.tsx`
  
//   ```tsx
//   import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
  
//   type Theme = 'light' | 'dark';
  
//   interface ThemeContextProps {
//     theme: Theme;
//     toggleTheme: () => void;
//   }
  
//   const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
  
//   export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [theme, setTheme] = useState<Theme>('light');
  
//     // Load saved theme from localStorage
//     useEffect(() => {
//       const savedTheme = localStorage.getItem('theme') as Theme;
//       if (savedTheme) {
//         setTheme(savedTheme);
//       }
//     }, []);
  
//     // Toggle between light and dark theme
//     const toggleTheme = () => {
//       const newTheme = theme === 'light' ? 'dark' : 'light';
//       setTheme(newTheme);
//       localStorage.setItem('theme', newTheme); // Save to localStorage
//     };
  
//     useEffect(() => {
//       // Apply the theme to the body or root element
//       if (theme === 'dark') {
//         document.documentElement.classList.add('dark');
//       } else {
//         document.documentElement.classList.remove('dark');
//       }
//     }, [theme]);
  
//     return (
//       <ThemeContext.Provider value={{ theme, toggleTheme }}>
//         <div className={`app ${theme}`}>{children}</div>
//       </ThemeContext.Provider>
//     );
//   };
  
//   export const useTheme = () => {
//     const context = useContext(ThemeContext);
//     if (!context) {
//       throw new Error('useTheme must be used within a ThemeProvider');
//     }
//     return context;
//   };
//   ```
  
//   ### 3. **Add Dark Mode Classes in Your Components**
  
//   Once dark mode is enabled, you can use Tailwind’s `dark:` prefix to apply styles for dark mode. For instance, you can modify your button, background color, text color, and other styles using Tailwind’s dark mode utilities.
  
//   #### Example of `globals.css` (Tailwind with Dark Mode)
  
//   ```css
//   /* Global styles with Tailwind's dark mode utilities */
//   html, body {
//     @apply bg-white text-black dark:bg-gray-900 dark:text-white; /* Apply dark theme styles */
//   }
  
//   button {
//     @apply bg-primary text-white dark:bg-secondary dark:text-gray-900;
//   }
  
//   button:hover {
//     @apply dark:bg-secondary-light;
//   }
  
//   /* Example of a dark mode card */
//   .card {
//     @apply bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg;
//   }
//   ```
  
//   ### 4. **Theme Toggle Button**
  
//   To toggle between the dark and light modes, we can create a simple button that changes the theme state.
  
//   #### `ThemeToggle.tsx`
  
//   ```tsx
//   import React from 'react';
//   import { useTheme } from '../src/context/ThemeContext';
//   import { FaMoon, FaSun } from 'react-icons/fa'; // Use React Icons or any other icon library
  
//   const ThemeToggle: React.FC = () => {
//     const { theme, toggleTheme } = useTheme();
  
//     return (
//       <button
//         onClick={toggleTheme}
//         className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
//       >
//         {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
//       </button>
//     );
//   };
  
//   export default ThemeToggle;
//   ```
  
//   ### 5. **Wrap the Application with the `ThemeProvider`**
  
//   In your main `App.tsx` or `pages/_app.tsx` file, wrap the application in the `ThemeProvider` so that the theme is accessible globally.
  
//   #### `pages/_app.tsx`
  
//   ```tsx
//   import React from 'react';
//   import { ThemeProvider } from '../src/context/ThemeContext'; // Adjust path as necessary
//   import '../styles/globals.css'; // Import Tailwind CSS
  
//   const App = ({ Component, pageProps }: any) => {
//     return (
//       <ThemeProvider>
//         <Component {...pageProps} />
//       </ThemeProvider>
//     );
//   };
  
//   export default App;
//   ```
  
//   ### 6. **Using Tailwind for Dark/Light Mode in Your Components**
  
//   You can now use Tailwind’s `dark:` prefix to apply dark mode styles for individual components. Here's an example:
  
//   #### Example: `VideoPlayer.tsx` (Custom Video Player)
  
//   ```tsx
//   import React from 'react';
  
//   const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
//     return (
//       <div className="dark:bg-gray-900 dark:text-white p-4">
//         <video
//           controls
//           src={videoUrl}
//           className="w-full h-auto rounded-lg dark:bg-black"
//         />
//       </div>
//     );
//   };
  
//   export default VideoPlayer;
//   ```
  
//   #### Example: `Header.tsx`
  
//   ```tsx
//   import React from 'react';
//   import ThemeToggle from './ThemeToggle'; // Path to your ThemeToggle component
  
//   const Header: React.FC = () => {
//     return (
//       <header className="dark:bg-gray-800 p-4">
//         <h1 className="text-xl font-semibold dark:text-white">My Awesome App</h1>
//         <ThemeToggle />
//       </header>
//     );
//   };
  
//   export default Header;
//   ```
  
//   ### 7. **Global Tailwind Dark Mode Styles**
  
//   To make your whole application theme-aware, Tailwind uses the `dark` class to trigger dark mode. By adding the `dark` class to the `<html>` element, the entire app can be styled dynamically with dark mode.
  
//   #### Example of Styling `globals.css` with Tailwind
  
//   ```css
//   /* Global styles */
//   html {
//     @apply transition-colors duration-300 ease-in-out;
//   }
  
//   body {
//     @apply bg-white text-black dark:bg-gray-900 dark:text-white; /* Base styles */
//   }
  
//   /* Dark mode specific styles */
//   .dark .card {
//     @apply bg-gray-800 text-white;
//   }
  
//   .dark button {
//     @apply bg-primary-dark;
//   }
//   ```
  
//   ### 8. **Final Adjustments**
  
//   After completing the above setup:
  
//   - The entire application can now toggle between light and dark mode.
//   - The `localStorage` will persist the theme between sessions.
//   - Tailwind's `dark` utility class handles the theme switch dynamically based on the class added to the root element (`<html>`).
//   - You can now add `dark:` classes for any component where you need custom styling for dark mode.
  
//   ### Conclusion
  
//   This solution leverages Tailwind CSS's built-in **dark mode support** (`dark` class) and combines it with React's **Context API** to manage and toggle the theme globally. By using Tailwind's `dark:` utility, you can easily style your components for both light and dark modes.
  
//   - **Tailwind’s `dark` utility** handles the dark mode styles for your app.
//   - **React Context** is used to toggle the theme and store the user's choice.
//   - **`localStorage`** ensures the theme persists across page reloads.
  
//   This approach keeps your styles efficient and your application lightweight while offering a seamless dark/light mode experience.

//   *}