export interface User {
    email: string;
    username: string;
    refreshToken: string;
}

export interface UserLoginSchema {
    email: string;
    password: string;
}

export interface UserRegisterSchema {
    email: string;
    username: string;
    password: string;
}