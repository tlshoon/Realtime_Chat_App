import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init,setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 됐는지 안됐는지
  // console.log(authService.currentUser)   // firebase 초기화를 기다리지 못해서 먼저 null값이 나옴
  const [userObj, setUserobj] = useState(null);

  useEffect (() => {   // 컴포넌트가 마운트 되면 실행
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserobj(user);
      }else {
        setIsLoggedIn(false);
      }
      setInit(true);  // 초기화 됐음
    })  
  }, [])

  // setInterval(() => {
  //   console.log(authService.currentUser)
  // },2000)
  
  return(
    <>  
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}   {/* props 내려주기 */}
    <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  )
}

export default App;
