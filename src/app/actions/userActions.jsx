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

export function handleChange (name, value) {
  return {
    type: "EDIT_" + name.toUpperCase(),
    payload: value
  }
}

export function login () {
  return function(dispatch, getState) {
    var user = getState().user.user;
    axios.post('/api/auth/login', {
      email: user.email,
      password: user.password
    })
    .then((response) => {
      dispatch({
        type: "USER_CREATED", 
        payload: response.data
      })
    })
    .catch((err) => {
      dispatch({
        type: "USER_LOGIN_REJECTED", 
        payload: err
      })
    })
  }
}

export function signup () {
  return function(dispatch, getState) {
    var user = getState().user.user;
    axios.post('/api/auth/signup', {
      email: user.email,
      username: user.username,
      password: user.password
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

export function userLogout () {
  console.log('logout inside user action');
  return function(dispatch) {
    console.log('inside user action user logout');
    axios.get('/api/auth/logout')
    .then((response) => {
      dispatch({
        type: "USER_LOGOUT",
        payload: response.data
      })
    })
    .catch((err) => {
      dispatch({
        type: "USER_LOGOUT_REJECTED",
        payload: err
      })
    })
  }
}