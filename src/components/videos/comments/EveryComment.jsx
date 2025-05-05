import React, { useState, useEffect } from "react";
import styles from "../../styles/EveryComment.module.css";
import Avatar from "../../Avatar";
import { Roboto } from "next/font/google";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";
// import {
//   GET_VIDEO_BY_ID,
//   GET_LIKES_ON_COMMENT_USING_COMMENT_ID,
// } from "../../graphql/queries";
// import {
//   UPDATE_COMMENT,
//   DELETE_COMMENT,
//   ADD_LIKE_ON_COMMENT,
//   REMOVE_LIKE_ON_COMMENT,
//   MODIFY_LIKE_ON_COMMENT,
// } from "../../graphql/mutations";
import toast from "react-hot-toast";
import uuid from "../../uuid";

const roboto = Roboto({ weight: "700", subsets: ["latin"] });
const r = Roboto({ weight: "500", subsets: ["latin"] });
const EveryComment = ({ comment, user }) => {
  const [editCall, setEditCall] = useState(false);
  const [textForEdit, setTextForEdit] = useState(comment.text);
  const [updateComment] = useMutation(UPDATE_COMMENT, {
    refetchQueries: [GET_VIDEO_BY_ID],
  });
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [GET_VIDEO_BY_ID],
  });
  const [like, setLike] = useState();
  const [likeId, setLikeId] = useState();
  // const { data, loading, error } = useQuery(
  //   GET_LIKES_ON_COMMENT_USING_COMMENT_ID,
  //   {
  //     variables: {
  //       id: comment?.id,
  //     },
  //   }
  // );
  // const [insertLikedComments] = useMutation(ADD_LIKE_ON_COMMENT, {
  //   refetchQueries: [
  //     GET_LIKES_ON_COMMENT_USING_COMMENT_ID,
  //     "likedCommentsUsingLikedComments_comment_id_fkey",
  //   ],
  // });

  // const [deleteLikedComments] = useMutation(REMOVE_LIKE_ON_COMMENT, {
  //   refetchQueries: [
  //     GET_LIKES_ON_COMMENT_USING_COMMENT_ID,
  //     "likedCommentsUsingLikedComments_comment_id_fkey",
  //   ],
  // });

  // const [updateLikedComments] = useMutation(MODIFY_LIKE_ON_COMMENT, {
  //   refetchQueries: [
  //     GET_LIKES_ON_COMMENT_USING_COMMENT_ID,
  //     "likedCommentsUsingLikedComments_comment_id_fkey",
  //   ],
  // });
  const upVote = async (typeOfLike) => {
    if (!user) {
      toast("Hey, You need to sign in to be able to vote!");
      return;
    }
    // UpVote exists , again hitting upvote removes your vote, thereby deleting it
    else if (like && typeOfLike) {
      toast("Removing your Like!");
      const {
        data: { deleteLikedComments: oldLike },
      } = await deleteLikedComments({
        variables: {
          id: likeId,
        },
      });
      toast("Your like was successfully removed!");

      return;
    }
    // DownVote exists, again hitting downvote removes your vote,thereby deleting it
    else if (like === false && !typeOfLike) {
      toast("Removing your Unlike");
      const {
        data: { deleteLikedComments: oldLike },
      } = await deleteLikedComments({
        variables: {
          id: likeId,
        },
      });
      toast("Your unlike was removed successfully!");

      return;
    }
    // upvote exists, but the user want to downvote ...  so we modify the existing row in the votes table
    else if (like === true && typeOfLike === false) {
      toast("Changing your Like to Unlike");
      await updateLikedComments({
        variables: {
          id: likeId,
          like: typeOfLike,
        },
      });
      toast("Changed to Unlike!");
    }
    // vote exists as a downvote but the user wants to change to upvote , so modify the row in the vote table
    else if (like === false && typeOfLike === true) {
      toast("Changing your Unlike to Like!");
      await updateLikedComments({
        variables: {
          id: likeId,
          like: typeOfLike,
        },
      });
      toast("Changed to Like!");
    } else {
      toast("Inserting your Like!");
      const toInsertID = uuid();
      const {
        data: { addLike: newLike },
      } = await insertLikedComments({
        variables: {
          id: toInsertID,
          comment_id: comment?.id,
          user_id: user.id,
          like: typeOfLike,
        },
      });
      toast("Your like was inserted!");
    }
  };

  const displayLikes = (data) => {
    const likes = data?.likedCommentsUsingLikedComments_comment_id_fkey;
    const displayNumber = likes?.reduce(
      (total, vote) => (vote.like ? (total += 1) : total),
      0
    );

    if (likes?.length === 0) return 0;
    return displayNumber;
  };
  const displayUnlikes = (data) => {
    const likes = data?.likedCommentsUsingLikedComments_comment_id_fkey;
    const displayNumber = likes?.reduce(
      (total, vote) => (vote.like === false ? (total += 1) : total),
      0
    );

    if (likes?.length === 0) return 0;
    return displayNumber;
  };
  useEffect(() => {
    console.log(data);
    const likes = data?.likedCommentsUsingLikedComments_comment_id_fkey;
    const like = likes?.find((vote) => vote.user_id === user?.id)?.like;
    const likeId = likes?.find((vote) => vote.user_id === user?.id)?.id;
    setLike(like);
    setLikeId(likeId);
  }, [data]);
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
            className="rounded-full text-black px-2"
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
        size={35}
        where="video"
      />
      <div id="column" className="ml-1">
        <h1 className={roboto.className}>{comment?.profiles?.full_name}</h1>
        {editSection()}
        <div id={styles.iconLine}>
          <div>
            <ThumbUpOutlinedIcon
              id={like ? styles.iconLiked : styles.icon}
              className="hover:bg-gray-900 hover:bg-red-light focus:outline-none  shadow-md active:shadow-none no-underline rounded-full"
              onClick={(e) => {
                e.preventDefault();
                upVote(true);
              }}
            />
            {displayLikes(data)}
          </div>
          <div>
            <ThumbDownAltOutlined
              id={like === false ? styles.iconLiked : styles.icon}
              className="hover:bg-gray-900 hover:bg-red-light focus:outline-none active:shadow-none shadow-md no-underline rounded-full"
              onClick={(e) => {
                e.preventDefault();
                upVote(false);
              }}
            />
            {displayUnlikes(data)}
          </div>
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
