import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        <>
        {isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
            <Redirect from="*" to="/" />
          </div>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;

/* <></>  프레그먼트는 렌더가 많을 때 사용*/
/* <Switch>는 첫번째로 매칭되는 path를 렌더링 함
    <Router> <Route path="/"></Route> <Router> 라우트 모두 렌더링 됨
    <Router> <Route exact path="/"></Route> <Router> 정확히 일치하는 부분만 렌더링 됨 하지만 오류가 났을 때만 오류 페이지를 보여주고 싶은데 오류가 안나도 오류페이지가 렌더링 됨
    그래서 <Switch>가 나옴 첫번째로 매칭되는 path가 없기 때문에 오류가 나면 오류페이지가 렌더링됨 
*/
