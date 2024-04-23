import './admin.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

function Admin(){
    return(<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Document</title>
        <link rel="stylesheet" href="admin.css"/>
    </head>
    <body>
        <header><img alt="" src="Malume'zLogoFull copy.png"/></header>
        
        <section class="main-content">
            <nav>
                <button class="button" id="dashboardBtn">Dashboard</button>
                <button id="OwnersBtn">Store Owners</button>
                <button id="Buyers">Buyers</button>
            </nav>
    
            <section class="main-idea">
                <table>
                    <tr>
                        <th>COMPANY NAME</th>
                        <th>PERSON IN CHARGE</th>
                        <th>LOCATION</th>
                        <th>CONTACT NUMBER</th>
                        <th>EMAIL</th>
                    </tr>
                </table>
            </section>
            
            
        </section>
    </body>
    </html>
    );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Admin />);
export default Admin;