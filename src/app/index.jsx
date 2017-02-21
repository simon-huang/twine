import ReactDOM from 'react-dom'
import React from 'react'
import { Component } from "react"
import { Provider } from "react-redux"

import App from "./app.jsx"
import store from "./store.jsx"

class PublishUs extends Component {
  constructor(props) {
    super(props)
    console.log('hi');
  }
  
  render() {
    console.log('test make it happen');
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}



ReactDOM.render( <PublishUs/>,
  document.getElementById('app'));