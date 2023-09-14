import axios, { AxiosResponse } from "axios"
import { User, UserLogin, UserRegister, UserVerify } from "../models/user";
import { store } from '../stores/store';
import { AddRecord, SavedRecord } from "../models/record";

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
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Records = {
  getList: () => requests.get('api/Album/GetAll'),
  getSingle: (id: number) => requests.post('api/Album/GetAlbumByID/', { ID: id }),
  add: (record: AddRecord) => requests.post('api/Album', record),
}

const Account = {
  current: () => requests.get<User>('Auth/GetCurrentUser'),
  login: (user: UserLogin) => requests.post("Auth/Login", user),
  register: (user: UserRegister) => requests.post("Auth/Register", user),
  verify: (token: UserVerify) => requests.post("Auth/Verify", token),
  refresh: () => requests.post("Auth/RefreshToken", {})
}

const agent = {
  Records,
  Account
}

export default agent;