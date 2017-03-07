export default function reducer(state = {
  docId: '',
  docOwner: '',
  docName: '',
  docDescription: '',
  docType: '',
  parentID: null,
  originOwner: null,
  filePath: '',
  editsObject: null,
  editsHtml: '',
  masterHtml: '',
  previewContent: null,
  docCommits: [],
  currentCommit: '',
  commitMessage: '',
  pullRequests: [],
  editMode: false,
  unsavedChangesModal: false,
  nextRouteAfterEdits: '',
  error: null
}, action) {

  switch(action.type) {
    
    case "EDIT_DOCID": {
      return {
        ...state,
        docId: action.payload
      }
    }

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
        editsObject: action.payload,
        editMode: true
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
        docCommits: action.payload,
        editMode: false
      }
    }

    case "EDIT_PULLREQUESTS": {
      return {
        ...state,
        pullRequests: action.payload
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

    case "TOGGLE_EDIT_MODE": {
      return {
        ...state,
        editMode: !state.editMode
      }
    }

    case "TOGGLE_UNSAVED_CHANGES_MODAL": {
      return {
        ...state,
        unsavedChangesModal: !state.unsavedChangesModal,
        nextRouteAfterEdits: action.payload
      }
    }
    
    case "RETRIEVE_DOC": {
      return {
        ...state,
        docId: action.payload.docID,
        docOwner: action.payload.docOwner,
        docName: action.payload.docName,
        docDescription: action.payload.docDescription,
        docType: action.payload.docType,
        parentID: action.payload.parentID,
        originOwner: action.payload.originOwner,
        filePath: action.payload.filePath,
        masterHtml: action.payload.docContent,
        docCommits: action.payload.docCommits,
        currentCommit: action.payload.currentCommit,
        pullRequests: action.payload.pullRequests,
      }
    }

  }

  return state;
}