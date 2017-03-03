export default function reducer(state = {
  allDocuments: [],
  ownedDocs: [],
  contributingDocs: [],
  associatedDocs: [],
  error: null
}, action) {

  switch(action.type) {

    case "EDIT_ALLDOCUMENTS": {
      return {
        ...state,
        allDocuments: action.payload
      }
    }

    case "EDIT_OWNEDDOCS": {
      return {
        ...state,
        ownedDocs: action.payload
      }
    }

    case "EDIT_CONTRIBUTINGDOCS": {
      return {
        ...state,
        contributingDocs: action.payload
      }
    }
    
    case "EDIT_ASSOCIATEDDOCS": {
      return {
        ...state,
        associatedDocs: action.payload
      }
    }

  }

  return state;
}
