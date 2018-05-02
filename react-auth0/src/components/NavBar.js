import React, { Component } from "react";
import { Navbar, Nav, NavItem, Button } from "react-bootstrap";

class NavBar extends Component {
  render() {
    const isLoggedIn = this.props.auth.isAuthenticated();
    let button;
    if (isLoggedIn) {
      button = (
          <Button bsStyle="danger" type="button" id="logoutBtn" onClick={this.props.auth.logout}>Logout</Button>
      );
    } else {
      button = (
          <Button bsStyle="success" type="button" id="loginBtn" onClick={this.props.auth.login}>Login</Button>
      );
    }
    return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Secure your SPA</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="/">
              Home
            </NavItem>
            <NavItem href="/secret">
              Secret
            </NavItem>
          </Nav>
          <Nav pullRight>
            <Navbar.Form>
              { button }
            </Navbar.Form>
          </Nav>
        </Navbar>
    )
  }
}

export default NavBar;