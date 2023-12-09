/**
 * Name: serviceAgent.ts
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file serves as the architectural API layer for the front-end application. Everything related to axios API calls
 *          is encapsulated within this code file. This is done mainly for maintainability and avoiding code duplication!
*/

import axios, { AxiosResponse } from "axios"
import { User, UserChangePassword, UserForgotPassword, UserLogin, UserRegister, UserResetPassword, UserVerify } from "../models/user";
import { store } from '../stores/store';
import { AddRecord, UpdateRecord } from "../models/record";

//  Define the baseURL with the Vite/Netlify env variable
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = (response: AxiosResponse) => response.data;

// Intercept all Axios API requests
axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  // Append Standard Authorization header with the Bearer scheme
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
})

// Intercept all Axios API responses
axios.interceptors.response.use(
  (response) => response,
  // 'Listen' for errors
  async (error) => {
    const config = error?.config;

    // Continue if response error is 401 Unauthorized
    if (error.response.status === 401 && !config?.sent) {
      config.sent = true;

      // When response is 401, that means the JWT passed in the authorization header is expired.
      // Call the Auth/Refresh API endpoint to generate a new token
      const response = await agent.Account.refresh();

      // Add the new token to the browser and to the axios config to re-do the API call
      store.commonStore.setToken(response.data)
      if (response?.data.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${response?.data.accessToken}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

// Define the default API requests and their properties/configs
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body, { withCredentials: true }).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body, { withCredentials: true }).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

// Define API endpoints for app's Records features
const Records = {
  getList: () => requests.get('api/Album/GetAll'),
  getListForUser: (userID: number) => requests.get(`api/Album/GetAlbumsByUserID/${userID}`),
  getSingle: (id: string) => requests.get(`api/Album/GetAlbumByID/${id}`),
  add: (record: AddRecord) => requests.post('api/Album', record),
  update: (record: UpdateRecord) => requests.put('api/Album', record),
  delete: (id: string) => requests.del(`api/Album/${id}`),
  like: (id: string) => requests.post(`api/Album/${id}/Like`, id),
  getRecordLikes: (id: string) => requests.get(`api/Album/GetAlbumLikes/${id}`) 
}

// Define API endpoints for app's Account features
const Account = {
  login: (user: UserLogin) => requests.post("Auth/Login", user),
  logout: () => requests.post("Auth/Logout", {}),
  register: (user: UserRegister) => requests.post("Auth/Register", user),
  verify: (token: UserVerify) => requests.post("Auth/Verify", token),
  refresh: () => requests.post("Auth/RefreshToken", {}),
  forgotPassword: (request: UserForgotPassword) => requests.post("Auth/ForgotPassword", request),
  resetPassword: (reset: UserResetPassword) => requests.post("Auth/ResetPassword", reset),
  changePassword: (change: UserChangePassword) => requests.post("Auth/changePassword", change),
}

// Define API endpoints for app's Users features
const Users = {
  searchUsers: (userName: string) => requests.get(`User/GetUsersSearch/${userName}`),
  getCurrentUser: () => requests.get<User>('User/GetCurrentUser'),
  getUserByName: (userName: string) => requests.get(`User/GetUserByName/${userName}`),
  // For this API endpoint, change the request body format and append the form data file from photo upload
  uploadPhoto: (file: File) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post('User/ProfilePhoto', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },
  deletePhoto: (id: string) => requests.del(`User/DeletePhoto?ID=${id}`),
  follow: (id: number) => requests.post(`User/FollowUser/${id}`, id),
  getFollowers: (id: number) => requests.get(`User/GetFollowers/${id}`),
  getFollowing: (id: number) => requests.get(`User/GetFollowing/${id}`),
}

// Define API endpoints for app's Spotify features
const Spotify = {
  getAlbums: (searchQuery: string) => requests.get(`API/SpotifyAlbumSearch?albumQuery=${searchQuery}`),
  getTracks: (searchQuery: string) => requests.get(`API/SpotifyTrackSearch?trackQuery=${searchQuery}`),
}

const agent = {
  Records,
  Account,
  Users,
  Spotify
}

export default agent;