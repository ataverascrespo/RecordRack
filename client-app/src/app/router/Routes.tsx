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


// Define the routes of the MPA
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        // Define child routes to navigate through
        children: [
            {element: <Authorized />, children: [
                { path: ':username/profile', element: <MainUserPage /> },
                { path: ':username/record/:id', element: <RecordView /> },
                { path: 'search', element: <SearchPage /> },
                { path: 'connect', element: <SocialPage /> },
            ]},
            { path: '', element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'verify', element: <VerifyPage /> },
            { path: 'verified', element: <VerifiedPage/> },
            { path: 'forgot-password', element: <PasswordForgotPage /> },
            { path: 'reset-password', element: <PasswordResetPage /> },
            { path: '*', element: <HTTPNotFoundPage /> },

        ]
    }
]

export const router = createBrowserRouter(routes)


