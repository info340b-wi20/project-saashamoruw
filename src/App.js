import React, { Component } from 'react'; //import React Component
import {Projects}  from './Components/projectCards';
//import {App2}  from '../stage-2/src/App2';
import {Sign} from './Components/Sign';
import {Join} from './Components/Join';
import {Route, Switch, NavLink, Redirect} from 'react-router-dom'
export default class App extends Component {

    render() {  
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
                      <Route path ="/signin" component = {Sign}/>
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