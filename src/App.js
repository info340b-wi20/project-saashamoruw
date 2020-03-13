import React, { Component } from 'react'; //import React Component
import {Projects}  from './Components/projectCards';
//import {App2}  from '../stage-2/src/App2';
import {Form} from './Components/Sign';
import {Join} from './Components/Join';
import {Route, Switch, NavLink, Redirect} from 'react-router-dom'
import firebase from 'firebase/app';

export default class App extends Component {
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
    if(!this.state.user) {
      return (
        <div>
        {this.state.errorMessage &&
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        }     
        <Form submitCallback={this.submitForm} />  
        </div>
      )
    }
      return  (         
    <div className = "sign">
      <main>
        <div className = "nav">
                <img src={require('./projecthub.png')} alt="Project Hub logo"></img><a href="index.html"><span id="name">ProjectHub</span></a>
                <NavBar />
        </ div>
        <div className="background-pic">
            <Banner />
        </div>
        <Switch>
                    <Route exact path='/explore' component = {Projects}/>
                    <Route path ='/join' component = {Join}/>
                    <Redirect to ="/explore"/>
        </Switch>
      </main>
    </div>

      )
  }
}




class NavBar extends Component {
    render() {
        return (
            <ul className = "navbar">
            <li><NavLink to = "/explore" activeClassName="activeLink"> <h1>EXPLORE</h1><i className = "fa fa-home" /></NavLink></li>
            <li><NavLink to = "/join" activeClassName="activeLink"><h1>JOIN</h1><i className = "fa fa-weixin"></i></NavLink></li>
            <li><NavLink to ="/signin" activeClassName="activeLink"><h1>LOG IN</h1><i className = "fa fa-user"></i></NavLink></li>
            </ul>
    )}
    }


//  <Router> <li><Route path="/" component = {App}><h1>EXPLORE</h1><i className = "fa fa-home"></i></Route></li></Router>
//  <li><Route path="/" component = {App}><h1>EXPLORE</h1><i className = "fa fa-home"></i></Route></li>
    /** code for multiple pages 
 return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
             <Route path="/contact" component={Contact}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 */


    class Banner extends Component {
        render() {
            return (
               <div className="banner-text">
                    <h1>Discover Opportunities</h1>
                    <p>Find projects to work on and expore your passion!</p>
                </div>
            )
        }
    }



    /** code for multiple pages 
 return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
             <Route path="/contact" component={Contact}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 */