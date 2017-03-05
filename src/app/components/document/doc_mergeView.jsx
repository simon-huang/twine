import React from 'react';
import { connect } from 'react-redux';

import DocMergeListEntry from './doc_mergeList_entry.jsx';
import DocMerge from './doc_merge.jsx'

export class DocMergeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.merge.displayMergeRequest) {
      if (!this.props.doc.pullRequests.length) {
        return (
          <div>No Merge Requests</div>
        );
      } else {
        return (
          <div>
            {this.props.doc.pullRequests.map((info, i) => (
              <DocMergeListEntry className="merge_entry" key={i} prInfo={info} />))}
          </div>
        );
      }
    } else {
      return (
        <DocMerge />
      );
    }
  }
}

export default connect(state => state)(DocMergeList);


