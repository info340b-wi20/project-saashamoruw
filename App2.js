import React, { Component } from 'react'; //import React Component
import 'css/style.css'
import _ from 'lodash'

class App2 extends Component { 
    
render() { 
return(

<body>
    <nav>
    <a href="index.html"><img src="imgs/projecthub.png" alt="Project Hub logo"></img><span id="name">ProjectHub</span></a>
    <NavBar />
    </nav>
    <main>
        <section className="background-pic">
            <Banner />

        </section>
        
        <SearchBar />

        <div className="container">
            <div className="row">


            </div>
        </div>
    </main>
</body>

)}
}


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

// search bar function if time?
class SearchBar extends Component { 
    render() {
        return (
            <div className="search-bar" role="search" aria-label="search bar"> 
            <input type="text" placeholder="Search for position..."></input>
            <button className = "btn btn-info">
                <i className="fa fa-search fa-2x" aria-label="search icon"></i>
            </button>
        </div>
        )
    }
}








export default App2;