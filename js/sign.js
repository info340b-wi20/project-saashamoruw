'use strict';

let login = document.querySelector('#btnlogin');
let signup = document.querySelector('#btnsignup');


login.addEventListener('click', function(event) {
event.preventDefault();
    let field = document.querySelector('.confirm');      
    field.style.display = "none";
    let submit = document.querySelector('#button-submit');
    submit.textContent = "Log In!"
    submit.style.marginTop = "-25px"
    let check = document.querySelector('.checkbox');
    check.style.display = "none";    
    let msg = document.querySelector('.msg');
    msg.textContent = "Welcome Back!";
    let change = document.querySelector('#btnsignup');
    change.classList.add('active');   
    let tabButton = document.querySelector('#btnlogin');
    tabButton.classList.remove('active');
});

signup.addEventListener('click', function(event) {
    event.preventDefault();
    let field = document.querySelector('.confirm');
    field.style.display = "inline-block";
    let submit = document.querySelector('#button-submit');
    submit.textContent = "Get Started!";
    submit.style.marginTop = "0px"
    let check = document.querySelector('.checkbox');
    check.style.display = "inline-block";
    let msg = document.querySelector('.msg');
    msg.textContent = "Create an Account!";
    let change = document.querySelector('#btnlogin');
    change.classList.add('active');
    let tabButton = document.querySelector('#btnsignup');
    tabButton.classList.remove('active');
});






