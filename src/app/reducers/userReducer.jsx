export default function reducer(state = {
  username: '',
  email: '',
  password: '',
  currentTab: 'all',
  error: null
}, action) {

  switch(action.type) { 

    case "USER_LOGIN": {
      return {
        ...state,
        username: action.payload,
        password: '',
        email: ''
      }
    }

    case "USER_LOGOUT": {
      return {
        ...state,
        username: '',
        password: '',
        email: ''
      }
    }

    case "EDIT_USERNAME": {
      return {
        ...state,
        username: action.payload
      }
    }

    case "EDIT_EMAIL": {
      return {
        ...state,
        email: action.payload
      }
    }

    case "EDIT_PASSWORD": {
      return {
        ...state,
        password: action.payload
      }
    }
    
    case "USER_CREATED": {
      return {
        ...state, 
        username: action.payload.username,
        password: '',
        email: ''
      }
    }

    case "PROFILE_TAB_CHANGE": {
      return {
        ...state,
        currentTab: action.payload
      }
    }

  }

  return state;
}