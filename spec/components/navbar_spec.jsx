import React from 'react';
import connectedNavbar, { Navbar } from '../../src/app/components/navbar.jsx';
import store from '../../src/app/store.jsx';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps } from 'react-redux';
import {expect} from 'chai';

import * as user from '../../src/app/actions/userActions.jsx';

describe('Navbar', () => {

  const dummydata = {
    username: 'iamgroot',
    location: {
      pathname: '/'
    }
  }

  const wrapper = mount(
    <Navbar props={dummydata} store={store} />
  );

  console.log('components methods', wrapper.instance());
  console.log('login button', wrapper.find('NavItem').nodes[0].props);
  console.log('store', wrapper.props().store.getState().user.loginModal);

  it('should toggle login modal', () => {
    const loginBtn = wrapper.find('NavItem').nodes[0].props;
    const loginModal = wrapper.props().store.getState().user.loginModal;
    expect(loginBtn.name).to.equal('login');
    loginBtn.onClick();
  });

});
