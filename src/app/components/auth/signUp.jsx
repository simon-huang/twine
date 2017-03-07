import React from 'react';
import { connect } from 'react-redux';

// UI
import styles from './../styles/style.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

// Store properties
import * as user from '../../actions/userActions.jsx';
import * as auth from '../../actions/authActions.jsx';
import * as doc from '../../actions/docActions.jsx';

@connect((store) => {
  return {
    username: store.user.username,
    email: store.user.email,
    password: store.user.password
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
    this.props.dispatch(auth.signup());
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(doc.handleChange(e.target.name, e.target.value));
  }
  
  render() {
    return (
      <div className="text-center mt45">
        <h2>Welcome! Create your account</h2>
        <form onSubmit={this.signup} style={styles.formFields}>
          <TextField type="text" onChange={this.handleChange} value={this.props.username} name="username" floatingLabelText="Pick a username" style={styles.signup} />
          <TextField type="text" onChange={this.handleChange} value={this.props.email} name="email" floatingLabelText="Email address" style={styles.signup} />
          <TextField type="password" onChange={this.handleChange} value={this.props.password} name="password" floatingLabelText="Password" style={styles.signup} />
          {/*<div className="checkbox">
            <Checkbox checkedIcon={<ActionFavorite />} uncheckedIcon={<ActionFavoriteBorder />} style={styles.terms} />
            <span>I agree to <a href="#">PublishUs Terms</a></span>
          </div>*/}
          <RaisedButton type="submit" label="Create account" primary={true} style={styles.btnSignup} />
        </form>
      </div>
    );
  }
}