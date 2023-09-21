export interface User {
    id: number;
    email: string;
    userName: string;
    token: string;
    imageURL: string;
    imageID: string;
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

export interface UserForgotPassword {
    email: string;
}

export interface UserResetPassword {
    resetToken: string;
    password: string;
}
export interface UserChangePassword {
    email: string;
    password: string;
}