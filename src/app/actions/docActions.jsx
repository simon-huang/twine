import axios from 'axios';

export function handleChange(name, value) {
  return {
    type: "EDIT_" + name.toUpperCase(),
    payload: value
  }
}

// API request to server to create a document
export function editDocChange(value) {
  return {
    type: "EDIT_EDITCONTENT",
    payload: value
  }
}

export function loadOriginalContent() {
  return (dispatch, getState) => {
    var states = getState();
    dispatch({
      type: "EDIT_EDITCONTENT",
      payload: states.doc.originalContent
    });
  }
}

export function loadPreviewContent() {
  return (dispatch, getState) => {
    var states = getState();
    dispatch({
      type: "EDIT_EDITCONTENT",
      payload: states.doc.previewContent
    });
  }
}

export function saveDoc() {
  return (dispatch, getState) => {
    var states = getState();
      dispatch({
        type: "EDIT_PREVIEWCONTENT",
        payload: states.doc.editContent
      });
    axios.post('/api/doc/saveDoc', {docContent: states.doc.editContent});
  }
}