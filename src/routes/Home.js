import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
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
    dbService.collection("tweets").orderBy("createdAt","desc").onSnapshot((snapshot) => {    // 스냅샷을 쓰면 리렌더 하지 않아도 됨
        const tweetArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setTweets(tweetArray)
    });
  }, []);
  const onSubmit = async (e) => {   
    e.preventDefault();
    await dbService.collection("tweets").add({  // 폼 제출하면 tweets컬렉션에 트윗 추가하기
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");   // 추가하고 나면 빈칸으로
  };
  const onChange = (e) => {
    setTweet(e.target.value);
  };


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
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
            <Tweet key={tweet.id} Tweetobj={tweet} isOwner={tweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
