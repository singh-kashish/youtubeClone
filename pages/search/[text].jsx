import { useUser } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./[text].module.css";
import VideoSearch from "../../src/components/VideoSearch";
import ProfileSearch from "../../src/components/ProfileSearch";

function searchResults() {
  const user = useUser();
  const Router = useRouter();
  const text = Router.query.text;
  return (
    <div className="xl:ml-[217px]">
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Search Results for {`${text}`}
      </h6>
      <VideoSearch text={text} className=""/>
      <ProfileSearch text={text} />
    </div>
  );
}

export default searchResults;
