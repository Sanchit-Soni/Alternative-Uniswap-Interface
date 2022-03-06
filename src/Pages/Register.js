import React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import "../App.css";
import { auth } from "../firebase-config";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";

const Register = () => {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [user, setUser] = useState({});

  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      ).then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      });
      console.log(user);
      localStorage.setItem("user-state", true);
      localStorage.setItem("user-details", JSON.stringify(user));
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <h2>Sign Up</h2>
      <form className="login-form">
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
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
        <Button onClick={register} type="submit" variant="contained" fullWidth>
          Create User
        </Button>
      </form>
    </div>
  );
};

export default Register;
