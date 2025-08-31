// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase'; // Correctly import auth

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     // If a user is already logged in, redirect them to the home page
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 navigate('/');
//             }
//         });
//         return unsubscribe; // Cleanup subscription
//     }, [navigate]);

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(''); // Clear previous errors
//         if (!email || !password) {
//             setError('Please enter both email and password.');
//             return;
//         }
//         try {
//             // Use the signInWithEmailAndPassword function from Firebase
//             await signInWithEmailAndPassword(auth, email, password);
//             // On successful login, the onAuthStateChanged listener will redirect
//         } catch (err) {
//             setError('Failed to log in. Please check your credentials.');
//             console.error('Login Error:', err);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50">
//             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold text-center text-gray-900">Login to your Account</h2>
//                 <form onSubmit={handleLogin} className="space-y-6">
//                     <div>
//                         <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
//                         <input
//                             id="email"
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="password-login" className="text-sm font-medium text-gray-700">Password</label>
//                         <input
//                             id="password-login"
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                         />
//                     </div>
//                     {error && <p className="text-sm text-red-600">{error}</p>}
//                     <div>
//                         <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                             Login
//                         </button>
//                     </div>
//                 </form>
//                 <p className="text-sm text-center text-gray-600">
//                     Don't have an account?{' '}
//                     <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
//                         Sign Up
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;







import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // your firebase config

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        });
        return unsubscribe;
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError("Failed to log in. Please check your credentials.");
            console.error("Login Error:", err);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left section (form) */}
            <div className="flex-1 flex flex-col justify-center px-10 py-12 bg-white shadow-xl">
                {/* Logo */}
                <div className="w-40 pb-5">
                    <Link to="/">
                        <img
                            src="/logo.png"
                            alt="Willow Vine Logo"
                            className="w-full h-auto"
                        />
                    </Link>
                </div>

                <h2 className="mb-2 text-3xl font-bold text-gray-900">Welcome!</h2>
                <p className="mb-8 text-sm text-gray-600">
                    Please enter your email and password to continue.
                </p>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password-login"
                            className="text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password-login"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {error && (
                        <p className="text-sm font-medium text-red-600">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-600">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-green-600 hover:text-green-500"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>

            {/* Right section (image) */}
            <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden">
                {/* Image (fixed size inside 50% container) */}
                <img
                    src="https://i.pinimg.com/564x/a1/6d/5b/a16d5bf66e243925a0a6de150486f263.jpg"
                    alt="Plant"
                    className="w-full h-screen object-cover"
                />

                {/* Gradient overlay matching image size */}
                <div className="absolute w-full h-screen left-1/2 -translate-x-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Text overlay */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-4 text-white bg-black/40 rounded-xl max-w-sm shadow-lg">
                    <h3 className="mb-2 text-lg font-semibold">
                        Bring Nature’s Luxury Into Your Home
                    </h3>
                    <p className="text-sm text-gray-200">
                        Hand-picked plants that breathe life, style, and serenity into every corner.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
