import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import App from "./components/app.jsx"
import store from "./store.jsx"

store.subscribe(() => {
  console.log('store changed', store.getState());
})

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('app'));