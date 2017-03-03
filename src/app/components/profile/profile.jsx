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
        <h1>Profile</h1>
        <div>Username: {this.props.user.username}</div>
          <div className="row doc-tabs">
            <div className="col-sm-12">
              <Tabs defaultActiveKey={this.props.user.currentTab} onChange={this.tabChange} id="docTabs">
                <Tab title="My Documents" eventKey="all" >
                  <ProfileDocuments tab={'All My Documents'} docList={this.props.allDoc.associatedDocs}/>
                </Tab>
                <Tab title="My Documents" eventKey="owned" >
                  <ProfileDocuments tab={'Owned Documents'} docList={this.props.allDoc.ownedDocs}/>
                </Tab>
                <Tab title="Contributing Documents" eventKey="contrib">
                  <ProfileDocuments tab={'Contributing Documents'} docList={this.props.allDoc.contributingDocs}/>
                </Tab>
              </Tabs>
            </div>
          </div>
      </div>
    )
  }
}

export default connect(state => state)(Profile);