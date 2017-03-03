import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Components
import SignUp from './auth/signUp.jsx';
import Login from './auth/login.jsx';
import CreateDoc from './createDoc.jsx';
import Navbar from './navbar.jsx';
import Theme from 'material-ui/styles/MuiThemeProvider';
import LoginModal from './modals/loginModal.jsx'

// UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Store properties
import * as user from '../actions/userActions.jsx';
import * as auth from '../actions/authActions.jsx';

@connect((store) => {
  return {
    isLoggedIn: store.auth.login,
    redirectUrl: store.auth.redirectUrl
  }
})

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(auth.autoLogin());
  }

  componentDidUpdate(prevProps) {
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

    if (isLoggingIn) {
      this.props.router.push(this.props.redirectUrl);
    }
  }

  render() {
    return (
      <Theme>
        <div>
          <Navbar props={this.props} />
          <div className="mt20">
            {this.props.children}
          </div>
          <LoginModal />
        </div>
      </Theme>
    );
  }
}




