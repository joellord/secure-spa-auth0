import React, { Component } from "react";
import { Navbar, Nav, NavItem, Button } from "react-bootstrap";
import { login, logout } from "../utils/auth";

class NavBar extends Component {
  render() {
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
              { this.props.isLoggedIn && (
                <Button bsStyle="danger" type="button" id="logoutBtn" onClick={logout}>Logout</Button>
              )}
              { !this.props.isLoggedIn && (
                  <Button bsStyle="success" type="button" id="loginBtn" onClick={login}>Login</Button>
              )}
            </Navbar.Form>
          </Nav>
        </Navbar>
    )
  }
}

export default NavBar;