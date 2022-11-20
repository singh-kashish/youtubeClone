import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import styles from "./styles/Avatar.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Link from "next/link";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { DotSpinner } from "@uiball/loaders";

export default function Avatar({ uid, url, size, onUpload, where }) {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const allowedfileTypes = ["jpeg", "jpg", "png", "hevc"];
      if (allowedfileTypes.includes(fileExt?.toLowerCase())) {
        const fileName = `${uid}.${fileExt}`;
        const filePath = `${fileName}`;

        let { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file, { upsert: true });

        if (uploadError) {
          throw uploadError;
        }

        onUpload(filePath);
      } else {
        alert("This file type is not allowed.");
      }
    } catch (error) {
      alert("Error uploading avatar!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };
  const message = avatarUrl
    ? "Upload another image for your profile picture, hit update below to save."
    : "Upload an image for your profile picture.";
  const returnSpinner = () => {
    if (uploading) {
      return (
        <div className="flex">
          <p className="mr-2">Uploading...</p>
          <DotSpinner size={30} speed={0.9} color="orange" />
        </div>
      );
    } else {
      return <span>{message}</span>;
    }
  };
  if (where === "login") {
    return (
      <div className="my-2">
        <div className="font-sans font-bold text-lg flex items-center">
          Current Profile Avatar
          <img
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full ml-1"
            style={{ height: size, width: size }}
          />
        </div>
        <div
          className="flex-col my-2 h-[120px] px-4 border-dashed border-2 border-sky-500 rounded-3xl bg-gray-800"
          id={styles.uploadDiv}
        >
          <div className="button primary block md:w-max">{returnSpinner()}</div>
          <div id={styles.upload}>
            <div>Click Choose File below or drop it here.</div>
            <UploadFileIcon fontSize="medium" />
          </div>
          <div className={styles.inputRow}>
            <div>
              <CloudUploadIcon fontSize="large" id={styles.cloudUpload} />
            </div>
            <div className="ml-2">
              <input
                style={{
                  position: "absolute",
                }}
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
                className="w-40 md:w-max"
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (where === "header") {
    return (
      <div className="font-sans font-semibold text-md">
        <Link href="/login">
          <button className="flex items-center h-9 px-3 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="rounded-full mr-1"
              style={{ height: size, width: size }}
            />
            Edit Profile
          </button>
        </Link>
      </div>
    );
  } else if (where === "video") {
    const link = `profile/${uid}`;
    return (
      <div className="font-sans font-semibold text-md">
        <Link href={link}>
          <img
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full mr-1"
            style={{ height: size, width: size }}
          />
        </Link>
      </div>
    );
  } else {
    return (
      <div className="hidden">
        <h1>I had to be written cause returning empty is invalid.</h1>
      </div>
    );
  }
}
