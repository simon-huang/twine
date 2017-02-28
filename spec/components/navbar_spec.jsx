import React from 'react';
import connectedNavbar, { Navbar } from '../../src/app/components/navbar.jsx';
import store from '../../src/app/store.jsx';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps } from 'react-redux';
import {expect} from 'chai';

import * as user from '../../src/app/actions/userActions.jsx';

describe('Navbar', () => {

  const dummydata = {
    location: {
      pathname: '/'
    }
  }

  // Shallowly render the connected component to access the store
  const connectedNavbar = shallow (
    <connectedNavbar store={store} />
  );

  // Shallowly render the dumb component to access it's methods
  const navbar = shallow (
    <Navbar dispatch={store.dispatch} props={dummydata} />
  );


  it('should toggle login modal for login', () => {
    // Simulate click of login button
    const loginBtn = navbar.find('[name="login"]').node.props;
    loginBtn.onClick();
    // Trigger modal state to true
    const loginModalState = connectedNavbar.props().store.getState().user.loginModal;
    expect(loginModalState).to.equal(true);
  });

  it('should show signup screen for signup', () => {
    
  });

  it('should update URL path', () => {
    
  });

  it('should toggle nav when logged in', () => {
    
  });

});















