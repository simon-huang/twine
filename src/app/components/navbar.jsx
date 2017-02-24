import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Store properties
import * as user from '../actions/userActions.jsx';

@connect((store) => {
  return {
    username: store.user.user.username
  };
})

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  
  logout() {
    console.log('NAVBAR logout');
    this.props.dispatch(user.userLogout());
  }
  
  render() { 
    return (
      <div>
        <Link href="#">Publish Us</Link>
        <Link href="#/createdoc">Create Doc</Link>
        <Link href="#/editdoc">Edit Doc</Link>
        <Link href="#/login">Login</Link>
        <Link href="#/signup">Signup</Link>
        <Link href="#/doc">Doc</Link>
        <Link to="/logout" 
              onClick={()=> {
                console.log('logout clicked');
                this.logout();
              }}>Logout</Link>
      </div>
    );
  }
}