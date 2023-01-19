import React from "react";
import { formatDistanceToNow } from "date-fns";

const CommentsList = function (props) {
  return (
    <div className="commentsList">
      {props.comments.map((comment) => (
        <div className="comment">
          <div className="commentHeader flexRow">
            <h4 className="commentAuthor">{comment.username} says</h4>
            <p className="commentDate">
              {formatDistanceToNow(new Date(comment.createdAt))} ago
            </p>
          </div>
          <p className="commentBody">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
