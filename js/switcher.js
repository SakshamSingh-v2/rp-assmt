// login-signup switcher
console.log("loaded");
document.getElementById('logIn').style.display = 'none';
let showLoginPage = ()=> {
    document.getElementById('signUp').style.display = 'none';
    document.getElementById('logIn').style.display = 'block';
}
let showSignupPage = ()=> {
    document.getElementById('signUp').style.display = 'block';
    document.getElementById('logIn').style.display = 'none';  
}
