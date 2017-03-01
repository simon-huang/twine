import React from 'react';
import { Provider } from "react-redux";
import store from '../../src/app/store.jsx';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps } from 'react-redux';
import {expect} from 'chai';

import { EditDoc } from '../../src/app/components/editDoc/editDoc.jsx';
import { EditDoc_details } from '../../src/app/components/editDoc/editDoc_details.jsx';

describe('Edit Doc page', () => {

  const docDummyData = {
    docOwner: 'Test Owner',
    docName: 'Test Doc Name',
    masterHtml: 'Master content to be displayed',
    docType: 'public'
  }

  const mergeDummyData = {
    showMerge: false,
    mergeTitle: '',
    mergeMessage: ''
  }

  const docSummaryDummyData = {
    currentTab: 'document',
    reviewChanges: '',
    mergeSplitView: '',
  }

  describe('EditDoc', () => {

    const wrapperFalse = shallow(
      <EditDoc dispatch={store.dispatch} store={store} doc={docDummyData} />
    )

    it('expects EditDoc_details to exist on the page', () => {
      expect(wrapperFalse.find('EditDoc_details')).to.exist;
    });

    it('expects Editor (wysiwyg) to exist on the page', () => {
      expect(wrapperFalse.find('Editor')).to.exist;
    });

  });

  describe('EditDoc page', () => {

    const wrapperFalse = mount (
      <EditDoc_details dispatch={store.dispatch} store={store} merge={mergeDummyData} />
    )

    it('expects 2 buttons, Save and Merge, when showMerge is false', () => {
      expect(wrapperFalse.find('button').length).to.equal(2);

      var save = wrapperFalse.find('.save_request').node.innerHTML;
      var merge = wrapperFalse.find('.merge_request').node.innerHTML;

      expect(save).to.equal('Save');
      expect(merge).to.equal('Merge');

    });

    it('expects showMerge to be true when pressing merge button', () => {
      wrapperFalse.find('.merge_request').simulate('click');
      expect(wrapperFalse.props().store.getState().merge.showMerge).to.equal(true);
    });

    xit('expects save message to appear when pressing save button', () => {
      wrapperFalse.find('.save_request').simulate('click');
    });

    const mergeDummyDataTrue = {
      showMerge: true,
      mergeTitle: '',
      mergeMessage: ''
    }

    const wrapperTrue = mount (
      <EditDoc_details dispatch={store.dispatch} store={store} merge={mergeDummyDataTrue} />
    )

    it('expects 2 buttons, Cancel and Confirm, when showMerge is true', () => {

      expect(wrapperTrue.find('button').length).to.equal(2);

      var cancel = wrapperTrue.find('.cancel_request').node.innerHTML;
      var confirm = wrapperTrue.find('.confirm_merge_request').node.innerHTML;

      expect(cancel).to.equal('Cancel');
      expect(confirm).to.equal('Confirm');
    });

    it('expects to be able to change the merge title and message properly', () => {
      wrapperTrue.find('input').simulate('change', {preventDefault() {}, target: { name: 'mergeTitle', value: 'Test Merge Title'}});
      wrapperTrue.find('textarea').simulate('change', {preventDefault() {}, target: { name: 'mergeMessage', value: 'Test Merge Message'}});

      expect(wrapperTrue.props().store.getState().merge.mergeTitle).to.equal('Test Merge Title');
      expect(wrapperTrue.props().store.getState().merge.mergeMessage).to.equal('Test Merge Message');
    });

    it('expects showMerge to be false when pressing cancel button', () => {
      wrapperTrue.find('.cancel_request').simulate('click');
      expect(wrapperTrue.props().store.getState().merge.showMerge).to.equal(false);
    });

    // will throw an error as a post request is triggered but not allowed.
    it('expects showMerge to be false when pressing confirm button', () => {
      wrapperTrue.find('.confirm_merge_request').simulate('click');
      expect(wrapperTrue.props().store.getState().merge.showMerge).to.equal(false);
    });

    // will throw an error as a post request is triggered but not allowed.
    xit('expects merge message appear when pressing confirm button', () => {
      wrapperTrue.find('.confirm_merge_request').simulate('click');
    });

  });

});