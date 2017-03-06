import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// UI
import NavContainer from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

// Store properties
import * as auth from '../../actions/authActions.jsx';


export class LoggedOut extends React.Component {

  constructor(props) {
    super(props);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.updatePath = this.updatePath.bind(this);
  }

  toggleLoginModal() {
    this.props.dispatch(auth.toggleLoginModal())
  }

  updatePath(e) {
    e.preventDefault();
    const url = e.target.name;
    browserHistory.push(url);
  }
  
  render() {
    return (
      <NavContainer.Collapse>
        <Nav>
          <NavItem onClick={this.updatePath} eventKey={1} name="explore">Explore</NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem className="login" onClick={this.toggleLoginModal} eventKey={5} name="/login">Login</NavItem>
          <NavItem className="signup" onClick={this.updatePath} eventKey={6} name="/signup">Signup</NavItem>
        </Nav>
      </NavContainer.Collapse>
    );
  }
}

export default connect(state => state)(LoggedOut);



