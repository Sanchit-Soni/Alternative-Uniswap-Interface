import React, { useState } from "react";

import { auth } from "../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useStateValue } from "../StateProvider";
import { Button } from "@mui/material";

const LandingPage = ({ history }) => {
  const [user, setUser] = useState({});
  // const [{ user }, dispatch] = useStateValue();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem("user-state");
    localStorage.removeItem("user-details");
    history.push("/");
    window.location.reload(false);
  };
  const logout = async () => {
    handleLogout();
    await signOut(auth);
  };
  return (
    <div>
      <center>
        <h1> LandingPage</h1>

        {user && (
          <Button variant="contained" color="primary" onClick={logout}>
            {" "}
            Sign Out{" "}
          </Button>
        )}
      </center>
    </div>
  );
};

export default LandingPage;
