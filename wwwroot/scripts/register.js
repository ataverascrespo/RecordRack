// Get the login form
const loginForm = document.getElementById("signup-form");
// Add an event listener to the form
loginForm.addEventListener("submit", formSubmit);

/*
* formSubmit - Checks sign in form to validate user register
*/
function formSubmit(event) {
  //Prevent the default form submission behavior
  event.preventDefault();
  
  //Get user credentials from the form
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("message-content-login");

  //If username empty
  if (userName == "") {
    alert("Username must be entered");
  }

  //If password empty
  if (password == "") {
    alert("Password must be entered");
  }

  //If both fields are filled
  else {
    //Send POST request to the API with the user credentials
    fetch("https://ec2-3-142-232-139.us-east-2.compute.amazonaws.com:5184/Auth/Register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        //If the login is unsuccessful, display an error to end user
          console.log(data);
        if (data.data === 0) {
          errorMessage.innerHTML = "User already exists."; 
        }
        //If login is successful, the API returns a JWT in the data field of the returned JSON
        else {
          errorMessage.innerHTML = ""; 

          //Route to rack list page
          window.location.href = "/login.html";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
