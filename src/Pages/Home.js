import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "../CSS/home.css";
import { Button } from "@mui/material";

const Home = () => {
  const [switcher, setSwitcher] = useState("login");

  return (
    <div className="homeContainer">
      <h1>Welcome TO AMM</h1>
      <div className="homeBox">
        <div className="homeBoxButtons">
          <Button variant="outlined" onClick={() => setSwitcher("login")}>
            Login
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            variant="outlined"
            onClick={() => setSwitcher("signup")}
          >
            Sign up
          </Button>
        </div>
        {switcher === "login" && (
          <Login switcher={switcher} setSwitcher={setSwitcher} />
        )}
        {switcher === "signup" && <Register setSwitcher={setSwitcher} />}
      </div>
    </div>
  );
};

export default Home;
