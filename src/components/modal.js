// import React from 'react';



function Modal({ closeModal, email, name, role }) {
    const users = [];
    //console.log(email);
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button onClick = {() => closeModal(false)}> X </button>
                <div className="name"></div>
                    <h3>Name: {name}</h3>
                    
                <div className="body">
                    <h4>Email: {email}</h4>
                    <h4>Role: {role}</h4>
                </div>
                <div className="footer">
                    <button>Block</button>
                    <button>Delete</button>
                    <button>Change Roles</button>
                </div>
            </div>
        </div>
    )
}

function userStuff(email, name, role){
    console.log("Hello");
}

export default Modal