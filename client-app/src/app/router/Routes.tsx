import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import SearchPage from "@/features/search/SearchPage";
import HomePage from "@/features/home/HomePage";
import AboutPage from "@/features/faq/AboutPage";
import RackPage from "@/features/rack/RackPage";
import RackView from "@/features/rack/RackView";
import RegisterPage from "@/features/auth/RegisterPage";
import LoginPage from "@/features/auth/LoginPage";


// Define the routes of the MPA
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        // Define child routes to navigate through
        children: [
            { path: '', element: <HomePage /> },
            { path: 'racklist', element: <RackPage /> },
            { path: 'record/:id', element: <RackView /> },
            { path: 'search', element: <SearchPage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'login', element: <LoginPage /> },
        ]
    }
]

export const router = createBrowserRouter(routes)


