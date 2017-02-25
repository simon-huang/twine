export default function reducer(state = {
  docName: 'Test Doc Name',
  docDescription: '',
  docType: '',
  parentID: null,
  filePath: '',
  editsObject: null,
  editsHtml: '',
  masterHtml: '<h1>This is a title</h1>',
  previewContent: null,
  showMerge: false,
  error: null
}, action) {

  switch(action.type) {

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
    case "EDIT_DOC_CONTENT": {
      return {
        ...state,
        editsObject: action.payload
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