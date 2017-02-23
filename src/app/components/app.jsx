import React from 'react';
import { connect } from 'react-redux';

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
    login: store.user.login
  }
})

export default class App extends React.Component {

  render() {
    var children = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {
      });
    });
    return (
      <Theme>
        <div>
          <Navbar />
          {children}
        </div>
      </Theme>
    );
  }
}