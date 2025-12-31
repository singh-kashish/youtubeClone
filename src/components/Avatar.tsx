// // // import React, { useEffect, useState } from "react";
// // // import styles from "./styles/Avatar.module.css";

// // // const EXT = ["png", "jpg", "jpeg", "hevc", "webp"] as const;

// // // interface Props {
// // //   uid: string;
// // //   url: string | null | undefined;
// // //   where: "login" | "header" | "video";
// // //   size?: number;
// // //   onUpload?: (filePath: string) => void;
// // // }

// // // const DEFAULT_AVATAR = "/default-avatar.png";

// // // const Avatar: React.FC<Props> = ({
// // //   uid,
// // //   url,
// // //   where,
// // //   size = 40,
// // //   onUpload = () => undefined,
// // // }) => {
// // //   // Only set state if we need to bust cache or fallback
// // //   const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR);

// // //   useEffect(() => {
// // //     // If url is missing or default, use default
// // //     if (!url || url === DEFAULT_AVATAR) {
// // //       setAvatarUrl(DEFAULT_AVATAR);
// // //       return;
// // //     }
// // //     // If url is a public http(s) url, use it directly
// // //     if (url.startsWith("http")) {
// // //       setAvatarUrl(url);
// // //       return;
// // //     }
// // //     // If url is a Supabase storage path, construct public URL
// // //     // (Assume you always store public URLs in your DB after upload)
// // //     // If you want to bust cache, append a query string
// // //     setAvatarUrl(`${url}?t=${Date.now()}`);
// // //   }, [url]);

// // //   const img = (
// // //     <img
// // //       id={styles.img}
// // //       src={avatarUrl}
// // //       alt="avatar"
// // //       style={{ width: size, height: size }}
// // //       className="rounded-full"
// // //       loading="lazy"
// // //       onError={(e) => {
// // //         (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
// // //       }}
// // //     />
// // //   );

// // //   if (where === "login")
// // //     return (
// // //       <div>
// // //         {img}
// // //         {/* ...upload UI if needed... */}
// // //       </div>
// // //     );

// // //   if (where === "header")
// // //     return (
// // //       <div>
// // //         {img}
// // //       </div>
// // //     );

// // //   return img; // where === "video"
// // // };

// // // export default Avatar;

// // import React from "react";
// // import styles from "./styles/Avatar.module.css";

// // interface Props {
// //   uid: string;
// //   url: string | null | undefined;
// //   where: "login" | "header" | "video";
// //   size?: number;
// // }

// // const DEFAULT_AVATAR = "/default-avatar.png";

// // const Avatar: React.FC<Props> = ({
// //   uid,
// //   url,
// //   where,
// //   size = 40,
// // }) => {
// //   const src = !url || url === DEFAULT_AVATAR ? DEFAULT_AVATAR : url;

// //   const img = (
// //     <img
// //       id={styles.img}
// //       src={src}
// //       alt="avatar"
// //       style={{ width: size, height: size }}
// //       className="rounded-full"
// //       loading="lazy"
// //       onError={(e) => {
// //         (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
// //       }}
// //     />
// //   );

// //   if (where === "login" || where === "header") return <div>{img}</div>;
// //   return img; // where === "video"
// // };

// // export default Avatar;
// // src/components/Avatar.tsx
// // import React, { useRef, useState } from "react";
// // import { supabase } from "./utils/supabase";
// // import styles from "./styles/Avatar.module.css";
// // import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// // const EXTENSIONS = ["png", "jpg", "jpeg", "hevc", "webp"] as const;
// // const DEFAULT_AVATAR = "/default-avatar.png";

// // interface Props {
// //   uid: string;
// //   url: string | null | undefined;
// //   where: "login" | "header" | "video";
// //   size?: number;
// //   onUpload?: (publicUrl: string) => void;
// // }

// // const Avatar: React.FC<Props> = ({
// //   uid,
// //   url,
// //   where,
// //   size = 40,
// //   onUpload = () => {},
// // }) => {
// //   const inputRef = useRef<HTMLInputElement>(null);
// //   const [uploading, setUploading] = useState(false);

