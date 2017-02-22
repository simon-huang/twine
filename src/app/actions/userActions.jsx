import axios from 'axios';

export function changeView () {
  return { 
    type: "CHANGE_LOGIN_STATE"
  }
}

export function userLogin (username, password) {
  return {
    type: "USER_LOGIN",
    payload: {
      username: username,
      password: password
    }
  }
}

export function userSignUp (email, username, password) {
  return function(dispatch) {
    axios.post('/signup', {
      email: email,
      username: username,
      password: password
    })
    .then((response) => {
      dispatch({
        type: "USER_CREATED", 
        payload: response.data
      })
    })
    .catch((err) => {
      dispatch({
        type: "USER_SIGNUP_REJECTED", 
        payload: err
      })
    })
  }
}