export default function reducer(state = {
  async: true,
  toast: false,
  toastMsg: ''
}, action) {

  switch(action.type) {
    case "REQ_STARTED": {
      return {
        ...state,
        async: true
      }
    }
  }

  switch(action.type) {
    case "REQ_COMPLETED": {
      return {
        ...state,
        async: false
      }
    }
  }

  switch(action.type) {
    case "REQ_ERROR": {
      return {
        ...state,
        async: false
      }
    }
  }

  switch(action.type) {
    case "TOGGLE_TOAST": {
      return {
        ...state,
        toast: action.payload.showing,
        toastMsg: action.payload.message
      }
    }
  }

  return state;
  
}