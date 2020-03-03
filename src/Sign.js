import React, { Component } from 'react'; //import React Component
import './index.css';
import _ from 'lodash';
// import Tabs from 'react-bootstrap/Tabs'



// https://material-ui.com/components/dialogs/ use for log in

// Sign In page 
export class Sign extends Component {

  render() {
    return (

      <TabContent />

    )
  }
}

//////////////

// Tab contents for sign in or log in
class TabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      page: 'sign',
      title: 'Create an Account!',
      button: 'Get Started!',
      checkbox: [(<div className="form-input">
                  <input type="checkbox" className="form-check-input" required />
                  <label className="form-check-label" for="check">Agree to Terms and Conditions.</label><br />
            </div>)]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let input = this.state;
    // let alertText;
    if (input.password != input.confirm) {
      alert('Passwords do not match.');
    } else {
    alert("Welcome! You are signed in!");
  }
}

/*
 else {
      if (this.state.page == 'sign') {
        alertText = "Welcome to Project Hub, " + this.state.name + "! You have created a new ID and are signed in.";
      } else {
        alertText = "Welcome back, " + this.state.name + "! You are signed in.";
      }
    }
    alert(alertText);
  }

*/

  handleSwitch(event) {
    let page = event.target.name;
    if (page == 'login') {
      this.setState({
        title: "Welcome Back!",
        button: "Log In!",
        checkbox: [(<br/>)]
      });
    } else if (page == 'sign') {
      this.setState({
        title: "Create an Account!",
        button: "Get Started!",
        checkbox: [(<div className="form-input">
                  <input type="checkbox" className="form-check-input" required />
                  <label className="form-check-label" for="check">Agree to Terms and Conditions.</label><br />
            </div>)]
      });
    }
  }

  render() {
    return (
      <form className="tab-content" onSubmit={this.handleSubmit}>
        <ul className="tabs">
          <li className="tab-button"><button id="btnsignup" name="sign" className="btn btn-info tablinks active" onClick={this.handleSwitch}>Sign Up</button></li>
          <li className="tab-button"><button id="btnlogin" name="login" className="btn btn-info tablinks" onClick={this.handleSwitch}>Log In</button></li>
        </ul>
        <div><h1 className="msg">{this.state.title}</h1></div>

        <div className="form-input">
          <label for="name"><b>Name</b></label>
          <input type="text" for="name" id="name" name="name" aria-label="input name" placeholder="Enter Name" minLength={1} required onChange={this.handleChange} /></div>


        <div className="form-input">
          <label for="emailid"><b>Email ID</b></label>
          <input type="text" for="email" id="email" name="email" aria-label="input email" placeholder="Enter Email ID" minLength={6} required onChange={this.handleChange} /></div>

        <div className="form-input">
          <label for="password"><b>Password</b></label>
          <input type="password" for="password" id="password" name="password" aria-label="input password" placeholder="Enter Password" minLength={6} required onChange={this.handleChange} /></div>

        <div className="form-input">
          <label for="confirm-password"><b>Confirm Password</b></label>
          <input type="password" for="confirm" id="confirm" name="confirm" aria-label="confirm password" placeholder="Re-enter Password" minLength={6} required onChange={this.handleChange} /></div>
        <br />
        {this.state.checkbox}
        <div className="submit-button">
          <label for="submitbutton" aria-label="submit button"></label>
          <button id="button-submit" type="submit" className="btn btn-dark submit">{this.state.button}</button>
        </div>
      </form>

    )
  }
}


export default Sign;

// https://css-tricks.com/video-screencasts/147-starting-react-powered-comment-form/
// comment form ^