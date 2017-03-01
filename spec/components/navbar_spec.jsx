import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps } from 'react-redux';
import { expect } from 'chai';
import { browserHistory, getCurrentLocation } from 'react-router';
import moxios from 'moxios';

// Imports from application
import ConnectedNavbar, { Navbar } from '../../src/app/components/navbar.jsx';
import { Publishus } from '../../src/app/client.jsx';
import store from '../../src/app/store.jsx';

// Import actions
import * as auth from '../../src/app/actions/authActions.jsx';

/*==================================*/
/*== SETUP COMPONENTS FOR TESTING ==*/
/*==================================*/

const axios = sinon.spy();

const routerStub = sinon.spy();

const dummydata = {
  location: {
    pathname: '/'
  },
  router: {
    push: routerStub
  },
  isLoggedIn: false,
}

// Shallowly render the app to evaluate routes
const app = shallow (
  <Publishus />
);

// Shallowly render the connected component to access the store
const connectedNavbar = shallow (
  <ConnectedNavbar store={store} />
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

/*==================================*/
/*=========== YAY TESTS ============*/
/*==================================*/


describe('Navbar', () => {

  describe('LoggedIn vs. LoggedOut nav changes', () => {

    it('should display logged out nav items', () => {
      const loggedOutNav = [];
      // Grab nav items
      navbar_loggedout.find('NavItem').forEach(navItem => {
        loggedOutNav.push(navItem.node.props.name);
      })
      expect(loggedOutNav).to.eql(['login', 'signup']);
    });

    it('should display logged in nav items', () => {
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
  });

  describe('Browser paths', () => {

    beforeEach(() => {
      moxios.install()
    })

    afterEach(() => {
      routerStub.reset()
      moxios.uninstall()
    });

    it('should direct to home on click', () => {
      // Clicking home results in browser update to /
      const homeBtn = navbar_loggedout.find('[name="/"]').node.props;
      homeBtn.onClick(createMockEvent(homeBtn.name));
      expect(routerStub.calledWithExactly('/')).to.equal(true);

      // / route renders the Home component
      const homeRoute = selectRoute('/');
      expect(homeRoute.props.component.WrappedComponent.name).to.equal('Home');
    });

    it('should direct to login modal on click', () => {
      const loginBtn = navbar_loggedout.find('[name="login"]').node.props;
      loginBtn.onClick();
      expect(connectedNavbar.props().store.getState().auth.loginModal).to.equal(true);
    });

    it('should direct to signup on click', () => {
      // Clicking signup results in browser update to /signup
      const signupBtn = navbar_loggedout.find('[name="signup"]').node.props;
      signupBtn.onClick(createMockEvent(signupBtn.name));
      expect(routerStub.calledWithExactly('signup')).to.equal(true);

      // signup route renders the SignUp component
      const signupRoute = selectRoute('signup');
      expect(signupRoute.props.component.WrappedComponent.name).to.equal('SignUp');
    });

    it('should direct to createdoc on click', () => {
      // Clicking createdoc results in browser update to /createdoc
      const createdocBtn = navbar_loggedin.find('[name="createdoc"]').node.props;
      createdocBtn.onClick(createMockEvent(createdocBtn.name));
      expect(routerStub.calledWithExactly('createdoc')).to.equal(true);

      // createdoc route renders the CreateDoc component
      const createdocRoute = selectRoute('createdoc');
      expect(createdocRoute.props.component.WrappedComponent.name).to.equal('CreateDoc');
    });

    it('should direct to profile on click', () => {
      // Clicking profile results in browser update to /profile
      const profileBtn = navbar_loggedin.find('[name="profile"]').node.props;
      profileBtn.onClick(createMockEvent(profileBtn.name));
      expect(routerStub.calledWithExactly('profile')).to.equal(true);

      // profile route renders the Profile component
      const profileRoute = selectRoute('profile');
      expect(profileRoute.props.component.WrappedComponent.name).to.equal('Profile');
    });

    it('should call log out on click', () => {
      // Clicking logout results in browser update to /logout
      connectedNavbar.props().store.dispatch(auth.userCreated('iamgroot'));
      const logoutBtn = navbar_loggedin.find('[name="logout"]').node.props;
      logoutBtn.onClick();
      
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: { id: 1, firstName: 'Fred', lastName: 'Flintstone' }
        }).then(function () {
          connectedNavbar.props().store.dispatch({
            type: "USER_LOGOUT"
          });
        }).then(function() {
          expect(connectedNavbar.props().store.getState().auth.login).to.equal(false);
        })
      })

      // logout route renders the Home component
      const logoutRoute = selectRoute('logout');
      expect(logoutRoute.props.component.WrappedComponent.name).to.equal('Home');
    });

  });

});


// Helper function for creating dummy events for nav clicks
const createMockEvent = (name) => (
  {
    preventDefault: () => {},
    target: {
      name: name
    }
  }
)

// Helper function for grabbing a particular route from the router
const selectRoute = (routeName) => {
  var routeObj;
  app.find('Route').nodes.forEach(route => {
    if(route.props.path === routeName) {
      routeObj = route;
    }
  });
  return routeObj;
}
















