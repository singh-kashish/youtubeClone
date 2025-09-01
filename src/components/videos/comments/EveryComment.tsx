// import React, { useState } from "react";
// import styles from "../../styles/EveryComment.module.css";
// import Avatar from "../../Avatar";
// import { Roboto } from "next/font/google";
// import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

// const roboto = Roboto({ weight: "700", subsets: ["latin"] });
// const r = Roboto({ weight: "500", subsets: ["latin"] });

// interface Profile {
//   id: string;
//   username?: string | null;
//   full_name?: string | null;
//   avatar_url?: string | null;
//   updated_at?: string | null;
// }

// interface CommentType {
//   id: string;
//   text: string;
//   created_at?: string;
//   user_id: string;
//   profiles: Profile;
//   likeCount?: number;
//   dislikeCount?: number;
//   likedComments?: any[];
// }

// interface EveryCommentProps {
//   comment: CommentType;
//   user: any;
// }

// const EveryComment: React.FC<EveryCommentProps> = ({ comment, user }) => {
//   const [editCall, setEditCall] = useState(false);
//   const [textForEdit, setTextForEdit] = useState(comment.text);
// // needs diplay of likes/dislikes and whether user has liked/disliked and on upVote function
//   const buttonCaller = () => {
//     if (comment.user_id === user?.id) {
//       return (
//         <div>
//           <button
//             className="py-2 px-4 mr-2 ml-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
//             onClick={(e) => {
//               e.preventDefault();
//               setEditCall(!editCall);
//             }}
//           >
//             Edit
//           </button>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               // deleteSubmit();
//             }}
//             className="py-2 px-4 mr-2 ml-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
//           >
//             Delete
//           </button>
//         </div>
//       );
//     }
//   };

//   const editSection = () => {
//     if (editCall) {
//       return (
//         <div>
//           <input
//             type="text"
//             id="edit"
//             value={textForEdit}
//             onChange={(e) => {
//               e.preventDefault();
//               setTextForEdit(e.target.value);
//             }}
//             className="rounded-full text-black px-2"
//           />
//           <button
//             className="py-2 px-4 mr-2 ml-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
//             onClick={(e) => {
//               e.preventDefault();
//               // editSubmit();
//             }}
//           >
//             Save Comment
//           </button>
//         </div>
//       );
//     } else {
//       return <p className={r.className}>{comment?.text}</p>;
//     }
//   };

//   return (
//     <div id={styles.everyComment}>
//       <Avatar
//         uid={comment?.user_id}
//         url={comment?.profiles?.avatar_url || "/default-avatar.png"}
//         size={35}
//         where="video"
//       />
//       <div id="column" className="ml-1">
//         <h1 className={roboto.className}>
//           {comment?.profiles?.full_name ||
//             comment?.profiles?.username ||
//             "Unknown"}
//         </h1>
//         {editSection()}
//         <div id={styles.iconLine}>
//           <div>
//             <ThumbUpOutlinedIcon
//               id={styles.icon}
//               className="hover:bg-gray-900 hover:bg-red-light focus:outline-none  shadow-md active:shadow-none no-underline rounded-full"
//               onClick={(e) => {
//                 e.preventDefault();
//                 upVote(true);
//               }}
//             />
//           </div>
//           <div>
//             <ThumbDownAltOutlinedIcon
//               id={styles.icon}
//               className="hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none shadow-md no-underline rounded-full"
//               onClick={(e) => {
//                 e.preventDefault();
//                 upVote(false);
//               }}
//             />
//           </div>
//           <button className="py-2 px-4 mr-2 ml-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none">
//             Reply
//           </button>
//           {buttonCaller()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EveryComment;
// Working version below,
// import React, { useMemo, useState } from "react";
// import Avatar from "../../Avatar";
// import { addLikeOnComment, removeLikeOnComment, modifyLikeOnComment } from "../../../modules/comment";
// import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
// import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";
// import { useUser } from "@supabase/auth-helpers-react";
// import toast from "react-hot-toast";
// import { CommentWithProfile } from "../../../types/VideoLoadTypes";

// interface Props { comment: CommentWithProfile }

