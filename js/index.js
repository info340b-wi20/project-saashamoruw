'use strict';

let state = {
    currProj: []
};

// fetch data from json file
function fetchData() {
    fetch("js/data.json")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            state.currProj = data.currProj;
            renderShowcaseCards(state.currProj);
        });
}
fetchData();

// TO DO
// Check if current code works lol!!
// Dynamically add data the user enters to the json file and creates its showcase card
// Add code to make find projects cards
// Sign in / sign up page js

// Shows form on click
let addProjBtn = document.querySelector("#addProjBtn");
addProjBtn.addEventListener('click', function() {
    let form = document.querySelector("#addProjForm");
    form.classList.remove("invisible");
    form.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
});

//lets user add multiple team members - Page goes into error
let addMember = document.querySelector("#addMem");
addMember.addEventListener('click', function(){
    let field = document.querySelector(".teamForm");
    let label = document.createElement('label');
    label.innerHTML = "Name: ";
    let input = document.createElement('input');
    input.classList.add("memName");
    input.classList.add("single");
    input.type = "text";
    field.appendChild(label);
    field.appendChild(input);
});

// Executes when the user clicks to finally add project
let add = document.querySelector("#newProj");
add.addEventListener('click', function() {
    updateState();
    renderShowcaseCards(state.currProj);
})


//Updates the state variable to add the new project
//
function updateState() {
    // get all the input variables //get the form input
    let name = document.querySelector('#title');
    let descr = document.querySelector('#descr');
    let skills = document.querySelectorAll('option');
    let purpose = document.querySelectorAll('input[type="radio"]');
    let img = document.querySelector('input[name = "img_link"]');
    let links = document.querySelectorAll('input[name = "user_links"]')
    let team = document.querySelectorAll('input[class = "memName single"]')

    //create new object from inputs
    let newState = {
        "name": name,
        "description": descr,
        "skills": skills,
        "team": team, //
        "purpose": purpose, //
        "img": img,
        "alt": img.alt,
        "links": links // 
    }
    // put into state
    state.currProj.push(newState);
}



// Adds all showcase cards to page
function renderShowcaseCards(obj) {
    let sec = document.querySelector(".projects");
    let row = document.createElement('div');
    row.classList.add("row");
    for(var i = 0; i < obj.length; i++) {
        let card = createShowcaseCard(obj[i]);
        row.appendChild(card);
    }
    sec.appendChild(row);
}

// Create one card that showcases projects with info and flip css
function createShowcaseCard(obj) {
    let col = document.createElement('div');
        col.classList.add("col-sm-12","col-md-4");
    let container = document.createElement('div');
        container.classList.add("cardContainer");
    let content = document.createElement('div');
        content.classList.add("content-area");
    let sideOne = createCardSideOne(obj);
    let sideTwo = createCardSideTwo(obj);
    content.appendChild(sideOne);
    content.appendChild(sideTwo);
    container.appendChild(content);
    col.appendChild(container);
    return col;
}

// creates flip side of showcase card
function createCardSideTwo(obj) {
    let side = document.createElement('div');
        side.classList.add("side_two");
    let card = document.createElement('div');
        card.classList.add("card");
    let cardBody = document.createElement('div');
        cardBody.classList.add("card-body");
     // Make footer with function
     let footer = document.createElement('div');
        footer.classList.add("card-footer");
     let links = createLinkList(obj.links[0]);
     footer.appendChild(links);
    //Add title
    let title = document.createElement('p');
        title.classList.add('card-title');
        title.textContent = obj.name;
    //Add Team Members
    let team = document.createElement('p');
        team.classList.add('card-text');
    team.textContent = "Team Members: " + obj.team.join(', ');
    //Add skills
    let skills = createHighlighted(obj.skills);
    // Add purpose
    let purpLink = document.createElement('a'); 
    purpLink.classList.add('highlight');
    purpLink.innerHTML = obj.purpose;
    let purpose = document.createElement('p');
        purpose.classList.add('card-text');
        purpose.appendChild(purpLink);
    //Link everything
    cardBody.appendChild(title);
    cardBody.appendChild(team);
    cardBody.appendChild(skills);
    cardBody.appendChild(purpose);
    card.appendChild(cardBody); card.appendChild(footer);
    side.appendChild(card);
    return side;
}

// Creates skills text with highlighted style
function createHighlighted(obj) {
    let skills = document.createElement('p');
    skills.classList.add('card-text');
    skills.textContent = "Languages/Skills: ";
    for(let i = 0; i < obj.length; i++) {
        let span = document.createElement('span');
        span.classList.add('highlight');
        span.textContent = obj[i];
        skills.appendChild(span);
    }
    return skills;
}

// Creates main side of showcase card
function createCardSideOne(obj) {
    let side = document.createElement('div');
        side.classList.add("side_one");
    let card = document.createElement('div');
    card.classList.add("card");
    let cardBody = document.createElement('div');
        cardBody.classList.add("card-body");
    let topImg = document.createElement('img');
        topImg.classList.add("card-img-top");
    // Make footer with function
    let footer = document.createElement('div');
        footer.classList.add("card-footer");
    let links = createLinkList(obj.links[0]);
    footer.appendChild(links);
    // Adds link to image and adds image to card
    topImg.src=obj.img;
    topImg.alt=obj.alt;
    //Add title
    let title = document.createElement('p');
        title.classList.add('card-title');
    title.textContent = obj.name;
    //Add description
    let text = document.createElement('p');
    text.classList.add('card-text');
    text.textContent = obj.description;
    // link everything
    cardBody.appendChild(title); cardBody.appendChild(text);
    card.appendChild(topImg); card.appendChild(cardBody); card.appendChild(footer);
    side.appendChild(card);
    return side;
}

// Creates list of icon links for a particular showcase project

function createLinkList(obj) {
    let links = document.createElement('div');
        links.classList.add('links');
    let list = document.createElement('ul');
    for(var key in obj) {
        if(obj.key != "") {
            let curr = key.toString();
            let link = document.createElement('a');
            link.href = "https://www." + curr + ".com";
            let icon = document.createElement('i');
            icon.classList.add("fa", "fa-" + curr);
            icon.setAttribute('aria-label', curr + ' logo');
            link.appendChild(icon);
            let li= document.createElement('li');
            li.appendChild(link);
            list.appendChild(li);
        }
    }
    links.appendChild(list);
    return links;
}
