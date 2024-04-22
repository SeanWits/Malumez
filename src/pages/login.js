import { auth } from '../firebase.js';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './login.css';
import SignUp from './signUp';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle login
    const login = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Sign in user with email and password using firebase
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully");
        } catch (error) {
            setError(error.message);
            console.error("Error logging in: ", error);
        }
        // Clear email and password fields after login attempt
        setEmail('');
        setPassword('');
    };

    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Login Page</title>
                <script src="https://unpkg.com/jquery@3.3.1/dist/jquery.js"></script>
                <script src="https://unpkg.com/web3@0.20.5/dist/web3.min.js"></script>
            </head>
            <body>
                <div id="solid-block-1"></div>
                <div id="solid-block-2"></div>
                <div id="solid-block-3"></div>
                <section className="login-forum">
                    <h1>Welcome to</h1>
                    <img src={require("./Malume'zLogoFull.png")} alt="Malume'z Logo" height="150" width="400" />
                    <form onSubmit={login} id="userForm">
                        <label htmlFor="email">Email Adress</label><br />
                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type your email adress" required /><br />
                        <label htmlFor="password">Password</label><br />
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Type your password" required /><br /><br />
                        <button type="submit" id="loginBtn">Login</button>
                    </form>
                    <h2>Don't have an account?</h2>
                    <button id='signUpHere'>Sign Up</button>
                    
                    
                    {error && <p>{error}</p>}
                </section>
            </body>
        </html>
    );
}

export default Login;