import React from 'react';
import { connect } from 'react-redux';

// Store properties
import * as user from '../../actions/userActions.jsx';
import * as auth from '../../actions/authActions.jsx';

@connect((store) => {
  return {
    isLoggedIn: store.auth.login,
    redirectUrl: store.auth.redirectUrl
  };
})

export default class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.dispatch(auth.setRedirectUrl(this.props.location.pathname));
      this.props.router.push('/login');
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else {
      return null
    }
  }
}