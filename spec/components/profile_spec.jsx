import React from 'react';
import store from '../../src/app/store.jsx';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps } from 'react-redux';
import {expect} from 'chai';

import connectedProfile, { Profile } from '../../src/app/components/profile/profile.jsx';
import { ProfileDocSummary } from '../../src/app/components/profile/profile_docSummary.jsx';
import { ProfileDocuments } from '../../src/app/components/profile/profile_documents.jsx';

describe('Profile page', () => {

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

  describe('Profile (parent page)', () => {

    const wrapper = shallow (
      <Profile dispatch={store.dispatch} user={dummyUserData} store={store} />
    );

    it('expects ProfileDocuments to exist on the page', () => {
      expect(wrapper.find('ProfileDocuments')).to.exist;
    });
  });

  describe('Profile documents', () => {

    const wrapper = mount (
      <ProfileDocuments dispatch={store.dispatch} user={dummyUserData} allDoc={dummyDocData} store={store} />
    );

    it('expects ProfileDocSummary to exist', () => {
      expect(wrapper.find('ProfileDocSummary')).to.exist;
    });

    it('expects to display all documents in allDocuments', () => {
      expect(wrapper.find('.profile-documents').node.children.length).to.equal(dummyDocData.allDocuments.length + 2);
    });

  });

  describe('Profile doc summary', () => {

    const wrapper = mount (
      <ProfileDocuments dispatch={store.dispatch} user={dummyUserData} allDoc={dummyDocData} store={store} />
    );

    var docSummary = wrapper.find('.profile-documents').node.children;

    it('expects doc information to display properly', () => {
      expect(wrapper.find('.profile-documents').node.children[2].children[0].innerHTML).to.equal('TestDoc1');
      expect(wrapper.find('.profile-documents').node.children[2].children[2].innerHTML).to.equal('TestDoc1 description');

      expect(wrapper.find('.profile-documents').node.children[3].children[0].innerHTML).to.equal('TestDoc2');
      expect(wrapper.find('.profile-documents').node.children[3].children[2].innerHTML).to.equal('TestDoc2 description');

      expect(wrapper.find('.profile-documents').node.children[4].children[0].innerHTML).to.equal('TestDoc3');
      expect(wrapper.find('.profile-documents').node.children[4].children[2].innerHTML).to.equal('TestDoc3 description');
    });

    xit('expects to redirect to doc when clicking on title', () => {
      // console.log('PROFILE', wrapper.find('.TestDoc1'));
      // console.log('PROFILE', wrapper.find('.list-title'));
      // wrapper.find('.TestDoc1').simulate('click');
    });

  });

});