// const EveryComment: React.FC<Props> = ({ comment }) => {
//   const user = useUser();
//   const [likes, setLikes] = useState(comment?.likedComments ?? []);

//   const myVote = useMemo(() => likes.find((l: any) => l.user_id === user?.id), [likes, user?.id]);

//   const vote = async (like: boolean) => {
//     if (!user) return toast.error("Login to vote");
//     try {
//       if (myVote && myVote.like === like) {
//         await removeLikeOnComment(myVote.id);
//         return setLikes((p) => p.filter((l: any) => l.id !== myVote.id));
//       }
//       if (myVote) {
//         await modifyLikeOnComment(myVote.id, like);
//         return setLikes((p) => p.map((l: any) => (l.id === myVote.id ? { ...l, like } : l)));
//       }
//       const data  = await addLikeOnComment({
//         id: crypto.randomUUID(),
//         comment_id: comment?.id,
//         user_id: user.id,
//         like,
//       } as any);
//       setLikes((p) => [...p, data]);
//     } catch (e: any) {
//       toast.error(e.message);
//     }
//   };

//   const likeCount = likes.filter((l: any) => l.like).length;
//   const dislikeCount = likes.filter((l: any) => l.like === false).length;

//   return (
//     <div className="flex space-x-2">
//       <Avatar uid={comment?.user_id || ""} url={comment?.profiles?.avatar_url || "/default-avatar.png"} where="video" size={35} />
//       <div>
//         <p className="font-bold">{comment?.profiles?.username ?? "Unknown"}</p>
//         <p>{comment?.text}</p>
//         <div className="flex space-x-4 text-sm mt-1">
//           <span onClick={() => vote(true)} className={`cursor-pointer ${myVote?.like ? "text-blue-400" : ""}`}>
//             <ThumbUpOutlined fontSize="inherit" /> {likeCount}
//           </span>
//           <span
//             onClick={() => vote(false)}
//             className={`cursor-pointer ${myVote && myVote.like === false ? "text-blue-400" : ""}`}
//           >
//             <ThumbDownAltOutlined fontSize="inherit" /> {dislikeCount}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EveryComment;

// new Code below
// import React, { useMemo, useState } from "react";
// import Avatar from "../../Avatar";
// import { addLikeOnComment, removeLikeOnComment, modifyLikeOnComment, updateComment, deleteComment } from "../../../modules/comment";
// import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
// import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";
// import { User } from "@supabase/auth-helpers-react";
// import toast from "react-hot-toast";
// import { CommentWithProfile } from "../../../types/VideoLoadTypes";

// interface Props {
//   comment: CommentWithProfile;
//   user: User | null;
// }

// const EveryComment: React.FC<Props> = ({ comment, user }) => {
//   const [likes, setLikes] = useState<CommentWithProfile["likedComments"]>(comment?.likedComments ?? []);
//   const [editCall, setEditCall] = useState<boolean>(false);
//   const [textForEdit, setTextForEdit] = useState<string>(comment.text || "");

//   const myVote = useMemo(
//     () => likes?.find((l) => l.user_id === user?.id),
//     [likes, user?.id]
//   );
//   const likeCount = likes?.filter((l) => l.like).length || 0;
//   const dislikeCount = likes?.filter((l) => l.like === false).length || 0;

//   const vote = async (like: boolean) => {
//     if (!user) return toast.error("Login to vote");
//     try {
//       if (myVote && myVote.like === like) {
//         await removeLikeOnComment(myVote.id);
//         setLikes((p) => p?.filter((l) => l.id !== myVote.id));
//       } else if (myVote) {
//         await modifyLikeOnComment(myVote.id, like);
//         setLikes((p) => p?.map((l) => (l.id === myVote.id ? { ...l, like } : l)));
//       } else {
//         const data = await addLikeOnComment({
//           comment_id: comment?.id,
//           user_id: user.id,
//           like,
//         });
//         setLikes((p) => [...(p || []), data]);
//       }
//     } catch (e: any) {
//       toast.error(e.message);
//     }
//   };

