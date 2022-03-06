import React, { useState, useEffect } from "react";
import "./App.css";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { ethers } from "ethers";
import Web3Provider from "./network";
import NarBar from "./NavBar/NavBar";
import CoinSwapper from "./CoinSwapper/CoinSwapper";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Liquidity from "./Liquidity/Liquidity";
import { createTheme, ThemeProvider } from "@material-ui/core";
import LandingPage from "./Pages/LandingPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { auth } from "./firebase-config";
import { useStateValue } from "./StateProvider";
import Home from "./Pages/Home";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9e9e9e",
      contrastText: "#ffffff",
    },
  },
});

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  const [check, setCheck] = useState(false);
  const [logged, setLogged] = useState(false);
  const [logger, setLogger] = useState(false);

  useEffect(() => {
    let ch = localStorage.getItem("user-state");
    setCheck(ch);
    if (check !== null) {
      setLogged(true);
    }
    if (user) {
      setLogger(true);
    }
    console.log(check);
    console.log(logged);
  }, [logged, check, logger, user]);

  const Routing = () => {
    return (
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Register} />
      </Switch>
    );
  };

  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <Web3Provider
            render={(network) => (
              <div>
                {!logger && !check ? (
                  <Home />
                ) : (
                  <div className="main">
                    <Router>
                      <NarBar />
                      <Routing />
                      <Route path="/signup" exact component={Register} />
                      <Route exact path="/Alternative-Uniswap-Interface/">
                        <CoinSwapper network={network} />
                      </Route>
                      <Route
                        exact
                        path="/Alternative-Uniswap-Interface/liquidity"
                      >
                        <Liquidity network={network} />
                      </Route>
                    </Router>
                    {/* <Footer /> */}
                  </div>
                )}
                {/* <NarBar />
                <Route exact path="/">
                  <LandingPage />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Register />
                </Route>

                <Route exact path="/Alternative-Uniswap-Interface/">
                  <CoinSwapper network={network} />
                </Route>
                <Route exact path="/Alternative-Uniswap-Interface/liquidity">
                  <Liquidity network={network} />
                </Route> */}
              </div>
            )}
          ></Web3Provider>
        </ThemeProvider>
      </SnackbarProvider>
    </div>
  );
};

export default App;
