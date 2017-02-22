export default function reducer(state = {
  login: false,
  user: {
    username: '',
    email: '',
    password: ''
  },
  fetching: false,
  fetched: false,
  error: null
}, action) {

  switch(action.type) { 
    case "CHANGE_LOGIN_STATE": { 
      return {
        ...state,
        login: !state.login
      }
    }
    
    case "USER_CREATED": {
      return {
        ...state,
        user: action.payload 
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