import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import styles from './styles/uploadVideo.module.css';

const uploadVideo = () => {
  const user = useUser();
  if (user) {
    return( 
       <div className="mx-5 z-50 background-white" id={styles.main}>
        
       </div>
    );
  } else {
    return (
      <div className="m-[15%] text-center">
        LogIn to the application, you can't upload without logging in.
      </div>
    );
  }
};

export default uploadVideo;
