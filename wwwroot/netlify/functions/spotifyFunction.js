exports.handler = function (event, context, callback) {
    const spotifySecret = process.env.SPOTIFY_API_KEY;
    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            apiKey: spotifySecret
        })
    };
    callback(null, response);
};