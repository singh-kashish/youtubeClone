import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
import styles from "./styles/Avatar.module.css";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
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
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };
  const message = avatarUrl
    ? "Upload another image for your profile picture, hit update below to save."
    : "Upload another image for your profile picture.";
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
        <div className="flex-col mb-4 px-4 border-dashed border-2 border-sky-500 rounded-3xl">
          <label className="button primary block md:w-max" htmlFor="single">
            {uploading
              ? "Uploading ..."
              : `${message}`}
          </label>
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
}
