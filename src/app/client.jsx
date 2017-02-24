import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from './components/app.jsx';
import store from './store.jsx';
import CreateDoc from './components/createDoc.jsx';
import SignUp from './components/signUp.jsx';
import Login from './components/login.jsx';
import Home from './components/home.jsx';
import Doc from './components/document/doc.jsx';
import EditDoc from './components/editDoc/editDoc.jsx';
import Logout from './components/logout.jsx';

store.subscribe(() => {
  console.log('store changed', store.getState());
})

ReactDOM.render(<Provider store={store}>
  <Router history={hashHistory}>
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/createdoc" component={CreateDoc}/>
      <Route path="/doc" component={Doc}/>
      <Route path="/editdoc" component={EditDoc}/>
      <Route path="/logout" component={Logout}/>
    </Route>
  </Router>
</Provider>, document.getElementById('app'));
