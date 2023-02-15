import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import TweetFactory from "../components/TweetFactory";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

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

  return (
    <div className="container">
      <TweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
