import Image from "next/image";
import React, { useState } from "react";
import styles from "./styles/Header.module.css";
import { Roboto } from "@next/font/google";
import DensityMediumRoundedIcon from "@mui/icons-material/DensityMediumRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import { TextField } from "@mui/material";
import Link from "next/link";
import HeaderEnd from "./HeaderEnd";
import LeftHeader from "./LeftHeader";

const roboto = Roboto({
  weight: "700",
});
const Header = () => {
  const [densityClicked, setDensityClicked] = useState<boolean>(false);
  return (
    <div className={styles.main}>
      <div className={styles.headerStart}>
        <DensityMediumRoundedIcon
          style={{
            marginRight: "-10px",
            marginLeft: "10px",
          }}
          onClick={(e) => {
            e.preventDefault();
            setDensityClicked(!densityClicked);
          }}
          className="hover:bg-[#3d3d3d] hover:cursor-pointer focus:outline-none  shadow-md active:shadow-none no-underline rounded-full"
        />
        <LeftHeader densityClicked={densityClicked} />
        <Link href="/">
          <div className={styles.logoDiv}>
            <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
              <Image
                objectFit="contain"
                src="https://www.youtube.com/s/desktop/4965577f/img/favicon_144x144.png"
                layout="fill"
                alt="1083486789"
              />
            </div>
            <div
              className="text-xl flex-shrink-0 cursor-pointer"
              id={styles.text}
            >
              <span className={roboto.className}>YouTube Clone</span>
            </div>
          </div>
        </Link>
      </div>
      <div id={styles.headerMiddle} className="invisible md:visible">
        <form className="flex flex-1 items-center jutify-between space-x-2 rounded-full border border-[#3d3d3d] px-1 py-1">
          <div>
            <input
              type="text"
              placeholder="Search Youtube clone"
              className={styles.input}
            />
            <button type="submit" hidden />
          </div>
          <div className="">
            <SearchRoundedIcon
              id={styles.search}
              className="py-2 px-4 shadow-md no-underline rounded-full"
            />
          </div>
        </form>
        <MicRoundedIcon className={styles.mic} />
      </div>
      <HeaderEnd />
    </div>
  );
};

export default Header;
