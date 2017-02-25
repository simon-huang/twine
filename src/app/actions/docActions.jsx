import axios from 'axios';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw } from 'draft-js';

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
        type: "EDIT_PREVIEWCONTENT",
        payload: states.doc.editContent
      });
    axios.post('/api/doc/saveDoc', {docContent: states.doc.editContent});
  }
}