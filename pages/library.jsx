import { useQuery } from "@apollo/client";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { GET_PROFILE } from "../graphql/queries";
import styles from "./styles/library.module.css";
import VideoIcon from "../components/VideoIcon";
import Link from "next/link";
import { LineWobble } from "@uiball/loaders";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function library() {
  const user = useUser();
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      id: user?.id,
    },
  });
  const videosFound = () => {
    if (data?.getProfiles?.video.length == 0) {
      return (
        <h6 className="font-sans font-bold text-xl w-full text-center text-red-400 mb-1 pb-1 ml-[50%]">
          You haven't uploaded any video yet
        </h6>
      );
    } else if (!user) {
      return (
        <h6 className="font-sans font-bold text-xl w-full text-center text-red-300 mb-1 pb-1">
          Login First!
        </h6>
      );
    }
  };
  const dataLoader = () => {
    if (!data) {
      return (
        <div className="flex w-full items-center justify-center p-10 text-xxl m-5">
          <LineWobble size={250} color="red" />
        </div>
      );
    } else {
      return (
        <div id={styles.main}>
          {data?.getProfiles?.video?.map((pie) => (
            <div id={styles.col} key={pie.id}>
              <div id={styles.row}>
                <Link href={`/video/edit/${pie.id}`}>
                  <button className="mb-2 mr-2 py-2 px-4 shadow-md no-underline rounded-full bg-emerald-600 text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none">
                    Edit
                    <EditIcon sx={{ fontSize: 15 }} className="ml-2" />
                  </button>
                </Link>
                <Link href={`/video/delete/${pie.id}`}>
                  <button className="mb-2 py-2 px-4 shadow-md no-underline rounded-full bg-red-700 text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none">
                    Delete
                    <DeleteIcon sx={{ fontSize: 15 }} className="ml-2" />
                  </button>
                </Link>
              </div>
              <VideoIcon video={pie} where="library" />
            </div>
          ))}
          {videosFound()}
        </div>
      );
    }
  };
  return (
    <div>
      <h6 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-gray-300 mb-1 pb-1">
        Your Library
      </h6>
      {dataLoader()}
    </div>
  );
}

export default library;
