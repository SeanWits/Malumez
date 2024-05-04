import React from 'react';


function Modal({ closeModal }) {

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button onClick = {() => closeModal(false)}> X </button>
                <div className="name"></div>
                    <h3>Name:</h3>
                    
                <div className="body">
                    <h4>Username:</h4>
                    <h4>Shop Name:</h4>
                </div>
                <div className="footer">
                    <button>Block</button>
                    <button>Delete</button>
                    <button>Change Rolls</button>
                </div>
            </div>
        </div>
    )
}

export default Modal