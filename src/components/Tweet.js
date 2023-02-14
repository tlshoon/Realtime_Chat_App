import React, { useState } from "react";
import { dbService } from "../fbase";

const Tweet = ({ Tweetobj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(Tweetobj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("트윗을 지울까요?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`tweets/${Tweetobj.id}`).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`tweets/${Tweetobj.id}`).update({
      text: newTweet
    })
    setEditing(false)
  };
  const onChange = (e) => {
    setNewTweet(e.target.value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Tweet. "
              value={newTweet}
              required
              onChange={onChange}
            />
            <input type='submit' value='Update Tweet' />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{Tweetobj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Button</button>
              <button onClick={toggleEditing}>Edit Button</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
