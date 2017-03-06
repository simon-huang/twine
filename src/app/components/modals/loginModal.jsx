import React from 'react';
import { connect } from 'react-redux';

// UI
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

// Store properties
import * as user from '../../actions/userActions.jsx';
import * as auth from '../../actions/authActions.jsx';
import * as doc from '../../actions/docActions.jsx';

@connect((store) => {
  return {
    loginModal: store.auth.loginModal,
    username: store.user.username,
    email: store.user.email,
    password: store.user.password,
  }
})

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
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

  toggleLoginModal() {
    this.props.dispatch(auth.toggleLoginModal())
  }

  login(e) {
    e.preventDefault();
    this.props.dispatch(auth.toggleLoginModal())
    this.props.dispatch(auth.login());
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(doc.handleChange(e.target.name, e.target.value));
  }

  render() {
    return (
      <Modal show={this.props.loginModal} onHide={this.toggleLoginModal} dialogClassName="login-modal">
        <Modal.Header closeButton>
          <Modal.Title>Sign in to your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/*<a className="btn btn-block btn-social btn-purple">
            <span className="fa fa-google"></span>
            Sign in with Google
          </a>
          <div className="hr-label mt20 mb20">
            <span className="hr-label-text">or</span>
          </div>*/}
          <form onSubmit={this.login}>
            <FormGroup controlId="formEmail" validationState={this.validateEmail()} >
              <FormControl type="text" value={this.props.email} placeholder="Email address" name="email" onChange={this.handleChange} />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="formPassword" validationState={this.validatePassword()} >
              <FormControl type="password" value={this.props.password} placeholder="Password" name="password" onChange={this.handleChange} />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="formSubmit" className="mt25">
              <input type="submit" className="btn btn-purple" label="Log in"/>
            </FormGroup>
            {/*<a className="btn-cancel forgot-password mt25 text-center">Forgot your password?</a>*/}
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

