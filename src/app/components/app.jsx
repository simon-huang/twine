import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Components
import SignUp from './signUp.jsx';
import Login from './login.jsx';
import CreateDoc from './createDoc.jsx';
import Navbar from './navbar.jsx';
import Theme from 'material-ui/styles/MuiThemeProvider';

// UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Store properties
import * as user from '../actions/userActions.jsx';

@connect((store) => {
  return {
    isLoggedIn: store.user.login,
    redirectUrl: store.user.redirectUrl
  }
})

export default class App extends React.Component {

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
          <Navbar />
          {this.props.children}
        </div>
      </Theme>
    );
  }
}




