export default function reducer(state = {
  username: '',
  email: '',
  password: '',
  error: null
}, action) {

  switch(action.type) { 

    case "AUTO_LOGIN": {
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

  }

  return state;
}