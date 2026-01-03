// import { useRouter } from "next/router";
// import React, { useState } from "react";
// import styles from "./styles/LeftHeader.module.css";
// import Subscriptions from "./Subscriptions";
// import HomeIcon from "@mui/icons-material/Home";
// import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
// import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
// import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
// import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
// import Link from "next/link";
// import LeftHeaderEnd from "./LeftHeaderEnd";
// import QueueMusicIcon from "@mui/icons-material/QueueMusic";
// import Search from "./Search";

// // function LeftHeader({
// //   densityClicked,
// //   handleSubmit,
// //   searchText,
// //   setSearchText,
// // }) {
// //   const [selected, setSelected] = useState(1);
// //   const Router = useRouter();
// //   const selectedStyle = {
// //     backgroundColor: "#2d2d2d",
// //     borderRadius: "10px",
// //     height: "45px",
// //     width: "200px",
// //     cursor: "pointer",
// //   };
// //   const notSelectedStyle = {
// //     borderRadius: "10px",
// //     height: "45px",
// //     width: "200px",
// //     cursor: "pointer",
// //   };
// //   const selectedStyle_icon = {
// //     backgroundColor: "#2d2d2d",
// //     borderRadius: "10px",
// //     height: "45px",
// //     width: "100px",
// //     cursor: "pointer",
// //   };
// //   const notSelectedStyle_icon = {
// //     backgroundColor: "#181818",
// //     borderRadius: "10px",
// //     height: "45px",
// //     width: "100px",
// //     cursor: "pointer",
// //   };
// //   const RoutePathValue =
// //     Router.asPath == "/" ||
// //     Router.asPath == "/subscriptions" ||
// //     Router.asPath == "/library" ||
// //     Router.asPath == "/yourVideos" ||
// //     Router.asPath == "/likedVideo" ||
// //     Router.pathname == "/profiles/[user_id]" ||
// //     Router.pathname == "/search/[text]" ||
// //     Router.asPath == "/playlists";
// //   // upcoming section is for routes satisfying these values up for RoutePathValue, and not default option for leftHeader style: only icons()
// //   if ((densityClicked && RoutePathValue) || Router.asPath === "/login") {
// //     return (
// //       <div
// //         id={styles.leftHeader_icon}
// //         className="space-y-1 bg-[#181818] min-h-[650px]"
// //       >
// //         <Link href="/">
// //           <div
// //             style={selected === 1 ? selectedStyle_icon : notSelectedStyle_icon}
// //             id={styles.row_icon}
// //             onClick={(e) => {
// //               setSelected(1);
// //             }}
// //             className="shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <HomeIcon />
// //             <h1 className="text-xs font-sans font-light">Home</h1>
// //           </div>
// //         </Link>
// //         <Link href="/subscriptions">
// //           <div
// //             id={styles.row_icon}
// //             style={selected === 2 ? selectedStyle_icon : notSelectedStyle_icon}
// //             onClick={(e) => {
// //               setSelected(2);
// //             }}
// //             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <SubscriptionsIcon />
// //             <h1 className="text-xs font-sans font-light">Subscriptions</h1>
// //           </div>
// //         </Link>{" "}
// //         <Link href="/library">
// //           <div
// //             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //             style={selected === 3 ? selectedStyle_icon : notSelectedStyle_icon}
// //             id={styles.row_icon}
// //             onClick={(e) => {
// //               setSelected(3);
// //             }}
// //           >
// //             <VideoLibraryIcon className="mr-2" />
// //             <h1 className="text-xs font-sans font-light">Library</h1>
// //           </div>
// //         </Link>
// //         <Link href="/playlists">
// //           <div
// //             id={styles.row_icon}
// //             style={selected === 4 ? selectedStyle_icon : notSelectedStyle_icon}
// //             onClick={(e) => {
// //               setSelected(4);
// //             }}
// //             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <QueueMusicIcon />
// //             <h1 className="text-xs font-sans font-light">Playlists</h1>
// //           </div>
// //         </Link>
// //       </div>
// //     );
// //   } else if (!densityClicked && RoutePathValue) {
// //     return (
// //       <div
// //         id={styles.leftHeader}
// //         className="space-y-1 bg-[#181818] min-h-[650px] w-screen"
// //       >
// //         <Search
// //           where="leftHeader"
// //           handleSubmit={handleSubmit}
// //           searchText={searchText}
// //           setSearchText={setSearchText}
// //         />
// //         <Link href="/">
// //           <div
// //             style={selected === 1 ? selectedStyle : notSelectedStyle}
// //             id={styles.row}
// //             onClick={(e) => {
// //               setSelected(1);
// //             }}
// //             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <HomeIcon className="mr-2" />
// //             Home
// //           </div>
// //         </Link>
// //         <Link href="/subscriptions">
// //           <div
// //             id={styles.row}
// //             style={selected === 2 ? selectedStyle : notSelectedStyle}
// //             onClick={(e) => {
// //               setSelected(2);
// //             }}
// //             className="mb-2 border-b-2 border-b-slate-700 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <SubscriptionsIcon className="mr-2" /> Subscriptions
// //           </div>
// //         </Link>
// //         <Link href="/library">
// //           <div
// //             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //             style={selected === 3 ? selectedStyle : notSelectedStyle}
// //             id={styles.row}
// //             onClick={(e) => {
// //               setSelected(3);
// //             }}
// //           >
// //             <VideoLibraryIcon className="mr-2" />
// //             Library
// //           </div>
// //         </Link>
// //         <Link href="/yourVideos">
// //           <div
// //             style={selected === 4 ? selectedStyle : notSelectedStyle}
// //             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //             id={styles.row}
// //             onClick={(e) => {
// //               setSelected(4);
// //             }}
// //           >
// //             <SmartDisplayIcon className="mr-2" />
// //             Your Videos
// //           </div>
// //         </Link>
// //         <Link href="/likedVideo">
// //           <div
// //             style={selected === 5 ? selectedStyle : notSelectedStyle}
// //             id={styles.row}
// //             onClick={(e) => {
// //               setSelected(5);
// //             }}
// //             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <ThumbUpOffAltIcon className="mr-2" />
// //             Liked Videos
// //           </div>
// //         </Link>
// //         <Link href="/playlists">
// //           <div
// //             id={styles.row}
// //             style={selected === 6 ? selectedStyle : notSelectedStyle}
// //             onClick={(e) => {
// //               setSelected(6);
// //             }}
// //             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <QueueMusicIcon />
// //             Playlists
// //           </div>
// //         </Link>
// //         <Subscriptions className="mt-2 border-t-2 border-t-slate-700" />
// //         <LeftHeaderEnd />
// //       </div>
// //     );
// //   } else if (densityClicked && Router.pathname === "/video/[video_id]") {
// //     return (
// //       <div
// //         id={styles.leftHeader_atVideo_d}
// //         className="space-y-1 bg-[#181818] min-h-[650px] w-screen"
// //       >
// //         <Link href="/">
// //           <div
// //             style={selected === 1 ? selectedStyle_icon : notSelectedStyle_icon}
// //             id={styles.row_icon}
// //             onClick={(e) => {
// //               setSelected(1);
// //             }}
// //             className="shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <HomeIcon />
// //             <h1 className="text-xs font-sans font-light">Home</h1>
// //           </div>
// //         </Link>
// //         <Link href="/subscriptions">
// //           <div
// //             id={styles.row_icon}
// //             style={selected === 2 ? selectedStyle_icon : notSelectedStyle_icon}
// //             onClick={(e) => {
// //               setSelected(2);
// //             }}
// //             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <SubscriptionsIcon />
// //             <h1 className="text-xs font-sans font-light">Subscriptions</h1>
// //           </div>
// //         </Link>{" "}
// //         <Link href="/library">
// //           <div
// //             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //             style={selected === 3 ? selectedStyle_icon : notSelectedStyle_icon}
// //             id={styles.row_icon}
// //             onClick={(e) => {
// //               setSelected(3);
// //             }}
// //           >
// //             <VideoLibraryIcon className="mr-2" />
// //             <h1 className="text-xs font-sans font-light">Library</h1>
// //           </div>
// //         </Link>
// //       </div>
// //     );
// //   } else if (!densityClicked && Router.pathname === "/video/[video_id]") {
// //     return (
// //       <div
// //         id={styles.leftHeader_atVideo}
// //         className="space-y-1 bg-[#181818] min-h-[650px]"
// //       >
// //         <Search
// //           where="leftHeader"
// //           handleSubmit={handleSubmit}
// //           searchText={searchText}
// //           setSearchText={setSearchText}
// //         />
// //         <Link href="/">
// //           <div
// //             style={selected === 1 ? selectedStyle : notSelectedStyle}
// //             id={styles.row}
// //             onClick={(e) => {
// //               setSelected(1);
// //             }}
// //             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <HomeIcon className="mr-2" />
// //             Home
// //           </div>
// //         </Link>
// //         <Link href="/subscriptions">
// //           <div
// //             id={styles.row}
// //             style={selected === 2 ? selectedStyle : notSelectedStyle}
// //             onClick={(e) => {
// //               setSelected(2);
// //             }}
// //             className="mb-2 border-b-2 border-b-slate-700 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <SubscriptionsIcon className="mr-2" /> Subscriptions
// //           </div>
// //         </Link>
// //         <Link href="/library">
// //           <div
// //             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //             style={selected === 3 ? selectedStyle : notSelectedStyle}
// //             id={styles.row}
// //             onClick={(e) => {
// //               setSelected(3);
// //             }}
// //           >
// //             <VideoLibraryIcon className="mr-2" />
// //             Library
// //           </div>
// //         </Link>
// //         <Link href="/yourVideos">
// //           <div
// //             style={selected === 4 ? selectedStyle : notSelectedStyle}
// //             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //             id={styles.row}
// //             onClick={(e) => {
// //               setSelected(4);
// //             }}
// //           >
// //             <SmartDisplayIcon className="mr-2" />
// //             Your Videos
// //           </div>
// //         </Link>
// //         <Link href="/likedVideo">
// //           <div
// //             style={selected === 5 ? selectedStyle : notSelectedStyle}
// //             id={styles.row}
// //             onClick={(e) => {
// //               setSelected(5);
// //             }}
// //             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <ThumbUpOffAltIcon className="mr-2" />
// //             Liked Videos
// //           </div>
// //         </Link>
// //         <Link href="/playlists">
// //           <div
// //             id={styles.row}
// //             style={selected === 6 ? selectedStyle : notSelectedStyle}
// //             onClick={(e) => {
// //               setSelected(6);
// //             }}
// //             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
// //           >
// //             <QueueMusicIcon />
// //             Playlists
// //           </div>
// //         </Link>
// //         <Subscriptions className="mt-2 border-t-2 border-t-slate-700" />
// //         <LeftHeaderEnd />
// //       </div>
// //     );
// //   } else {
// //     return (
// //       <></>
// //     );
// //   }
// // }

