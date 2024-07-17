/**
 * Name: RackNavLink.tsx
 * Written by: Alex Taveras-Crespo
 * 
 * Purpose: This is a custom component built off React Router's NavLink component. It is used to extend the functionality of the isActive
 *          prop, which highlights the active nav link in the app. 
 * 
 *          React Router V6 uses path matching in such a way that the paths /username, /username/record/ or /username/notifications all 
 *          highlight the same navlink. That's not great as /notifications is not related to racks or records, so they need to be split up.
 * 
 *          To prevent that behaviour, this was develoepd to check that the user location is either in /username or /username/record/, 
 *          in order to mark the 'Rack' navigation link as active without affecting the isActive prop of other non-rack-related links starting
 *          with /username. 
*/

import { NavLink, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface Props {
    to: string;
    children: (props: { isActive: boolean }) => React.ReactNode;
}

function RackNavLink({to, children }: Props) {
    // Get the current location of the user app
    const location = useLocation();

    // If the location pathname is in the user rack page or any user record page, return true
    // Otherwise, return false
    const isActive = location
        ? location.pathname === `/${to}` || location.pathname.startsWith(`/${to}/record`)
        : false;

    return (
        <NavLink to={to}>
        {() => children({ isActive })}
        </NavLink>
    );
}

// Wrap component in observer to respond to MobX changes
export default observer(RackNavLink)
