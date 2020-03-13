import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
// import {StyledFirebaseAuth} from 'react-firebaseui/StyledFirebaseAuth';


// https://material-ui.com/components/dialogs/ use for log in
// Sign In page 
export class Sign extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
     firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        this.setState({user: currentUser});
      } else {
        this.setState({user: null});
      }
    })
  }

  // componentWillUnmount() {
  //   this.authUnRegFunc();
  // }


  submitForm = (name, email, password, page) => {
    this.setState({errorMessage: null });
    if (page == 'sign') {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
        let user = userCredentials.user; 
        let promise = user.updateProfile({ displayName: name });
        return promise;
    }).catch((error) => {
      this.setState({errorMessage: error.message});
    });
  } else {
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      this.setState({errorMessage: error.message});
    });
  }
}

  render() {
    return (
      <div>
      {this.state.errorMessage &&
        <p className="alert alert-danger">{this.state.errorMessage}</p>
      }     
      <Form submitCallback={this.submitForm} />  
      </div>
    )
  }
}


// sign up/log in form component
export class Form extends Component {
  constructor(props) {
      super(props);
      this.state = {
          name: '',
          email: '',
          password: '',
          page: 'sign',
          title: 'Create an Account!',
          button: 'Get Started!',
          logClass: "btn btn-info tablinks",
          signClass: "btn btn-info tablinks active",
          nameField: [(<div className="form-input">
              <label for="name"><b>Name</b></label>
              <input type="text" for="name" id="name" name="name" aria-label="input name" placeholder="Enter Name" minLength={1} required onChange={this.handleChange} /></div>)],
          checkbox: [(<div className="form-input">
              <input type="checkbox" className="form-check-input" required />
              <label className="form-check-label" for="check">Agree to Terms and Conditions.</label><br />
          </div>)]
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSwitch = this.handleSwitch.bind(this);
  }

  // submitting form
  handleSubmit = (event) => {
      event.preventDefault();
      this.props.submitCallback(this.state.name, this.state.email, this.state.password, this.state.page)
  }

  handleChange(event) {
      this.setState({
          [event.target.name]: event.target.value,
      });
  }

  // switching between tabs code for state
  handleSwitch(event) {
      event.preventDefault();
      let currPage = event.target.name;
      this.setState({ page: currPage })
      if (currPage === 'login') {
          this.setState({
              title: "Welcome Back!",
              button: "Log In!",
              nameField: [],
              checkbox: [],
              logClass: "btn btn-info tablinks active",
              signClass: "btn btn-info tablinks",
          });
      } else if (currPage === 'sign') {
          this.setState({
              title: "Create an Account!",
              button: "Get Started!",
              nameField: [(<div className="form-input">
                  <label for="name"><b>Name</b></label>
                  <input type="text" for="name" id="name" name="name" aria-label="input name" placeholder="Enter Name" minLength={1} required onChange={this.handleChange} /></div>)],
              checkbox: [(<div className="form-input">
                  <input type="checkbox" className="form-check-input" required />
                  <label className="form-check-label" for="check">Agree to Terms and Conditions.</label><br />
              </div>)],
              logClass: "btn btn-info tablinks",
              signClass: "btn btn-info tablinks active",
          });
      }
  }

  render() {
      return (
          <form className="tab-content" onSubmit={this.handleSubmit}>
              <ul className="tabs">
                  <li className="tab-button"><button id="btnsignup" name="sign" className={this.state.signClass} onClick={this.handleSwitch}>Sign Up</button></li>
                  <li className="tab-button"><button id="btnlogin" name="login" className={this.state.logClass} onClick={this.handleSwitch}>Log In</button></li>
              </ul>
              <div >
                <h1 className="msg">{this.state.title}</h1>
                </div>

              {this.state.nameField}

              <div className="form-input">
                  <label for="emailid"><b>Email ID</b></label>
                  <input type="text" for="email" id="email" name="email" aria-label="input email" placeholder="Enter Email ID" minLength={6} required onChange={this.handleChange} /></div>

              <div className="form-input">
                  <label for="password"><b>Password</b></label>
                  <input type="password" for="password" id="password" name="password" aria-label="input password" placeholder="Enter Password" minLength={6} required onChange={this.handleChange} /></div>

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