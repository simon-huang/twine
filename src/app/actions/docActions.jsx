import axios from 'axios';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw } from 'draft-js';

export function handleChange(name, value) {
  return {
    type: "EDIT_" + name.toUpperCase(),
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

    console.log('states.doc.masterHtml', states.doc.masterHtml);
    console.log('contentState', convertToRaw(contentState));

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
    
    dispatch(handleChange('masterHtml', states.doc.editsHtml));

    var docSaveInfo = { 
      username: states.user.username,
      docName: states.doc.docName,
      docContent: states.doc.editsHtml,
      commitMessage: states.doc.commitMessage
    }

    axios.post('/api/doc/saveDoc', docSaveInfo)
    .then(function(data) {
      data = data.data;
      dispatch(handleChange('docCommits', data));
    })
  }
}

export function copyDoc() {
  return (dispatch, getState) => {
    var states = getState();
    var copyInfo = {
      username: states.user.username,
      docOwner: states.doc.docOwner,
      docName: states.doc.docName
    }

    axios.post('api/doc/copyDoc', copyInfo)
    .then(function(data) {
      data = data.data;
      dispatch(loadDocInfo(data));
    });
  }
}

export function loadDocInfo(data) {
  return (dispatch, getState) => {
    dispatch(handleChange('docOwner', data.docOwner));
    dispatch(handleChange('docName', data.docName));
    dispatch(handleChange('docDescription', data.docDescription));
    dispatch(handleChange('docType', data.docType));
    dispatch(handleChange('filePath', data.filePath));
    dispatch(handleChange('parentID', data.parentID));
    dispatch(handleChange('masterHtml', data.docContent));
    dispatch(handleChange('docCommits', data.docCommits));
    dispatch(handleChange('originOwner', data.originOwner));
  }
}
