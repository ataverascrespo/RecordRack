// Define the handler function that will be called when the Netlify function is invoked
exports.handler = function (event, context, callback) {
  // Get the Spotify API key from an environment variable
  const spotifySecret = process.env.SPOTIFY_API_KEY;

  // Create a response object with a 200 status code and a JSON body containing the Spotify API key
  const response = {
      statusCode: 200,
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          apiKey: spotifySecret
      })
  };

  // Call the callback function to return the response to the client
  callback(null, response);
};
