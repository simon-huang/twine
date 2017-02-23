import axios from 'axios';

export function handleChange(name, value) {
  return {
    type: "EDIT_" + name.toUpperCase(),
    payload: value
  }
}

// API request to server to create a document
export function createDocument() {
  return (dispatch, getState) => {
    var states = getState();
    axios.post('/api/doc/createDoc', states.doc.docInit);
  }
}

export function editDocChange(value) {
  return {
    type: "EDIT_DOCCONTENT",
    payload: value
  }
}


