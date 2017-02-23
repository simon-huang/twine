import axios from 'axios';

export function handleChange(name, value) {
  return {
    type: "EDIT_" + name.toUpperCase(),
    payload: value
  }
}

export function showMergeMenu(value) {
  return {
    type: "SHOWMERGEMENU",
    payload: value
  }
}

// API request to server to create a document
export function mergeDocument() {
  return (dispatch, getState) => {
    var states = getState();
    var mergeRequest = {
      docInfo: states.doc.editDoc,
      mergeInfo: states.merge
    }
    axios.post('/api/doc/mergeDoc', mergeRequest);
  }
}