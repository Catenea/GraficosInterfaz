// signup
const registerButton = document.getElementById("register-btn");

registerButton.addEventListener("click", function () {
  
//   get user info
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

//   sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {});
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out');
  })
});


const loginButton = document.getElementById("login-btn");

loginButton.addEventListener("click", function () {
  
//   get user info
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

//   sign up the user
auth.signInWithEmailAndPassword(email, password).then((cred) => {});
});