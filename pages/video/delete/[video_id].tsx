import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "./[video_id].module.css";
import VideoShimmer from '../../../src/components/shimmers/VideoShimmer';

type FormData = {
  videoTitle: string;
  videoDescription: string;
  thumbnailUrl: string;
  videoUrl: string;
  videoStatus: boolean;
};

function DeleteVideo() {
  const Router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient<any>();
  // const { loading, error, data } = useQuery(GET_VIDEO_BY_ID, {
  //   variables: {
  //     id: Router.query.video_id,
  //   },
  // });
  // const video: any = data?.video;
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  // useEffect(() => {
  //   setValue("videoTitle", video?.title);
  //   setValue("videoDescription", video?.description);
  //   setValue("thumbnailUrl", video?.thumbnailUrl);
  //   setValue("videoUrl", video?.videoUrl);
  //   setValue("videoStatus", video?.videoStatus);
  // }, [video]);
  // const [deleteVideo] = useMutation(DELETE_VIDEO);
  // const onSubmit = handleSubmit(async (formData) => {
  //   const notification = toast.loading("Removing this video...");
  //   try {
  //     const {
  //       data: { deleteVideo: video },
  //     } = await deleteVideo({
  //       variables: {
  //         id: Router.query.video_id,
  //       },
  //     });
  //     toast.success("Video is removed!", {
  //       id: notification,
  //     });
  //     toast.dismiss();
  //     Router.push("/");
  //   } catch (error) {
  //     toast.error("Whoops something went wrong!", {
  //       id: notification,
  //     });
  //   }
  // });

  if (!video) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xxl m-5">
        <VideoShimmer/>
      </div>
    );
  } else if (video && user?.id === video?.user_id) {
    return (
      <div className="mx-5 z-50">
        <h1 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-white mb-1 pb-1">
          Delete this Video?
        </h1>
        <form
          className="z-50 border-gray-300 p-2 flex flex-col items-center justify-start space-x-2"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col items-start space-x-8">
            <div className="flex items-center px-2">
              <p className="md:min-w-[90px]">Video Title:</p>
              <input
                className="m-2 flex-1 rounded-md p-2 outline-none md:min-w-[600px]"
                {...register("videoTitle", { required: true })}
                disabled={!user}
                type="text"
                placeholder="Type the title of the video (required)"
              />
            </div>
          </div>
          {!!watch("videoTitle") && (
            <div className="flex flex-col py-2">
              <div className="flex items-center px-2">
                <p className="md:min-w-[90px]">Description:</p>
                <input
                  className="m-2 flex-1 p-2 outline-none md:min-w-[600px]"
                  {...register("videoDescription")}
                  type="text"
                  placeholder="Text (optional)"
                  style={{ color: "white" }}
                />
              </div>
              {/* Upload video start */}
              <div>
                <label>Video Link:</label>
                <input
                  {...register("videoUrl")}
                  placeholder="Leave this empty if you want to upload the video to our servers else paste link of video here."
                  className="m-2 flex-1 p-2 outline-none md:min-w-[600px]"
                />
              </div>
              {/*Upload video ends*/}
              {/* upload thumbnail starts */}
              <div>
                <label>Thumbnail Link:</label>
                <input
                  {...register("thumbnailUrl")}
                  placeholder="Leave this empty if you want to upload the thumbnail to our servers, else paste link of thumbnail here."
                  className="m-2 flex-1 p-2 outline-none md:min-w-[600px]"
                />
              </div>

              {/* upload thumbnail ends */}
              <div className="flex items-center px-4 ml-2 mb-2">
                <p className="pr-4">Video Visibility:</p>
                <select
                  {...register("videoStatus", { required: true })}
                  className="w-40 md:w-160 "
                >
                  <option value="true">PUBLIC</option>
                  <option value="false">PRIVATE</option>
                </select>
              </div>
              {/*Error Handling with react-hook-form */}
              {Object.keys(errors).length > 0 && (
                <div className="space-y-2 p-2 text-red-500">
                  {errors.videoTitle?.type === "required" && (
                    <p> A Video Title is required</p>
                  )}
                </div>
              )}
              {!!watch("videoTitle") && (
                <button
                  type="submit"
                  className="w-full rounded-full p-2 bg-red-600 text-white"
                >
                  Confirm: DELETE Video
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h1>You are not allowed to delte a video created by someone else.</h1>
        <h6 className="text-red-600">UNAUTHORIZED USER</h6>
      </div>
    );
  }
}

export default DeleteVideo;
