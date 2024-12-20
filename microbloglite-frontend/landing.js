/* Landing Page JavaScript */

"use strict";

const loginForm = document.querySelector("#login");
const username = document.getElementById("username")
const password = document.getElementById("password")

loginForm.onsubmit = function (event) {
  // Prevent the form from refreshing the page,
  // as it will do by default when the Submit event is triggered:
  event.preventDefault();

  // We can use loginForm.username (for example) to access
  // the input element in the form which has the ID of "username".
  const loginData = {
    username: loginForm.username.value,
    password: loginForm.password.value,
  };

  // Disables the button after the form has been submitted already:
  loginForm.loginButton.disabled = true;

  // Time to actually process the login using the function from auth.js!
  login(loginData);
};

//SignIn code

async function registerUser(event) {
    event.preventDefault()
  let registration = {
    fullName: document.getElementById("name").value.trim(),
    DOB: document.getElementById("dob").value.trim(),
    email: document.getElementById("email").value.trim(),
    username: document.getElementById("username").value.trim(),
    password: document.getElementById("password").value.trim(),
  };
  try {
    let promise = fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registration),
    });
    let response = await promise;
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error Code", error.message);
  }
  window.location.href= '/index.html';
}
