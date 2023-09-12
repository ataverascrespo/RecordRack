export interface User {
    email: string;
    username: string;
    refreshToken: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    email: string;
    username: string;
    password: string;
}

export interface UserVerify {
    token: string;
}