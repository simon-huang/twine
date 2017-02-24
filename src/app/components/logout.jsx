import React from 'react'
import { connect } from 'react-redux';

// Store properties
import * as user from '../actions/userActions.jsx';

@connect((store) => {
  return {
    username: store.user.user.username,
    email: store.user.user.email,
    password: store.user.user.password
  };
})





export default class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="text-center mt45">
        <h2>You have successfully logged out</h2>
      </div>
    );
  }

}
