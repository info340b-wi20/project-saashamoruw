import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import 'firebase/auth';

// Sign In page 
export class Sign extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.authUnRegFunc = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        this.setState({ user: currentUser });
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentWillUnmount() {
    this.authUnRegFunc();

  }


  submitForm = (name, email, password, page) => {
    this.setState({ message: null });
    if (page === 'sign') {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          let user = userCredentials.user;
          let promise = user.updateProfile({ displayName: name });
          return promise;
        }).catch((error) => {
          this.setState({
            message: (<p className="alert alert-danger">{error.message}</p>)
          });
        });
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        this.setState({
          message: (<p className="alert alert-danger">{error.message}</p>)
        });
      });
    }
    if (this.state.message == null) {
      this.setState({
        message: (<p className="alert alert-success">Welcome!</p>)
      });
    }
  }

  render() {
    if (this.state.user) {
      return <Redirect to="/explore" />
    }
    return (
      <div className = "form-sign">
        <Banner />
        {this.state.message && this.state.message}
        <Form submitCallback={this.submitForm} />
      </div>
    )
  }
}

class Banner extends Component {
  render() {
    return (
      <div className="background-pic">
        <div className="banner-text">
          <h1>Log in</h1>
          <p>Unlock more functionality including a personalized dashboard!</p>
        </div>
      </div>
    )
  }
}

// sign up/log in form component
class Form extends Component {
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
        <label htmlFor="name"><b>Name</b></label>
        <input type="text" htmlFor="name" id="name" name="name" aria-label="input name" placeholder="Enter Name" minLength={1} required onChange={this.handleChange} /></div>)],
      checkbox: [(<div className="form-input">
        <input type="checkbox" className="form-check-input" required />
        <label className="form-check-label" htmlFor="check">Agree to Terms and Conditions.</label><br />
      </div>)]
    };
  }

  // submitting form
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitCallback(this.state.name, this.state.email, this.state.password, this.state.page)
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // switching between tabs code for state
  handleSwitch = (event) => {
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
          <label htmlFor="name"><b>Name</b></label>
          <input type="text" htmlFor="name" id="name" name="name" aria-label="input name" placeholder="Enter Name" minLength={1} required onChange={this.handleChange} /></div>)],
        checkbox: [(<div className="form-input">
          <input type="checkbox" className="form-check-input" required />
          <label className="form-check-label" htmlFor="check">Agree to Terms and Conditions.</label><br />
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
          <label htmlFor="emailid"><b>Email ID</b></label>
          <input type="text" htmlFor="email" id="email" name="email" aria-label="input email" placeholder="Enter Email ID" minLength={6} required onChange={this.handleChange} /></div>

        <div className="form-input">
          <label htmlFor="password"><b>Password</b></label>
          <input type="password" htmlFor="password" id="password" name="password" aria-label="input password" placeholder="Enter Password" minLength={6} required onChange={this.handleChange} /></div>
        {this.state.checkbox}
        <div className="submit-button">
          <label htmlFor="submitbutton" aria-label="submit button"></label>
          <button id="button-submit" type="submit" className="btn btn-dark submit">{this.state.button}</button>
        </div>
      </form>

    )
  }
}


export default Sign;

