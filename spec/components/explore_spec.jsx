import React from 'react';
import store from '../../src/app/store.jsx';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps } from 'react-redux';
import {expect} from 'chai';

import connectedProfile, { Explore } from '../../src/app/components/explore/explore.jsx';
import { ExploreDocuments } from '../../src/app/components/explore/explore_documents.jsx';

describe('Explore page', () => {

  // const connectedWrapper = shallow (
  //   <connectedProfile dispatch={store.dispatch} user={dummydata} store={store} />
  // );

  const dummyDocData = {
    allDocuments: [
      {docName: 'TestDoc1', docDescription: 'TestDoc1 description'},
      {docName: 'TestDoc2', docDescription: 'TestDoc2 description'},
      {docName: 'TestDoc3', docDescription: 'TestDoc3 description'},
    ]
  };


  const dummyUserData = {
    username: '',
    email: ''
  };

  const wrapper = mount (
    <Explore dispatch={store.dispatch} store={store} allDoc={dummyDocData} />
  );

  describe('Explore (parent page)', () => {

    it('expects ExploreDocuments  to exist on the page', () => {
      expect(wrapper.find('ExploreDocuments')).to.exist;
    });

    it('expects to display all documents in allDocuments', () => {
      expect(wrapper.find('.explore-documents').node.children.length).to.equal(dummyDocData.allDocuments.length + 2);
    });

  });

  describe('ExploreDocuments', () => {
    it('expects doc information to display properly', () => {
      expect(wrapper.find('.explore-documents').node.children[2].children[0].innerHTML).to.equal('TestDoc1');
      expect(wrapper.find('.explore-documents').node.children[2].children[2].innerHTML).to.equal('TestDoc1 description');

      expect(wrapper.find('.explore-documents').node.children[3].children[0].innerHTML).to.equal('TestDoc2');
      expect(wrapper.find('.explore-documents').node.children[3].children[2].innerHTML).to.equal('TestDoc2 description');

      expect(wrapper.find('.explore-documents').node.children[4].children[0].innerHTML).to.equal('TestDoc3');
      expect(wrapper.find('.explore-documents').node.children[4].children[2].innerHTML).to.equal('TestDoc3 description');
    });

    xit('expects to redirect to doc when clicking on title', () => {
      // console.log('EXPLORE', wrapper.find('.TestDoc1'));
      // console.log('EXPLORE', wrapper.find('.list-title'));
      // wrapper.find('.TestDoc1').simulate('click');
    });

  });

});