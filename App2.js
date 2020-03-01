import React, { Component } from 'react'; //import React Component
import 'css/style.css'
import _ from 'lodash'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Find Projects page 
class App2 extends Component { 

constructor(cards) {
    super(cards);
    this.state = {cards: this.props.cards};
}
    
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

// Banner Text
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
// Search Bar on pages
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

// creates list of cards
class CardList extends Component {
    render() {
        <section className = "projects">
            {this.props.cards.map(card => 
            <Card key = {card.name} card={card}/>)}
        </section>
    }
}

// creates a card
class Card extends Component {
    render() {
    return (
        <div className ="col-sm-12 col-md-4">
   <div className="cardContainer">
   <div className="content-area">
      <SideOne />
      <SideTwo />
   </div>
</div>
</div>
)}
}



// creates side one of card
class SideOne extends Component {
    render() {
        return (
            <div className="side_one">
            <div className="card">
               <img className="card-img-top" src= {} alt={} />
               <div className="card-body">
                  <p className="card-title"> {this.props.card.name}  </p>
                  <p className="card-text"> {this.props.card.description}  </p>
               </div>
               <Footer />

            </div>
         </div>
        )
    }
}


// creates side two of card for index page
class SideTwo extends Component {
    render() {

        let skill = this.props.card.skills.map((i) => {
            return <span class="highlight">{i}</span>
            });

        let positions = this.props.card.position.map((i) => {
            return <span class="highlight">{i}</span>
        });
        
        return (
            <div className="side_two">
         <div className="card">
            <div className="card-body">
               <p className="card-title"> {this.props.card.name} </p>
               <p className="card-text"> {this.props.card.description} </p>
               <p className="card-text">Languages/Skills: {skill} </p>
               <p className="card-text">Positions Open: {positions} </p>
               <p className="card-text">Members Needed: {this.props.card.members-needed} </p>
               <p className="card-text">Duration: {this.props.card.duration} </p>
               <p className="card-text">Start Date: {this.props.card.start} </p>
               <p className="card-text">Time Commitment: {this.props.card.time} </p>
               <p className="card-text">Experience Level: {this.props.card.exp-level} </p>
               <p className="card-text"><a className="highlight"> {this.props.card.purpose} </a></p>
            </div>
            <Footer />

         </div>
      </div>
     )}
}


// creates Footer of card
class Footer extends Component {
    render () {
        return (
            <div className="card-footer">
                   <MessageButton />
         </div>
    )}
}


// Opens a pop up message box when the join project button is clicked
// Documentation from https://material-ui.com/components/dialogs/#form-dialogs followed
class MessageButton extends Component {
    render() {
         function FormDialog() {
            const [open, setOpen] = React.useState(false);
          
            const handleClickOpen = () => {
              setOpen(true);
            };
          
            const handleClose = () => {
              setOpen(false);
            };


            return (
                <div className="submit-button">
                 <Button className = "btn btn-dark" onClick={handleClickOpen}>Request to Join!</Button>
            
                  <Dialog open={open} onClose={handleClose} aria-label="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Request to Join: Message Project Group</DialogTitle>
                    <DialogContent>
                      <DialogContentText>To join this project, please fill out the following fields.</DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                      />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                      />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="letter"
                        label="Cover Letter"
                        type="letter"
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">Cancel</Button>
                      <Button onClick={handleClose} color="primary">Send</Button>
                    </DialogActions>
                  </Dialog>
                </div>

            );
    }
    return (FormDialog)
}
}


export default App2;



 