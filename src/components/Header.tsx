import Image from "next/image";
import React, { useState } from "react";
import styles from "./styles/Header.module.css";
import { Roboto } from "next/font/google";
import DensityMediumRoundedIcon from "@mui/icons-material/DensityMediumRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import { TextField } from "@mui/material";
import Link from "next/link";
import HeaderEnd from "./HeaderEnd";
import LeftHeader from "./LeftHeader";
import {useRouter} from "next/router";
import { toast } from "react-hot-toast";
import Search from './Search';
import { youtubeIconUrl } from "../utils/constants";
const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});
const Header = () => {
  const router = useRouter();
  const [densityClicked, setDensityClicked] = useState<boolean>(false);
  const [searchText,setSearchText] = useState<string>('');
  const handleSubmit = (e:Event) =>{
    e.preventDefault();
    if(searchText.length>0){
      router.push(`/search/${searchText}`);
    } else{
      toast.error('Please enter some text to search!');
    }
  }
  return (
    <div className={styles.main}>
      <div className={styles.headerStart}>
        <DensityMediumRoundedIcon
          style={{
            marginRight: "-10px",
            marginLeft: "10px",
          }}
          onClick={(e:any) => {
            e.preventDefault();
            setDensityClicked(!densityClicked);
          }}
          className="w-[30px] h-[30px] hover:bg-[rgba(11,11,65,0.75)] hover:text-[rgba(11,11,65,1)] hover:cursor-pointer focus:outline-none  shadow-lg active:shadow-none no-underline rounded-full"
        />
        <LeftHeader densityClicked={densityClicked} handleSubmit={handleSubmit} searchText={searchText} setSearchText={setSearchText}/>
        <Link href="/">
          <div className={styles.logoDiv}>
            <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
              <Image
                src={youtubeIconUrl}
                fill={true}
                alt="1083486789"
                className="object-contain"
              />
            </div>
            <div
              className="text-xl flex-shrink-0 cursor-pointer"
              id={styles.text}
            >
              <span className={roboto.className}>Video Stream||Share App</span>
            </div>
          </div>
        </Link>
      </div>
      <Search handleSubmit={handleSubmit} searchText={searchText} setSearchText={setSearchText} where="header"/>
      <HeaderEnd />
    </div>
  );
};

export default Header;
