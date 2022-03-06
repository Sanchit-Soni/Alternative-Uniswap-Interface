import React from "react";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "../App.css";
import { auth } from "../firebase-config";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";

const Login = ({ setSwitcher }) => {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [visible, setvisible] = useState(false);
  const [user, setUser] = useState({});

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  //   console.log("currentUser", currentUser);
  // });
  // const handleLogout = () => {
  //   auth.signOut();
  //   localStorage.removeItem("user-state");
  //   localStorage.removeItem("user-details");
  //   history.push("/");
  //   window.location.reload(false);
  // };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      ).then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      });
      console.log(user);
      localStorage.setItem("user-state", true);

      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // const logout = async () => {
  //   handleLogout();
  //   await signOut(auth);
  // };

  // useEffect(() => {
  //   if (user) {
  //     history.push("/");
  //   }
  // }, [user]);

  return (
    <div className="login">
      <h2>Login</h2>
      <form className="login-form">
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type={visible ? "text" : "password"}
          variant="outlined"
          fullWidth
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          margin="normal"
          // InputProps={{
          //   endAdornment: (
          //     <IconButton
          //       aria-label="toggle password visibility"
          //       onClick={() => {
          //         setvisible(!visible);
          //       }}
          //       onMouseDown={() => {
          //         setvisible(!visible);
          //       }}
          //       edge="end"
          //     >
          //       {visible ? <Visibility /> : <VisibilityOff />}
          //     </IconButton>
          //   ),
          // }}
        ></TextField>
        <Button onClick={login} variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </div>
    // <div>
    //   {" "}
    //   <div className="App">
    //     <div>
    //       <h3> Login </h3>
    //       <input
    //         placeholder="Email..."
    //         onChange={(event) => {
    //           setLoginEmail(event.target.value);
    //         }}
    //       />
    //       <input
    //         placeholder="Password..."
    //         onChange={(event) => {
    //           setLoginPassword(event.target.value);
    //         }}
    //       />

    //       <button onClick={login}> Login</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
