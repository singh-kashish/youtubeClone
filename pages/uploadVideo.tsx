import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import styles from "./styles/uploadVideo.module.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Router, useRouter } from "next/router";
import CustomizedStepper from "../src/components/CustomizedStepper";
import MouseOverPopover from "../src/components/MouseOverPopover";
import uuid from "../src/components/uuid";
import { useAddVideo } from "../src/hooks/useAddVideo";
type FormData = {
  videoTitle: string;
  videoDescription: string;
  thumbnailUrl: string;
  videoUrl: string;
  videoStatus: boolean;
};

function uploadVideo() {
  const Router = useRouter();
  const user = useUser();
  const { submitAuthenticated, loading, error, data } = useAddVideo();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  function isValidHttpUrl(candidate?: string): boolean {
    if (!candidate) return false;
    try {
      const u = new URL(candidate);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }
  const onSubmit = handleSubmit(async (formData) => {
    const notificationId = toast.loading("Creating new video...");
    try {
      if (!user?.id) {
        throw new Error("You must be logged in to upload a video.");
      }
  
      // Normalize URLs BEFORE calling submit
      formData.thumbnailUrl =
        isValidHttpUrl(formData.thumbnailUrl) === false
          ? ""
          : formData.thumbnailUrl || "";
      formData.videoUrl =
        isValidHttpUrl(formData.videoUrl) === false
          ? ""
          : formData.videoUrl || "";
  
      const createdAtIso = new Date().toISOString();
      console.log("Creating video at:", createdAtIso);
  
      // Create the video using the hook (returns inserted row)
      const inserted = await submitAuthenticated(user.id, {
        title: formData.videoTitle,
        description: formData.videoDescription ?? null,
        videoUrl: formData.videoUrl ?? "",
        thumbnailUrl: formData.thumbnailUrl ?? "",
        videoStatus: formData.videoStatus,
        likes: 0,
        dislikes: 0,
        viewCount: 0,
        // created_at is set inside the hook/service; if you want to set it here instead,
        // include `created_at: createdAtIso` in the object and adjust the hook to not override it.
      });
  
      const newVideoId = inserted?.id ?? null;
  
      if (newVideoId) {
        toast.success("New Video Created!", { id: notificationId });
        console.log("New video ID:", newVideoId);
        console.log("User ID:", user.id);
        Router.push(`/video/edit/${newVideoId}`);
      } else {
        // Insert succeeded but no row returned (possible RLS). Fallback UX.
        toast.success("Video created. Redirecting to your profile…", { id: notificationId });
        Router.push(`/profiles/${user.id}`);
      }
    } catch (e: any) {
      console.error("Create video failed:", e);
      toast.error(e?.message || "Whoops, something went wrong!", { id: notificationId });
    } finally {
      // Ensure the loading toast is cleared in all cases
      toast.dismiss(notificationId);
    }
  });
  
  if (user) {
    return (
      <div className="mx-5 z-50" id={styles.main}>
        <h1 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-white mb-1 pb-1">
          Upload a Video
        </h1>
        <form
          onSubmit={onSubmit}
          className="z-50 border-gray-300 p-2 flex flex-col items-center justify-start space-x-2"
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
              <MouseOverPopover message="Can't create a video with an empty title,put a name to show the rest of the form" />
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
                  style={{ color: "black" }}
                />
                <MouseOverPopover message="Put the description for your video, it could be emtpy if you want" />
              </div>
              {/* Upload video start */}
              <div>
                <div className="flex items-center px-2">
                  <label>Video Link:</label>
                  <input
                    {...register("videoUrl")}
                    placeholder="Leave this empty if you want to upload the video to our servers else paste link of video here."
                    className="m-2 flex-1 p-2 outline-none md:min-w-[600px]"
                  />
                  <MouseOverPopover message="If your video is uploaded on some cloud provider like iCloud,put it's url over this input box else, upload your video at the next step" />
                </div>
              </div>
              {/*Upload video ends*/}
              {/* upload thumbnail starts */}
              <div>
                <div className="flex items-center px-2">
                  <label>Thumbnail Link:</label>
                  <input
                    {...register("thumbnailUrl")}
                    placeholder="Leave this empty if you want to upload the thumbnail to our servers, else paste link of thumbnail here."
                    className="m-2 flex-1 p-2 outline-none md:min-w-[600px]"
                  />
                  <MouseOverPopover message="If the thumbnail for the video is uploaded on some cloud provider like iCloud,put it's url over this input box else, upload it at the next step" />
                </div>
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
                <MouseOverPopover message="If you want to save this video as a private video and not show it to other users then select PRIVATE,else select PUBLIC" />
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
                  className="md:w-full rounded-full p-2 bg-blue-600 text-white"
                >
                  Create Video
                </button>
              )}
            </div>
          )}
        </form>
        <CustomizedStepper stepNumber="1" />
      </div>
    );
  } else {
    return (
      <div className="m-[15%] text-center">
        LogIn to the application, you can't upload without logging in.
      </div>
    );
  }
}

export default uploadVideo;
