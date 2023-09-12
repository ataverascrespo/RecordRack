import axios, { AxiosResponse } from "axios"

// Define default URL
axios.defaults.baseURL = "http://localhost:5184"

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
}

const Records = {
    list: () => requests.get('/GetAlbums') 
}

const agent = {
    Records
}

export default agent;