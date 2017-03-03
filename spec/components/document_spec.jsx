import React from 'react';
import store from '../../src/app/store.jsx';
import { mount, shallow, render } from 'enzyme';
import { connect, mapStateToProps } from 'react-redux';
import {expect} from 'chai';

import connectedDoc, { Doc } from '../../src/app/components/document/doc.jsx';
import connectedDoc_contents, { Doc_contents } from '../../src/app/components/document/doc_contents.jsx';
import connectedDoc_details, { Doc_details } from '../../src/app/components/document/doc_details.jsx';
import connectedDoc_history, { Doc_history } from '../../src/app/components/document/doc_history.jsx';
import connectedDoc_settings, { Doc_settings } from '../../src/app/components/document/doc_settings.jsx';
import connectedDoc_merge, { Doc_merge } from '../../src/app/components/document/doc_merge.jsx';

describe('Document page', () => {

  const docDummyData = {
    docOwner: 'Test Owner',
    docName: 'Test Doc Name',
    masterHtml: 'Master content to be displayed',
    docType: 'public'
  }

  const docSummaryDummyData = {
    currentTab: 'document',
    reviewChanges: '',
    mergeSplitView: '',
  }

  describe('Document', () => {

    const wrapper = shallow (
      <Doc dispatch={store.dispatch} doc={docDummyData} docSummary={docSummaryDummyData} store={store} />
    );

    it('expects DocDetails to exist on the page', () => {
      expect(wrapper.find('DocDetails')).to.exist;
    });

    it('expects DocMerge to exist on the page', () => {
      expect(wrapper.find('DocMerge')).to.exist;
    });

    it('expects DocHistory to exist on the page', () => {
      expect(wrapper.find('DocHistory')).to.exist;
    });

    it('expects DocSettings to exist on the page', () => {
      expect(wrapper.find('DocSettings')).to.exist;
    });


    it('expects doc owner and title to display properly', () => {
      var docInfo = wrapper.find('.breadcrumb').node.props.children;
      var owner = docInfo[0].props.children;
      var title = docInfo[1].props.children;

      expect(owner).to.equal('Test Owner');
      expect(title).to.equal('Test Doc Name');
    });
  });

  describe('Doc Details', () => {
    
    const wrapper = shallow (
      <Doc_details dispatch={store.dispatch} doc={docDummyData} store={store} />
    );

    it('expects two buttons, merge and copy, to exist', () => {
      var buttons = wrapper.find('Button').nodes;
      var merge = buttons[0].props.children;
      var copy = buttons[1].props.children;

      expect(merge).to.equal('Merge');
      expect(copy).to.equal('Copy');
    });

    it('expects document type to display properly', () => {
      var type = wrapper.find('.col-sm-3').nodes[3].props.children;

      expect(type).to.equal('public');
      expect(type).to.equal('public');
    });

    it('expects Doc_contents to exist on the page', () => {
      expect(wrapper.find('Doc_contents')).to.exist;
    });

    xit('expects number of saves of doc to display properly', () => {
    });

    xit('expects number of copies of doc to display properly', () => {
    });

    xit('expects number of contributors of doc to display properly', () => {
    });


  });

  describe('Doc Content', () => {
    
    const wrapper = shallow (
      <Doc_contents dispatch={store.dispatch} doc={docDummyData} store={store} />
    );

    it('expects to display content of the document properly', () => {
      var masterContent = wrapper.props().dangerouslySetInnerHTML.__html;
      expect(masterContent).to.equal('Master content to be displayed');
    });
  });

  describe('Doc Merge', () => {
    
    const wrapper = shallow (
      <Doc_merge dispatch={store.dispatch} docSummary={docSummaryDummyData} store={store} />
    );

    xit('onmount defaults to split view', () => {
      
    });

    xit('action buttons exist', () => {
    
    });

    xit('review changes options exist', () => {
    
    });

    xit('review changes options exist', () => {
    
    });

    describe('Merge Review', () => {

      xit('onmount edit mode is off', () => {

      });

      xit('split vs. unified view toggle switches view', () => {

      });

      xit('edit mode opens WYSIWYG', () => {

      });

      xit('edit mode opens WYSIWYG', () => {

      });

    });

  });


  xdescribe('Doc History', () => {
    
    const wrapper = shallow (
      <Doc_history dispatch={store.dispatch} doc={docDummyData} store={store} />
    );

    it('expects history of document to be displayed', () => {
    });
  });

  xdescribe('Doc settings', () => {
    
    const wrapper = shallow (
      <Doc_history dispatch={store.dispatch} doc={docDummyData} store={store} />
    );

    it('expects to display document settings', () => {
    });
  });

});
