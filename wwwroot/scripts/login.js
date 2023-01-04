// Get the login form
const loginForm = document.getElementById("login-form");

// Add an event listener to the form
loginForm.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the user's credentials from the form
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Send a POST request to the API with the user's credentials
  fetch("/Auth/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // If the login is successful, the API should return a JWT
      const jwt = data.token;
      // Store the JWT in a cookie or local storage
      console.log(jwt);

      // Use the JWT to authenticate subsequent requests to the API
      fetch("/protected-route", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${jwt}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // If the request is successful, the API will return the data
          console.log("1");
        })
        .catch((error) => {
          // If the request fails, handle the error
          console.log("2");

        });
    })
    .catch((error) => {
      // If the login fails, handle the error
      console.log("3");
    });
});