// type Props = {
//   densityClicked: boolean;
//   handleSubmit?: (e: React.FormEvent) => void;
//   searchText?: string;
//   setSearchText?: React.Dispatch<React.SetStateAction<string>>;
// };

// const LeftHeader = ({ densityClicked }: { densityClicked: boolean }) => {
//   const [selected, setSelected] = useState(1);
//   const Router = useRouter();
//   const selectedStyle = {
//     backgroundColor: "#2d2d2d",
//     borderRadius: "10px",
//     height: "45px",
//     width: "200px",
//     cursor: "pointer",
//   };
//   const notSelectedStyle = {
//     borderRadius: "10px",
//     height: "45px",
//     width: "200px",
//     cursor: "pointer",
//   };
//   const selectedStyle_icon = {
//     backgroundColor: "#2d2d2d",
//     borderRadius: "10px",
//     height: "45px",
//     width: "100px",
//     cursor: "pointer",
//   };
//   const notSelectedStyle_icon = {
//     backgroundColor: "#181818",
//     borderRadius: "10px",
//     height: "45px",
//     width: "100px",
//     cursor: "pointer",
//   };
//   const RoutePathValue =
//     Router.asPath == "/" ||
//     Router.asPath == "/subscriptions" ||
//     Router.asPath == "/library" ||
//     Router.asPath == "/yourVideos" ||
//     Router.asPath == "/likedVideo" ||
//     Router.pathname == "/profiles/[user_id]" ||
//     Router.pathname == "/search/[text]" ||
//     Router.asPath == "/playlists";
//   // upcoming section is for routes satisfying these values up for RoutePathValue, and not default option for leftHeader style: only icons()
//   if ((densityClicked && RoutePathValue) || Router.asPath === "/login") {
//     return (
//       <div
//         id={styles.leftHeader_icon}
//         className="space-y-1 bg-[#181818] min-h-[650px]"
//       >
//         <Link href="/">
//           <div
//             style={selected === 1 ? selectedStyle_icon : notSelectedStyle_icon}
//             id={styles.row_icon}
//             onClick={(e) => {
//               setSelected(1);
//             }}
//             className="shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <HomeIcon />
//             <h1 className="text-xs font-sans font-light">Home</h1>
//           </div>
//         </Link>
//         <Link href="/subscriptions">
//           <div
//             id={styles.row_icon}
//             style={selected === 2 ? selectedStyle_icon : notSelectedStyle_icon}
//             onClick={(e) => {
//               setSelected(2);
//             }}
//             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <SubscriptionsIcon />
//             <h1 className="text-xs font-sans font-light">Subscriptions</h1>
//           </div>
//         </Link>{" "}
//         <Link href="/library">
//           <div
//             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//             style={selected === 3 ? selectedStyle_icon : notSelectedStyle_icon}
//             id={styles.row_icon}
//             onClick={(e) => {
//               setSelected(3);
//             }}
//           >
//             <VideoLibraryIcon className="mr-2" />
//             <h1 className="text-xs font-sans font-light">Library</h1>
//           </div>
//         </Link>
//         <Link href="/playlists">
//           <div
//             id={styles.row_icon}
//             style={selected === 4 ? selectedStyle_icon : notSelectedStyle_icon}
//             onClick={(e) => {
//               setSelected(4);
//             }}
//             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <QueueMusicIcon />
//             <h1 className="text-xs font-sans font-light">Playlists</h1>
//           </div>
//         </Link>
//       </div>
//     );
//   } else if (!densityClicked && RoutePathValue) {
//     return (
//       <div
//         id={styles.leftHeader}
//         className="space-y-1 bg-[#181818] min-h-[650px] w-screen"
//       >
//         {/* <Search
//           where="leftHeader"
//           handleSubmit={handleSubmit}
//           searchText={searchText}
//           setSearchText={setSearchText}
//         /> */}
//         <Link href="/">
//           <div
//             style={selected === 1 ? selectedStyle : notSelectedStyle}
//             id={styles.row}
//             onClick={(e) => {
//               setSelected(1);
//             }}
//             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <HomeIcon className="mr-2" />
//             Home
//           </div>
//         </Link>
//         <Link href="/subscriptions">
//           <div
//             id={styles.row}
//             style={selected === 2 ? selectedStyle : notSelectedStyle}
//             onClick={(e) => {
//               setSelected(2);
//             }}
//             className="mb-2 border-b-2 border-b-slate-700 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <SubscriptionsIcon className="mr-2" /> Subscriptions
//           </div>
//         </Link>
//         <Link href="/library">
//           <div
//             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//             style={selected === 3 ? selectedStyle : notSelectedStyle}
//             id={styles.row}
//             onClick={(e) => {
//               setSelected(3);
//             }}
//           >
//             <VideoLibraryIcon className="mr-2" />
//             Library
//           </div>
//         </Link>
//         <Link href="/yourVideos">
//           <div
//             style={selected === 4 ? selectedStyle : notSelectedStyle}
//             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//             id={styles.row}
//             onClick={(e) => {
//               setSelected(4);
//             }}
//           >
//             <SmartDisplayIcon className="mr-2" />
//             Your Videos
//           </div>
//         </Link>
//         <Link href="/likedVideo">
//           <div
//             style={selected === 5 ? selectedStyle : notSelectedStyle}
//             id={styles.row}
//             onClick={(e) => {
//               setSelected(5);
//             }}
//             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <ThumbUpOffAltIcon className="mr-2" />
//             Liked Videos
//           </div>
//         </Link>
//         <Link href="/playlists">
//           <div
//             id={styles.row}
//             style={selected === 6 ? selectedStyle : notSelectedStyle}
//             onClick={(e) => {
//               setSelected(6);
//             }}
//             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <QueueMusicIcon />
//             Playlists
//           </div>
//         </Link>
//        {/* <Subscriptions className="mt-2 border-t-2 border-t-slate-700" /> */}
//         <LeftHeaderEnd />
//       </div>
//     );
//   } else if (densityClicked && Router.pathname === "/video/[video_id]") {
//     return (
//       <div
//         id={styles.leftHeader_atVideo_d}
//         className="space-y-1 bg-[#181818] min-h-[650px] w-screen"
//       >
//         <Link href="/">
//           <div
//             style={selected === 1 ? selectedStyle_icon : notSelectedStyle_icon}
//             id={styles.row_icon}
//             onClick={(e) => {
//               setSelected(1);
//             }}
//             className="shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <HomeIcon />
//             <h1 className="text-xs font-sans font-light">Home</h1>
//           </div>
//         </Link>
//         <Link href="/subscriptions">
//           <div
//             id={styles.row_icon}
//             style={selected === 2 ? selectedStyle_icon : notSelectedStyle_icon}
//             onClick={(e) => {
//               setSelected(2);
//             }}
//             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <SubscriptionsIcon />
//             <h1 className="text-xs font-sans font-light">Subscriptions</h1>
//           </div>
//         </Link>{" "}
//         <Link href="/library">
//           <div
//             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//             style={selected === 3 ? selectedStyle_icon : notSelectedStyle_icon}
//             id={styles.row_icon}
//             onClick={(e) => {
//               setSelected(3);
//             }}
//           >
//             <VideoLibraryIcon className="mr-2" />
//             <h1 className="text-xs font-sans font-light">Library</h1>
//           </div>
//         </Link>
//       </div>
//     );
//   } else if (!densityClicked && Router.pathname === "/video/[video_id]") {
//     return (
//       <div
//         id={styles.leftHeader_atVideo}
//         className="space-y-1 bg-[#181818] min-h-[650px]"
//       >
//         {/* <Search
//           where="leftHeader"
//           handleSubmit={handleSubmit}
//           searchText={searchText}
//           setSearchText={setSearchText}
//         /> */}
//         <Link href="/">
//           <div
//             style={selected === 1 ? selectedStyle : notSelectedStyle}
//             id={styles.row}
//             onClick={(e) => {
//               setSelected(1);
//             }}
//             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <HomeIcon className="mr-2" />
//             Home
//           </div>
//         </Link>
//         <Link href="/subscriptions">
//           <div
//             id={styles.row}
//             style={selected === 2 ? selectedStyle : notSelectedStyle}
//             onClick={(e) => {
//               setSelected(2);
//             }}
//             className="mb-2 border-b-2 border-b-slate-700 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <SubscriptionsIcon className="mr-2" /> Subscriptions
//           </div>
//         </Link>
//         <Link href="/library">
//           <div
//             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//             style={selected === 3 ? selectedStyle : notSelectedStyle}
//             id={styles.row}
//             onClick={(e) => {
//               setSelected(3);
//             }}
//           >
//             <VideoLibraryIcon className="mr-2" />
//             Library
//           </div>
//         </Link>
//         <Link href="/yourVideos">
//           <div
//             style={selected === 4 ? selectedStyle : notSelectedStyle}
//             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//             id={styles.row}
//             onClick={(e) => {
//               setSelected(4);
//             }}
//           >
//             <SmartDisplayIcon className="mr-2" />
//             Your Videos
//           </div>
//         </Link>
//         <Link href="/likedVideo">
//           <div
//             style={selected === 5 ? selectedStyle : notSelectedStyle}
//             id={styles.row}
//             onClick={(e) => {
//               setSelected(5);
//             }}
//             className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <ThumbUpOffAltIcon className="mr-2" />
//             Liked Videos
//           </div>
//         </Link>
//         <Link href="/playlists">
//           <div
//             id={styles.row}
//             style={selected === 6 ? selectedStyle : notSelectedStyle}
//             onClick={(e) => {
//               setSelected(6);
//             }}
//             className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             <QueueMusicIcon />
//             Playlists
//           </div>
//         </Link>
//         {/* <Subscriptions className="mt-2 border-t-2 border-t-slate-700" /> */}
//         <LeftHeaderEnd />
//       </div>
//     );
//   } else {
//     return (
//       <></>
//     );
//   }
// }

