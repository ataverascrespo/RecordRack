import axios, { AxiosResponse } from "axios"
import { User, UserLoginSchema, UserRegisterSchema } from "../models/user";

// Define default URL
axios.defaults.baseURL = "http://localhost:5184"

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Records = {
    list: () => requests.get('api/GetAlbums') 
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserLoginSchema) => requests.post("Auth/Login", user),
    register: (user: UserRegisterSchema) => requests.post("Auth/register", user),
}

const agent = {
    Records,
    Account
}

export default agent;