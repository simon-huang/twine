import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './components/app.jsx';
import store from './store.jsx';
import CreateDoc from './components/createDoc.jsx';
import SignUp from './components/auth/signUp.jsx';
import Login from './components/auth/login.jsx';
import Home from './components/home.jsx';
import Doc from './components/document/doc.jsx';
import EditDoc from './components/editDoc/editDoc.jsx';
import Profile from './components/profile/profile.jsx';
import EnsureLoggedInContainer from './components/auth/ensureLoggedInContainer.jsx';
import Explore from './components/explore/explore.jsx';

store.subscribe(() => {
  console.log('store changed', store.getState());
})

export class Publishus extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route component={App}>
            <Route path="/" component={Home}/>
            <Route path="login" component={Login}/>
            <Route path="signup" component={SignUp}/>
            <Route path="logout" component={Home}/>
            <Route path="explore" component={Explore}/>
            <Route path="doc" component={Doc}/>
            <Route component={EnsureLoggedInContainer}>
              <Route path="createdoc" component={CreateDoc}/>
              <Route path="editdoc" component={EditDoc}/>
              <Route path="profile" component={Profile}/>
            </Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<Publishus />, document.getElementById('app'));



