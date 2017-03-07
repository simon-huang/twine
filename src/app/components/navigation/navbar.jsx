import React from 'react';
import { Link } from 'react-router';
import { connect, mapStateToProps } from 'react-redux';

// UI
import NavContainer from 'react-bootstrap/lib/Navbar';

// Components
import LoggedIn from './navbar_loggedIn.jsx';
import LoggedOut from './navbar_loggedOut.jsx';

export class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.updatePath = this.updatePath.bind(this);
  }

  updatePath(e) {
    e.preventDefault();
    const url = e.target.name;
    this.props.props.router.push(url);
  }
  
  render() {
    const pathname = this.props.props.location.pathname;
    return (
      <NavContainer className={(pathname === '/' ) ? 'nav-clear' : 'nav-white'}>
        <NavContainer.Header>
          <NavContainer.Brand>
            <a className="nav-logo" onClick={this.updatePath} name="/">PublishUs</a>
          </NavContainer.Brand>
          <NavContainer.Toggle />
        </NavContainer.Header>
        {this.props.props.isLoggedIn ? <LoggedIn location={this.props.props.location} /> : <LoggedOut location={this.props.props.location} />}
      </NavContainer>
    );
  }
}

export default connect(state => state)(Navbar);

