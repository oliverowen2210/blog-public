import React, { useState } from "react";
import { useParams } from "react-router-dom";

import socket from "../socket";

export default function PostCommentForm() {
  let posting = false;
  let [username, setUsername] = useState("");
  let [commentText, setCommentText] = useState("");

  const postid = parseInt(useParams().postid);

  async function submitCommentButtonHandler(event) {
    posting = true;
    event.preventDefault();

    if (posting) return;
    try {
      const request = await fetch(
        `${process.env.REACT_APP_BLOG_API_URL}/posts/${postid}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, text: commentText }),
        }
      );

      const commentData = await request.json();
      const comment = commentData.comment;
      socket.emit("user_posted_comment", comment);
      setCommentText("");
    } catch (err) {
      console.log(err);
    }
    posting = false;
  }
  return (
    <form className="userComment">
      <div className="postFormInputGroup userCommentText">
        <label htmlFor="comment">Leave a comment</label>
        <textarea
          name="comment"
          onChange={(event) => setCommentText(event.target.value)}
          value={commentText}
        >
          {commentText}
        </textarea>
      </div>
      <div className="userCommentFooter">
        <div className="postFormInputGroup userCommentUsername">
          <label htmlFor="username">Username (optional)</label>
          <input
            name="username"
            placeholder="Anonymous"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          ></input>
        </div>
        <button
          className="userCommentSubmitButton"
          onClick={submitCommentButtonHandler}
          disabled={!commentText ? true : false}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
