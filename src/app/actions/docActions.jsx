import axios from 'axios';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw } from 'draft-js';

export function handleChange(name, value) {
  return {
    type: "EDIT_" + name.toUpperCase(),
    payload: value
  }
}

//======= deprecated?=========//
export function editDocChange(value) {
  return {
    type: "EDIT_EDITCONTENT",
    payload: value
  }
}
//============================//

export function loadOriginalContent() {
  return (dispatch, getState) => {
    var states = getState();

    // Convert master HTML back into EditorState
    const blocksFromHTML = convertFromHTML(states.doc.masterHtml);
    const contentState = ContentState.createFromBlockArray(blocksFromHTML);
    const editorState = EditorState.createWithContent(contentState);

    dispatch({
      type: "POPULATE_EDITOR",
      payload: {
        editorState: editorState,
        editsHtml: states.doc.masterHtml
      }
    });
  }
}

export function editingDoc(value) {
  return {
    type: "EDIT_DOC_CONTENT",
    payload: value
  }
}

export function createHTML(value) {
  return {
    type: "UPDATE_DOC_HTML",
    payload: value
  }
}

export function saveDoc() {
  return (dispatch, getState) => {
    var states = getState();
      dispatch({
        type: "EDIT_MASTERHTML",
        payload: states.doc.editsHtml
      });

    var docSaveInfo = { 
      username: states.user.user.username,
      docName: states.doc.docName,
      docContent: states.doc.editsHtml,
      commitMessage: states.doc.commitMessage
    }

    axios.post('/api/doc/saveDoc', docSaveInfo)
    .then(function(data) {
      data = data.data;
      dispatch({
        type: "EDIT_DOCCOMMITS",
        payload: data
      })
    })
  }
}

