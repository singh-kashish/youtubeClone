import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VIDEO_BY_ID } from "../../../graphql/queries";
import { UPDATE_VIDEO } from "../../../graphql/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "./[video_id].module.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { LineWobble } from "@uiball/loaders";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type FormData = {
  videoTitle: string;
  videoDescription: string;
  thumbnailUrl: string;
  videoUrl: string;
  videoStatus: boolean;
};

function EditVideo() {
  const Router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient<Database>();
  const { loading, error, data } = useQuery(GET_VIDEO_BY_ID, {
    variables: {
      id: Router.query.video_id,
    },
  });
  const video: any = data?.getVideo;
  console.warn(video);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  useEffect(() => {
    setValue("videoTitle", video?.title);
    setValue("videoDescription", video?.description);
    setValue("thumbnailUrl", video?.thumbnailUrl);
    setValue("videoUrl", video?.videoUrl);
    setValue("videoStatus", video?.videoStatus);
  }, [video]);
  function isValidHttpUrl(string: String) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }
  const [thumbnail_url, set_thumbnail_url] = useState("");
  const [video_url, set_video_url] = useState("");
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [updateVideo] = useMutation(UPDATE_VIDEO);
  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading("Saving changes to this video...");
    try {
      formData.thumbnailUrl =
        isValidHttpUrl(formData.thumbnailUrl) === false
          ? ""
          : formData.thumbnailUrl;
      formData.videoUrl =
        isValidHttpUrl(formData.videoUrl) === false ? "" : formData.videoUrl;
      const {
        data: { updateVideo: video },
      } = await updateVideo({
        variables: {
          id: Router.query.video_id,
          user_id: user?.id,
          video_status: formData.videoStatus,
          videoUrl: formData.videoUrl,
          thumbnailUrl: formData.thumbnailUrl,
          title: formData.videoTitle,
          videoStatus: formData.videoStatus,
          description: formData.videoDescription,
          likes: 0,
          dislikes: 0,
          viewCount: 0,
        },
      });
      console.warn(video);
      console.log(video.id);
      toast.success("Changes were saved!", {
        id: notification,
      });
      toast.dismiss();
      Router.push("/");
    } catch (error) {
      toast.error("Whoops something went wrong!", {
        id: notification,
      });
      console.error(error);
    }
  });
  const videoUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setVideoUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        toast.error("You can only select videos.");
        throw new Error("You must select a video to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const allowedfileTypes = [
        "mkv",
        "mp4",
        "webm",
        "flv",
        "f4v",
        "f4p",
        "f4a",
        "f4b",
        "nsv",
        "3gp",
        "mpg",
        "mp2",
        "mpeg",
        "mpe",
        "mpv",
        "mov",
        "m4p",
        "m4v",
        "mov",
      ];
      if (allowedfileTypes.includes(fileExt?.toLowerCase())) {
        const uid = video.id;
        const fileName = `${uid}.${fileExt}`;
        const filePath = `${fileName}`;
        let { data, error: uploadError } = await supabase.storage
          .from("video")
          .upload(filePath, file, { upsert: true });

        if (uploadError) {
          throw uploadError;
        }
        setValue(
          "videoUrl",
          `https://jsoabxvsywdylbhbxecn.supabase.co/storage/v1/object/public/video/${filePath}`
        );
        console.error(data);
      } else {
        toast.error("This file type is not allowed.");
      }
    } catch (error) {
      toast.error("Error uploading Video!");
      console.log(error);
    } finally {
      setVideoUploading(false);
    }
  };
  const uploadThumbnail: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setThumbnailUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const uid = video.id;
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const allowedfileTypes = ["jpeg", "jpg", "png", "hevc"];
      if (allowedfileTypes.includes(fileExt?.toLowerCase())) {
        const fileName = `${uid}.${fileExt}`;
        const filePath = `${fileName}`;
        let { error: uploadError } = await supabase.storage
          .from("thumbnail")
          .upload(filePath, file, { upsert: true });

        if (uploadError) {
          throw uploadError;
        }
        setValue(
          "thumbnailUrl",
          `https://jsoabxvsywdylbhbxecn.supabase.co/storage/v1/object/public/thumbnail/${filePath}`
        );
      } else {
        toast.error("This file type is not allowed.");
      }
    } catch (error) {
      toast.error("Error uploading thumbnail!");
      console.log(error);
    } finally {
      setThumbnailUploading(false);
    }
  };
  if (!video) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xxl m-5">
        <LineWobble size={250} color="red" />
      </div>
    );
  } else if (video && user?.id === video?.user_id) {
    return (
      <div className="mx-5 z-50">
        <h1 className="font-sans font-bold text-xl border-b-2 border-gray-400 w-full text-center text-white mb-1 pb-1">
          Edit the Video
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
              {!watch("videoUrl") && (
                <div
                  onDrop={(e) => {
                    console.log(e);
                    videoUpload(e);
                  }}
                  className="flex-col my-2 h-[120px] px-4 border-dashed border-2 border-sky-500 rounded-3xl bg-gray-800"
                  id={styles.uploadDiv}
                >
                  <div className="button primary block md:w-max">
                    {videoUploading
                      ? "Video Uploading..."
                      : "Upload the video or put the url above"}
                  </div>
                  <div id={styles.upload}>
                    <div>Click Choose File below or drop it here.</div>
                    <UploadFileIcon fontSize="medium" />
                  </div>
                  <div className={styles.inputRow}>
                    <div>
                      <CloudUploadIcon
                        fontSize="large"
                        id={styles.cloudUpload}
                      />
                    </div>
                    <div className="ml-2">
                      <input
                        style={{
                          position: "absolute",
                        }}
                        type="file"
                        id="single"
                        accept="video/*"
                        onChange={videoUpload}
                        disabled={videoUploading}
                        className="w-40 md:w-max"
                      />
                    </div>
                  </div>
                </div>
              )}
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
              {!watch("thumbnailUrl") && (
                <div
                  onDrop={(e) => {
                    console.log(e);
                    uploadThumbnail(e);
                  }}
                  className="flex-col my-2 h-[120px] px-4 border-dashed border-2 border-sky-500 rounded-3xl bg-gray-800"
                  id={styles.uploadDiv}
                >
                  <div className="button primary block md:w-max">
                    {thumbnailUploading
                      ? "Thumbnail Uploading..."
                      : "Upload the thumbnail or put the url above"}
                  </div>
                  <div id={styles.upload}>
                    <div>Click Choose File below or drop it here.</div>
                    <UploadFileIcon fontSize="medium" />
                  </div>
                  <div className={styles.inputRow}>
                    <div>
                      <CloudUploadIcon
                        fontSize="large"
                        id={styles.cloudUpload}
                      />
                    </div>
                    <div className="ml-2">
                      <input
                        style={{
                          position: "absolute",
                        }}
                        type="file"
                        id="single"
                        accept="image/*"
                        onChange={uploadThumbnail}
                        disabled={thumbnailUploading}
                        className="w-40 md:w-max"
                      />
                    </div>
                  </div>
                </div>
              )}
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
                  className="w-full rounded-full p-2 bg-blue-600 text-white"
                >
                  Save Video
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
        <h1>You are not allowed to edit a video created by someone else.</h1>
        <h6 className="text-red-600">UNAUTHORIZED USER</h6>
      </div>
    );
  }
}

export default EditVideo;