// export default LeftHeader;

// import { useRouter } from "next/router";
// import React, { useMemo, useState } from "react";
// import styles from "./styles/LeftHeader.module.css";
// import HomeIcon from "@mui/icons-material/Home";
// import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
// import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
// import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
// import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
// import QueueMusicIcon from "@mui/icons-material/QueueMusic";
// import Link from "next/link";
// import Search from "./Search";
// import Subscriptions from "./Subscriptions";
// import LeftHeaderEnd from "./LeftHeaderEnd";
// import { useSelector } from "react-redux";
// import { rootState } from "../../store";

// type Props = {
//   densityClicked: boolean;
//   searchText?: string;
//   setSearchText?: React.Dispatch<React.SetStateAction<string>>;
//   handleSubmit?: (e: React.FormEvent) => void;
// };

// const HEADER_HEIGHT = 64;

// const LeftHeader: React.FC<Props> = ({
//   densityClicked
// }) => {
//   const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
//   const isOpen = useSelector(
//     (state: rootState) => state.headerDensity.headerDensityClicked
//   );
//   const router = useRouter();
//   const [selected, setSelected] = useState(1);

//   const isVideoPage = router.pathname === "/video/[video_id]";
//   const isLogin = router.asPath === "/login";

//   const routeAllowsSidebar = useMemo(
//     () =>
//       router.asPath === "/" ||
//       router.asPath === "/subscriptions" ||
//       router.asPath === "/library" ||
//       router.asPath === "/yourVideos" ||
//       router.asPath === "/likedVideo" ||
//       router.pathname === "/profiles/[user_id]" ||
//       router.pathname === "/search/[text]" ||
//       router.asPath === "/playlists" ||
//       isVideoPage,
//     [router.asPath, router.pathname, isVideoPage]
//   );

