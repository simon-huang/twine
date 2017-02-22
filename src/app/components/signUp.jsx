import React from 'react';
import { connect } from 'react-redux';
import * as user from '../actions/userActions.jsx';

@connect((store) => {
  return {
    username: store.user.user.username,
    email: store.user.user.email,
    password: store.user.user.password
  };
})

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }
  
  signup(e) {
    e.preventDefault();
    this.props.dispatch(user.signup());
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(user.handleChange(e.target.name, e.target.value));
  }
  
  render() {
    return (
      <form onSubmit={this.signup}>
        <input type="text" onChange={this.handleChange} value={this.props.username} name="username" placeholder="Pick a username" />
        <input type="text" onChange={this.handleChange} value={this.props.email} name="email" placeholder="Email address" />
        <input type="text" onChange={this.handleChange} value={this.props.password} name="password" placeholder="Password" />
        <label>
          <input type="checkbox" name="terms" />
          I agree to PublishUs terms
        </label>
        <input type="submit" value="create account" />
      </form>
    );
  }
}