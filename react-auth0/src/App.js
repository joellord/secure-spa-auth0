import React, { Component } from 'react';
import Main from "./components/Main";
import Callback from "./components/Callback";
import Secret from "./components/Secret";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import Unauthorized from "./components/Unauthorized";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { isLoggedIn } from "./utils/auth";
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                      pathname: "/unauthorized",
                      state: { from: props.location }
                    }}
                />
            )
        }
    />
);

class App extends Component {
  render() {

    return (
        <Router>
          <div>
            <NavBar {...this.props} />

            <Switch>
              <Route exact path="/" render={(props) => <Main {...this.props} />} />
              <Route path="/callback" component={Callback} />
              <PrivateRoute path="/secret" component={Secret} />
              <Route path="/unauthorized" component={Unauthorized} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;

