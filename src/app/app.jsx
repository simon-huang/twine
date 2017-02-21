import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from "react-redux"

import store from "./store.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('hey');
  }

  render() {
    console.log("INSIDE RENDER") 
    return (
      <h1>Hello World</h1>
    );
  }
}

export default connect(state => state)(App)



