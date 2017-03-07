import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from "react-redux";
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

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
import NoPage404 from './components/noPage404.jsx';

store.subscribe(() => {
  // console.log('store changed', store.getState());
})

function createElement(Component, props) {
  return <Component key={`RouteComponent-${props.location.pathname}`} {...props} />;
}

export class Publishus extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} createElement={createElement}>
          <Route component={App}>
            <Route path="/" component={Home}/>
            <Route path="404" component={NoPage404}/>
            <Route path="login" component={Login}/>
            <Route path="signup" component={SignUp}/>
            <Route path="logout" component={Home}/>
            <Route path="explore" component={Explore}/>
            <Route path="profile/:username/:docId" component={Doc}/>
            <Route component={EnsureLoggedInContainer}>
              <Route path="createdoc" component={CreateDoc}/>
              <Route path="profile/:username/:docId/editing" component={EditDoc}/>
              <Route path="profile/:username" component={Profile}/>
            </Route>
            <Redirect from="*" to='404' />
          </Route>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<Publishus />, document.getElementById('app'));
