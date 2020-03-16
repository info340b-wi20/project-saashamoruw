import React, { Component } from 'react'; //import React Component
import { Explore } from './Components/projectCards';
import { Sign } from './Components/Sign';
import { Join } from './Components/Join';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'
import firebase from 'firebase/app';
import { Dashboard } from './Components/Dashboard';

export default class App extends Component {
  render() {
    return (
      <div className="sign">
        <main>
          <NavBar state={this.state} />
          <Switch>
            <Route exact path='/explore' component={Explore} />
            <Route path='/join' component={Join} />
            <Route path="/signin" component={Sign} />
            <Route path="/mystuff" component={Dashboard} />
            <Route path="/logout" component={Signout} />
            <Redirect to="/explore" />
          </Switch>
        </main>
      </div>
    )
  }
}

class Signout extends Component {
  render() {
    firebase.auth().signOut();
    return <Redirect push to='/explore' />;
  }
}

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: firebase.auth().currentUser
    }
  }

  componentDidMount() {
    this.authUnRegFunc = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        this.setState({
          user: currentUser,
          dashNav: (<ul className="navbar">
            <li><NavLink to="/explore" activeClassName="activeLink"> <h1>EXPLORE</h1><i className="fa fa-home" /></NavLink></li>
            <li><NavLink to="/join" activeClassName="activeLink"><h1>JOIN</h1><i className="fa fa-weixin"></i></NavLink></li>
            <li><NavLink to="/mystuff" activeClassName="activeLink"><h1>DASHBOARD</h1><i className="fa fa-user"></i></NavLink></li>
            <li className='exit'><NavLink to="/logout"><h1>LOG OUT</h1><i className="fa fa-sign-out"></i></NavLink></li>
          </ul>)
        });
      } else {
        this.setState({
          user: null,
          dashNav: (<ul className="navbar">
            <li><NavLink to="/explore" activeClassName="activeLink"> <h1>EXPLORE</h1><i className="fa fa-home" /></NavLink></li>
            <li><NavLink to="/join" activeClassName="activeLink"><h1>JOIN</h1><i className="fa fa-weixin"></i></NavLink></li>
            <li><NavLink to="/signin" activeClassName="activeLink"><h1>LOG IN </h1><i className="fa fa-user"></i></NavLink></li>
          </ul>)

        });
      }
    });
  }

  componentWillUnmount() {
    this.authUnRegFunc();
  }

  render() {
    return (
      <div className="nav">
        <img src={require('./projecthub.png')} alt="Project Hub logo"></img><a href="index.html"><span id="name">ProjectHub</span></a>
        {this.state.dashNav}
      </div>
    );
  }
}


