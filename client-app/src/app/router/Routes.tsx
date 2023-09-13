import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import SearchPage from "@/features/search/SearchPage";
import HomePage from "@/features/home/HomePage";
import AboutPage from "@/features/faq/AboutPage";
import RackPage from "@/features/rack/RackPage";
import RackView from "@/features/rack/RackView";
import RegisterPage from "@/features/auth/RegisterPage";
import LoginPage from "@/features/auth/LoginPage";
import NotFound from "../layout/NotFound";
import ProfilePage from "@/features/profile/ProfilePage";
import PasswordForgotPage from "@/features/auth/Password/PasswordForgotPage";
import VerifyPage from "@/features/auth/Verify/VerifyPage";
import VerifiedPage from "@/features/auth/Verify/VerifiedPage";
import Authorized from "./Authorized";


// Define the routes of the MPA
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        // Define child routes to navigate through
        children: [
            {element: <Authorized />, children: [
                { path: 'racklist/:username', element: <RackPage /> },
                { path: 'record/:id', element: <RackView /> },
                { path: 'search', element: <SearchPage /> },
                { path: 'profile:/username', element: <ProfilePage /> },
            ]},
            { path: '', element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'verify', element: <VerifyPage /> },
            { path: 'verified', element: <VerifiedPage/> },
            { path: 'forgotPassword', element: <PasswordForgotPage /> },
            { path: '*', element: <NotFound /> },

        ]
    }
]

export const router = createBrowserRouter(routes)


