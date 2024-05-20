// signUp.js

import { auth, db } from '../firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './signup.css';

function SignUp() {

  // variables to store the user's detauls 
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
  const [successMessage, setSuccessMessage] = useState('');

  const handleRoleChange = (e) => {
    if (e.target.value === 'Buyer') {
      setBuyer(true);
      setSeller(false);
    } else if (e.target.value === 'Seller') {
      setBuyer(false);
      setSeller(true);
    }
  };

  // validating the password = Checking if it is inputted correctly 
  //and whether it is 8 characters long or not (for security)
  const validatePassword = () => {
    let isValid = true;
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false;
        alert('Passwords do not match');
        //only clearing the fields with incorrect information
        setPassword('');
        setConfirmPassword('');
        
      } else if (password.length < 8) {
        isValid = false;
        alert('Password should be at least 8 characters long');
        //only clearing the fields with incorrect information
        setPassword('');
        setConfirmPassword('');
      }
    }
    return isValid;
  };

  // creating a new user using the details inputted on the signup Page
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
      console.error("Error adding user: ", error,"\n Please check your details and try again");
      //Clearing all the fields
      setName('');
      setSurname('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

    // registering a new user using the details inputted on the signup Page
    // this will be verified and authenticated by google (third party service)
  const register = async (e) => {
    e.preventDefault();
    setError('');
    //verifying the user has put in corresponding and correct information
    if (validatePassword()) {
      try {
        
        if(buyer && !(seller))
          {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await addUser(user);
            setSuccessMessage('User registered!');
            console.log("User registered:", user);
            navigate('/login');
          }
          else if(seller)
            {
              localStorage.setItem('email', email);
              localStorage.setItem('name', name);
              localStorage.setItem('surname', surname);
              localStorage.setItem('username', username);
              localStorage.setItem('password', password);
              console.log(name, surname, username);
              navigate('/sellerForm');
            }
        
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("Email already linked to an account");
          // clearing the email field as it is already in use
          setEmail('');
        } else {
          console.error("Error registering user: ", error, "\n Please try again ");
          alert(error.message);
          // clearing all the fields
          setName('');
          setSurname('');
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
      }
    }
    
  };

  return (
    // the layout of the signup page 
    <div id = "signUpBackground">
      <section id='container'>
        <img src={require("../assets/Malume'z Logo.png")} id='logoHat' alt="Malume'z Logo" height="130" width="250" />
        <h2 id='signUpSign'>Sign Up</h2>

        {/* the form itself in the middle of the screen, this contains the different detail fields and their respective labels */}
        <form id="signup-form" onSubmit={register}>
          <label htmlFor="Name">Name</label>
          <input type="text" id="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="Surname">Surname</label>
          <input type="text" id="Surname" name="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />

          <label htmlFor="Username">Username</label>
          <input type="text" id="Username" name="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <section id='sectionUserType'>
            <label htmlFor="type" id="userType">User type:</label>
            <select name="Account type" id="type" onChange={handleRoleChange}>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </section>

          <button type="submit" id='signUpButton' data-testid="signUpButton">Sign Up</button>
          {successMessage && <p data-testid="successMessage" style={{ color: 'green' }}>{successMessage}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>
    </div>
  );
}

export default SignUp;
