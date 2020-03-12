import React, { Component } from 'react'; //import React Component
import {Projects}  from './App1';
//import {App2}  from '../stage-2/src/App2';
import { Route, Router, Link } from 'react-router-dom';
import Sign from './Sign';
import {Join} from './Join';
import {AddProjCard} from './form';
import {AddProjMemberCard} from './memberform';
export default class App extends Component {
    constructor(cardsData) {
        super(cardsData); 
        this.state = {
            cardsData : this.props.cardsData
        };
    }
    
    render() {
        this.cardsData = this.props.cardsData;
        let content = (
            <div>
                <section className="newSec">
                    <AddProjCard/>
                </section>
                <div className="projects">
                    <Projects cards={this.cardsData}/>
                </div>
            </div>
        );
      
        return  (         
    <body className = "sign">
    <main>
    <div className = "nav">
            <img src={require('./projecthub.png')} alt="Project Hub logo"></img><a href="index.html"><span id="name">ProjectHub</span></a>
            

            <NavBar />
        
    </ div>
    <div className="background-pic">
    <Banner />
    </div>

    {content}
    <br/>
    <Sign />
     </main>
</body>

        )
    }
}




class NavBar extends Component {
    render() {
        return (
            <ul className = "navbar">
            <li><a href = "index.html"> <h1>EXPLORE</h1><i className = "fa fa-home" /></a></li>
            <li><a href="find.html"><h1>JOIN</h1><i className = "fa fa-weixin"></i></a></li>
            <li><a href="sign.html"><h1>LOG IN</h1><i className = "fa fa-user"></i></a></li>
            <li><a href="proposalV1.html"><h1>ABOUT</h1><i className = "fa fa-info-circle"></i></a></li>
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