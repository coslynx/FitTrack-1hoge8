// src/pages/index.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@mui/material'; 

const IndexPage = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state for login

    // Function to update the isLoggedIn state (potentially used for authentication)
    const handleLogin = () => {
        // Fetch user data from backend or LocalStorage
        // ... (Implement authentication logic)
        setIsLoggedIn(true);
    };

    // Function to update the isLoggedIn state (potentially used for authentication)
    const handleLogout = () => {
        // Clear user data from backend or LocalStorage
        // ... (Implement logout logic)
        setIsLoggedIn(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Fitness Tracker</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Track your progress, set goals, and stay motivated with our fitness app!
                </p>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Button variant="contained" color="primary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="contained" color="primary">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button variant="contained" color="secondary">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IndexPage;