import "./admin.css";

//import React from 'react';
import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { render } from "@testing-library/react";
import Modal from "../components/modal";
import userStuff from "../components/modal";


let test = [];
let test1 = [];
let emails = '';
//Dynamic names that will be exported to modal for return
let nameM = '';
let roleM = '';
let initialRole = '';

function Admin() {
  const [shopsData, setShopsData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the "shops" collection
        const shopsQuerySnapshot = await getDocs(collection(db, "shops"));
        const shopsData = [];
        shopsQuerySnapshot.forEach((doc) => {
          const { name, email, location, contact, owner_name } = doc.data();
          shopsData.push({ name, email, location, contact, owner_name });
        });
        setShopsData(shopsData);
        test = shopsData;
        // Fetch data from the "users" collection
        const usersQuerySnapshot = await getDocs(collection(db, "users"));
        const usersData = [];
        usersQuerySnapshot.forEach((doc) => {
          const { email, name, roles, surname, user_id, username, verified } =
            doc.data();
          usersData.push({
            email,
            name,
            roles,
            surname,
            user_id,
            username,
            verified,
          });
        });
        setUsersData(usersData);
        test1 = usersData;
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    };

    fetchData();
  }, []);

  const [openModal, setOpenModal] = useState(false);

  function dashboard() {
    //---------------------------------------------------------------------------------------------------------------

    //---------------------------------------------------------------------------------------------------------------

    const table = document.getElementById("adminTable");
    const rowCount = table.rows.length;
    //table.deleteRow(0);

    if (rowCount != 0) {
      for (let k = 0; k < rowCount; k++) {
        table.deleteRow(0);
      }
    }

    const count = test.length + test1.length;
    const newRow = table.insertRow(0);
    const cell = newRow.insertCell(0);
    cell.innerHTML = "<b>BUYER OR SELLER</b>";
    const cell1 = newRow.insertCell(1);
    cell1.innerHTML = "<b>USERNAME/PERSON IN CHARGE</b>";
    const cell2 = newRow.insertCell(2);
    cell2.innerHTML = "<b>EMAIL</b>";
    const cell3 = newRow.insertCell(3);
    cell3.innerHTML = "<b>LOCATION</b>";
    const cell4 = newRow.insertCell(4);
    cell4.innerHTML = " ";

    //Adding users to admin page
    for (let i = 0; i < test.length; i++) {
      //Adds new rows
      const row = table.insertRow(-1);
      //cell4.innerHTML = " ";
      for (let j = 0; j < 5; j++) {
        //Adds new cells
        const cell = row.insertCell(j);

        if (j == 0) {
          cell.textContent = test[i].name;
        }

        if (j == 1) {
          cell.textContent = test[i].owner_name;
        }

        if (j == 2) {
          cell.textContent = test[i].email;
        }

        if (j == 3) {
          cell.textContent = test[i].location;
        }

        if (j == 4) {
          const btn = document.createElement("button");
          btn.innerHTML = "More";
          btn.addEventListener("click", () => {
            setOpenModal(true);
            emails = test[i].email;
            nameM = test[i].name;
            initialRole = test[i].roles;
            let userDet = test1.find(item => item.email === test[i].email);
            if (userDet.roles.admin == 1){
              roleM = "Admin";
              if (userDet.roles.buyer == 1){
                roleM = "Admin, Buyer";
              }

              if (userDet.roles.seller == 1){
                roleM = "Admin, Seller";
              }

              if (userDet.roles.seller == 1 && userDet.roles.buyer == 1){
                roleM = "Admin, Seller, Buyer";
              }

            }

            if (userDet.roles.buyer == 1){
              roleM = "Buyer";
              if (userDet.roles.admin == 1){
                roleM = "Admin, Buyer";
              }

              if (userDet.roles.seller == 1){
                roleM = "Admin, Seller";
              }

              if (userDet.roles.seller == 1 && userDet.roles.admin == 1){
                roleM = "Admin, Seller, Buyer";
              }
            }

            if (userDet.roles.seller == 1){
              roleM = "Seller";
              if (userDet.roles.buyer == 1){
                roleM = "Admin, Buyer";
              }

              if (userDet.roles.admin == 1){
                roleM = "Admin, Seller";
              }

              if (userDet.roles.admin == 1 && userDet.roles.buyer == 1){
                roleM = "Admin, Seller, Buyer";
              }
            }
            
          });
          row.appendChild(btn);
        }
      }
    }
    

    for (let k = 0; k < test1.length; k++) {
      //Adds new rows
      const row = table.insertRow(-1);
      //cell4.innerHTML = " ";
      for (let l = 0; l < 5; l++) {
        //Adds new cells
        const cell = row.insertCell(l);

        if (l == 0) {
          cell.textContent = test1[k].name;
        }

        if (l == 1) {
          cell.textContent = test1[k].username;
        }

        if (l == 2) {
          cell.textContent = test1[k].email;
        }

        if (l == 3) {
          cell.textContent = test1[k].surname;
        }

        if (l == 4) {
          const btn = document.createElement("button");
          btn.innerHTML = "More";
          btn.addEventListener("click", () => {
            setOpenModal(true);
            emails = test1[k].email;
            nameM = test1[k].name;
            initialRole = test1[k].roles;
            if (test1[k].roles.admin == 1){
              roleM = "Admin";
            }

            if (test1[k].roles.admin == 1){
              roleM = "Admin";
              if (test1[k].roles.buyer == 1){
                roleM = "Admin, Buyer";
              }

              if (test1[k].roles.seller == 1){
                roleM = "Admin, Seller";
              }

              if (test1[k].roles.seller == 1 && test1[k].roles.buyer == 1){
                roleM = "Admin, Seller, Buyer";
              }

            }

            if (test1[k].roles.buyer == 1){
              roleM = "Buyer";
              if (test1[k].roles.admin == 1){
                roleM = "Admin, Buyer";
              }

              if (test1[k].roles.seller == 1){
                roleM = "Admin, Seller";
              }

              if (test1[k].roles.seller == 1 && test1[k].roles.admin == 1){
                roleM = "Admin, Seller, Buyer";
              }
            }

            if (test1[k].roles.seller == 1){
              roleM = "Seller";
              if (test1[k].roles.buyer == 1){
                roleM = "Admin, Buyer";
              }

              if (test1[k].roles.admin == 1){
                roleM = "Admin, Seller";
              }

              if (test1[k].roles.admin == 1 && test1[k].roles.buyer == 1){
                roleM = "Admin, Seller, Buyer";
              }
            }
          });
          row.appendChild(btn);
        }
      }
    }
  }

  function buyers() {
    const table = document.getElementById("adminTable");
    const rowCount = table.rows.length;
    //table.deleteRow(0);

    if (rowCount != 0) {
      for (let k = 0; k < rowCount; k++) {
        table.deleteRow(0);
      }
    }

    console.log(test);
    const newRow = table.insertRow(0);
    const cell = newRow.insertCell(0);
    cell.innerHTML = "<b>BUYER OR SELLER</b>";
    const cell1 = newRow.insertCell(1);
    cell1.innerHTML = "<b>USERNAME/PERSON IN CHARGE</b>";
    const cell2 = newRow.insertCell(2);
    cell2.innerHTML = "<b>EMAIL</b>";
    const cell3 = newRow.insertCell(3);
    cell3.innerHTML = "<b>SURNAME</b>";
    const cell4 = newRow.insertCell(4);
    cell4.innerHTML = "    ";

    //Adding users to admin page
    for (let i = 0; i < test1.length; i++) {
      //Adds new rows
      const row = table.insertRow(-1);
      //cell4.innerHTML = " ";
      for (let j = 0; j < 5; j++) {
        //Adds new cells
        const cell = row.insertCell(j);

        if (j == 0) {
          cell.textContent = test1[i].name;
        }

        if (j == 1) {
          cell.textContent = test1[i].username;
        }

        if (j == 2) {
          cell.textContent = test1[i].email;
        }

        if (j == 3) {
          cell.textContent = test1[i].surname;
        }

        if (j == 4) {
          const btn = document.createElement("button");
          btn.innerHTML = "More";
          btn.addEventListener("click", () => {
            setOpenModal(true);
            emails = test1[i].email;
            nameM = test1[i].name;
            initialRole = test1[i].roles;
            let userDet = test1.find(item => item.name === test1[i].name);
            //console.log(userDet);
            if (userDet.roles.admin == 1){
              roleM = "Admin";
              if (userDet.roles.buyer == 1){
                roleM = "Admin, Buyer";
              }

              if (userDet.roles.seller == 1){
                roleM = "Admin, Seller";
              }

              if (userDet.roles.seller == 1 && userDet.roles.buyer == 1){
                roleM = "Admin, Seller, Buyer";
              }

            }

            if (userDet.roles.buyer == 1){
              roleM = "Buyer";
              if (userDet.roles.admin == 1){
                roleM = "Admin, Buyer";
              }

              if (userDet.roles.seller == 1){
                roleM = "Admin, Seller";
              }

              if (userDet.roles.seller == 1 && userDet.roles.admin == 1){
                roleM = "Admin, Seller, Buyer";
              }
            }

            if (userDet.roles.seller == 1){
              roleM = "Seller";
              if (userDet.roles.buyer == 1){
                roleM = "Admin, Buyer";
              }

              if (userDet.roles.admin == 1){
                roleM = "Admin, Seller";
              }

              if (userDet.roles.admin == 1 && userDet.roles.buyer == 1){
                roleM = "Admin, Seller, Buyer";
              }
            }
          });
          row.appendChild(btn);
        }
      }
    }
  }

  function owners() {
    //---------------------------------------------------------------------------------------------------------------

    //---------------------------------------------------------------------------------------------------------------

    const table = document.getElementById("adminTable");
    const rowCount = table.rows.length;
    //table.deleteRow(0);

    if (rowCount != 0) {
      for (let k = 0; k < rowCount; k++) {
        table.deleteRow(0);
      }
    }

    
    const newRow = table.insertRow(0);
    const cell = newRow.insertCell(0);
    cell.innerHTML = "<b>BUYER OR SELLER</b>";
    const cell1 = newRow.insertCell(1);
    cell1.innerHTML = "<b>USERNAME/PERSON IN CHARGE</b>";
    const cell2 = newRow.insertCell(2);
    cell2.innerHTML = "<b>EMAIL</b>";
    const cell3 = newRow.insertCell(3);
    cell3.innerHTML = "<b>LOCATION</b>";
    const cell4 = newRow.insertCell(4);
    cell4.innerHTML = " ";

    //Adding users to admin page
    for (let i = 0; i < test.length; i++) {
      //Adds new rows
      const row = table.insertRow(-1);
      //cell4.innerHTML = " ";
      for (let j = 0; j < 5; j++) {
        //Adds new cells
        const cell = row.insertCell(j);

        if (j == 0) {
          cell.textContent = test[i].name;
        }

        if (j == 1) {
          cell.textContent = test[i].owner_name;
        }

        if (j == 2) {
          cell.textContent = test[i].email;
        }

        if (j == 3) {
          cell.textContent = test[i].location;
        }

        if (j == 4) {
          const btn = document.createElement("button");
          btn.innerHTML = "More";
          btn.addEventListener("click", () => {
            setOpenModal(true);
            emails = test[i].email;
            nameM = test[i].owner_name;
            initialRole = test[i].roles;
            let userDet = test1.find(item => item.email === test[i].email);
            //console.log(userDet);
            if (userDet.roles.admin == 1){
              roleM = "Admin";
              if (userDet.roles.buyer == 1){
                roleM = "Admin, Buyer";
              }

              if (userDet.roles.seller == 1){
                roleM = "Admin, Seller";
              }

              if (userDet.roles.seller == 1 && userDet.roles.buyer == 1){
                roleM = "Admin, Seller, Buyer";
              }

            }

            if (userDet.roles.buyer == 1){
              roleM = "Buyer";
              if (userDet.roles.admin == 1){
                roleM = "Admin, Buyer";
              }

              if (userDet.roles.seller == 1){
                roleM = "Admin, Seller";
              }

              if (userDet.roles.seller == 1 && userDet.roles.admin == 1){
                roleM = "Admin, Seller, Buyer";
              }
            }

            if (userDet.roles.seller == 1){
              roleM = "Seller";
              if (userDet.roles.buyer == 1){
                roleM = "Admin, Buyer";
              }

              if (userDet.roles.admin == 1){
                roleM = "Admin, Seller";
              }

              if (userDet.roles.admin == 1 && userDet.roles.buyer == 1){
                roleM = "Admin, Seller, Buyer";
              }
            }
          });
          row.appendChild(btn);
        }
      }
    }
  }

  return (
    <body>
      <header>
        <a href="/">
          <img alt="" src={require("../assets/Malume'zLogoFull.png")} />
        </a>
      </header>
      {openModal && <Modal closeModal={setOpenModal} email={emails} name={nameM} role={roleM} initialRole={initialRole}/>}
      <section class="main-content">
        <nav>
          <button class="button" id="dashboardBtn" onClick={dashboard}>
            Dashboard
          </button>
          {/* Toggle the visibility of Owners component when button is clicked */}
          <button class="button" id="OwnersBtn" onClick={owners}>
            Store Owners
          </button>
          <button class="button" id="Buyers" onClick={buyers}>
            Buyers
          </button>
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
      </section>
    </body>
  );
}


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

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Admin />);
export default Admin;
