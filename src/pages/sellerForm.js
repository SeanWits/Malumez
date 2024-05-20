
import { auth, db } from '../firebase';
import { useState, useEffect} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './signup.css';

function SellerForm() {

    const [contact, setContact] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [location, setLocation] = useState();
    const [shopname, setShopname] = useState();
    const [username, setUsername] = useState();
    const [userID, setUserID] = useState();
    const [error, setError] =useState();
    const navigate = useNavigate();

    // getting all the data passed from the 
    useEffect(() => {
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');
      const storedName = localStorage.getItem('name');
      const storedSurname = localStorage.getItem('surname');
      const storedUsername = localStorage.getItem('username');
      const storeUserID = localStorage.getItem('userID');

      if (storedEmail) setEmail(storedEmail);
      if (storedPassword) setPassword(storedPassword);
      if (storedName) setName(storedName);
      if (storedSurname) setSurname(storedSurname);
      if (storedUsername) setUsername(storedUsername);
      if(storeUserID) setUserID(storeUserID);
      console.log(email, password, name, surname, username, userID);
  }, []);

  const validateLocation = () => {
    let isValid = true;
    if(location.length === 0)
      {
        isValid = false;
        alert("The location is not valid");
        setLocation("");
      }
    return isValid;
  };

  const validateShopname = () => {
    let isValid = true;
    if(location.length === 0)
      {
        isValid = false;
        alert("The Shop Name is not valid");
        setShopname("");
      }
    return isValid;
  };

  

  const validateContact = () => {
    let isValid = true;
    if(location.length === 0)
      {
        isValid = false;
        alert("The Shop Name is not valid");
        setShopname("");
      }
      else{
        function isNumericString() {
          return /^\d+$/.test(contact);
        }

        if (!(isNumericString()))
          {
            isValid = false;
            alert("The Contact number is not valid");
            setContact("");
          }
      }
    return isValid;
  };

  const addShop = async (userAuth) => {
    try {
      await setDoc(doc(db, "shops", userAuth.uid), {
        contact: contact,
        email: email,
        location: location,
        name: shopname,
        owner_id: userID, 
        usern: username,
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
      console.error("Error adding seller: ", error,"\n Please check your details and try again");
      //Clearing all the fields
      setName('');
      setSurname('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate("/SignUp");
    }
  };

   // registering a new user using the details inputted on the signup Page
    // this will be verified and authenticated by google (third party service)
    const register = async (e) => {
      e.preventDefault();
      setError('');
      
      if(validateLocation() && validateShopname && validateContact())
        {




        }
      
    };

  return (
    // the layout of the signup page 
    <div id = "signUpBackground">
      <section id='container'>
        <img src={require("../assets/Malume'z Logo.png")} id='logoHat' alt="Malume'z Logo" height="130" width="250" />
        <h2 id='sellerForm'>Seller form </h2>

        {/* the form itself in the middle of the screen, this contains the different detail fields and their respective labels */}
        <form id="seller-form" > {/* onSubmit={register} */}

          <label htmlFor="ShopName">Shop Name</label>
          <input type="text" id="shopName" name="shopName" value={shopname} onChange={(e) => setShopname(e.target.value)} required />

          <label htmlFor="contact">Contact</label>
          <input type="text" id="contact" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} />

          <label htmlFor="location">location</label>
          <input type="text" id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required />

          <button type="submit" id='signUpButton' data-testid="signUpButton">Sign Up</button>
          {/* {successMessage && <p data-testid="successMessage" style={{ color: 'green' }}>{successMessage}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>} */}
        </form>
      </section>
    </div>
  );
}

export default SellerForm;
