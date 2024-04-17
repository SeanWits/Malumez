import { auth, db } from '../firebase'
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";


function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [buyer, setBuyer] = useState(true);
    const [seller, setSeller] = useState(false);
    const name = 'Alex';
    const surname = 'Hunter';
    const username = 'HunterAlex';

    const handleRoleChange = (e) => {
        if (e.target.value === 'buyer') {
            setBuyer(true);
            setSeller(false);
        } else if (e.target.value === 'seller') {
            setBuyer(true);
            setSeller(true);
        }
    };

    //function that validates the password and confirm password inputs, checking if they are not empty and are the same
    const validatePassword = () => {
        let isValid = true;
        if (password !== '' && confirmPassword !== '') {
            if (password !== confirmPassword) {
                isValid = false;
                setError('Passwords do not match');
            } else if (password.length < 8) {
                isValid = false;
                setError('Password should be at least 8 characters long');
            }
        }
        return isValid;
    };

    const addUser = async (userAuth, name, surname, username) => {
        try {
          await setDoc(doc(db, "users", userAuth.uid), {
            email: userAuth.email,
            name: name,
            surname: surname,
            username: username,
            roles: {
              admin: false,
              buyer: buyer,
              seller: seller
            },
            user_id: userAuth.uid
          });
          console.log("User added with ID: ", userAuth.uid);
        } catch (error) {
          console.error("Error adding user: ", error);
        }
      };

    //set a condition to call the createUserWithEmailAndPassword function only when the value returning from validatePassword is true.
    const register = async (e) => {
        e.preventDefault();
        setError('');
        if (validatePassword()) {
          try {
            // Create a new user with email and password using firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Add user data to Firestore
            await addUser(user, name, surname, username);
            
            console.log("User registered:", user);
          } catch (error) {
            setError(error.message);
            console.error("Error registering user: ", error);
          }
        }
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      };

    return (
        <form onSubmit={register} name='registration_form'>
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
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
            />
            <select onChange={handleRoleChange}>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
            </select>
            <button type="submit">Sign Up</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default SignUp;