//   const handleEdit = async () => {
//     try {
//       await updateComment(comment.id, textForEdit);
//       setEditCall(false);
//       toast.success("Comment updated!");
//     } catch (e: any) {
//       toast.error("Failed to update comment.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteComment(comment.id);
//       toast.success("Comment deleted!");
//       // Optionally: remove from UI here if you want
//     } catch (e: any) {
//       toast.error("Failed to delete comment.");
//     }
//   };

//   return (
//     <div className="flex space-x-2">
//       <Avatar uid={comment?.user_id || ""} url={comment?.profiles?.avatar_url || "/default-avatar.png"} where="video" size={35} />
//       <div>
//         <p className="font-bold">{comment?.profiles?.username ?? "Unknown"}</p>
//         {editCall ? (
//           <div>
//             <input
//               type="text"
//               value={textForEdit}
//               onChange={(e) => setTextForEdit(e.target.value)}
//               className="rounded-full text-black px-2"
//             />
//             <button
//               className="py-1 px-3 ml-2 rounded bg-blue-600 text-white"
//               onClick={handleEdit}
//             >
//               Save
//             </button>
//             <button
//               className="py-1 px-3 ml-2 rounded bg-gray-600 text-white"
//               onClick={() => setEditCall(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <p>{comment?.text}</p>
//         )}
//         <div className="flex space-x-4 text-sm mt-1">
//           <span onClick={() => vote(true)} className={`cursor-pointer ${myVote?.like ? "text-blue-400" : ""}`}>
//             <ThumbUpOutlined fontSize="inherit" /> {likeCount}
//           </span>
//           <span
//             onClick={() => vote(false)}
//             className={`cursor-pointer ${myVote && myVote.like === false ? "text-blue-400" : ""}`}
//           >
//             <ThumbDownAltOutlined fontSize="inherit" /> {dislikeCount}
//           </span>
//           {comment?.user_id === user?.id && (
//             <>
//               <button className="ml-2 text-blue-400" onClick={() => setEditCall(true)}>Edit</button>
//               <button className="ml-2 text-red-400" onClick={handleDelete}>Delete</button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EveryComment;

// Latest working code
// import React, { useMemo, useState } from "react";
// import Avatar from "../../Avatar";
// import {
//   addLikeOnComment,
//   removeLikeOnComment,
//   modifyLikeOnComment,
//   updateComment,
//   deleteComment,
// } from "../../../modules/comment";
// import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
// import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";
// import { User } from "@supabase/auth-helpers-react";
// import toast from "react-hot-toast";
// import { CommentWithProfile } from "../../../types/VideoLoadTypes";
// import { LikedComment } from "../../../types/Comment";

// interface Props {
//   comment: CommentWithProfile;
//   user: User | null;
// }

// const EveryComment: React.FC<Props> = ({ comment, user }) => {
//   // likedComments is an array of LikedComment
//   const [likes, setLikes] = useState<LikedComment[]>(comment?.likedComments ?? []);
//   const [editCall, setEditCall] = useState<boolean>(false);
//   const [textForEdit, setTextForEdit] = useState<string>(comment.text || "");

//   // Find the current user's vote, if any
//   const myVote = useMemo<LikedComment | undefined>(
//     () => likes.find((l: LikedComment) => l.user_id === user?.id),
//     [likes, user?.id]
//   );
//   const likeCount = likes.filter((l) => l.like === true).length;
//   const dislikeCount = likes.filter((l) => l.like === false).length;

//   const vote = async (like: boolean) => {
//     if (!user) return toast.error("Login to vote");
//     try {
//       if (myVote && myVote.like === like) {
//         await removeLikeOnComment(myVote.id);
//         setLikes((p) => p.filter((l) => l.id !== myVote.id));
//       } else if (myVote) {
//         await modifyLikeOnComment(myVote.id, like);
//         setLikes((p) => p.map((l) => (l.id === myVote.id ? { ...l, like } : l)));
//       } else {
//         const data: LikedComment = await addLikeOnComment({
//           comment_id: comment.id,
//           user_id: user.id,
//           like,
//         });
//         setLikes((p) => [...p, data]);
//       }
//     } catch (e: any) {
//       toast.error(e.message);
//     }
//   };

