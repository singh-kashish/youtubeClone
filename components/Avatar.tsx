import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
import styles from "./styles/Avatar.module.css";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Link from "next/link";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function Avatar({
  where,
  uid,
  url,
  size,
  onUpload,
}: {
  where: string;
  uid: string;
  url: Profiles["avatar_url"];
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = useSupabaseClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
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

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
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
          onDrop={(e) => {
            console.log(e);
            uploadAvatar(e);
          }}
          className="flex-col my-2 h-[120px] px-4 border-dashed border-2 border-sky-500 rounded-3xl bg-gray-800"
          id={styles.uploadDiv}
        >
          <label className="button primary block md:w-max" htmlFor="single">
            {uploading ? "Uploading ..." : `${message}`}
          </label>
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
  }
}