// //   const src = !url || url === DEFAULT_AVATAR ? DEFAULT_AVATAR : url;

// //   // Avatar image
// //   const img = (
// //     <img
// //       id={styles.img}
// //       src={src}
// //       alt="avatar"
// //       style={{ width: size, height: size }}
// //       className="rounded-full"
// //       loading="lazy"
// //       onError={(e) => {
// //         (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
// //       }}
// //     />
// //   );

// //   // Upload logic (Supabase remove/upload/getPublicUrl)
// //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     setUploading(true);
// //     try {
// //       const ext = file.name.split(".").pop()?.toLowerCase();
// //       if (!ext || !EXTENSIONS.includes(ext as any)) {
// //         alert("Invalid file type.");
// //         return;
// //       }
// //       const path = `${uid}.${ext}`;

// //       // Remove old avatars
// //       await supabase.storage.from("avatars").remove(EXTENSIONS.map((x) => `${uid}.${x}`));

// //       // Upload new avatar
// //       const { error: uploadError } = await supabase.storage
// //         .from("avatars")
// //         .upload(path, file, { upsert: true });
// //       if (uploadError) throw uploadError;

// //       // Get public URL
// //       const { data } = supabase.storage.from("avatars").getPublicUrl(path);
// //       const publicUrl = data?.publicUrl;
// //       if (publicUrl) {
// //         // Add cache buster
// //         const cacheBustedUrl = publicUrl + `?t=${Date.now()}`;
// //         onUpload(cacheBustedUrl);
// //       } else {
// //         alert("Failed to get avatar URL.");
// //       }
// //     } catch (err) {
// //       alert("Error uploading avatar.");
// //       console.error(err);
// //     } finally {
// //       setUploading(false);
// //       e.target.value = "";
// //     }
// //   };

// //   if (where === "login") {
// //     return (
// //       <div style={{ position: "relative", display: "inline-block" }}>
// //         {img}
// //         <button
// //           type="button"
// //           style={{
// //             position: "absolute",
// //             bottom: 0,
// //             right: 0,
// //             background: "#fff",
// //             borderRadius: "50%",
// //             border: "none",
// //             cursor: "pointer",
// //             padding: "4px",
// //           }}
// //           onClick={() => inputRef.current?.click()}
// //           title="Edit Avatar"
// //           disabled={uploading}
// //         >
// //           <CloudUploadIcon fontSize="small" />
// //         </button>
// //         <input
// //           ref={inputRef}
// //           type="file"
// //           accept="image/*"
// //           style={{ display: "none" }}
// //           onChange={handleFileChange}
// //           disabled={uploading}
// //         />
// //       </div>
// //     );
// //   }

// //   if (where === "header") return <div>{img}</div>;
// //   return img; // where === "video"
// // };

// // export default Avatar;

// // src/components/Avatar.tsx
// import React, { useRef, useState } from "react";
// import { supabase } from "./utils/supabase";
// import styles from "./styles/Avatar.module.css";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// const EXTENSIONS = ["png", "jpg", "jpeg", "hevc", "webp"] as const;
// const DEFAULT_AVATAR = "/default-avatar.png";

// export interface AvatarProps {
//   uid: string;
//   url: string | null | undefined;
//   where: "login" | "header" | "video";
//   size?: number;
//   onUpload?: (publicUrl: string) => void;
// }

// const Avatar: React.FC<AvatarProps> = ({
//   uid,
//   url,
//   where,
//   size = 40,
//   onUpload = () => undefined,
// }) => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [uploading, setUploading] = useState<boolean>(false);

