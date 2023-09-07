import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";

// Define the routes of the MPA
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />
    }
]

export const router = createBrowserRouter(routes)


