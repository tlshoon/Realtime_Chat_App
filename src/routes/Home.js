import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Tweet from "../components/Tweet";
import { dbService, storageService } from "../fbase";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  //   const getTweets = async () => {    // 비동기로 가져와야 하기 때문에
  //     const dbTweets = await dbService.collection("tweets").get();  // db에서 데이터 가져오기
  //     dbTweets.forEach((document) => {
  //       const tweetObject = {
  //         ...document.data(),
  //         id: document.id,
  //       };
  //       setTweets((prev) => [tweetObject, ...prev]);
  //     });
  //   };

  useEffect(() => {
    // 컴포넌트 마운트 됐을 때 실행
    // getTweets();
    dbService
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        // 데이터베이스에 무슨 일이 있을 때 알림을 받는 기능, 스냅샷을 쓰면 리렌더 하지 않아도 됨
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArray);
      });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== ""){
    const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await attachmentRef.putString(attachment, "data_url");
    attachmentUrl = await response.ref.getDownloadURL();
    };
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("tweets").add(tweetObj); // 폼 제출하면 tweets컬렉션에 트윗 추가하기
    setTweet("");   // 추가하고 나면 빈칸으로
    setAttachment("");
  };
  const onChange = (e) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e) => {
    // console.log(e.target.files)
    const theFile = e.target.files[0];
    const reader = new FileReader(); /* 파일 리더를 만듦 */
    reader.onloadend = (finishedEvent) => {
      /* 파일 로딩과 읽는 게 끝나면 */
      setAttachment(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(theFile); /* 파일 이름을 읽음 */
  };

  const ClearAttachment = () => setAttachment("");

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={ClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            Tweetobj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
