import React from "react";
import { dbService } from "../fbase";

const Tweet = ({ Tweetobj, isOwner }) => {

  const onDeleteClick = async () => {
    const ok = window.confirm("트윗을 지울까요?");
    console.log(ok)
    if (ok) {
      await dbService.doc(`tweets/${Tweetobj.id}`).delete();
    }
  }
  
  return(
  <div>
    <h4>{Tweetobj.text}</h4>
    {isOwner && (
      <>
        <button onClick={onDeleteClick}>Delete Button</button>
        <button>Edit Button</button>
      </>
    )}
  </div>
  );
};

export default Tweet;
