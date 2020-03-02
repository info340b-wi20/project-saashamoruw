import React, { Component } from 'react'; //import React Component
import './index.css';
import _ from 'lodash';
// import Tabs from 'react-bootstrap/Tabs'



// https://material-ui.com/components/dialogs/ use for log in

// Sign In page 
export class Sign extends Component { 
  
render() { 
return(

            <TabContent />

)}
}

//////////////

// Tab contents for sign in or log in
class TabContent extends Component {
  constructor(props){
    super(props);
    this.state = {
    email: '',
    password: '',
    confirm: '',
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let input = this.state;
    console.log(input);
    
    if(input.password != input.confirm) {
      alert('Passwords do not match.');
    } else {
    alert( this.state.email + ', welcome back! You are signed in!');
    }
  }

    render() {

        return(
            <form className="tab-content" onSubmit = {this.handleSubmit}> 
                 <ul className ="tabs">
                <li className="tab-button"><button id="btnsignup" className ="btn btn-info tablinks active">Sign Up</button></li>
                <li className="tab-button"><button id="btnlogin" className ="btn btn-info tablinks">Log In</button></li>
               </ul>
                  <div><h1 className = "msg">Create an Account!</h1></div> 

                    <div className = "form-input">
                    <label for="emailid"><b>Email ID</b></label> 
                    <input type="text" for = "email" id = "email" name="email" aria-label="input email" placeholder="Enter Email ID" minLength={6} required onChange={this.handleChange} /></div> 
                    
                    <div className = "form-input">
                    <label for="password"><b>Password</b></label>  
                    <input type="text" for = "password" id = "password" name="password"  aria-label="input password" placeholder="Enter Password" minLength={6} required onChange={this.handleChange}/></div>
                    
                    <div className = "form-input">
                    <label for="confirm-password"><b>Confirm Password</b></label> 
                    <input type="text" for = "confirm" id = "confirm" name="confirm"  aria-label="confirm password" placeholder="Re-enter Password" minLength={6} required onChange={this.handleChange} /></div>   
                    <br/>

                    <div className="form-input">
                        <input type="checkbox" className="form-check-input" required />
                        <label className="form-check-label" for="check">Agree to Terms and Conditions.</label>
                        </div>  
                        <br/>

                        <div className = "submit-button">
                        <label for="submitbutton" aria-label="submit button"></label>
                        <button id = "button-submit" type="submit" className = "btn btn-dark submit">Get Started!</button>
                        </div>  
               </form>

        )
    }
}

    
export default Sign;

// https://css-tricks.com/video-screencasts/147-starting-react-powered-comment-form/
// comment form ^