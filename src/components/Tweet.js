import React from "react";

const Tweet = ({ Tweetobj, isOwner }) => (
  <div>
    <h4>{Tweetobj.text}</h4>
    {isOwner && (
      <>
        <button>Delete Button</button>
        <button>Edit Button</button>
      </>
    )}
  </div>
);

export default Tweet;
