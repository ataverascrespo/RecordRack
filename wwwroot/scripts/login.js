// Get the login form
const loginForm = document.getElementById("login-form");
// Add an event listener to the form
loginForm.addEventListener("submit", formSubmit);

/*
* setJWTToken - Sets created JWT token
*/
function setJWTToken(jwt) {
  localStorage.setItem("jwt", jwt);
}

/*
* formSubmit - Checks log in form to validate user sign in 
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
    fetch("https://www.r3c0rdr4ck.xyz/Auth/Login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        //If the login is unsuccessful, display an error to end user
        if (data.data === null) {
          errorMessage.innerHTML = "Invalid username or password."; 
        }
        //If login is successful, the API returns a JWT in the data field of the returned JSON
        else {
          errorMessage.innerHTML = ""; 
          
          //Call method to set the JWT token in session storage 
          //Token is stored in response data's data field
          setJWTToken(data.data);

          //Route to rack list page
          window.location.href = "/racklist.html";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
