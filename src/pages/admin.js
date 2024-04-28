import './admin.css';

//import React from 'react';
import ReactDOM from 'react-dom/client';
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import Owners from '../components/owners';


function Admin(){

    const [showOwners, setShowOwners] = useState(false); // State to control the visibility of Owners component

    const toggleOwners = () => {
        setShowOwners(!showOwners); // Toggle the state
    };
    

    return(<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Document</title>
        <link rel="stylesheet" href="admin.css"/>
    </head>
    <body>
        <header><a href="/"><img alt="" src={require("../assets/Malume'zLogoFull.png")}/></a></header>
        
        <section class="main-content">
            <nav>
                <button class="button" id="dashboardBtn" onClick={dashboard}>Dashboard</button>
                {/* Toggle the visibility of Owners component when button is clicked */}
                <button id="OwnersBtn" onClick={toggleOwners}>Store Owners</button>
                <button id="Buyers" onClick={buyers}>Buyers</button>
            </nav>
    
            <section class="main-idea">
                <table id="adminTable">
                    <tr>
                    <th>BUYER OR SELLER</th>
                    <th>USERNAME/PERSON IN CHARGE</th>
                    <th>EMAIL</th>
                    <th>LOCATION</th>
                    </tr>
                </table>
            </section>
            
            {showOwners && <Owners />}
            
        </section>
    </body>
    </html>
    );
}

const users = [{
    "id":0,
    "buyer":true,
    "username":"fairydust",
    "contactNumber": "0230120304",
    "email":"guineapigs@hotmail.com",
    "shopName": "none",
    "location": "Vosloorus"
},
{
    "id":1,
    "buyer":false,
    "username":"thegreez",
    "contactNumber": "0112345304",
    "email":"money@moneytalks.mail", 
    "shopName": "Danny's Supermarket",
    "location": "Vosloorus" 
},
{
    "id":2,
    "buyer":true,
    "username": "theOne",
    "contactNumber": "0111111111",
    "email":"crazy@gmail.com",
    "shopName": "none",
    "location": "Thembisa"
}];

function dashboard(){
    //---------------------------------------------------------------------------------------------------------------
    

    //---------------------------------------------------------------------------------------------------------------

    const table = document.getElementById('adminTable');
    const rowCount = table.rows.length;
    //table.deleteRow(0);
    
    if(rowCount!=0){
        for(let k=0;k<rowCount;k++){
            table.deleteRow(0);
        };
    };


    const newRow = table.insertRow(0);
    const cell = newRow.insertCell(0);
    cell.innerHTML = "<b>BUYER OR SELLER</b>";
    const cell1 = newRow.insertCell(1);
    cell1.innerHTML = "<b>USERNAME/PERSON IN CHARGE</b>";
    const cell2 = newRow.insertCell(2);
    cell2.innerHTML = "<b>EMAIL</b>";
    const cell3 = newRow.insertCell(3);
    cell3.innerHTML = "<b>LOCATION</b>";
    


    //Adding users to admin page
    for(let i=0;i<users.length;i++){
        //Adds new rows
        const row = table.insertRow(-1);
        
        //cell4.innerHTML = " ";
        for(let j=0;j<4;j++){
            //Adds new cells
            const cell = row.insertCell(j);
            
            if(j==0){
                cell.textContent = users[i].buyer;
            };

            if(j==1){
                cell.textContent = users[i].username;
            };
            
            if(j==2){
                cell.textContent = users[i].email;
            };

            if(j==3){
                cell.textContent = users[i].location;
            };

            
        };

        
    };
};

// function owners(){
//     const [shopsData, setShopsData] = useState([]);

//     useEffect(() => {
//         const fetchShopsData = async () => {
//             try {
//                 // Query all documents from the "shops" collection
//                 const querySnapshot = await getDocs(collection(db, "shops"));
//                 const data = [];

//                 // Iterate over the documents and extract the data
//                 querySnapshot.forEach((doc) => {
//                     const { name, email, location, contact, owner_name } = doc.data();
//                     data.push({ name, email, location, contact, owner_name });
//                 });

//                 // Set the extracted data to state
//                 setShopsData(data);
//             } catch (error) {
//                 console.error("Error fetching shops data:", error);
//             }
//         };

//         // Call the fetchShopsData function when the component mounts
//         fetchShopsData();

//         // Cleanup function (optional)
//         return () => {
//             // Perform cleanup if necessary
//         };
//     }, []);

//     const table = document.getElementById('adminTable');
//     const rowCount = table.rows.length;
//     //table.deleteRow(0);
    
//     if(rowCount!=0){
//         for(let k=0;k<rowCount;k++){
//             table.deleteRow(0);
//         };
//     };

//     const newRow = table.insertRow(0);
//     const cell = newRow.insertCell(0);
//     cell.innerHTML = "<b>SHOP NAME</b>";
//     const cell1 = newRow.insertCell(1);
//     cell1.innerHTML = "<b>PERSON IN CHARGE</b>";
//     const cell2 = newRow.insertCell(2);
//     cell2.innerHTML = "<b>EMAIL</b>";
//     const cell3 = newRow.insertCell(3);
//     cell3.innerHTML = "<b>LOCATION</b>";

//     for(let i=0;i<users.length;i++){
//         //Adds new rows
//         const row = table.insertRow(-1);
        
//         //cell4.innerHTML = " ";
//         for(let j=0;j<4;j++){
//             //Adds new cells
//             const cell = row.insertCell(j);
            
//             if(j==0){
//                 cell.textContent = users[i].buyer;
//             };

//             if(j==1){
//                 cell.textContent = users[i].username;
//             };
            
//             if(j==2){
//                 cell.textContent = users[i].email;
//             };

//             if(j==3){
//                 cell.textContent = users[i].location;
//             };

            
//         };

        
//     };
// };

function buyers(){
    const table = document.getElementById('adminTable');
    const rowCount = table.rows.length;
    //table.deleteRow(0);
    
    if(rowCount!=0){
        for(let k=0;k<rowCount;k++){
            table.deleteRow(0);
        };
    };
    const newRow = table.insertRow(0);
    const cell = newRow.insertCell(0);
    cell.innerHTML = "<b>NAME</b>";
    const cell1 = newRow.insertCell(1);
    cell1.innerHTML = "<b>USERNAME</b>";
    const cell2 = newRow.insertCell(2);
    cell2.innerHTML = "<b>EMAIL</b>";
    const cell3 = newRow.insertCell(3);
    cell3.innerHTML = "<b>LOCATION</b>";
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Admin />);
export default Admin;