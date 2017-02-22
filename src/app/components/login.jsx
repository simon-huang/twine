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

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.props.dispatch(user.login());
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(user.handleChange(e.target.name, e.target.value));
  }

  render() {
    return (
      <form onSubmit={this.login}>
        <input type="text" onChange={this.handleChange} value={this.props.email} name="email" placeholder="Email address" />
        <input type="text" onChange={this.handleChange} value={this.props.password} name="password" placeholder="Password" />
        <input type="submit" value="Login"/>
      </form>
    );
  }
}