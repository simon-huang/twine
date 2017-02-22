import React from 'react';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleClick() {
    this.props.dispatch(user.userLogin)
  }

  render() {
    return (
      <form>
        <input type="text" name="email" placeholder="name@example.com" />
        <input type="text" name="password" placeholder="password" />
        <input type="submit" value="Login" onClick={this.handleClick.bind(this)}/>
      </form>
    );
  }
}