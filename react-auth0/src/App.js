import React, { Component } from 'react';
import Main from "./components/Main";
import Callback from "./components/Callback";
import Secret from "./components/Secret";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import Unauthorized from "./components/Unauthorized";
import './App.css';

class App extends Component {
  render() {
    let mainComponent = "";
    switch(this.props.location) {
      case "":
        mainComponent = <Main {...this.props} />;
        break;
      case "callback":
        mainComponent = <Callback/>;
        break;
      case "secret":
        mainComponent = this.props.auth.isAuthenticated() ? <Secret {...this.props} /> : <Unauthorized/>;
        break;
      default:
        mainComponent = <NotFound />;
    }

    return (
        <div className="App">
          <NavBar {...this.props} />
          {mainComponent}
        </div>
    );
  }
}

export default App;
