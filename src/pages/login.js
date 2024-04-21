import { auth } from '../firebase.js';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
/*function openPopup() {
    //window.open("signup.html",popup=yes, rel="noreferrer", "Signup Popup", "width=500,height=700");
    window.open("signup.html", "Signup Popup", "width=500,height=700,left=" + ((window.screen.width - 500) / 2) + ",top=" + ((window.screen.height - 700) / 2) + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,copyhistory=0,resizable=0");

}*/

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
        <form onSubmit={login} name='login_form'>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default Login;
