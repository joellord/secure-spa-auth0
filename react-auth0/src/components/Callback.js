import React, { Component } from "react";
import { parseHash } from "../utils/auth";

class Callback extends Component {
  componentDidMount() {
    parseHash();
    window.location.href = window.location.origin;
  }

  render() {
    return (
        <div>Reticulating splines...</div>
    )
  }
}

export default Callback;