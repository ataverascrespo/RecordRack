import axios, { AxiosResponse } from "axios"
import { User, UserChangePassword, UserForgotPassword, UserLogin, UserRegister, UserResetPassword, UserVerify } from "../models/user";
import { store } from '../stores/store';
import { AddRecord, UpdateRecord } from "../models/record";

// Define default URL
axios.defaults.baseURL = "http://localhost:5184";

const responseBody = (response: AxiosResponse) => response.data;

//Use an axios interceptor to pass Standard Authorization header using Bearer scheme
axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
})

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error.response.status === 401 && !config?.sent) {
      config.sent = true;

      const response = await agent.Account.refresh();
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

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body, { withCredentials: true }).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body, { withCredentials: true }).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Records = {
  getList: () => requests.get('api/Album/GetAll'),
  getListForUser: (userID: number) => requests.get(`api/Album/GetAlbumsByUserID/${userID}`),
  getSingle: (id: number) => requests.get(`api/Album/GetAlbumByID/${id}`),
  add: (record: AddRecord) => requests.post('api/Album', record),
  update: (record: UpdateRecord) => requests.put('api/Album', record),
  delete: (id: number) => requests.del(`api/Album/${id}`),
  like: (id: number) => requests.post(`api/Album/${id}/Like`, id),
  getRecordLikes: (id: number) => requests.get(`api/Album/GetAlbumLikes/${id}`) 
}

const Account = {
  login: (user: UserLogin) => requests.post("Auth/Login", user),
  register: (user: UserRegister) => requests.post("Auth/Register", user),
  verify: (token: UserVerify) => requests.post("Auth/Verify", token),
  refresh: () => requests.post("Auth/RefreshToken", {}),
  forgotPassword: (request: UserForgotPassword) => requests.post("Auth/ForgotPassword", request),
  resetPassword: (reset: UserResetPassword) => requests.post("Auth/ResetPassword", reset),
  changePassword: (change: UserChangePassword) => requests.post("Auth/changePassword", change),
}

const Users = {
  searchUsers: (userName: string) => requests.get(`User/GetUsersSearch/${userName}`),
  getCurrentUser: () => requests.get<User>('User/GetCurrentUser'),
  getUserByName: (userName: string) => requests.get(`User/GetUserByName/${userName}`),
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

const agent = {
  Records,
  Account,
  Users
}

export default agent;