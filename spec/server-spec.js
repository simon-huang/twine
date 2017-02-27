// var expect = require('chai').expect;

import React from 'react';
import sinon from 'sinon';
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';

import { Provider } from "react-redux";

import CreateDoc from './../src/app/components/createDoc.jsx';
import EditDoc from './../src/app/components/editDoc/editDoc.jsx';
import EditDoc_details from './../src/app/components/editDoc/editDoc_details.jsx';

import * as docActions from './../src/app/actions/docActions.jsx';
import * as mergeActions from './../src/app/actions/mergeActions.jsx';

import store from './../src/app/store.jsx';

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView


describe('<CreateDoc />', () => {
  it('1 + 1 = 2', () => {
    expect(1 + 1).to.equal(2);
  });

  const wrapper = mount(
      <CreateDoc store={store} />
  );

  it('expects props to be initialize upon load', () => {
    expect(wrapper.props().store.getState().doc.docName).to.equal('Test Doc Name');
    expect(wrapper.props().store.getState().doc.docDescription).to.equal('');
    expect(wrapper.props().store.getState().doc.docType).to.equal('');
  });

  it('expects actions to successfully change values', () => {
    console.log('AAAAAAAAA', wrapper.props().store.getState())
    wrapper.props().store.dispatch(docActions.handleChange('docName', 'test name'));
    wrapper.props().store.dispatch(docActions.handleChange('docDescription', 'details details'))
    wrapper.props().store.dispatch(docActions.handleChange('docType', 'private'));
    expect(wrapper.props().store.getState().doc.docName).to.equal('test name');
    expect(wrapper.props().store.getState().doc.docDescription).to.equal('details details');
    expect(wrapper.props().store.getState().doc.docType).to.equal('private');
  });

  // xit('post request to be sent when the doc is created', () => {
  //   store.dispatch(docActions.createDoc());
  // });

});

// xdescribe('<EditDoc />', () => {

//   const wrapper = mount(
//     <Provider store={store}>
//       <EditDoc />
//     </Provider>
//   );

//   it('expects the content to update properly', () => {
//     console.log('AAAAAAAA', wrapper.props());
//     wrapper.props().store.dispatch(docActions.handleChange('editHtml', 'test content'))
//     expect(wrapper.props().store.getState().doc.editHtml).to.equal('test content');
//   });
// });

// xdescribe('<EditDoc_details />', () => {

//   const wrapper = mount(
//     <Provider store={store}>
//       <EditDoc_details />
//     </Provider>
//   );

//   it('expects the merge menu to appear when triggered', () => {
//     var showMerge = wrapper.props().store.getState().merge.showMerge;
//     wrapper.props().store.dispatch(mergeActions.showMergeMenu(!showMerge));
//     expect(wrapper.props().store.getState().merge.showMerge).to.equal(true);
//   });

//   it('expects merge title to be updated', () => {
//     wrapper.props().store.dispatch(mergeActions.handleChange('mergeTitle', 'Title for the merge request'));
//     expect(wrapper.props().store.getState().merge.mergeTitle).to.equal('Title for the merge request');
//   });
  
//   it('expects merge message to be updated', () => {
//     wrapper.props().store.dispatch(mergeActions.handleChange('mergeMessage', 'Message to accompany merge'));
//     expect(wrapper.props().store.getState().merge.mergeMessage).to.equal('Message to accompany merge');
//   });

//   xit('Merge info values to be submitted during merge request', () => {
//     wrapper.props().store.dispatch(mergeActions.mergeDocument());
//   });
// });