//   const src: string = !url || url === DEFAULT_AVATAR ? DEFAULT_AVATAR : url;

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     try {
//       const ext = file.name.split(".").pop()?.toLowerCase();
//       if (!ext || !EXTENSIONS.includes(ext as any)) {
//         alert("Invalid file type.");
//         return;
//       }
//       const path = `${uid}.${ext}`;

//       // Remove old avatars
//       await supabase.storage.from("avatars").remove(EXTENSIONS.map((x) => `${uid}.${x}`));

//       // Upload new avatar
//       const { error: uploadError } = await supabase.storage
//         .from("avatars")
//         .upload(path, file, { upsert: true });
//       if (uploadError) throw uploadError;

//       // Get public URL
//       const { data } = supabase.storage.from("avatars").getPublicUrl(path);
//       const publicUrl = data?.publicUrl;
//       if (publicUrl) {
//         const cacheBustedUrl = publicUrl + `?t=${Date.now()}`;
//         onUpload(cacheBustedUrl);
//       } else {
//         alert("Failed to get avatar URL.");
//       }
//     } catch (err) {
//       alert("Error uploading avatar.");
//       // eslint-disable-next-line no-console
//       console.error(err);
//     } finally {
//       setUploading(false);
//       e.target.value = "";
//     }
//   };

//   const img = (
//     <img
//       id={styles.img}
//       src={src}
//       alt="avatar"
//       style={{ width: size, height: size }}
//       className="rounded-full"
//       loading="lazy"
//       onError={(e) => {
//         (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
//       }}
//     />
//   );

//   if (where === "login") {
//     return (
//       <div style={{ position: "relative", display: "inline-block" }}>
//         {img}
//         <button
//           type="button"
//           style={{
//             position: "absolute",
//             bottom: 0,
//             right: 0,
//             background: "#fff",
//             borderRadius: "50%",
//             border: "none",
//             cursor: "pointer",
//             padding: "4px",
//           }}
//           onClick={() => inputRef.current?.click()}
//           title="Edit Avatar"
//           disabled={uploading}
//         >
//           <CloudUploadIcon fontSize="small" />
//         </button>
//         <input
//           ref={inputRef}
//           type="file"
//           accept="image/*"
//           style={{ display: "none" }}
//           onChange={handleFileChange}
//           disabled={uploading}
//         />
//       </div>
//     );
//   }

//   if (where === "header") return <div>{img}</div>;
//   return img; // where === "video"
// };

// export default Avatar;
import React, { useMemo, useRef, useState } from "react";
import { supabase } from "../utils/supabase";
import styles from "./styles/Avatar.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DEFAULT_AVATAR = "/default-avatar.png";
const EXTENSIONS = ["png", "jpg", "jpeg", "hevc", "webp"] as const;

export interface AvatarProps {
  uid: string;
  url: string | null | undefined;
  where: "login" | "header" | "video";
  size?: number;
  onUpload?: (publicUrl: string) => void;
}

function toPublicUrlFromBucketPath(path: string | null | undefined): string {
  if (!path) return DEFAULT_AVATAR;
  if (/^https?:\/\//i.test(path)) return path;
  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  return data?.publicUrl || DEFAULT_AVATAR;
}

const Avatar: React.FC<AvatarProps> = ({
  uid,
  url,
  where,
  size = 40,
  onUpload = () => undefined,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const src = useMemo(() => {
    const resolved = toPublicUrlFromBucketPath(url || null);
    return resolved || DEFAULT_AVATAR;
  }, [url]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      setUploading(true);
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!ext || !EXTENSIONS.includes(ext as any)) {
        alert("Unsupported image type.");
        return;
      }
      const path = `${uid}.${ext}`;
      await supabase.storage.from("avatars").remove(EXTENSIONS.map((x) => `${uid}.${x}`));
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const publicUrl = data?.publicUrl;
      if (!publicUrl) {
        alert("Failed to get public URL for avatar.");
        return;
      }
      const withBuster = `${publicUrl}?t=${Date.now()}`;
      onUpload(withBuster);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert("Error uploading avatar.");
    } finally {
      setUploading(false);
    }
  };

  const img = (
    <img
      id={styles.img}
      src={src}
      alt="avatar"
      style={{ width: size, height: size }}
      className="rounded-full"
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
      }}
    />
  );

  if (where === "login") {
    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        {img}
        <button
          type="button"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            background: "#fff",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            padding: "4px",
          }}
          onClick={() => inputRef.current?.click()}
          title="Edit Avatar"
          disabled={uploading}
        >
          <CloudUploadIcon fontSize="small" />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
    );
  }

  if (where === "header") return <div>{img}</div>;
  return img; // where === "video"
};

export default Avatar;
