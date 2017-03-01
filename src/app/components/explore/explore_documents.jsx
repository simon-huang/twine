import React from 'react';

export default function ExploreDocuments (props) {
  return (
    <div>
      <div className={'list-title ' + props.doc.docName} onClick={() => (props.onClick(props.doc.docName, props.doc.docOwner))}>{props.doc.docName}</div>
      <br/>
      <div>{props.doc.docDescription}</div>
      <hr/>
    </div>
  );
};