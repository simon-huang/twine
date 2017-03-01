import React from 'react';
import { Link } from 'react-router';
import { connect, mapStateToProps } from 'react-redux';

// UI
import NavContainer from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

// Store properties
import * as user from '../actions/userActions.jsx';
import * as auth from '../actions/authActions.jsx';


export class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.navLoggedIn = this.navLoggedIn.bind(this);
    this.updatePath = this.updatePath.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
  }
  
  logout() {
    this.props.dispatch(auth.userLogout());
  }

  toggleLoginModal() {
    this.props.dispatch(auth.toggleLoginModal())
  }

  updatePath(e) {
    e.preventDefault();
    const url = e.target.name;
    this.props.props.router.push(url);
  }

  navLoggedIn() {
    if (this.props.props.isLoggedIn) {
      return (
        <NavContainer.Collapse>
          <Nav>
            <NavItem onClick={this.updatePath} eventKey={1} name="createdoc">Create Doc</NavItem>
            <NavItem onClick={this.updatePath} eventKey={4} name="profile">Profile</NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={4} title={
              <span>
                <i className="fa fa-user-circle"></i>&nbsp;{this.props.user.username}
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
            <NavItem className="login" onClick={this.toggleLoginModal} eventKey={4} name="login">Login</NavItem>
            <NavItem className="signup" onClick={this.updatePath} eventKey={5} name="signup">Signup</NavItem>
          </Nav>
        </NavContainer.Collapse>
      );
    }
  }
  
  render() {
    const pathname = this.props.props.location.pathname;
    return (
      <NavContainer className={(pathname === '/' ) ? 'nav-clear' : 'nav-white'}>
        <NavContainer.Header>
          <NavContainer.Brand>
            <a className="nav-logo" onClick={this.updatePath} name="/">PublishUs</a>
            <a className="nav-logo" onClick={this.updatePath} name="explore">Explore</a>
          </NavContainer.Brand>
          <NavContainer.Toggle />
        </NavContainer.Header>
        {this.navLoggedIn()}
      </NavContainer>
    );
  }
}

export default connect(state => state)(Navbar);


//Removing for presentation. Please keep for dev purposes
// <NavItem onClick={this.updatePath} eventKey={2} name="editdoc">Edit Doc</NavItem>
// <NavItem onClick={this.updatePath} eventKey={3} name="doc">Document</NavItem>

