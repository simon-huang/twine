import React from 'react';
import { connect } from 'react-redux';

import DocMergeListEntry from './doc_mergeList_entry.jsx';

export class DocMergeList extends React.Component {
  constructor(props) {
    super(props);
  }

  tabChange(tab) {
    this.props.dispatch(user.tabChange(tab));
  }

  render() {
    console.log(this.props.doc.pullRequests.length);
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
  }
}

export default connect(state => state)(DocMergeList);


