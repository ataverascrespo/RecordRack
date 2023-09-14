import { useEffect } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';

function RedirectToProfile() {
    const navigate = useNavigate();
    const match = useMatch(':username'); // Extract the username parameter

    useEffect(() => {
        if (match) {
            const { username } = match.params;
            const targetURL = `/${username}/profile`;

            // Redirect to the dynamically constructed target URL
            navigate(targetURL, { replace: true });
        }
    }, [match])

    // This component doesn't render anything and just triggers the redirection.
    return null;
}

export default RedirectToProfile;





