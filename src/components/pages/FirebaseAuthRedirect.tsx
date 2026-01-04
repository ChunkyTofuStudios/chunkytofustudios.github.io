import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Redirects Firebase Auth action links to the Firebase hosted auth handler.
 * 
 * Incoming URL: https://chunkytofustudios.com/beehive/auth?mode=action&oobCode=code
 * Redirects to: https://word-rally-app.firebaseapp.com/__/auth/action?mode=action&oobCode=code
 */
export function BeehiveFirebaseAuthRedirect() {
    const location = useLocation();

    useEffect(() => {
        // Get the query string from the current URL
        const queryString = location.search;

        // Construct the Firebase Auth redirect URL
        const firebaseAuthUrl = `https://word-rally-app.firebaseapp.com/__/auth/action${queryString}`;

        // Perform the redirect
        window.location.replace(firebaseAuthUrl);
    }, [location.search]);

    // Show a loading message while redirecting
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mb-4"></div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Redirecting...</h1>
                <p className="text-gray-600">Please wait while we redirect you to complete your authentication.</p>
            </div>
        </div>
    );
}