//   /* =======================
//      STYLES (unchanged)
//   ======================== */

//   const full = {
//     selected: {
//       backgroundColor: "#2d2d2d",
//       borderRadius: "10px",
//       height: "45px",
//       width: "200px",
//       cursor: "pointer",
//     },
//     normal: {
//       borderRadius: "10px",
//       height: "45px",
//       width: "200px",
//       cursor: "pointer",
//     },
//   };

//   const icon = {
//     selected: {
//       backgroundColor: "#2d2d2d",
//       borderRadius: "10px",
//       height: "45px",
//       width: "100px",
//       cursor: "pointer",
//     },
//     normal: {
//       backgroundColor: "#181818",
//       borderRadius: "10px",
//       height: "45px",
//       width: "100px",
//       cursor: "pointer",
//     },
//   };

//   /* =======================
//      MOBILE POP-DOWN MODE
//      (Density ON, small screen)
//   ======================== */
//   // MOBILE: slide-down panel
// if (isMobile) {
//   if (!densityClicked) return null;

//   return (
//     <div className="w-full bg-[#181818] border-b border-zinc-700">
//       <Search
//         where="leftHeader"
//         handleSubmit={handleSubmit!}
//         searchText={searchText!}
//         setSearchText={setSearchText!}
//       />

//       <div className="flex justify-around py-3">
//         <Link href="/"><HomeIcon /></Link>
//         <Link href="/subscriptions"><SubscriptionsIcon /></Link>
//         <Link href="/library"><VideoLibraryIcon /></Link>
//         <Link href="/playlists"><QueueMusicIcon /></Link>
//       </div>
//     </div>
//   );
// }else if (densityClicked && handleSubmit && searchText !== undefined) {
//     return (
//       <div className="lg:hidden w-full bg-[#181818] border-b border-zinc-700">
//         <Search
//           where="leftHeader"
//           handleSubmit={handleSubmit}
//           searchText={searchText}
//           setSearchText={setSearchText!}
//         />

