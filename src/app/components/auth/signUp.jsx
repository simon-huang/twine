import React from 'react';
import { connect } from 'react-redux';

// UI
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

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
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }
  
  signup(e) {
    e.preventDefault();
    this.props.dispatch(auth.signup());
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(doc.handleChange(e.target.name, e.target.value));
  }

  validateEmail() {
    const length = this.props.email;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  validatePassword() {
    const length = this.props.password;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  validateUsername() {
    const length = this.props.password;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }
  
  render() {
    return (
      <div className="signup-container text-center pt45">
        <div className="row">
          <div className="col-sm-12 text-center">
            <h2 className="mt30 mb30">Welcome! Create your account</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-10 col-sm-6 col-md-4 col-lg-3 col-centered">
            <form onSubmit={this.signup}>
              <FormGroup controlId="formEmail" validationState={this.validateUsername()} >
                <FormControl type="text" value={this.props.username} placeholder="Pick a username" name="username" onChange={this.handleChange} />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup controlId="formEmail" validationState={this.validateEmail()} >
                <FormControl type="text" value={this.props.email} placeholder="Email address" name="email" onChange={this.handleChange} />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup controlId="formPassword" validationState={this.validatePassword()} >
                <FormControl type="password" value={this.props.password} placeholder="Password" name="password" onChange={this.handleChange} />
                <FormControl.Feedback />
              </FormGroup>
              {/*<div className="checkbox">
                <Checkbox checkedIcon={<ActionFavorite />} uncheckedIcon={<ActionFavoriteBorder />} style={styles.terms} />
                <span>I agree to <a href="#">PublishUs Terms</a></span>
              </div>*/}
              <FormGroup className="text-left mt25" controlId="formSubmit">
                <input type="submit" className="btn btn-purple" value="Create account"/>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}






