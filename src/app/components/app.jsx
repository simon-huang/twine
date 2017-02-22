import React from 'react';
import { connect } from 'react-redux';
import SignUp from './signUp.jsx';
import Login from './login.jsx';
import CreateDoc from './createDoc.jsx';


//import action to dispatch
import * as user from '../actions/userActions.jsx';

@connect((store) => {
  return {
    foo: store.doc.error,
    login: store.user.login
  }
})

export default class App extends React.Component {
  handleClick() {
    this.props.dispatch(user.changeView());
  }
  
  render() {
    return (
      <div>
        {this.props.login ? (<SignUp />) : (<Login />)}
        <div>
          <button type="button" onClick={this.handleClick.bind(this)}>
            Switch
          </button>
        </div>
        <hr/>
        <CreateDoc />
      </div>
    );
  }
}