//         <div className="flex justify-around py-2">
//           <Link href="/"><HomeIcon /></Link>
//           <Link href="/subscriptions"><SubscriptionsIcon /></Link>
//           <Link href="/library"><VideoLibraryIcon /></Link>
//           <Link href="/playlists"><QueueMusicIcon /></Link>
//         </div>
//       </div>
//     );
//   }

//   /* =======================
//      ICON-ONLY SIDEBAR
//   ======================== */

//   if ((densityClicked && routeAllowsSidebar) || isLogin) {
//     return (
//       <aside
//       className={`
//         ${styles.leftHeader}
//         ${densityClicked ? styles.collapsed : styles.expanded}
//       `}
//       style={{ top: HEADER_HEIGHT }}
//     >
//         <IconRow icon={<HomeIcon />} label="Home" href="/" index={1} />
//         <IconRow icon={<SubscriptionsIcon />} label="Subscriptions" href="/subscriptions" index={2} />
//         <IconRow icon={<VideoLibraryIcon />} label="Library" href="/library" index={3} />
//         <IconRow icon={<QueueMusicIcon />} label="Playlists" href="/playlists" index={4} />
//       </aside>
//     );
//   }

//   /* =======================
//      FULL SIDEBAR
//   ======================== */

//   if (!densityClicked && routeAllowsSidebar) {
//     return (
//       <aside
//       className={`
//         ${styles.leftHeader}
//         ${densityClicked ? styles.collapsed : styles.expanded}
//       `}
//       style={{ top: HEADER_HEIGHT }}
//     >
//         {handleSubmit && searchText !== undefined && (
//           <Search
//             where="leftHeader"
//             handleSubmit={handleSubmit}
//             searchText={searchText}
//             setSearchText={setSearchText!}
//           />
//         )}

