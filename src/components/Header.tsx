// src/components/Header.tsx
import Image from "next/image";
import React from "react";
import styles from "./styles/Header.module.css";
import { Roboto } from "next/font/google";
import DensityMediumRoundedIcon from "@mui/icons-material/DensityMediumRounded";
import Link from "next/link";
import HeaderEnd from "./HeaderEnd";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { changeHeaderDensity } from "../../reduxReducers/HeaderDensitySlice";
import PlayIcon from "../../public/PlayIcon.png";
import { rootState } from "../../store";

const roboto = Roboto({ weight: "900", subsets: ["latin"] });

/* ===================== TYPES ===================== */

export type HeaderProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
};

/* ===================== COMPONENT ===================== */

const Header: React.FC<HeaderProps> = ({
  searchText,
  setSearchText,
  handleSubmit,
}) => {
  const dispatch = useDispatch();

  const densityClicked = useSelector(
  (state: rootState) => state.headerDensity.headerDensityClicked
);


  return (
    <header className={styles.main}>
      {/* LEFT */}
      <div className={styles.headerStart}>
        <DensityMediumRoundedIcon
          onClick={() => dispatch(changeHeaderDensity())}
          className="h-10 w-10 hover:cursor-pointer hover:bg-slate-700 rounded-lg"
        />

        <Link href="/">
          <div className={styles.logoDiv}>
            <Image
              src={PlayIcon}
              alt="logo"
              className="w-16 h-16 mx-2 object-contain"
              priority
            />
            <span className={roboto.className}>FlixPlay</span>
          </div>
        </Link>
      </div>

      {/* CENTER SEARCH */}
      <Search
        where="header"
        handleSubmit={handleSubmit}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {/* RIGHT */}
      <HeaderEnd />
    </header>
  );
};

export default Header;
