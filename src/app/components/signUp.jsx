import React from 'react';
import { connect } from 'react-redux';
import * as user from '../actions/userActions.jsx';

@connect((store) => {
  return {
    username: store.user.username,
    email: store.user.email,
    password: store.user.password
  }
})

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }
  
  signup(username, email, password) {
    this.props.dispatch(user.userSignUp(username, email, password));
  }
  
  render() {
    return (
      <form>
        <input type="text" name="email" placeholder="name@example.com" />
        <input type="text" name="password" placeholder="password" />
        <label>
          <input type="checkbox" name="terms" />
          I agree to the terms on PublishUs
        </label>
        <input type="submit" value="create account" />
      </form>
    );
  }
}