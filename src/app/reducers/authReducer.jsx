export default function reducer(state = {
  login: false,
  loginModal: false,
  redirectUrl: '',
  fetching: false,
  fetched: false,
  error: null
}, action) {

  switch(action.type) { 

    case "AUTO_LOGIN": {
      return {
        ...state,
        login: true
      }
    }

    case "TOGGLE_LOGIN_MODAL": {
      return {
        ...state,
        loginModal: !state.loginModal
      }
    }

    case "USER_LOGOUT": {
      return {
        ...state,
        login: false
      }
    }

    case "SET_REDIRECT_URL": {
      return {
        ...state,
        redirectUrl: action.payload
      }
    }
    
    case "USER_CREATED": {
      return {
        ...state, 
        login: true,
        redirectUrl: '/profile/' + action.payload.username
      }
    }

    case "USER_AUTH_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    
  }

  return state;
}