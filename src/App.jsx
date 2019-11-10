import React, { Component } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Routes from "./components/Routes";
import NavBar from "./components/NavBar";
import BurgerMenuSymbol from "./assets/images/burger-menu-symbol.svg";
import ReactGA from "react-ga";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#000000" },
    secondary: { main: "#33373d" }
  },
  typography: { useNextVariants: true }
});

const styles = () => ({
  closedInSM: {
    width: "200px",
    transition: "all 1s",
    left: "-200px"
  },
  openedInSm: {
    width: "200px",
    transition: "all 1s",
    left: "0"
  }
});

class App extends Component {
  constructor(props) {
    ReactGA.initialize("UA-150838671-1");
    super(props);
    this.state = {
      isUser: !!localStorage.getItem("access_token"),
      isValidToken: localStorage.getItem("token_valid"),
      isNavOpened: false
    };
  }

  componentDidUpdate() {
    const isUserValue = !!localStorage.getItem("access_token");
    const validToken = localStorage.getItem("token_valid") === "true";
    if (this.state.isUser !== isUserValue) {
      this.setState({ isUser: isUserValue, isValidToken: validToken });
    }
  }

  componentDidMount() {
    ReactGA.set({
      page: window.location.pathname
    });
    ReactGA.pageview(window.location.pathname);
  }

  render = () => (
    <MuiThemeProvider theme={theme}>
      <div className="site-wrapper">
        <NavBar
          isUser={this.state.isUser}
          validToken={this.state.isValidToken}
          isOpenedInSm={this.state.isNavOpened}
        />
        {this.state.isNavOpened ? (
          <div
            className="overlay"
            onClick={() =>
              this.setState({ isNavOpened: !this.state.isNavOpened })
            }
          />
        ) : (
          <div
            className="burger-menu-symbol"
            onClick={() =>
              this.setState({ isNavOpened: !this.state.isNavOpened })
            }
          >
            <div className="line" />
            <div className="line" />
            <div className="line" />
          </div>
        )}
        <div className="container mt-50 mb-50">
          <Routes />
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
