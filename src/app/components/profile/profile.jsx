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

import * as allDoc from '../../actions/allDocActions.jsx';

import ProgressBar from '../modals/progressBar.jsx';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
    this.returnUrlParams = this.returnUrlParams.bind(this);
    this.profileOwner = this.profileOwner.bind(this);
  }
  
  componentWillMount() {
    this.setState({ready: false});
    var params = this.returnUrlParams();
    this.props.dispatch(allDoc.retrieveProfileDocs(params.username));
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ready: !nextProps.loading.async});
  }
  
  returnUrlParams() {
    var path = this.props.location.pathname;
    var splitPath = path.split(/[\\\/]/);
    var username = splitPath[splitPath.length - 1];
    return {username}
  }

  tabChange(tab) {
    this.props.dispatch(user.tabChange(tab));
  }

  profileOwner() {
    var yourProfile = true;
    var profileOwner = this.returnUrlParams().username;
    if (profileOwner !== this.props.user.username) {
      yourProfile = false
    };
    return yourProfile;
  }

  render() {
    var yourProfile = this.profileOwner();
    var profileOwner = this.returnUrlParams().username;
    if(!this.state.ready) {
      return <ProgressBar />
    } else { 
      return (
        <div className="container mt20 profile">
          {yourProfile ? <h4 className="mt10 mb20 bold">Your documents</h4> : <h4 className="mt10 mb20 bold">{profileOwner}&#39;s documents</h4>}
            <div className="row doc-tabs">
              <div className="col-sm-12">
                <Tabs defaultActiveKey={this.props.user.currentTab} onChange={this.tabChange} id="docTabs">
                  <Tab title="All docs" eventKey="all" >
                    <ProfileDocuments tab={'All docs'} docList={this.props.allDoc.associatedDocs}/>
                  </Tab>
                  <Tab title={yourProfile ? "Owned by me" : "Owned"} eventKey="owned" >
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
}

export default connect(state => state)(Profile);