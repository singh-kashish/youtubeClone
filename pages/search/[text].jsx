import { useUser } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import VideoIcon from "../../components/VideoIcon";
import { LineWobble } from "@uiball/loaders";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import styles from "./[text].module.css";
import VideoSearch from "../../components/VideoSearch";
import ProfileSearch from "../../components/ProfileSearch";

function searchResults() {
  const user = useUser();
  const Router = useRouter();
  const text = Router.query.text;
  return (
    <div className="ml-[217px]">
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Search Results for {`${text}`}
      </h6>
      <VideoSearch text={text} className=""/>
      <ProfileSearch text={text} />
    </div>
  );
}

export default searchResults;
