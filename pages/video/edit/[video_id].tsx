// pages/video/edit/[video_id].tsx
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { supabase } from "../../../src/components/utils/supabase";
import { videoService } from "../../../src/modules/videoService";
import { useUpdateVideo } from "../../../src/hooks/useUpdateVideo";
import { VideoWithProfile } from "../../../src/types/UnifiedVideoTypes";
import CustomizedStepper from "../../../src/components/CustomizedStepper";
import AutoResizeTextarea from "../../../src/components/AutoResizeTextarea";
import UploadingLabel from "../../../src/components/UploadingLabel";

type FormData = {
  title: string;
  description?: string | null;
  videoUrl?: string;
  thumbnailUrl?: string;
  videoStatus: "true" | "false";
};

function isValidHttpUrl(candidate?: string): boolean {
  if (!candidate) return false;
  try {
    const u = new URL(candidate);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const EditVideo: React.FC = () => {
  const router = useRouter();
  const { video_id } = router.query as { video_id?: string };
  const user = useUser();

  const [loadingFetch, setLoadingFetch] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [video, setVideo] = useState<VideoWithProfile | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm<FormData>();

  const { submit: updateVideo, loading: updating, error: updateError } =
    useUpdateVideo();

  // Uploading / uploaded states
  const [videoUploading, setVideoUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [videoUploadedDone, setVideoUploadedDone] = useState(false);
  const [thumbnailUploadedDone, setThumbnailUploadedDone] = useState(false);

  // Progress states
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [thumbProgress, setThumbProgress] = useState<number>(0);

  // Keep track of last filePaths so we can clean up
  const lastVideoFilePath = useRef<string | null>(null);
  const lastThumbnailFilePath = useRef<string | null>(null);

  // Stepper
  const activeStep = 2;

  // Fetch & populate form
  useEffect(() => {
    const run = async () => {
      if (!video_id) return;
      setLoadingFetch(true);
      setFetchError(null);
      try {
        const res = await videoService.fetchVideoById(video_id);
        if (res.error) {
          setFetchError(res.error.message ?? "Failed to fetch video");
          setVideo(null);
          return;
        }
        const v = res.VideoWithProfile;
        setVideo(v);
        if (v) {
          reset({
            title: v.title ?? "",
            description: v.description ?? "",
            videoUrl: v.videoUrl ?? "",
            thumbnailUrl: v.thumbnailUrl ?? "",
            videoStatus: v.videoStatus ? "true" : "false",
          });
        }
      } catch (e: any) {
        setFetchError(e?.message || "Unknown error while fetching video");
        setVideo(null);
      } finally {
        setLoadingFetch(false);
      }
    };
    run();
  }, [video_id, reset]);

  const isOwner = !!(user?.id && video?.user_id && user.id === video.user_id);

  // Helper: remove a file in bucket
  const removeFile = async (bucket: string, path: string | null) => {
    if (!path) return;
    try {
      await supabase.storage.from(bucket).remove([path]);
    } catch (err) {
      console.warn("Failed to remove file:", bucket, path, err);
    }
  };

  // Video upload handler with progress (standard upload method, works for small files)
  const videoUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setVideoUploading(true);
      setVideoProgress(0);
      setVideoUploadedDone(false);

      if (!event.target.files || event.target.files.length === 0) {
        toast.error("You can only select videos.");
        return;
      }
      const file: File = event.target.files[0];

      // Bucket limit warning check (for free plan)
      const maxAllowedMB = 50; // total bucket limit
      if (file.size / (1024 * 1024) > maxAllowedMB) {
        toast.error(`Video too large: must be under ${maxAllowedMB}MB`);
        return;
      }

      const fileExt = file.name.split(".").pop() ?? "";
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
        "mp3",
        "aac",
        "wav",
      ];
      if (!allowedfileTypes.includes(fileExt.toLowerCase())) {
        toast.error("This file type is not allowed.");
        return;
      }

      const uid = video?.id;
      if (!uid) {
        toast.error("Missing video id for upload path.");
        return;
      }

      const fileName = `${uid}.${fileExt}`;
      const filePath = fileName; // no folder subpath

      // If there's an old video file, delete it first (to save space)
      await removeFile("video", lastVideoFilePath.current);
      lastVideoFilePath.current = filePath;

      // SUPABASE: standard upload (for small files). It doesn't support progress events.
      const { data, error: uploadError } = await supabase.storage
        .from("video")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Cannot track progress via supabase.upload, so immediately set progress to 100
      setVideoProgress(100);

      const publicUrl = supabase.storage
        .from("video")
        .getPublicUrl(filePath).data?.publicUrl;
      if (publicUrl) {
        setValue("videoUrl", publicUrl);
      }

      toast.success("Video uploaded!");
      setVideoUploadedDone(true);
    } catch (error: any) {
      console.error("Error uploading Video:", error);
      toast.error("Error uploading Video!");
    } finally {
      setVideoUploading(false);
      if (event?.target) event.target.value = "";
    }
  };

  // Thumbnail upload handler with progress
  const uploadThumbnail: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setThumbnailUploading(true);
      setThumbProgress(0);
      setThumbnailUploadedDone(false);

      if (!event.target.files || event.target.files.length === 0) {
        toast.error("You must select an image to upload.");
        return;
      }
      const file: File = event.target.files[0];

      const fileExt = file.name.split(".").pop() ?? "";
      const allowedfileTypes = ["jpeg", "jpg", "png", "hevc", "webp"];
      if (!allowedfileTypes.includes(fileExt.toLowerCase())) {
        toast.error("This file type is not allowed.");
        return;
      }

      const uid = video?.id;
      if (!uid) {
        toast.error("Missing video id for upload path.");
        return;
      }
      const fileName = `${uid}.${fileExt}`;
      const filePath = fileName;

      // Delete old thumbnail first
      await removeFile("thumbnail", lastThumbnailFilePath.current);
      lastThumbnailFilePath.current = filePath;

      const { error: uploadError } = await supabase.storage
        .from("thumbnail")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      setThumbProgress(100);

      const publicUrl = supabase.storage
        .from("thumbnail")
        .getPublicUrl(filePath).data?.publicUrl;
      if (publicUrl) {
        setValue("thumbnailUrl", publicUrl);
      }

      toast.success("Thumbnail uploaded!");
      setThumbnailUploadedDone(true);
    } catch (error: any) {
      console.error("Error uploading thumbnail:", error);
      toast.error("Error uploading thumbnail!");
    } finally {
      setThumbnailUploading(false);
      if (event?.target) event.target.value = "";
    }
  };

  const onSubmit = handleSubmit(async (formData) => {
    const notificationId = toast.loading("Saving changes...");
    try {
      if (!user?.id) throw new Error("You must be logged in to edit a video.");
      if (!video_id) throw new Error("Invalid video id.");

      const normalizedThumbnailUrl =
        isValidHttpUrl(formData.thumbnailUrl) === false
          ? ""
          : formData.thumbnailUrl || "";
      const normalizedVideoUrl =
        isValidHttpUrl(formData.videoUrl) === false
          ? ""
          : formData.videoUrl || "";

      await updateVideo({
        id: video_id,
        title: formData.title?.trim(),
        description: (formData.description ?? "") || "",
        videoUrl: normalizedVideoUrl,
        thumbnailUrl: normalizedThumbnailUrl,
        videoStatus: formData.videoStatus === "true",
      });

      if (updateError) {
        throw new Error(updateError.message ?? "Update failed");
      }

      toast.success("Changes saved. Redirecting to video page…", {
        id: notificationId,
      });
      router.push(`/video/${video_id}`);
    } catch (e: any) {
      console.error("Update failed:", e);
      toast.error(e?.message || "Whoops, something went wrong!", {
        id: notificationId,
      });
    } finally {
      toast.dismiss(notificationId);
    }
  });

  if (loadingFetch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading video...</div>
      </div>
    );
  }

  if (fetchError || !video) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Video Not Found</h1>
        <h6 className="text-red-600 mt-2">
          ERROR: {fetchError || "Unknown error"}
        </h6>
        <button
          onClick={() => router.push("/")}
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto mb-4 bg-zinc-700 p-4 rounded-lg shadow-md shadow-red-600">
        <CustomizedStepper stepNumber={String(activeStep)} />
      </div>

      <div className="max-w-3xl mx-auto bg-[#1f1f1f] rounded-lg p-4 shadow-lg shadow-black/30">
        <h1 className="text-xl font-bold text-white mb-4">Edit Video</h1>

        {!isOwner && (
          <div className="text-yellow-400 mb-4">
            You are not the owner of this video. Upload and editing are disabled.
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-300 mb-1">Title</label>
            <input
              className="w-full rounded-md p-2 outline-none bg-[#2b2b2b] text-white border border-gray-600 focus:border-blue-500"
              {...register("title", { required: true })}
              type="text"
              placeholder="Video title"
              disabled={!isOwner || updating}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </div>

          {/* Description */}
          <div className="min-h-fit">
            <label className="block text-gray-300 mb-1">Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <AutoResizeTextarea
                  className="w-full rounded-md p-2 outline-dashed outline-1 outline-gray-400 bg-[#2b2b2b] text-white border border-gray-600 focus:border-blue-500 resize-none"
                  placeholder="Optional description"
                  disabled={!isOwner || updating}
                  rows={1}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-gray-300 mb-1">Visibility</label>
            <select
              className="w-40 rounded-md p-2 bg-[#2b2b2b] text-white border border-gray-600 focus:border-blue-500"
              {...register("videoStatus", { required: true })}
              disabled={!isOwner || updating}
            >
              <option value="true">PUBLIC</option>
              <option value="false">PRIVATE</option>
            </select>
          </div>

          {/* Video URL + Upload */}
          <div className="bg-[#2a2a2a] rounded-md p-3 border border-gray-700">
            <label className="block text-gray-300 mb-1">Video URL</label>
            <input
              className="w-full rounded-md p-2 outline-none bg-[#242424] text-white border border-gray-600 focus:border-blue-500"
              {...register("videoUrl")}
              placeholder="Leave empty if you want to upload to our bucket"
              disabled={!isOwner || updating || videoUploading}
            />
            <div className="mt-3">
              <UploadingLabel
                defaultText="Upload video file<5MB"
                uploadingText="Uploading video"
                uploadedText="Video uploaded"
                uploading={videoUploading}
                uploaded={videoUploadedDone}
                progress={videoProgress}
              />
              <input
                type="file"
                accept=".mkv,.mp4,.webm,.flv,.f4v,.f4p,.f4a,.f4b,.nsv,.3gp,.mpg,.mp2,.mpeg,.mpe,.mpv,.mov,.m4p,.m4v,.mp3,.aac,.wav"
                onChange={videoUpload}
                disabled={!isOwner || updating || videoUploading}
                className="text-gray-300"
              />
              <p className="text-xs text-gray-400 mt-1">
                Allowed: mkv, mp4, webm, flv, f4v, f4p, f4a, f4b, nsv, 3gp,
                mpg, mp2, mpeg, mpe, mpv, mov, m4p, m4v, mp3, aac, wav.
              </p>
              <p className="text-xs text-yellow-300 mt-1">
                NOTE: Total bucket size is 50MB. Please upload smaller files.
              </p>
            </div>
          </div>

          {/* Thumbnail URL + Upload */}
          <div className="bg-[#2a2a2a] rounded-md p-3 border border-gray-700">
            <label className="block text-gray-300 mb-1">Thumbnail URL</label>
            <input
              className="w-full rounded-md p-2 outline-none bg-[#242424] text-white border border-gray-600 focus:border-blue-500"
              {...register("thumbnailUrl")}
              placeholder="Leave empty if you want to upload to our bucket"
              disabled={!isOwner || updating || thumbnailUploading}
            />
            <div className="mt-3">
              <UploadingLabel
                defaultText="Upload thumbnail image"
                uploadingText="Uploading thumbnail"
                uploadedText="Thumbnail uploaded"
                uploading={thumbnailUploading}
                uploaded={thumbnailUploadedDone}
                progress={thumbProgress}
              />
              <input
                type="file"
                accept=".jpeg,.jpg,.png,.hevc,.webp"
                onChange={uploadThumbnail}
                disabled={!isOwner || updating || thumbnailUploading}
                className="text-gray-300"
              />
              <p className="text-xs text-gray-400 mt-1">
                Allowed: jpeg, jpg, png, hevc, webp.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 shadow-md shadow-black/30"
              disabled={!isOwner || updating}
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;
