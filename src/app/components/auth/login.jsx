import React from 'react';
import { connect } from 'react-redux';

// UI
import styles from './../styles/style.jsx';
import TextField from 'material-ui/TextField';
import RaisedBtn from 'material-ui/RaisedButton';
import RaisedButton from 'material-ui/RaisedButton';

// Store properties
import * as user from '../../actions/userActions.jsx';
import * as doc from '../../actions/docActions.jsx';
import * as auth from '../../actions/authActions.jsx';

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
    this.props.dispatch(doc.handleChange(e.target.name, e.target.value));
  }

  render() {
    return (
      <div className="text-center mt45">
        <h2>Log in to your account</h2>
        <form onSubmit={this.login} style={styles.formFields}>
          <TextField type="text" onChange={this.handleChange} value={this.props.email} name="email" floatingLabelText="Email address" style={styles.signup} />
          <TextField type="password" onChange={this.handleChange} value={this.props.password} name="password" floatingLabelText="Password" style={styles.signup} />
          <RaisedButton type="submit" label="Log in" primary={true} style={styles.btnSignup} />
        </form>
      </div>
    );
  }
}