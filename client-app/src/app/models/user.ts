export interface User {
    id: number;
    email: string;
    userName: string;
    token: string;
    //created = Date;
    //image: string;
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