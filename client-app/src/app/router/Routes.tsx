import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import SearchPage from "@/features/search/SearchPage";
import HomePage from "@/features/home/HomePage";

// Define the routes of the MPA
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        // Define child routes to navigate through
        children: [
            { path: '', element: <HomePage /> },
            { path: 'racklist', element: <HomePage /> }, 
            { path: 'search', element: <SearchPage /> },
            { path: 'about', element: <HomePage /> },
        ]
    }
]

export const router = createBrowserRouter(routes)


