/**
 * Name: Routes.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file serves as the main component for defining react-router Routes for the application.
 *          All browsing routes are defined here.
*/

import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import SearchPage from "@/features/search/SearchPage";
import HomePage from "@/features/home/HomePage";
import AboutPage from "@/features/faq/AboutPage";
import RegisterPage from "@/features/auth/RegisterPage";
import LoginPage from "@/features/auth/LoginPage";
import PasswordForgotPage from "@/features/auth/Password/ForgotPassword/PasswordForgotPage";
import VerifyPage from "@/features/auth/Verify/VerifyPage";
import VerifiedPage from "@/features/auth/Verify/VerifiedPage";
import Authorized from "./Authorized";
import MainUserPage from "@/features/main/MainUserPage";
import HTTPNotFoundPage from "../layout/HTTPNotFoundPage";
import PasswordResetPage from "@/features/auth/Password/ForgotPassword/PasswordResetPage";
import RecordView from "@/features/main/rack/recordview/RecordView";
import SocialPage from "@/features/social/SocialPage";
import SignedOut from "./SignedOut";
import NotificationPage from "@/features/notifications/NotificationPage";


// Define the routes of the MPA
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        // Define child routes to navigate through
        children: [
            // Wrap pages that require user to be signed in behind Authorized component
            {element: <Authorized />, children: [
                { path: 'search/music', element: <SearchPage /> },
                { path: 'search/users', element: <SocialPage /> },
                { path: ':username/notifications', element: <NotificationPage /> },
            ]
            },
            // Wrap pages that require user to be signed out behind Authorized component
            {element: <SignedOut />, children: [
                { path: 'accounts/register', element: <RegisterPage /> },
                { path: 'accounts/login', element: <LoginPage /> },
                { path: 'accounts/verify', element: <VerifyPage /> },
                { path: 'accounts/verified', element: <VerifiedPage/> },
                { path: 'accounts/forgot-password', element: <PasswordForgotPage /> },
                { path: 'accounts/reset-password', element: <PasswordResetPage /> },
            ]},
            { path: '', element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: '*', element: <HTTPNotFoundPage /> },
            { path: ':username', element: <MainUserPage /> },
            { path: ':username/record/:id', element: <RecordView /> },

        ]
    }
]

// Create the routes
export const router = createBrowserRouter(routes)


