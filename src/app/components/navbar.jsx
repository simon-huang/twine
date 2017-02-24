import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// UI
import NavContainer from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

// Store properties
import * as user from '../actions/userActions.jsx';

@connect((store) => {
  return {
    username: store.user.user.username,
    isLoggedIn: store.user.login
  };
})

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.navLoggedIn = this.navLoggedIn.bind(this);
  }
  
  logout() {
    this.props.dispatch(user.userLogout());
  }

  navLoggedIn() {
    if (this.props.isLoggedIn) {
      return (
        <NavContainer.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#/createdoc">Create Doc</NavItem>
            <NavItem eventKey={2} href="#/editdoc">Edit Doc</NavItem>
            <NavItem eventKey={3} href="#/doc">Document</NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={4} title={
              <span>
                <i className="fa fa-user-circle"></i>&nbsp;{this.props.username}
              </span>
            } id="user-settings">
              <MenuItem eventKey={4.1} href="#/logout" onClick={this.logout}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </NavContainer.Collapse>
      );
    } else {
      return (
        <NavContainer.Collapse>
          <Nav pullRight>
            <NavItem eventKey={4} href="#/login">Login</NavItem>
            <NavItem eventKey={5} href="#/signup">Signup</NavItem>
          </Nav>
        </NavContainer.Collapse>
      );
    }
  }
  
  render() { 
    return (
      <NavContainer>
        <NavContainer.Header>
          <NavContainer.Brand>
            <a href="#">PublishUs</a>
          </NavContainer.Brand>
          <NavContainer.Toggle />
        </NavContainer.Header>
        {this.navLoggedIn()}
      </NavContainer>
    );
  }
}





