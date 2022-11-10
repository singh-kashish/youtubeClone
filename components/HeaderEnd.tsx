import React,{useEffect,useState} from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import styles from "./styles/Header.module.css";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Link from "next/link";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";

const HeaderEnd = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div>
      {!session ? (
        <div id={styles.headerEnd} className="invisible md:visible">
          <div>
            <MoreVertRoundedIcon />
          </div>
          <Link href="/login">
            <div
              className="py-2 px-4 shadow-md no-underline rounded-full"
              id={styles.signIn}
            >
              <AccountCircleRoundedIcon />
              Sign in
            </div>
          </Link>
        </div>
      ) : (
        <div className="space-x-2">
          <VideoCallOutlinedIcon fontSize="large" className={styles.addVideo} />
          <Link href="/">
            <button
              className="py-2 px-4 shadow-md no-underline rounded-full bg-red text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none"
              onClick={() => supabase.auth.signOut()}
              id={styles.signOutButton}
            >
              Sign Out
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderEnd;
