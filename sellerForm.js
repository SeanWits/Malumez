
import { auth, db } from '../firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './signup.css';

function SellerForm() {

    const [contact, setContact] = useState();
    const [email, setEmail] = useState();
    const [location, setLocation] = useState();
    const [shopname, setShopname] = useState();
    const [username, setUsername] = useState();

    let searchReceived = localStorage.getItem("email");




  return (
    // the layout of the signup page 
    <div id = "signUpBackground">
      <section id='container'>
        <img src={require("../assets/Malume'z Logo.png")} id='logoHat' alt="Malume'z Logo" height="130" width="250" />
        <h2 id='sellerForm'>Seller form </h2>

        {/* the form itself in the middle of the screen, this contains the different detail fields and their respective labels */}
        <form id="seller-form" onSubmit={register}>
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

export default SellerForm;
