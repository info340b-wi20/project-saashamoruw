import React, { Component } from 'react'; //import React Component
import 'css/style.css';
import _ from 'lodash';
import Tabs from 'react-bootstrap/Tabs';



// https://material-ui.com/components/dialogs/ use for log in

// Sign In page 
class App2 extends Component { 
  
render() { 
return(

<body className = "sign">
   <NavBar />
    <main>

        <form> 
            <ul class="tabs">
                <li class="tab-button"><button id="btnsignup" className ="btn btn-info tablinks active">Sign Up</button></li>
                <li class="tab-button"><button id="btnlogin" className ="btn btn-info tablinks">Log In</button></li>
            </ul>
            <TabContent />
        </form>
     </main>
</body>
)}
}


// Navigation Bar
class NavBar extends Component {
    render() {
        return (
        <ul>
            <li><a href="index.html"><h1>EXPLORE</h1><i className = "fa fa-home"></i></a></li>
            <li><a href="find.html"><h1>JOIN</h1><i className = "fa fa-weixin"></i></a></li>
            <li><a href="sign.html"><h1>LOG IN</h1><i className = "fa fa-user"></i></a></li>
            <li><a href="proposalV1.html"><h1>ABOUT</h1><i className = "fa fa-info-circle"></i></a></li>
        </ul>

    )}
    }

// !!!!!!!!

// Tab contents for sign in or log in
class TabContent extends Component {
    render() {
        return(
            <div class="tab-content"> 
                  <div><h1 className = "msg">Create an Account!</h1></div> 

                    <div className = "email">
                    <label for="emailid"><b>Email ID</b></label> 
                    <input type="text" for = "email" id = "email" name="email id" aria-label="input email" placeholder="Enter Email ID" required /></div> 
                    
                    <div className = "password">
                    <label for="password"><b>Password</b></label>  
                    <input type="text" for = "password" id = "password" name="password"  aria-label="input password" placeholder="Enter Password" minlength="6" required /></div>
                    
                    <div className = "confirm">
                    <label for="confirm-password"><b>Confirm Password</b></label> 
                    <input type="text" for = "confirm" id = "confirm" name="password"  aria-label="confirm password" placeholder="Re-enter Password" minlength="6" required /></div>   
                    <br/>

                    <div class="checkbox">
                        <input type="checkbox" class="form-check-input" required />
                        <label class="form-check-label" for="check">Agree to Terms and Conditions.</label>
                        </div>  
                        <br/>

                        <div className = "submit-button">
                        <label for="submitbutton" aria-label="submit button"></label>
                        <button id = "button-submit" type="submit" className = "btn btn-dark submit">Get Started!</button>
                        </div>  
               </div>

        )
    }
}

    
export default App3;


/* 
REACT BOOTSTRAP FOR TABS *****************

function ControlledTabs() {
  const [key, setKey] = useState('home');

  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="home" title="Home">
        <Sonnet />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <Sonnet />
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        <Sonnet />
      </Tab>
    </Tabs>
  );
}

render(<ControlledTabs />);

*/