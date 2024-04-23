import { auth } from '../firebase.js';
import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './login.css';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    // useEffect(() => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 2000)
    // })

    // Function to handle login
    const login = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Activate loading state on login attempt
        try {
            // Sign in user with email and password using firebase
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully");
            navigate('/home');
        } catch (error) {
            setError(error.message);
            console.error("Error logging in: ", error);
        }
        // Clear email and password fields after login attempt
        setEmail('');
        setPassword('');
        setLoading(false); // Set loading state to false after login attempt
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // Set loading to false after 2000ms
            const timeoutId = setTimeout(() => {
                setLoading(false);
            }, 3000);

            // Clear the timeout if login is successful or if there's an error
            return () => clearTimeout(timeoutId);
        }
    }, [loading]);

    return (
        <div>
            <div id="solid-block-1"></div>
            <div id="solid-block-2"></div>
            <div id="solid-block-3"></div>
            <section className="login-forum">
                <h1>Welcome to</h1>
                <img src="./Malume'zLogoFull.png" alt="Malume'z Logo" height="150" width="400" />
                {
                    loading ?
                        <div className="sweet-loading">
                            <FadeLoader
                                height={25}
                                margin={50}
                                radius={2}
                                width={5}
                                color={"#36d7b7"}
                                loading={loading}
                                speedMultiplier={1}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                                className="loader" // Add a class for styling
                            />
                        </div>
                        :
                        <form onSubmit={login} id="userForm">
                            <label htmlFor="email">Email Adress</label><br />
                            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type your email adress" required /><br />
                            <label htmlFor="password">Password</label><br />
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Type your password" required /><br /><br />
                            <button type="submit" id="loginBtn">Login</button>
                        </form>
                }
                <h2>Don't have an account?</h2>
                <button id="signUp"> Sign Up</button>
                {error && <p>{error}</p>}
            </section>
        </div>
    );
}

export default Login;
