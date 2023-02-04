import React, { useState } from "react";

const Auth = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const onChangeId = (e) => {
        setEmail(e.target.value)
    };
    const onChangePw = (e) => {
        setPassword(e.target.value)
    };
    const onSubmit = (e) => {
        e.preventDefault();
    };


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" required value={email} onChange={onChangeId} />
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChangePw} />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
