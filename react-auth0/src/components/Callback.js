import React, { Component } from "react";
import { parseHash, getAccessToken, isLoggedIn } from "../utils/auth";
import { Redirect } from "react-router-dom";

class Callback extends Component {
  componentWillMount() {
    parseHash();
    window.setState({headline: `Access Token: ${getAccessToken()}`, isLoggedIn: isLoggedIn()});
  }

  render() {
    return (
        <div>
          Reticulating splines...
          <Redirect to="/" push={true} />
        </div>

    )
  }
}

export default Callback;