//         <FullRow icon={<HomeIcon />} label="Home" href="/" index={1} />
//         <FullRow icon={<SubscriptionsIcon />} label="Subscriptions" href="/subscriptions" index={2} />
//         <FullRow icon={<VideoLibraryIcon />} label="Library" href="/library" index={3} />
//         <FullRow icon={<SmartDisplayIcon />} label="Your Videos" href="/yourVideos" index={4} />
//         <FullRow icon={<ThumbUpOffAltIcon />} label="Liked Videos" href="/likedVideo" index={5} />
//         <FullRow icon={<QueueMusicIcon />} label="Playlists" href="/playlists" index={6} />

//         {!isVideoPage && <Subscriptions />}
//         <LeftHeaderEnd />
//       </aside>
//     );
//   }

//   return null;

//   /* =======================
//      ROW COMPONENTS
//   ======================== */

//   function IconRow({ icon, label, href, index }: any) {
//     return (
//       <Link href={href}>
//         <div
//           id={styles.row_icon}
//           style={selected === index ? icon.selected : icon.normal}
//           onClick={() => setSelected(index)}
//           className="flex flex-col items-center text-xs text-white"
//         >
//           {icon}
//           <span>{label}</span>
//         </div>
//       </Link>
//     );
//   }

//   function FullRow({ icon, label, href, index }: any) {
//     return (
//       <Link href={href}>
//         <div
//           id={styles.row}
//           style={selected === index ? full.selected : full.normal}
//           onClick={() => setSelected(index)}
//           className="flex items-center px-4 py-2 text-white"
//         >
//           <span className="mr-2">{icon}</span>
//           {label}
//         </div>
//       </Link>
//     );
//   }
// };

