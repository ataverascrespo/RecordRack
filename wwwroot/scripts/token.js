function getJWTToken() {
    return localStorage.getItem("jwt");
}

export { getJWTToken }