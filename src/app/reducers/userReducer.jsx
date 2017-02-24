export default function reducer(state = {
  login: true,
  user: {
    username: '',
    email: '',
    password: ''
  },
  fetching: false,
  fetched: false,
  error: null
}, action) {

console.log(action.type);
  switch(action.type) { 

    case "USER_LOGOUT": {
    console.log('user reducer logout'); 
      return {
        ...state,
        login: false
      }
    }

    case "EDIT_USERNAME": {
      return {
        ...state,
        user: {...state.user, username: action.payload}
      }
    }

    case "EDIT_EMAIL": {
      return {
        ...state,
        user: {...state.user, email: action.payload}
      }
    }

    case "EDIT_PASSWORD": {
      return {
        ...state,
        user: {...state.user, password: action.payload}
      }
    }
    
    case "USER_CREATED": {
      return {
        ...state,
        user: action.payload 
      }
    }

    case "USER_LOGIN_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }   
    
    case "USER_LOGOUT_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    } 
    
    case "USER_SIGNUP_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    
  }

  return state;
}