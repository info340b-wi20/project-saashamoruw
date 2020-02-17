'use strict';

let state = {
    currProj: [],
    findProj: []
};

// fetch data from json file
function fetchData() {
    fetch("js/data.json")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            state.currProj = data.currentProj;
            state.findProj = data.findProjects;
            console.log(state);
        });
}
fetchData();

// TO DO
// Check if current code works lol!!
// Dynamically add data the user enters to the json file and creates its showcase card
// Add code to make find projects cards
// Sign in / sign up page js

// Create one card that showcases projects with info and flip css
function createShowcaseCard(obj) {
    let sec = document.querySelector(".projects");
    let row = document.createElement('div').classList.add("row");
    let col = document.createElement('div').classList.add("col-sm-12 col-md-4");
    let container = document.createElement('div').classList.add("cardContainer");
    let content = document.createElement('div').classList.add("content-area");
    let sideOne = createCardSideOne(obj);
    let sideTwo = createCardSideTwo(obj);
    content.appendChild(sideOne).appendChild(sideTwo);
    container.appendChild(content);
    col.appendChild(container);
    row.appendChild(col);
    sec.appendChild(row);
    return sec;
}

// creates flip side of showcase card
function createCardSideTwo(obj) {
    let side = document.createElement('div').classList.add("side_one");
    let card = document.createElement('div').classList.add("card");
    let cardBody = document.createElement('div').classList.add("card-body");
     // Make footer with function
     let footer = document.createElement('div').classList.add("card-footer");
     let links = createLinkList(obj.links[0]);
     footer.appendChild(links);
    //Add title
    let title = document.createElement('p').classList.add('card-title');
    title.textContent = obj.name;
    //Add Team Members
    let team = document.createElement('p').classList.add('card-text');
    team.textContent = "Team Members: " + obj.team.join(', ');
    //Add skills
    let skills = createHighlighted(obj.skills);
    // Add purpose
    let purpLink = document.createElement('a'); 
    purpLink.classList.add('highlight');
    purpLink.innerHTML = obj.purpose;
    let purpose = document.createElement('p').classList.add('card-text').appendChild(purpLink);
    //Link everything
    cardBody.appendChild(title)
            .appendChild(team)
            .appendChild(skills)
            .appendChild(purpose)
            .appendChild(footer);
    card.appendChild(card).appendChild(footer);
    side.appendChild(card);
}

// Creates skills text with highlighted style
function createHighlighted(obj) {
    let skills = document.createElement('p').classList.add('card-text');
    skills.textContent = "Languages/Skills: ";
    for(let i = 0; i < obj.length; i++) {
        let span = document.createElement('span').classList.add('highlight');
        span.textContent = obj[i];
        skills.appendChild(span);
    }
    return skills;
}

// Creates main side of showcase card
function createCardSideOne(obj) {
    let side = document.createElement('div').classList.add("side_one");
    let card = document.createElement('div').classList.add("card");
    let cardBody = document.createElement('div').classList.add("card-body");
    let topImg = document.createElement('img').classList.add("card-img-top");
    // Make footer with function
    let footer = document.createElement('div').classList.add("card-footer");
    let links = createLinkList(obj.links[0]);
    footer.appendChild(links);
    // Adds link to image and adds image to card
    topImg.src=obj.img;
    topImg.alt=obj.alt;
    card.innerHTML = topImg;
    //Add title
    let title = document.createElement('p').classList.add('card-title');
    title.textContent = obj.name;
    //Add description
    let text = document.createElement('p').classList.add('card-text');
    text.textContent = obj.description;
    // link everything
    cardBody.appendChild(title).appendChild(text);
    card.appendChild(cardBody).appendChild(footer);
    side.appendChild(card);
    return side;
}

// Creates list of icon links for a particular showcase project

function createLinkList(obj) {
    let links = document.createElement('div').classList.add('links');
    let list = document.createElement('ul');
    for(var key in obj) {
        if(obj.key != "") {
            let curr = key.toString();
            let link = document.createElement('a');
            link.href = obj.img;
            let icon = document.createElement('i');
            icon.classList.add("fa fa-" + curr);
            icon.setAttribute('aria-label', curr + 'logo');
            link.appendChild(icon);
            let li= document.createElement('li');
            li.appendChild(link);
            list.appendChild(li);
        }
    }
    links.appendChild(list);
    return links;
}
