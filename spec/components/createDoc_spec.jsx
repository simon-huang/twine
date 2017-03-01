import React from 'react';
import store from '../../src/app/store.jsx';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps } from 'react-redux';
import {expect} from 'chai';

import connectedCreateDoc, { CreateDoc } from '../../src/app/components/createDoc.jsx';

describe('CreateDoc page', () => {

  const dummydata = {
    docName: '',
    docDescription: '',
    docType: ''
  }

  // const wrapper = shallow (
  //   <CreateDoc dispatch={store.dispatch} create={dummydata} />
  // );

  const wrapper = mount (
    <CreateDoc dispatch={store.dispatch} create={dummydata} store={store} />
  );

  it('expects props to be initialize upon load', () => {
    expect(wrapper.props().store.getState().create.docName).to.equal('');
    expect(wrapper.props().store.getState().create.docDescription).to.equal('');
    expect(wrapper.props().store.getState().create.docType).to.equal('public');
  });

  it('expects props to update properly on change', () => {
    var changeName = wrapper.find('input').simulate('change', {preventDefault() {}, target: { name: 'docName', value: 'Create Doc Name'}});
    var changeDescription = wrapper.find('textarea').simulate('change', {preventDefault() {}, target: { name: 'docDescription', value: 'Create Doc Description'}});
    var changeType = wrapper.find('select').simulate('change', {preventDefault() {}, target: { name: 'docType', value: 'private'}});

    expect(wrapper.props().store.getState().create.docName).to.equal('Create Doc Name');
    expect(wrapper.props().store.getState().create.docDescription).to.equal('Create Doc Description');
    expect(wrapper.props().store.getState().create.docType).to.equal('private');
  });


  xit('expects to route to /doc after submitting', () => {
    console.log('Submit button', wrapper.find('button'));
  });

});
