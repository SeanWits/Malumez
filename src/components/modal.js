// import React from 'react';
import { useState, useEffect } from "react";
import { updateDoc, collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import UpdateRoles from "./Admin/UpdateRoles";
import "./modal.css";


function Modal({ closeModal, email, name, role, initialRole }) {
    
    
        async function deleteUser() {
            try {
              // Query the users collection to find the document with the specified email
              const usersQuery = query(collection(db, "users"), where('email', '==', email));
              const querySnapshot = await getDocs(usersQuery);
            
              // Check if a document with the specified email exists
              if (querySnapshot.empty) {
                console.error("User with the specified email not found.");
                return;
              }
          
              // Get the reference to the first document (assuming email is unique)
              const userDocRef = querySnapshot.docs[0].ref;
              //console.log(userDocRef.id);
              //userDocRef.remove();
              // Delete the user document
              await deleteDoc(doc(db, "users", userDocRef.id));
              //await deleteDoc(userDocRef);
          
              console.log("User deleted successfully.");
            } catch (error) {
              console.error("Error deleting user:", error);
            }
          }

          
        

    
    
    const users = [];
    
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button className="titleCloseBtn" onClick = {() => closeModal(false)}> X </button>
                <div className="name"></div>
                    <h3>Name: {name}</h3>
                    
                <div className="body">
                    <h4>Email: {email}</h4>
                    <h4>Role: {role}</h4>
                </div>
                <div className="footer">
                    <button>Block</button>
                    <button onClick={deleteUser}>Delete</button>
                    <button>Change Roles</button>
                    <UpdateRoles initialEmail={email} initialRoles={initialRole}/>
                </div>
            </div>
        </div>
    )
}

function userStuff(email, name, role){
    console.log("Hello");
}

export default Modal