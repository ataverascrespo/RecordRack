/**
 * Name: user.ts
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This file contains the interface definitions for User related models, and defines their types and structures
 *          - User interface
 *          - UserLogin interface
 *          - UserRegister interface
 *          - UserVerify interface
 *          - UserForgotPassword interface
 *          - UserResetPassword interface
 *          - UserChangePassword interface
*/

// Define the User interface and properties
export interface User {
    id: number;
    email: string;
    userName: string;
    token: string;
    imageURL: string;
    imageID: string;
    following: boolean;
    followersCount: number;
    followingCount: number;
}

// Define the UserLogin interface and properties
export interface UserLogin {
    email: string;
    password: string;
}

// Define the UserRegister interface and properties
export interface UserRegister {
    email: string;
    username: string;
    password: string;
}

// Define the UserVerify interface and properties
export interface UserVerify {
    token: string;
}

// Define the UserForgotPassword interface and properties
export interface UserForgotPassword {
    email: string;
}

// Define the UserResetPassword interface and properties
export interface UserResetPassword {
    resetToken: string;
    password: string;
}

// Define the UserChangePassword interface and properties
export interface UserChangePassword {
    email: string;
    oldPassword: string;
    newPassword: string;
}
