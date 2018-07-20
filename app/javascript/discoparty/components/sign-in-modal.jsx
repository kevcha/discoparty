import React, { Component } from "react";

class SignInModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul className="inline-links">
          <li><a href="/users/sign_in">Sign in with my account</a></li>
          <li><a href="/users/sign_up">Create an account</a></li>
        </ul>
      </div>
    );
  }
}

export default SignInModal;
