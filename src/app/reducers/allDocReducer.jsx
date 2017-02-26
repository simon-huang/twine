export default function reducer(state = {
  allDocuments: [],
  error: null
}, action) {

  switch(action.type) {

    case "EDIT_ALLDOCUMENTS": {
      return {
        ...state,
        allDocuments: action.payload
      }
    }
  }

  return state;
}