//   const handleEdit = async () => {
//     try {
//       await updateComment(comment.id, textForEdit);
//       setEditCall(false);
//       toast.success("Comment updated!");
//     } catch (e: any) {
//       toast.error("Failed to update comment.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteComment(comment.id);
//       toast.success("Comment deleted!");
//       // Optionally: remove from UI here if you want
//     } catch (e: any) {
//       toast.error("Failed to delete comment.");
//     }
//   };

//   return (
//     <div className="flex space-x-2">
//       <Avatar
//         uid={comment.user_id || ""}
//         url={comment.profiles?.avatar_url || "/default-avatar.png"}
//         where="video"
//         size={35}
//       />
//       <div>
//         <p className="font-bold">{comment.profiles?.username ?? "Unknown"}</p>
//         {editCall ? (
//           <div>
//             <input
//               type="text"
//               value={textForEdit}
//               onChange={(e) => setTextForEdit(e.target.value)}
//               className="rounded-full text-black px-2"
//             />
//             <button
//               className="py-1 px-3 ml-2 rounded bg-blue-600 text-white"
//               onClick={handleEdit}
//             >
//               Save
//             </button>
//             <button
//               className="py-1 px-3 ml-2 rounded bg-gray-600 text-white"
//               onClick={() => setEditCall(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <p>{comment.text}</p>
//         )}
//         <div className="flex space-x-4 text-sm mt-1">
//           <span
//             onClick={() => vote(true)}
//             className={`cursor-pointer ${myVote?.like === true ? "text-blue-400" : ""}`}
//           >
//             <ThumbUpOutlined fontSize="inherit" /> {likeCount}
//           </span>
//           <span
//             onClick={() => vote(false)}
//             className={`cursor-pointer ${myVote?.like === false ? "text-blue-400" : ""}`}
//           >
//             <ThumbDownAltOutlined fontSize="inherit" /> {dislikeCount}
//           </span>
//           {comment.user_id === user?.id && (
//             <>
//               <button className="ml-2 text-blue-400" onClick={() => setEditCall(true)}>
//                 Edit
//               </button>
//               <button className="ml-2 text-red-400" onClick={handleDelete}>
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EveryComment;


// Latest working code with types fixed
// import React, { useMemo, useState } from "react";
// import Avatar from "../../Avatar";
// import {
//   addLikeOnComment,
//   removeLikeOnComment,
//   modifyLikeOnComment,
//   updateComment,
//   deleteComment,
// } from "../../../modules/comment";
// import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
// import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";
// import { User } from "@supabase/auth-helpers-react";
// import toast from "react-hot-toast";
// import { CommentWithProfile } from "../../../types/VideoLoadTypes";
// import { LikedComment } from "../../../types/Comment";

// interface Props {
//   comment: CommentWithProfile | null | undefined;
//   user: User | null;
// }

// const EveryComment: React.FC<Props> = ({ comment, user }) => {
//   if (!comment) return null; // Type guard

//   const [likes, setLikes] = useState<LikedComment[]>(comment.likedComments ?? []);
//   const [editCall, setEditCall] = useState<boolean>(false);
//   const [textForEdit, setTextForEdit] = useState<string>(comment.text || "");

//   const myVote = useMemo<LikedComment | undefined>(
//     () => likes.find((l: LikedComment) => l.user_id === user?.id),
//     [likes, user?.id]
//   );
//   const likeCount = likes.filter((l) => l.like === true).length;
//   const dislikeCount = likes.filter((l) => l.like === false).length;

//   const vote = async (like: boolean) => {
//     if (!user) return toast.error("Login to vote");
//     try {
//       if (myVote && myVote.like === like) {
//         await removeLikeOnComment(myVote.id);
//         setLikes((p) => p.filter((l) => l.id !== myVote.id));
//       } else if (myVote) {
//         await modifyLikeOnComment(myVote.id, like);
//         setLikes((p) => p.map((l) => (l.id === myVote.id ? { ...l, like } : l)));
//       } else {
//         const data: LikedComment = await addLikeOnComment({
//           comment_id: comment.id,
//           user_id: user.id,
//           like,
//         });
//         setLikes((p) => [...p, data]);
//       }
//     } catch (e: any) {
//       toast.error(e.message);
//     }
//   };

