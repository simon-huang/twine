import React from 'react';
import connectedNavbar, { Navbar } from '../../src/app/components/navbar.jsx';
import store from '../../src/app/store.jsx';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps } from 'react-redux';
import { expect } from 'chai';
import { browserHistory, getCurrentLocation } from 'react-router';

import * as user from '../../src/app/actions/userActions.jsx';

describe('Navbar', () => {

  const routerStub = sinon.spy();

  // TODO: The appropriate name is being passed in to the stub and then being pushed to the browser history. I need to figure out how to get this back out of the stub to verify that the correct route is being generated for each nav button. Not just that the router.push function is being invoked.

  const dummydata = {
    location: {
      pathname: '/'
    },
    router: {
      push: routerStub
    },
    isLoggedIn: false,
  } 

  // Shallowly render the connected component to access the store
  const connectedNavbar = shallow (
    <connectedNavbar store={store} />
  );

  // Shallowly render the dumb component to access it's methods
  const navbar_loggedout = shallow (
    <Navbar dispatch={store.dispatch} props={dummydata} user={{username:'iamgroot'}}/>
  );

  // Simulate logged in
  dummydata.isLoggedIn = true;
  const navbar_loggedin = shallow (
    <Navbar dispatch={store.dispatch} props={dummydata} user={{username:'iamgroot'}}/>
  );

  it('should toggle login modal for login', () => {
    const loginBtn = navbar_loggedout.find('[name="login"]').node.props;
    loginBtn.onClick();
    const loginModalState = connectedNavbar.props().store.getState().auth.loginModal;
    expect(loginModalState).to.equal(true);
  });

  it('should show signup screen on signup click', () => {
    const signupRoute = navbar_loggedout.find('[name="signup"]').node.props.name;
    const signupBtn = navbar_loggedout.find('[name="signup"]').node.props;
    const mockEvent = {
      preventDefault: () => {},
      target: {
        name: signupRoute
      }
    }
    signupBtn.onClick(mockEvent);
    expect(routerStub.called).to.equal(true);
  });

  it('should toggle nav when logged in', () => {
    const loggedInNav = [];
    // Grab left-side nav items
    navbar_loggedin.find('NavItem').forEach(navItem => {
      loggedInNav.push(navItem.node.props.name);
    })
    // Grab right-side nav items
    loggedInNav.push(navbar_loggedin.find('#user-settings').node.props.id);
    loggedInNav.push(navbar_loggedin.find('[title]').node.props.title.props.children[2]);
    loggedInNav.push(navbar_loggedin.find('MenuItem').node.props.name);

    expect(loggedInNav).to.eql(['createdoc', 'profile', 'user-settings', 'iamgroot', 'logout']);
  });

  xit('should update URL path on clicks', () => {
    
  });

});















