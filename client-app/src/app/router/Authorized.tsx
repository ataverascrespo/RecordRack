/**
 * Name: Authorized.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file serves as react-router logic.
 *          It is a wrapper component for routes that require the user to be signed IN to access.
*/

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function Authorized() {
    // Check if the user is signed in
    const {userStore: {isLoggedIn}} = useStore();
    const location = useLocation();

    // If the user is not signed in and tries to access an Authorized-wrapped page, re-route them to home page
    if (!isLoggedIn) {
        return <Navigate to='/accounts/login' state={{from: location}} />
    }

    return <Outlet />
}