import React, { useEffect, useState } from "react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import styles from "./styles/Header.module.css";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Link from "next/link";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import Avatar from "./Avatar";

const HeaderEnd = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [avatar_url, setAvatarUrl] = useState(null);
  const [username, setUsername] = useState(null);
  const [full_name, setFull_name] = useState(null);
  useEffect(() => {
    if (session !== null) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, full_name, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setFull_name(data.full_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {}
  }
  return (
    <div>
      {!session ? (
        <div id={styles.headerEnd}>
          <Link href="/uploadVideo">
            <VideoCallOutlinedIcon
              fontSize="large"
              className={styles.addVideo}
            />
          </Link>
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
        <div className="hidden md:flex space-x-2" id={styles.headerEnd}>
          <Link href="/uploadVideo">
            <VideoCallOutlinedIcon
              fontSize="large"
              className={styles.addVideo}
            />
          </Link>
          <Avatar
            uid={user?.id}
            url={avatar_url}
            size={30}
            where="header"
            onUpload={() => {
              console.log("so many errors");
            }}
          />
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
