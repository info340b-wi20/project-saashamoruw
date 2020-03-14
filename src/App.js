import React, { Component } from 'react'; //import React Component
import {Projects}  from './Components/projectCards';
//import {App2}  from '../stage-2/src/App2';
import {Sign} from './Components/Sign';
import {Join} from './Components/Join';
import {Route, Switch, NavLink, Redirect} from 'react-router-dom'
import firebase from 'firebase/app';

export default class App extends Component {
  constructor(props) {
    super(props)
    let user = firebase.auth().currentUser;
    this.state = {user: user}
  }

render() { 
  console.log(this.state.user);
    return  (         
    <div className = "sign">
      <main>
        <div className = "nav">
                <img src={require('./projecthub.png')} alt="Project Hub logo"></img><a href="index.html"><span id="name">ProjectHub</span></a>
                <NavBar state = {this.state}/>
        </ div>
        <div className="background-pic">
            <Banner />
        </div>
        <Switch>
            {/* Always prompt user to sign in first*/}
            <Route exact path='/explore' component = {Projects}/>
            <Route path ='/join' component = {Join}/>
            <Route path ="/signin" component = {Sign}/>
            <Redirect to ="/explore"/> 
        </Switch>
      </main>
    </div>
    )
  }
}


class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.state;
  }
    render() {
        return (
            <ul className = "navbar">
            <li><NavLink to = "/explore" activeClassName="activeLink"> <h1>EXPLORE</h1><i className = "fa fa-home" /></NavLink></li>
            <li><NavLink to = "/join" activeClassName="activeLink"><h1>JOIN</h1><i className = "fa fa-weixin"></i></NavLink></li>
            <li><NavLink to ="/signin" activeClassName="activeLink"><h1>LOG IN</h1><i className = "fa fa-user"></i></NavLink></li>
            {/* {this.state.user && <li><NavLink to ="/mystuff"><h1>MY STUFF</h1></NavLink></li>} */}
            </ul>
    )}
    }


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