// export default LeftHeader;

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./styles/LeftHeader.module.css";

import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

import Search from "./Search";
import Subscriptions from "./Subscriptions";
import LeftHeaderEnd from "./LeftHeaderEnd";

export type LeftHeaderProps = {
  densityClicked: boolean;
  searchText?: string;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit?: (e: React.FormEvent) => void;
};

const HEADER_HEIGHT = 65;

const LeftHeader: React.FC<LeftHeaderProps> = ({
  densityClicked,
  searchText,
  setSearchText,
  handleSubmit,
}) => {
  const router = useRouter();
  const [selected, setSelected] = useState<number>(1);

  const isLoginPage = router.asPath === "/login";

  if (isLoginPage) return null;

  return (
    <aside
      className={[
        styles.leftHeader,
        densityClicked ? styles.closed : styles.open,
      ].join(" ")}
      style={{ top: HEADER_HEIGHT, paddingTop: "6px" }}
    >
      {/* FULL MODE SEARCH */}
      {!densityClicked && handleSubmit && searchText !== undefined && (
        <div className="px-2 pt-2">
          <Search
            where="leftHeader"
            handleSubmit={handleSubmit}
            searchText={searchText}
            setSearchText={setSearchText!}
          />
        </div>
      )}

      {/* NAV ITEMS */}
      <NavItem
        icon={<HomeIcon />}
        label="Home"
        href="/"
        index={1}
        selected={selected}
        onSelect={setSelected}
        collapsed={densityClicked}
      />

      <NavItem
        icon={<SubscriptionsIcon />}
        label="Subscriptions"
        href="/subscriptions"
        index={2}
        selected={selected}
        onSelect={setSelected}
        collapsed={densityClicked}
      />

      <NavItem
        icon={<VideoLibraryIcon />}
        label="Library"
        href="/library"
        index={3}
        selected={selected}
        onSelect={setSelected}
        collapsed={densityClicked}
      />

      <NavItem
        icon={<SmartDisplayIcon />}
        label="Your Videos"
        href="/yourVideos"
        index={4}
        selected={selected}
        onSelect={setSelected}
        collapsed={densityClicked}
      />

      <NavItem
        icon={<ThumbUpOffAltIcon />}
        label="Liked Videos"
        href="/likedVideo"
        index={5}
        selected={selected}
        onSelect={setSelected}
        collapsed={densityClicked}
      />

      <NavItem
        icon={<QueueMusicIcon />}
        label="Playlists"
        href="/playlists"
        index={6}
        selected={selected}
        onSelect={setSelected}
        collapsed={densityClicked}
      />

      {/* EXTRA SECTIONS ONLY IN FULL MODE */}
      {!densityClicked && (
        <>
          <Subscriptions />
          <LeftHeaderEnd />
        </>
      )}
    </aside>
  );
};

export default LeftHeader;

/* =======================
   INTERNAL COMPONENT
======================= */

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  index: number;
  selected: number;
  onSelect: (i: number) => void;
  collapsed: boolean;
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  href,
  index,
  selected,
  onSelect,
  collapsed,
}) => {
  return (
    <Link href={href}>
      <div
        id={collapsed ? "row_icon" : "row"}
        onClick={() => onSelect(index)}
        className="cursor-pointer text-white"
        style={{
          backgroundColor: selected === index ? "#2d2d2d" : "transparent",
        }}
      >
        <span className={collapsed ? "" : "mr-3"}>{icon}</span>
        {!collapsed && label}
      </div>
    </Link>
  );
};
