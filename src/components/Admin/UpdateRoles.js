import { useState, useEffect } from "react";
import { updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function UpdateRoles({ initialEmail, initialRoles }) {
  const [email, setEmail] = useState(initialEmail || "");
  const [roles, setRoles] = useState(initialRoles || {
    admin: false,
    buyer: false,
    seller: false
  });

  const handleRoleChange = (role) => (event) => {
    setRoles({
      ...roles,
      [role]: event.target.checked
    });
  };

  async function updateUserRoles() {
    try {
      // Query the users collection to find the document with the specified email
      const usersQuery = query(collection(db, "users"), where('email', '==', email));
      const querySnapshot = await getDocs(usersQuery);

      // Check if a document with the specified email exists
      if (querySnapshot.docs.length === 0) {
        console.error("User with the specified email not found.");
        return;
      }

      // Get the reference to the first document (assuming email is unique)
      const userDoc = querySnapshot.docs[0].ref;

      // Update the roles field of the user document
      await updateDoc(userDoc, {
        roles: roles
      });

      console.log("User roles updated successfully.");
    } catch (error) {
      console.error("Error updating user roles:", error);
    }
  }

  useEffect(() => {
    // Set the initial state of roles when the component mounts
    // This will also update the initial state of the switches
    setRoles(initialRoles || {
      admin: true,
      buyer: true,
      seller: false
    });
    // eslint-disable-next-line
  }, 
  // eslint-disable-next-line
  []);

  return(
    <>
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
        Admin:{" "}
        <input
          type="checkbox"
          checked={roles.admin}
          onChange={handleRoleChange("admin")}
        />
      </div>
      <div>
        Buyer:{" "}
        <input
          type="checkbox"
          checked={roles.buyer}
          onChange={handleRoleChange("buyer")}
        />
      </div>
      <div>
        Seller:{" "}
        <input
          type="checkbox"
          checked={roles.seller}
          onChange={handleRoleChange("seller")}
        />
      </div>
      <button onClick={updateUserRoles}>Update Roles</button>
    </>
  );
}

export default UpdateRoles;
