import { auth, db } from '../firebase';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import './signup.css';

function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [buyer, setBuyer] = useState(true);
  const [seller, setSeller] = useState(false);

  const handleRoleChange = (e) => {
    if (e.target.value === 'Buyer') {
      setBuyer(true);
      setSeller(false);
    } else if (e.target.value === 'Seller') {
      setBuyer(false);
      setSeller(true);
    }
  };

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

  const addUser = async (userAuth) => {
    try {
      await setDoc(doc(db, "users", userAuth.uid), {
        email: userAuth.email,
        name: name,
        surname: surname,
        username: username,
        verified: false,
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

  const register = async (e) => {
    e.preventDefault();
    setError('');
    if (validatePassword()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addUser(user);
        console.log("User registered:", user);
      } catch (error) {
        setError(error.message);
        console.error("Error registering user: ", error);
      }
    }
    setName('');
    setSurname('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="phone-container">
      <div className="container">
        <h2>Sign Up</h2>
        <form id="signup-form" onSubmit={register}>
          <div className="form-control">
            <label htmlFor="Name">Name</label>
            <input type="text" id="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="Surname">Surname</label>
            <input type="text" id="Surname" name="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="Username">Username</label>
            <input type="text" id="Username" name="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="UserType">User type:</label>
            <select name="Account type" id="type" onChange={handleRoleChange}>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>
          <button type="submit">Sign Up</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
  
}

export default SignUp;
