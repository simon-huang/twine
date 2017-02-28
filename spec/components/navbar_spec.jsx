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

  const shallowWrapper = shallow (
    <Navbar dispatch={store.dispatch} props={dummydata} />
  );

  const mountedWrapper = mount (
    <Navbar dispatch={store.dispatch} props={dummydata} store={store} />
  );

  // console.log('store', shallowWrapper);
  // console.log('.login', shallowWrapper.find('[name="login"]'));
  // console.log('NavItem.login', shallowWrapper.find('NavItem .login'));
  // console.log('NavItem[0]', shallowWrapper.find('NavItem'));
  // console.log('mounted wrapper state', mountedWrapper.props().store.getState());

  it('should toggle login modal', () => {
    // const loginBtn = shallowWrapper.find('[name="login"]').node.props;
    // const loginModal = wrapper.props().store.getState().user.loginModal;
    // loginBtn.onClick();
    // console.log('after click (state)', mountedWrapper.props().store.getState());
  });

});






