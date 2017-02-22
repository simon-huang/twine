import React from 'react';
import { connect } from 'react-redux';
import SignUp from './signUp.jsx';
import Login from './login.jsx';
import CreateDoc from './createDoc.jsx';
import Navbar from './navbar.jsx';

import * as user from '../actions/userActions.jsx';

@connect((store) => {
  return {
    login: store.user.login
  }
})

export default class App extends React.Component {

  render() {
    var children = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {
      });
    });
    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
  }
}

// {this.props.login ? <Login /> : <SignUp />}
// <Navbar />