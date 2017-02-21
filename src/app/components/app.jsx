import React from 'react';
import { connect } from "react-redux";

@connect((store) => {
  return {
    foo: store.doc.error
  }
})

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.foo);
    return (
      <h1>Hello World</h1>
    );
  }
}