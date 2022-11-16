import React, { useState } from "react";
import styles from "./styles/EveryComment.module.css";
import Avatar from "./Avatar";
import { Roboto } from "@next/font/google";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";
import { useMutation } from "@apollo/client";
import { GET_VIDEO_BY_ID } from "../graphql/queries";
import { UPDATE_COMMENT, DELETE_COMMENT } from "../graphql/mutations";
import toast from "react-hot-toast";

const roboto = Roboto({ weight: "700" });
const r = Roboto({ weight: "500" });
const EveryComment = ({ comment, user }) => {
  const [editCall, setEditCall] = useState(false);
  const [textForEdit, setTextForEdit] = useState(comment.text);
  const [updateComment] = useMutation(UPDATE_COMMENT, {
    refetchQueries: [GET_VIDEO_BY_ID, "getVideoById"],
  });
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [GET_VIDEO_BY_ID, "getVideoById"],
  });
  const editSubmit = async () => {
    const notification = toast.loading("Saving your comment...");
    try {
      const {
        data: { updateComment: newComment },
      } = await updateComment({
        variables: {
          id: comment.id,
          text: textForEdit,
          user_id: user.id,
        },
      });
      toast.success("Comment was Modified!", {
        id: notification,
      });
      setEditCall(!editCall);
      toast.dismiss();
    } catch (error) {
      toast.error("Whoops something went wrong while saving that comment !", {
        id: notification,
      });
      console.error(error);
    }
  };
  const deleteSubmit = async () => {
    const notification = toast.loading("Deleting comment...");
    try {
      const {
        data: { deleteComment: x },
      } = await deleteComment({
        variables: {
          id: comment.id,
        },
      });
      toast.success("Comment was deleted successfully", {
        id: notification,
      });
    } catch (e) {
      toast.error("Whoops something went wrong while deleting that comment !", {
        id: notification,
      });
      console.error(error);
    }
  };
  const buttonCaller = () => {
    if (comment.user_id === user?.id) {
      return (
        <div>
          <button
            className="py-2 px-4 mr-2 ml-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
            onClick={(e) => {
              e.preventDefault();
              setEditCall(!editCall);
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteSubmit();
            }}
            className="py-2 px-4 mr-2 ml-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
          >
            Delete
          </button>
        </div>
      );
    }
  };
  const editSection = () => {
    if (editCall) {
      return (
        <div>
          <input
            type="text"
            id="edit"
            value={textForEdit}
            onChange={(e) => {
              e.preventDefault();
              setTextForEdit(e.target.value);
            }}
          />
          <button
            className="py-2 px-4 mr-2 ml-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none"
            onClick={(e) => {
              e.preventDefault();
              editSubmit();
            }}
          >
            Save Comment
          </button>
        </div>
      );
    } else {
      return <p className={r.className}>{comment?.text}</p>;
    }
  };
  return (
    <div id={styles.everyComment}>
      <Avatar
        uid={comment?.user_id}
        url={comment?.profiles.avatar_url}
        size={45}
        where="video"
      />
      <div id="column">
        <h1 className={roboto.className}>{comment?.profiles?.full_name}</h1>
        {editSection()}
        <div id={styles.iconLine}>
          <ThumbUpOutlinedIcon
            id={styles.icon}
            className="hover:bg-gray-900 hover:bg-red-light focus:outline-none  shadow-md active:shadow-none no-underline rounded-full"
          />
          {comment.likeCount}
          <ThumbDownAltOutlined
            id={styles.icon}
            className="hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none shadow-md no-underline rounded-full"
          />
          <button className="py-2 px-4 mr-2 ml-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none">
            Reply
          </button>

          {buttonCaller()}
        </div>
      </div>
    </div>
  );
};

export default EveryComment;
