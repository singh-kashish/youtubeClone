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
