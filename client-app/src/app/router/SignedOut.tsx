/**
 * Name: SignedOut.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This code file serves as react-router logic.
 *          It is a wrapper component for routes that require the user to be signed OUT to access.
*/

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function Authorized() {
    // Check if the user is signed in
    const { userStore } = useStore();
    const { isLoggedIn, user } = userStore;
    const location = useLocation();

    // If the user is signed in and tries to access a SignedOut-wrapped page, re-route them to their rack page
    if (isLoggedIn) {
        return <Navigate to={`${user?.userName}`} state={{from: location}} />
    }

    return <Outlet />
}