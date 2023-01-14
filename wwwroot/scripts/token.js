/*
* getJWTToken - Returns created JWT token in localStorage
*/
function getJWTToken() {
    return localStorage.getItem("jwt");
}

export { getJWTToken }