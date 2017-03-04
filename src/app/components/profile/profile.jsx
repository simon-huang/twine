import React from 'react';
import { connect } from 'react-redux';
import * as user from '../../actions/userActions.jsx';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import BreadcrumbItem from 'react-bootstrap/lib/BreadcrumbItem';

import ProfileDocuments from './profile_documents.jsx';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  tabChange(tab) {
    this.props.dispatch(user.tabChange(tab));
  }

  render() {
    return (
      <div className="container mt20 profile">
        <h4 className="mt10 mb20 bold">Your documents</h4>
          <div className="row doc-tabs">
            <div className="col-sm-12">
              <Tabs defaultActiveKey={this.props.user.currentTab} onChange={this.tabChange} id="docTabs">
                <Tab title="All docs" eventKey="all" >
                  <ProfileDocuments tab={'All docs'} docList={this.props.allDoc.associatedDocs}/>
                </Tab>
                <Tab title="Owned by me" eventKey="owned" >
                  <ProfileDocuments tab={'Owned by me'} docList={this.props.allDoc.ownedDocs}/>
                </Tab>
                <Tab title="Contributing to" eventKey="contrib">
                  <ProfileDocuments tab={'Contributing to'} docList={this.props.allDoc.contributingDocs}/>
                </Tab>
              </Tabs>
            </div>
          </div>

      </div>
    )
  }
}

export default connect(state => state)(Profile);