//   const handleEdit = async () => {
//     try {
//       await updateComment(comment.id, textForEdit);
//       setEditCall(false);
//       toast.success("Comment updated!");
//     } catch (e: any) {
//       toast.error("Failed to update comment.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteComment(comment.id);
//       toast.success("Comment deleted!");
//       // Optionally: remove from UI here if you want
//     } catch (e: any) {
//       toast.error("Failed to delete comment.");
//     }
//   };

//   return (
//     <div className="flex space-x-2">
//       <Avatar
//         uid={comment.user_id || ""}
//         url={comment.profiles?.avatar_url || "/default-avatar.png"}
//         where="video"
//         size={35}
//       />
//       <div>
//         <p className="font-bold">{comment.profiles?.username ?? "Unknown"}</p>
//         {editCall ? (
//           <div>
//             <input
//               type="text"
//               value={textForEdit}
//               onChange={(e) => setTextForEdit(e.target.value)}
//               className="rounded-full text-black px-2"
//             />
//             <button
//               className="py-1 px-3 ml-2 rounded bg-blue-600 text-white"
//               onClick={handleEdit}
//             >
//               Save
//             </button>
//             <button
//               className="py-1 px-3 ml-2 rounded bg-gray-600 text-white"
//               onClick={() => setEditCall(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <p>{comment.text}</p>
//         )}
//         <div className="flex space-x-4 text-sm mt-1">
//           <span
//             onClick={() => vote(true)}
//             className={`cursor-pointer ${myVote?.like === true ? "text-blue-400" : ""}`}
//           >
//             <ThumbUpOutlined fontSize="inherit" /> {likeCount}
//           </span>
//           <span
//             onClick={() => vote(false)}
//             className={`cursor-pointer ${myVote?.like === false ? "text-blue-400" : ""}`}
//           >
//             <ThumbDownAltOutlined fontSize="inherit" /> {dislikeCount}
//           </span>
//           {comment.user_id === user?.id && (
//             <>
//               <button className="ml-2 text-blue-400" onClick={() => setEditCall(true)}>
//                 Edit
//               </button>
//               <button className="ml-2 text-red-400" onClick={handleDelete}>
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EveryComment;


// latest working code with types fixed and null checks
// import React, { useMemo, useState } from "react";
// import Avatar from "../../Avatar";
// import {
//   addLikeOnComment,
//   removeLikeOnComment,
//   modifyLikeOnComment,
//   updateComment,
//   deleteComment,
// } from "../../../modules/comment";
// import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
// import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";
// import { User } from "@supabase/auth-helpers-react";
// import toast from "react-hot-toast";
// import { CommentWithProfile } from "../../../types/VideoLoadTypes";
// import { LikedComment } from "../../../types/Comment";

// interface Props {
//   comment: CommentWithProfile;
//   user: User | null;
//   setComments: React.Dispatch<React.SetStateAction<CommentWithProfile[]>>;
// }

// const EveryComment: React.FC<Props> = ({ comment, user, setComments }) => {
//   // All required fields are present in CommentWithProfile, so no null checks needed
//   const [likes, setLikes] = useState<LikedComment[]>(comment.likedComments ?? []);
//   const [editCall, setEditCall] = useState<boolean>(false);
//   const [textForEdit, setTextForEdit] = useState<string>(comment.text ?? "");

//   const myVote = useMemo<LikedComment | undefined>(
//     () => likes.find((l) => l.user_id === user?.id),
//     [likes, user?.id]
//   );
//   const likeCount = likes.filter((l) => l.like === true).length;
//   const dislikeCount = likes.filter((l) => l.like === false).length;

//   const vote = async (like: boolean) => {
//     if (!user) return toast.error("Login to vote");
//     try {
//       if (myVote && myVote.like === like) {
//         await removeLikeOnComment(myVote.id);
//         setLikes((p) => p.filter((l) => l.id !== myVote.id));
//       } else if (myVote) {
//         await modifyLikeOnComment(myVote.id, like);
//         setLikes((p) => p.map((l) => (l.id === myVote.id ? { ...l, like } : l)));
//       } else {
//         const data: LikedComment = await addLikeOnComment({
//           comment_id: comment.id,
//           user_id: user.id,
//           like,
//         });
//         setLikes((p) => [...p, data]);
//       }
//     } catch (e: any) {
//       toast.error(e.message);
//     }
//   };

