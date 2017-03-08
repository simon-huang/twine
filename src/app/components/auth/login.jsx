import React from 'react';
import { connect } from 'react-redux';

// UI
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

// Store properties
import * as user from '../../actions/userActions.jsx';
import * as doc from '../../actions/docActions.jsx';
import * as auth from '../../actions/authActions.jsx';

@connect((store) => {
  return {
    username: store.user.username,
    email: store.user.email,
    password: store.user.password
  };
})

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.props.dispatch(auth.login());
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

  render() {
    return (
      <div className="text-center pt45">
        <div className="row">
          <div className="col-sm-12 text-center">
            <h2 className="mt30 mb30">Log in to your account</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-10 col-sm-6 col-md-4 col-lg-3 col-centered">
            <form onSubmit={this.login}>
              <FormGroup controlId="formEmail" validationState={this.validateEmail()} >
                <FormControl type="text" value={this.props.email} placeholder="Email address" name="email" onChange={this.handleChange} />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup controlId="formPassword" validationState={this.validatePassword()} >
                <FormControl type="password" value={this.props.password} placeholder="Password" name="password" onChange={this.handleChange} />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup className="text-left mt25" controlId="formSubmit">
                <input type="submit" className="btn btn-purple" value="Log in"/>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}