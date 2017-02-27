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
    this.updatePath = this.updatePath.bind(this);
  }
  
  logout() {
    this.props.dispatch(user.userLogout());
  }

  updatePath(e) {
    e.preventDefault();
    const url = e.target.name;
    this.props.props.router.push(url);
  }

  navLoggedIn() {
    if (this.props.isLoggedIn) {
      return (
        <NavContainer.Collapse>
          <Nav>
            <NavItem onClick={this.updatePath} eventKey={1} name="createdoc">Create Doc</NavItem>

            <NavItem onClick={this.updatePath} eventKey={4} name="profile">Profile</NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={4} title={
              <span>
                <i className="fa fa-user-circle"></i>&nbsp;{this.props.username}
              </span>
            } id="user-settings">
              <MenuItem eventKey={4.1} name="logout" onClick={this.logout}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </NavContainer.Collapse>
      );
    } else {
      return (
        <NavContainer.Collapse>
          <Nav pullRight>
            <NavItem onClick={this.updatePath} eventKey={4} name="login">Login</NavItem>
            <NavItem onClick={this.updatePath} eventKey={5} name="signup">Signup</NavItem>
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
            <a onClick={this.updatePath} name="/">PublishUs</a>
          </NavContainer.Brand>
          <NavContainer.Toggle />
        </NavContainer.Header>
        {this.navLoggedIn()}
      </NavContainer>
    );
  }
}


//Removing for presentation. Please keep for dev purposes
// <NavItem onClick={this.updatePath} eventKey={2} name="editdoc">Edit Doc</NavItem>
// <NavItem onClick={this.updatePath} eventKey={3} name="doc">Document</NavItem>

