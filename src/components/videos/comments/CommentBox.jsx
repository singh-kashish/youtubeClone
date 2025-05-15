import React, { useState } from "react";
import Avatar from "../../Avatar";
import { toast } from "react-hot-toast";
import uuid from "../../uuid";

function CommentBox({ video, user }) {
  const [comment, setComment] = useState("");
  const [insertComment] = useMutation(MAKE_COMMENT, {
    refetchQueries: [GET_VIDEO_BY_ID],
  });
  const onSubmit = async () => {
    const notification = toast.loading("Posting your comment...");
    try {
      const toInsertId  = uuid();
      const {
        data: { insertComment: newComment },
      } = await insertComment({
        variables: {
          id:toInsertId,
          video_id: video.id,
          text: comment,
          user_id: user.id,
          dislikeCount: 0,
          likeCount: 0,
        },
      });
      toast.success("New Comment Created!", {
        id: notification,
      });
      setComment("");
      toast.dismiss();
    } catch (error) {
      toast.error("Whoops something went wrong while posting that comment !", {
        id: notification,
      });
      console.error(error);
    }
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Avatar
        uid={user?.id}
        url={video.profiles.avatar_url}
        size={55}
        where="video"
      />
      <input
        type="text"
        placeholder="Post your comment"
        style={{ height: "40px", marginLeft: "5px" }}
        className="grow rounded-full pl-[5px] text-black"
        value={comment}
        onChange={(e) => {
          e.preventDefault();
          setComment(e.target.value);
        }}
      />
      <button
        className="ml-2 bg-primary shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none px-4 py-2"
        onClick={onSubmit}
      >
        Post Comment
      </button>
    </div>
  );
}

export default CommentBox;
