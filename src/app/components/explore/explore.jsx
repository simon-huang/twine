import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as allDoc from '../../actions/allDocActions.jsx';

import ExploreDocuments from './explore_documents.jsx';


export class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.openDoc = this.openDoc.bind(this);
  }

  openDoc(name, owner) {
    var docRequest = {
      docOwner: owner,
      docName: name,
    }
    this.props.dispatch(allDoc.openDoc(docRequest));
    browserHistory.push('/doc');
  }

  componentWillMount() {
    this.props.dispatch(allDoc.retrieveAllDocs());
  }

  render() {
    return (
      <div className="explore-documents">
        <h1>Explore</h1>
        <hr/>
        {this.props.allDoc.allDocuments.map((docs, i) => (
          <ExploreDocuments className="doc_summary" key={i} onClick={this.openDoc} doc={docs} />))}
      </div>
    )
  }
}

export default connect(state => state)(Explore);