//   const handleEdit = async () => {
//     try {
//       const updated = await updateComment(comment.id, textForEdit);
//       setEditCall(false);
//       setComments((prev) =>
//         prev.map((c) =>
//           c?.id === comment?.id
//             ? {
//                 ...c,
//                 text: updated.text ?? c.text,
//                 created_at: c.created_at,
//                 dislikeCount: c.dislikeCount,
//                 id: c.id,
//                 likeCount: c.likeCount,
//                 user_id: c.user_id,
//                 video_id: c.video_id,
//                 profiles: c.profiles,
//                 likedComments: c.likedComments ?? [],
//               }
//             : c
//         )
//       );
//       toast.success("Comment updated!");
//     } catch (e: any) {
//       toast.error("Failed to update comment.");
//     }
//   };

//   const handleDelete = async () => {
//     if(comment && comment.id){
//     try {
//         await deleteComment(comment.id);
//         setComments((prev) => prev.filter((c:CommentWithProfile) => c?.id !== comment.id));
//         toast.success("Comment deleted!");
//       }
//         catch (e: any) {
//       toast.error("Failed to delete comment.");
//     }}
//   };

//   return (
//     <div className="flex space-x-2">
//       <Avatar
//         uid={comment?.user_id || ""}
//         url={comment?.profiles?.avatar_url || "/default-avatar.png"}
//         where="video"
//         size={35}
//       />
//       <div>
//         <p className="font-bold">{comment?.profiles?.username ?? "Unknown"}</p>
//         {editCall ? (
//           <div>
//             <input
//               type="text"
//               value={textForEdit}
//               onChange={(e) => setTextForEdit(e.target.value)}
//               className="rounded-full text-black px-2"
//             />
//             <button
//               className="py-1 px-3 ml-2 rounded bg-blue-600 text-white"
//               onClick={handleEdit}
//             >
//               Save
//             </button>
//             <button
//               className="py-1 px-3 ml-2 rounded bg-gray-600 text-white"
//               onClick={() => setEditCall(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <p>{comment?.text}</p>
//         )}
//         <div className="flex space-x-4 text-sm mt-1">
//           <span
//             onClick={() => vote(true)}
//             className={`cursor-pointer ${myVote?.like === true ? "text-blue-400" : ""}`}
//           >
//             <ThumbUpOutlined fontSize="inherit" /> {likeCount}
//           </span>
//           <span
//             onClick={() => vote(false)}
//             className={`cursor-pointer ${myVote?.like === false ? "text-blue-400" : ""}`}
//           >
//             <ThumbDownAltOutlined fontSize="inherit" /> {dislikeCount}
//           </span>
//           {comment.user_id === user?.id && (
//             <>
//               <button className="ml-2 text-blue-400" onClick={() => setEditCall(true)}>
//                 Edit
//               </button>
//               <button className="ml-2 text-red-400" onClick={handleDelete}>
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EveryComment;

//Newest working code with types fixed and null checks
// import React, { useMemo, useState } from "react";
// import Avatar from "../../Avatar";
// import {
//   addLikeOnComment,
//   removeLikeOnComment,
//   modifyLikeOnComment,
//   updateComment,
//   deleteComment,
// } from "../../../modules/comment";
// import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
// import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";
// import { User } from "@supabase/auth-helpers-react";
// import toast from "react-hot-toast";
// import { CommentWithProfile } from "../../../types/VideoLoadTypes";
// import { LikedComment } from "../../../types/Comment";

// interface Props {
//   comment: CommentWithProfile;
//   user: User | null;
//   setComments: React.Dispatch<React.SetStateAction<CommentWithProfile[]>>;
// }

// const EveryComment: React.FC<Props> = ({ comment, user, setComments }) => {
//   const [likes, setLikes] = useState<LikedComment[]>(comment.likedComments ?? []);
//   const [editCall, setEditCall] = useState<boolean>(false);
//   const [textForEdit, setTextForEdit] = useState<string>(comment.text ?? "");

