import React from "react";
import Comment from "./Comment";

const Commentlist = ({comments}) => {

	return comments?.map(comment=>(
        <div key={comment.id} className="comment-stack">
            <Comment comment={comment}/>
        </div>
    ))
};

export default Commentlist;
