import { auth, db } from '../firebase';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
        alert('Passwords do not match');
      } else if (password.length < 8) {
        isValid = false;
        alert('Password should be at least 8 characters long');
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
    // Store passwords to maintain their values in case of error
    const storedPassword = password;
    const storedConfirmPassword = confirmPassword;

    if (validatePassword()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addUser(user);
        console.log("User registered:", user);
        navigate('/home');
      } catch (error) { 
        if (error.code === "auth/email-already-in-use") {
          alert("Email already linked to an account");
        } else {
          console.error("Error registering user: ", error);
          alert(error.message);
        }
        // Restore password values
        setPassword(storedPassword);
        setConfirmPassword(storedConfirmPassword);
      }
    }
    // Clear other input values
    setName('');
    setSurname('');
    setUsername('');
    setEmail('');
  };

  return (
    <div>
      <section id='container'>
        <img src={require("../assets/Malume'z Logo.png")} id='logoHat' alt="Malume'z Logo" height="130" width="250"/>
        <h2 id='signUpSign'>Sign Up</h2>
        <form id="signup-form" onSubmit={register}>
          <label htmlFor="Name">Name</label>
          <input type="text" id="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)}  />
        
          <label htmlFor="Surname">Surname</label>
          <input type="text" id="Surname" name="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
        
          <label htmlFor="Username">Username</label>
          <input type="text" id="Username" name="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  required />
        
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        
          <section id='sectionUserType'>
          <label id="userType" htmlFor="UserType">User type:</label>
          <select name="Account type" id="type" onChange={handleRoleChange}>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
          </section>

          <button type="submit" id='signUpButton'>Sign Up</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>
    </div>
  );
}

export default SignUp;

