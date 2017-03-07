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
import DocMergeView from './doc_mergeView.jsx'
import DocSettings from './doc_settings.jsx'
import ProgressBar from '../modals/progressBar.jsx';
import ForkedFrom from './forkedFrom.jsx'
import DocMergeButton from './doc_merge_button.jsx'
import DocCopyButton from './doc_copy_button.jsx'
import MergeModal from './../modals/mergeModal.jsx'

// Actions
import * as docSummary from './../../actions/docSummaryActions.jsx';
import * as doc from './../../actions/docActions.jsx';
import * as merge from './../../actions/mergeActions.jsx';
import * as loading from './../../actions/loadingActions.jsx';

export class Doc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
    this.tabChange = this.tabChange.bind(this);
    this.redirectEditDoc = this.redirectEditDoc.bind(this);
    this.redirectProfile = this.redirectProfile.bind(this);
    this.copyDocument = this.copyDocument.bind(this);
    this.returnUrlParams = this.returnUrlParams.bind(this);
  }
  
  componentWillMount() {
    this.setState({ready: false});
    var params = this.returnUrlParams();
    this.props.dispatch(doc.retrieveSpecificDoc(params.username, params.docID));
    this.props.dispatch(merge.displayMergeFalse());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ready: !nextProps.loading.async});
  }

  returnUrlParams() {
    var path = this.props.location.pathname;
    var splitPath = path.split(/[\\\/]/);
    const username = splitPath[splitPath.length - 2];
    const docID = splitPath[splitPath.length - 1];
    return {username, docID}
  }

  tabChange(tab) {
    this.props.dispatch(docSummary.tabChange(tab));
  }

  redirectEditDoc() {
    browserHistory.push(`/profile/${this.props.doc.docOwner}/${this.props.doc.docId}/editing`);
  }

  redirectProfile() {
    browserHistory.push('/profile' + '/' + this.props.doc.docOwner);
  }

  copyDocument() {
    this.props.dispatch(doc.copyDoc());
  }

  render() {
    if(!this.state.ready) {
      return <ProgressBar />
    } else {
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
                    {this.props.doc.docDescription ? ' (' + this.props.doc.docDescription + ')' : ''}
                  </Breadcrumb>
                  <ForkedFrom />
                </div>
                <div className="col-sm-4 text-right">
                  <ButtonGroup>
                    <DocMergeButton />
                    <DocCopyButton />
                  </ButtonGroup>
                </div>
              </div>
              <div className="row doc-tabs">
                <div className="col-sm-12">
                  <Tabs defaultActiveKey={this.props.docSummary.currentTab} onChange={this.tabChange} id="docTabs">
                    <Tab title="Document" eventKey="document" >
                      <DocDetails />
                    </Tab>
                    <Tab title={"Merge Requests " + this.props.doc.pullRequests.length} eventKey="merge">
                      <DocMergeView />
                    </Tab>
                  {/*<Tab title="History" eventKey="history">
                      <DocHistory />
                    </Tab>
                    <Tab title="Settings" eventKey="settings">
                      <DocSettings />
                    </Tab>*/}
                  </Tabs>
                </div>
              </div>
            </div>  
          </div>
          <MergeModal />
        </div>
      );
    }
  }
}

export default connect(state => state)(Doc);
