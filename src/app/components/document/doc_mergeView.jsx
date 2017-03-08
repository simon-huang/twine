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
          <div className="merge-request-container pt10 pb10">
            <div className="row mt15">
              <div className="col-sm-12">
                No Merge Requests
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="merge-request-container pt10 pb10">
            <div className="row mt15">
              <div className="col-sm-12">
                {this.props.doc.pullRequests.map((info, i) => (
                  <DocMergeListEntry className="merge_entry" key={i} prInfo={info} />
                ))}
              </div>
            </div>
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


