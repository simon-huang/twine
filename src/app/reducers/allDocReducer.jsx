export default function reducer(state = {
  allDocuments: [],
  ownedDocs: [],
  contributingDocs: [],
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

  }

  return state;
}
