import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function PostCommentForm(props) {
  let [commentUsername, setCommentUsername] = useState("");
  let [commentText, setCommentText] = useState("");

  const postID = parseInt(useParams().postid);

  async function submitCommentButtonHandler(event) {
    event.preventDefault();
    try {
      let newComments = [...props.comments];
      newComments.unshift({
        username: commentUsername,
        text: commentText,
        createdAt: new Date(),
        postid: postID,
      });
      props.setComments(newComments);
      setCommentText("");
      setCommentUsername("");
    } catch (err) {
      console.log(err);
    }
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
            onChange={(event) => setCommentUsername(event.target.value)}
            value={commentUsername}
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
