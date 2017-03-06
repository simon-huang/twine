import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// UI
import NavContainer from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

// Store properties
import * as auth from '../../actions/authActions.jsx';


export class LoggedIn extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.updatePath = this.updatePath.bind(this);
    this.checkEditMode = this.checkEditMode.bind(this);
  }
  
  logout() {
    this.props.dispatch(auth.userLogout());
  }

  updatePath(e) {
    e.preventDefault();
    const url = e.target.name;
    browserHistory.push(url);
  }

  checkEditMode() {
    var path = this.props.location.pathname;
    var splitPath = path.split(/[\\\/]/);
    var editMode;
    splitPath[splitPath.length - 1] === 'editing' ? (editMode = true) : (editMode = false);
    if (!editMode) {
      return (
        <Nav>
          <NavItem onClick={this.updatePath} eventKey={1} name="/explore">Explore</NavItem>
          <NavItem onClick={this.updatePath} eventKey={2} name="/createdoc">Create Doc</NavItem>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <NavItem onClick={this.updatePath} eventKey={7} name={`/profile/${this.props.doc.docOwner}/${this.props.doc.docId}`}>
            {`editing: ${this.props.doc.docName}`}
          </NavItem>
        </Nav>
      );
    }
  }
  
  render() {
    return (
      <NavContainer.Collapse>
        {this.checkEditMode()}
        <Nav pullRight>
          <NavDropdown eventKey={4} title={
            <span>
              <i className="fa fa-user-circle"></i>&nbsp;{this.props.user.username}
            </span>
          } id="user-settings">
            <MenuItem onClick={this.updatePath} eventKey={3} name={`/profile/${this.props.user.username}`}>Profile</MenuItem>
            <MenuItem eventKey={4.1} name="/logout" onClick={this.logout}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </NavContainer.Collapse>
    );
  }
}

export default connect(state => state)(LoggedIn);



