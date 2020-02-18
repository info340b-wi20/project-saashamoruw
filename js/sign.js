'use strict';
// Fix???
function tabsChange(){
let button = document.querySelector('.login');
let field = document.querySelector('confirm');
field.style.display = "none";
document.getElementsByClassName('submit').textContent = "Log In!";
document.querySelector('.msg').textContent = "Welcome Back!"
button.classList.add('active');
document.querySelector('signin').classList.remove('active');
}

let login = document.querySelector('#btnlogin');
let signup = document.querySelector('#btnsignup');

login.addEventListener('click', tabsChange('login'));
signup.addEventListener('click', tabsChange('signup'));




