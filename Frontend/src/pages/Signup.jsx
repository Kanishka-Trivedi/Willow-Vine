// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase'; // Correctly import auth

// const Signup = () => {
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

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setError(''); // Clear previous errors
//         if (!email || !password) {
//             setError('Please fill in all fields.');
//             return;
//         }
//         try {
//             // Use the createUserWithEmailAndPassword function from Firebase
//             await createUserWithEmailAndPassword(auth, email, password);
//             // On successful signup, Firebase automatically logs the user in,
//             // and the onAuthStateChanged listener will redirect to '/'
//         } catch (err) {
//             setError(err.message); // Display error message from Firebase
//             console.error('Signup Error:', err);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50">
//             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold text-center text-gray-900">Create your Account</h2>
//                 <form onSubmit={handleSignup} className="space-y-6">
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
//                         <label htmlFor="password-signup" className="text-sm font-medium text-gray-700">Password</label>
//                         <input
//                             id="password-signup"
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                         />
//                     </div>
//                     {error && <p className="text-sm text-red-600">{error}</p>}
//                     <div>
//                         <button type="submit" className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
//                             Sign Up
//                         </button>
//                     </div>
//                 </form>
//                 <p className="text-sm text-center text-gray-600">
//                     Already have an account?{' '}
//                     <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//                         Login
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Signup;







import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
    return unsubscribe;
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!agree) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section (Form) */}
      <div className="flex items-center justify-center flex-1 px-4 py-6 bg-white sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Create an account
          </h2>
          <form onSubmit={handleSignup} className="space-y-4 text-sm">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-3.5 h-3.5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
                I agree to all the{" "}
                <Link
                  to="/terms"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Terms & Conditions
                </Link>
              </label>
            </div>

            {/* Error */}
            {error && <p className="text-xs text-red-600">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign up
            </button>
          </form>

          {/* Link to Login */}
          <p className="mt-4 text-xs text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section (Image - fixed full size) */}
      <div className="hidden md:flex flex-1 items-center justify-center relative">
        <img
          src="https://i.pinimg.com/564x/a1/6d/5b/a16d5bf66e243925a0a6de150486f263.jpg"
          alt="Plants"
          className="object-cover w-full h-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
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

export default Signup;