//   const myVote = useMemo<LikedComment | undefined>(
//     () => likes.find((l) => l.user_id === user?.id),
//     [likes, user?.id]
//   );
//   const likeCount = likes.filter((l) => l.like === true).length;
//   const dislikeCount = likes.filter((l) => l.like === false).length;

//   const vote = async (like: boolean) => {
//     if (!user) return toast.error("Login to vote");
//     try {
//       if (myVote && myVote.like === like) {
//         await removeLikeOnComment(myVote.id);
//         setLikes((p) => p.filter((l) => l.id !== myVote.id));
//       } else if (myVote) {
//         await modifyLikeOnComment(myVote.id, like);
//         setLikes((p) => p.map((l) => (l.id === myVote.id ? { ...l, like } : l)));
//       } else {
//         const data: LikedComment = await addLikeOnComment({
//           comment_id: comment?.id,
//           user_id: user.id,
//           like,
//         });
//         setLikes((p) => [...p, data]);
//       }
//     } catch (e: any) {
//       toast.error(e.message);
//     }
//   };

//   const handleEdit = async () => {
//     if(comment){
//       try {
//         const updated = await updateComment(comment.id, textForEdit);
//         setEditCall(false);
//         setComments((prev) =>
//           prev.map((c) =>
//             c?.id === comment.id
//               ? {
//                   ...c,
//                   text: updated.text ?? c.text,
//                   created_at: c.created_at,
//                   dislikeCount: c.dislikeCount,
//                   id: c.id,
//                   likeCount: c.likeCount,
//                   user_id: c.user_id,
//                   video_id: c.video_id,
//                   profiles: c.profiles,
//                   likedComments: c.likedComments ?? [],
//                 }
//               : c
//           )
//         );
//         toast.success("Comment updated!");
//       } catch (e: any) {
//         toast.error("Failed to update comment.");
//       }
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteComment(comment.id);
//       setComments((prev) => prev.filter((c) => c.id !== comment.id));
//       toast.success("Comment deleted!");
//     } catch (e: any) {
//       toast.error("Failed to delete comment.");
//     }
//   };

//   return (
//     <div className="flex space-x-2">
//       <Avatar
//         uid={comment.user_id || ""}
//         url={comment.profiles?.avatar_url || "/default-avatar.png"}
//         where="video"
//         size={35}
//       />
//       <div>
//         <p className="font-bold">{comment.profiles?.username ?? "Unknown"}</p>
//         {editCall ? (
//           <div>
//             <input
//               type="text"
//               value={textForEdit}
//               onChange={(e) => setTextForEdit(e.target.value)}
//               className="rounded-full text-black px-2"
//             />
//             <button
//               className="py-1 px-3 ml-2 rounded bg-blue-600 text-white"
//               onClick={handleEdit}
//             >
//               Save
//             </button>
//             <button
//               className="py-1 px-3 ml-2 rounded bg-gray-600 text-white"
//               onClick={() => setEditCall(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <p>{comment.text}</p>
//         )}
//         <div className="flex space-x-4 text-sm mt-1">
//           <span
//             onClick={() => vote(true)}
//             className={`cursor-pointer ${myVote?.like === true ? "text-blue-400" : ""}`}
//           >
//             <ThumbUpOutlined fontSize="inherit" /> {likeCount}
//           </span>
//           <span
//             onClick={() => vote(false)}
//             className={`cursor-pointer ${myVote?.like === false ? "text-blue-400" : ""}`}
//           >
//             <ThumbDownAltOutlined fontSize="inherit" /> {dislikeCount}
//           </span>
//           {comment.user_id === user?.id && (
//             <>
//               <button className="ml-2 text-blue-400" onClick={() => setEditCall(true)}>
//                 Edit
//               </button>
//               <button className="ml-2 text-red-400" onClick={handleDelete}>
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EveryComment;


