import React from 'react';
import { connect } from 'react-redux';

class Doc_merge_split extends React.Component {

  render() {
    return (
      <div>
        <div className="split-master">
          <div className="split-title mb10">Master document</div>
          <div className="split-document split-document-L" dangerouslySetInnerHTML={{'__html': this.props.doc.masterHtml}}></div>
        </div><div className="split-changes">
          <div className="split-title mb10">franklinjjeng’s changes</div>
          <div className="split-document" dangerouslySetInnerHTML={{'__html': this.props.doc.masterHtml}}></div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Doc_merge_split);