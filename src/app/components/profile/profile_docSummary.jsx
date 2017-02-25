import React from 'react';

export default function ProfileDocSummary (props) {
  return (
    <div>
      <div>{props.doc.docName}</div>
      <div>{props.doc.docDescription}</div>
    </div>
  );
};