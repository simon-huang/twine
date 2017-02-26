import axios from 'axios';
import * as doc from './docActions.jsx';

export function openDoc(docRequest) {
  return (dispatch, getState) => {
    var states = getState();
    axios.post('api/doc/openDoc', docRequest)
    .then(function(data) {
      data = data.data;
      dispatch(doc.handleChange('docOwner', data.docOwner));
      dispatch(doc.handleChange('docName', data.docName));
      dispatch(doc.handleChange('docDescription', data.docDescription));
      dispatch(doc.handleChange('docType', data.docType));
      dispatch(doc.handleChange('filePath', data.filePath));
      dispatch(doc.handleChange('parentID', data.parentID));
      dispatch(doc.handleChange('masterHtml', data.docContent));
      dispatch(doc.handleChange('docCommits', data.docCommits));
    });
  }
}

