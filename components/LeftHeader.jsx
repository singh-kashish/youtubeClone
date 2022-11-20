import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./styles/LeftHeader.module.css";
import Subscriptions from "./Subscriptions";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Link from "next/link";
import LeftHeaderEnd from "./LeftHeaderEnd";

function LeftHeader({ densityClicked }) {
  const [selected, setSelected] = useState(1);
  const Router = useRouter();
  const selectedStyle = {
    backgroundColor: "#3d3d3d",
    borderRadius: "5px",
    height: "45px",
    width: "200px",
    cursor: "pointer",
  };
  const notSelectedStyle = {
    borderRadius: "5px",
    height: "45px",
    width: "200px",
    cursor: "pointer",
  };
  const selectedStyle_icon = {
    backgroundColor: "#3d3d3d",
    borderRadius: "5px",
    height: "45px",
    width: "100px",
    cursor: "pointer",
  };
  const notSelectedStyle_icon = {
    backgroundColor: "#181818",
    borderRadius: "5px",
    height: "45px",
    width: "100px",
    cursor: "pointer",
  };
  const RoutePathValue =
    Router.asPath == "/" ||
    Router.asPath == "/subscriptions" ||
    Router.asPath == "/library" ||
    Router.asPath == "/yourVideos" ||
    Router.asPath == "/likedVideo" ||
    Router.pathname == "/profiles/[user_id]";
  if (densityClicked && RoutePathValue) {
    return (
      <div
        id={styles.leftHeader_icon}
        className="space-y-1 bg-[#181818] min-h-[650px]"
      >
        <Link href="/">
          <div
            style={selected === 1 ? selectedStyle_icon : notSelectedStyle_icon}
            id={styles.row_icon}
            onClick={(e) => {
              setSelected(1);
            }}
            className="shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
          >
            <HomeIcon />
            <h1 className="text-xs font-sans font-light">Home</h1>
          </div>
        </Link>
        <Link href="/subscriptions">
          <div
            id={styles.row_icon}
            style={selected === 2 ? selectedStyle_icon : notSelectedStyle_icon}
            onClick={(e) => {
              setSelected(2);
            }}
            className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
          >
            <SubscriptionsIcon />
            <h1 className="text-xs font-sans font-light">Subscriptions</h1>
          </div>
        </Link>{" "}
        <Link href="/library">
          <div
            className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
            style={selected === 3 ? selectedStyle_icon : notSelectedStyle_icon}
            id={styles.row_icon}
            onClick={(e) => {
              setSelected(3);
            }}
          >
            <VideoLibraryIcon className="mr-2" />
            <h1 className="text-xs font-sans font-light">Library</h1>
          </div>
        </Link>
      </div>
    );
  } else if (!densityClicked && RoutePathValue) {
    return (
      <div
        id={styles.leftHeader}
        className="space-y-1 bg-[#181818] min-h-[650px]"
      >
        <Link href="/">
          <div
            style={selected === 1 ? selectedStyle : notSelectedStyle}
            id={styles.row}
            onClick={(e) => {
              setSelected(1);
            }}
            className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
          >
            <HomeIcon className="mr-2" />
            Home
          </div>
        </Link>
        <Link href="/subscriptions">
          <div
            id={styles.row}
            style={selected === 2 ? selectedStyle : notSelectedStyle}
            onClick={(e) => {
              setSelected(2);
            }}
            className="mb-2 border-b-2 border-b-slate-700 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
          >
            <SubscriptionsIcon className="mr-2" /> Subscriptions
          </div>
        </Link>
        <Link href="/library">
          <div
            className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
            style={selected === 3 ? selectedStyle : notSelectedStyle}
            id={styles.row}
            onClick={(e) => {
              setSelected(3);
            }}
          >
            <VideoLibraryIcon className="mr-2" />
            Library
          </div>
        </Link>
        <Link href="/yourVideos">
          <div
            style={selected === 4 ? selectedStyle : notSelectedStyle}
            className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
            id={styles.row}
            onClick={(e) => {
              setSelected(4);
            }}
          >
            <SmartDisplayIcon className="mr-2" />
            Your Videos
          </div>
        </Link>
        <Link href="/likedVideo">
          <div
            style={selected === 5 ? selectedStyle : notSelectedStyle}
            id={styles.row}
            onClick={(e) => {
              setSelected(5);
            }}
            className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
          >
            <ThumbUpOffAltIcon className="mr-2" />
            Liked Videos
          </div>
        </Link>
        <Subscriptions className="mt-2 border-t-2 border-t-slate-700" />
        <LeftHeaderEnd />
      </div>
    );
  } else if (densityClicked && Router.pathname === "/video/[video_id]") {
    return (
      <div
        id={styles.leftHeader_atVideo_d}
        className="space-y-1 bg-[#181818] min-h-[650px]"
      >
        <Link href="/">
          <div
            style={selected === 1 ? selectedStyle_icon : notSelectedStyle_icon}
            id={styles.row_icon}
            onClick={(e) => {
              setSelected(1);
            }}
            className="shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
          >
            <HomeIcon />
            <h1 className="text-xs font-sans font-light">Home</h1>
          </div>
        </Link>
        <Link href="/subscriptions">
          <div
            id={styles.row_icon}
            style={selected === 2 ? selectedStyle_icon : notSelectedStyle_icon}
            onClick={(e) => {
              setSelected(2);
            }}
            className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
          >
            <SubscriptionsIcon />
            <h1 className="text-xs font-sans font-light">Subscriptions</h1>
          </div>
        </Link>{" "}
        <Link href="/library">
          <div
            className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
            style={selected === 3 ? selectedStyle_icon : notSelectedStyle_icon}
            id={styles.row_icon}
            onClick={(e) => {
              setSelected(3);
            }}
          >
            <VideoLibraryIcon className="mr-2" />
            <h1 className="text-xs font-sans font-light">Library</h1>
          </div>
        </Link>
      </div>
    );
  } else if (!densityClicked && Router.pathname === "/video/[video_id]") {
    return (
      <div
        id={styles.leftHeader_atVideo}
        className="space-y-1 bg-[#181818] min-h-[650px]"
      >
        <Link href="/">
          <div
            style={selected === 1 ? selectedStyle : notSelectedStyle}
            id={styles.row}
            onClick={(e) => {
              setSelected(1);
            }}
            className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
          >
            <HomeIcon className="mr-2" />
            Home
          </div>
        </Link>
        <Link href="/subscriptions">
          <div
            id={styles.row}
            style={selected === 2 ? selectedStyle : notSelectedStyle}
            onClick={(e) => {
              setSelected(2);
            }}
            className="mb-2 border-b-2 border-b-slate-700 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
          >
            <SubscriptionsIcon className="mr-2" /> Subscriptions
          </div>
        </Link>
        <Link href="/library">
          <div
            className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
            style={selected === 3 ? selectedStyle : notSelectedStyle}
            id={styles.row}
            onClick={(e) => {
              setSelected(3);
            }}
          >
            <VideoLibraryIcon className="mr-2" />
            Library
          </div>
        </Link>
        <Link href="/yourVideos">
          <div
            style={selected === 4 ? selectedStyle : notSelectedStyle}
            className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
            id={styles.row}
            onClick={(e) => {
              setSelected(4);
            }}
          >
            <SmartDisplayIcon className="mr-2" />
            Your Videos
          </div>
        </Link>
        <Link href="/likedVideo">
          <div
            style={selected === 5 ? selectedStyle : notSelectedStyle}
            id={styles.row}
            onClick={(e) => {
              setSelected(5);
            }}
            className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
          >
            <ThumbUpOffAltIcon className="mr-2" />
            Liked Videos
          </div>
        </Link>
        <Subscriptions className="mt-2 border-t-2 border-t-slate-700" />
        <LeftHeaderEnd />
      </div>
    );
  } else {
    return (
      <div className="hidden">
        I had to added since , it's not allowed to return empty from a jsx
        element
      </div>
    );
  }
}

export default LeftHeader;