// Chatgpt code below
// src/components/comments/EveryComment.tsx
import React, { useMemo, useState } from 'react';
import Avatar from '../../Avatar';
import {
  addLikeOnComment,
  removeLikeOnComment,
  modifyLikeOnComment,
  updateComment,
  deleteComment,
} from '../../../modules/comment';
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlined from '@mui/icons-material/ThumbDownAltOutlined';
import toast from 'react-hot-toast';
import type { CommentWithProfile } from '../../../types/VideoLoadTypes';
import type { LikedCommentsRow } from '../../utils/supabase';
import type { User } from '@supabase/auth-helpers-react';

interface Props {
  comment: CommentWithProfile;
  user: User | null;
  setComments: React.Dispatch<React.SetStateAction<CommentWithProfile[]>>;
}

const EveryComment: React.FC<Props> = ({ comment, user, setComments }) => {
  const [likes, setLikes] = useState<LikedCommentsRow[]>(comment.likedComments ?? []);
  const [editCall, setEditCall] = useState(false);
  const [textForEdit, setTextForEdit] = useState(comment.text ?? '');

  const myVote = useMemo(() => likes.find((l) => l.user_id === user?.id), [likes, user?.id]);
  const likeCount = likes.filter((l) => l.like === true).length;
  const dislikeCount = likes.filter((l) => l.like === false).length;

  const vote = async (like: boolean) => {
    if (!user?.id) return toast.error('Login to vote');
    try {
      if (myVote && myVote.like === like) {
        await removeLikeOnComment(myVote.id);
        setLikes((prev) => prev.filter((l) => l.id !== myVote.id));
      } else if (myVote) {
        await modifyLikeOnComment(myVote.id, like);
        setLikes((prev) => prev.map((l) => (l.id === myVote.id ? { ...l, like } : l)));
      } else {
        const data = await addLikeOnComment({
          comment_id: comment.id,
          user_id: user.id,
          like,
        });
        setLikes((prev) => [...prev, data]);
      }
    } catch (err: any) {
      toast.error(err?.message ?? 'Voting failed');
    }
  };

  const handleEdit = async () => {
    if (!comment) return toast.error('Comment not available');
    try {
      const updated = await updateComment(comment.id, textForEdit);
      setEditCall(false);
      setComments((prev) =>
        prev.map((c) =>
          c.id === comment.id
            ? { ...c, text: updated.text ?? c.text }
            : c
        )
      );
      toast.success('Comment updated!');
    } catch {
      toast.error('Failed to update comment.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      setComments((prev) => prev.filter((c) => c.id !== comment.id));
      toast.success('Comment deleted!');
    } catch {
      toast.error('Failed to delete comment.');
    }
  };

  return (
    <div className="flex space-x-2">
      <Avatar
        uid={comment.user_id ?? ''}
        url={comment.profiles?.avatar_url ?? '/default-avatar.png'}
        where="video"
        size={35}
      />
      <div>
        <p className="font-bold">{comment.profiles?.username ?? 'Unknown'}</p>
        {editCall ? (
          <div>
            <input
              type="text"
              value={textForEdit}
              onChange={(e) => setTextForEdit(e.target.value)}
              className="rounded-full text-black px-2"
            />
            <button onClick={handleEdit} className="py-1 px-3 ml-2 rounded bg-blue-600 text-white">
              Save
            </button>
            <button onClick={() => setEditCall(false)} className="py-1 px-3 ml-2 rounded bg-gray-600 text-white">
              Cancel
            </button>
          </div>
        ) : (
          <p>{comment.text}</p>
        )}
        <div className="flex space-x-4 text-sm mt-1">
          <span
            onClick={() => vote(true)}
            className={`cursor-pointer${myVote?.like === true ? ' text-blue-400' : ''}`}
          >
            <ThumbUpOutlined fontSize="inherit" /> {likeCount}
          </span>
          <span
            onClick={() => vote(false)}
            className={`cursor-pointer${myVote?.like === false ? ' text-blue-400' : ''}`}
          >
            <ThumbDownAltOutlined fontSize="inherit" /> {dislikeCount}
          </span>
          {user?.id === comment.user_id && (
            <>
              <button onClick={() => setEditCall(true)} className="ml-2 text-blue-400">
                Edit
              </button>
              <button onClick={handleDelete} className="ml-2 text-red-400">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EveryComment;


