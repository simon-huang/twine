export default function reducer(state = {
  docOwner: '',
  docName: 'Test Doc Name',
  docDescription: '',
  docType: '',
  parentID: null,
  originOwner: null,
  filePath: '',
  editsObject: null,
  editsHtml: '',
  masterHtml: '<h1>This is a title</h1>',
  previewContent: null,
  docCommits: [],
  commitMessage: '',
  error: null
}, action) {

  switch(action.type) {

    case "EDIT_DOCOWNER": {
      return {
        ...state,
        docOwner: action.payload
      }
    }
    case "EDIT_DOCNAME": {
      return {
        ...state,
        docName: action.payload
      }
    }
    case "EDIT_DOCDESCRIPTION": {
      return {
        ...state,
        docDescription: action.payload
      }
    }
    case "EDIT_DOCTYPE": {
      return {
        ...state,
        docType: action.payload
      }
    }
    case "EDIT_PARENTID": {
      return {
        ...state,
        parentID: action.payload
      }
    }
    case "EDIT_FILEPATH": {
      return {
        ...state,
        filePath: action.payload
      }
    }
    case "EDIT_ORIGINOWNER": {
      return {
        ...state,
        originOwner: action.payload
      }
    }
    case "EDIT_DOC_CONTENT": {
      return {
        ...state,
        editsObject: action.payload
      }
    }
    case "EDIT_MASTERHTML": {
      return {
        ...state,
        masterHtml: action.payload
      }
    }
    case "EDIT_DOCCOMMITS": {
      return {
        ...state,
        docCommits: action.payload
      }
    }
    case "EDIT_PREVIEWCONTENT": {
      return {
        ...state,
        previewContent: action.payload
      }
    }
    case "UPDATE_DOC_HTML": {
      return {
        ...state,
        editsHtml: action.payload
      }
    }

    case "POPULATE_EDITOR": {
      return {
        ...state,
        editsObject: action.payload.editorState,
        editsHtml: action.payload.editsHtml
      }
    }

  }

  return state;
}