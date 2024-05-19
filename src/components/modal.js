import React from 'react';
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import UpdateRoles from "./Admin/UpdateRoles";
import "./modal.css";

function Modal({ closeModal, email, name, role, initialRole }) {
    async function deleteUser() {
        try {
            const usersQuery = query(collection(db, "users"), where('email', '==', email));
            const querySnapshot = await getDocs(usersQuery);

            if (querySnapshot.empty) {
                console.error("User with the specified email not found.");
                return;
            }

            const userDocRef = querySnapshot.docs[0].ref;

            await deleteDoc(userDocRef);

            console.log("User deleted successfully.");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button className="titleCloseBtn" onClick={() => closeModal(false)}> X </button>
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
                    <UpdateRoles initialEmail={email} initialRoles={initialRole} />
                </div>
            </div>
        </div>
    )
}

export default Modal;
