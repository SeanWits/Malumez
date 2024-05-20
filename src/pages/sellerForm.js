
import { db } from '../firebase';
import { useState, useEffect} from 'react';
import { addDoc,collection} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import './signup.css';

function SellerForm() {
  // All the variables that store the data
    const [contact, setContact] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [location, setLocation] = useState();
    const [shopname, setShopname] = useState();
    const [username, setUsername] = useState();
    const [userID, setUserID] = useState();
    const [error, setError] =useState();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // getting all the data passed from the 
    useEffect(() => {
      const storedEmail = localStorage.getItem('email');
      const storedName = localStorage.getItem('name');
      const storedSurname = localStorage.getItem('surname');
      const storedUsername = localStorage.getItem('username');
      const storeUserID = localStorage.getItem('userID');

      if (storedEmail) setEmail(storedEmail);
      if (storedName) setName(storedName);
      if (storedSurname) setSurname(storedSurname);
      if (storedUsername) setUsername(storedUsername);
      if(storeUserID) setUserID(storeUserID);
      console.log(email, name, surname, username, userID);
      // eslint-disable-next-line
  }, 
  // eslint-disable-next-line
  []);

  // checking if the user has formatted their shop location correctly
  const validateLocation = () => {
    let isValid = true;
    if(location.length === 0)
      {
        isValid = false;
        setError("The location is not valid");
        setLocation("");
      }
    return isValid;
  };

  // checking if the user has entered a shop name
  const validateShopname = () => {
    let isValid = true;
    if(location.length === 0)
      {
        isValid = false;
        setError("Please enter a shop name");
        setShopname("");
      }
    return isValid;
  };

  // checking if the 
  const validateContact = () => {
    let isValid = true;
    if(contact.length === 0)
      {
        isValid = false;
        setError("The contact is not valid");
        setShopname("");
      }
      else{
        function isNumericString() {
          return /^\d+$/.test(contact);
        }

        if (!(isNumericString()))
          {
            isValid = false;
            setError("The Contact number is not valid");
            setContact("");
          }else if(contact.length !==10)
            {
              setError("The contact number is too short");
              setContact("");
            }
      }
    return isValid;
  };

  const addShop = async () => {
    try {
      const shopData = {
        contact: contact,
        email: email,
        location: location,
        name: shopname,
        owner_id: userID, 
        owner_name: username,
    };

    await addDoc(collection(db, "shops"), shopData);
    console.log("shop added to the database.");

    } catch (error) {
      console.error("Error adding seller shop: ", error,"\n Please check your details and try again");
      //Clearing all the fields
      setShopname("");
      setContact("");
      setLocation("");
    }
  };

   // registering a new shop using the details inputted on the seller form Page
    const register = async (e) => {
      e.preventDefault();
      setError('');
      
      if(validateLocation() && validateShopname() && validateContact())
        {
          addShop();
          setSuccessMessage('Shop and seller Registered!');
          navigate("/Dashboard");
        }
      
    };

  return (
    // the layout of the  page 
    <div id = "signUpBackground">
      <section id='formContainer'>
        <img src={require("../assets/Malume'z Logo.png")} id='logoHat' alt="Malume'z Logo" height="130" width="250" />
        <h2 id='sellerFormHeading'>Shop registration </h2>

        {/* the form itself in the middle of the screen, this contains the different detail fields and their respective labels */}
        <form id="seller-form" onSubmit={register} >

          <label htmlFor="ShopName">Shop Name</label>
          <input type="text" id="shopName" name="shopName" value={shopname} onChange={(e) => setShopname(e.target.value)} required />

          <label htmlFor="contact Number">Contact</label>
          <input type="text" id="contact" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} />

          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required />

          <button type="submit" id='signUpButton' data-testid="signUpButton">Create Shop</button>
          {successMessage && <p data-testid="successMessage" style={{ color: 'green' }}>{successMessage}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>
    </div>
  );
}

export default SellerForm;
