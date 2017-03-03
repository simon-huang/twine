import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// UI
import styles from './../styles/style.jsx';
import Star from 'material-ui/svg-icons/action/grade';
import Copy from 'material-ui/svg-icons/action/note-add';
import Eye from 'material-ui/svg-icons/action/visibility';
import RaisedButton from 'material-ui/RaisedButton';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import BreadcrumbItem from 'react-bootstrap/lib/BreadcrumbItem';

// Components
import DocDetails from './doc_details.jsx'
import DocHistory from './doc_history.jsx'
import DocMerge from './doc_merge.jsx'
import DocSettings from './doc_settings.jsx'

// Store properties
import * as docSummary from './../../actions/docSummaryActions.jsx';
import * as doc from './../../actions/docActions.jsx';

export class Doc extends React.Component {
  constructor(props) {
    super(props);
    this.tabChange = this.tabChange.bind(this);
    this.redirectEditDoc = this.redirectEditDoc.bind(this);
    this.redirectProfile = this.redirectProfile.bind(this);
    this.copyDocument = this.copyDocument.bind(this);
  }

  tabChange(tab) {
    this.props.dispatch(docSummary.tabChange(tab));
  }

  redirectEditDoc() {
    browserHistory.push('/editdoc');
  }

  redirectProfile() {
    browserHistory.push('/profile');
  }

  copyDocument() {
    this.props.dispatch(doc.copyDoc());
    browserHistory.push('/doc');
  }

  render() {
    return (
      <div className="container mt25 mb25">
        <div className="row">
          <div className="col-sm-12">
            <div className="row doc-title mb20">
              <div className="col-sm-8">
                <Breadcrumb className="breadcrumb">
                  <BreadcrumbItem href="#" onClick={this.redirectProfile}>
                    {this.props.doc.docOwner}
                  </BreadcrumbItem>
                  <BreadcrumbItem href="#" onClick={this.redirectEditDoc}>
                    {this.props.doc.docName}
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
              <div className="col-sm-4 text-right">
                <ButtonGroup>
                  <Button>Watch</Button>
                  <Button>Star</Button>
                  <Button onClick={this.copyDocument} className="copy-button">Copy</Button>
                </ButtonGroup>
              </div>
            </div>
            <div className="row doc-tabs">
              <div className="col-sm-12">
                <Tabs defaultActiveKey={this.props.docSummary.currentTab} onChange={this.tabChange} id="docTabs">
                  <Tab title="Document" eventKey="document" >
                    <DocDetails />
                  </Tab>
                  <Tab title="Merge Requests" eventKey="merge">
                    <DocMerge />
                  </Tab>
                  <Tab title="History" eventKey="history">
                    <DocHistory />
                  </Tab>
                  <Tab title="Settings" eventKey="settings">
                    <DocSettings />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Doc);