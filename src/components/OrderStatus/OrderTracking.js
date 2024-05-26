import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from '../../App'; // Ensure this context provides the logged-in user's information
import { db } from "../../firebase"; // Assuming firebase is properly configured and exported
import { getDocs, query, collection, where } from "firebase/firestore";
import "./OrderTracking.css";
import "../../pages/Dashboard.css";
import "../../pages/home.css";
import MapComponent from './mapComponent';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


export function OrderTracking() {
    const user = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [shops, setShops] = useState({});

    useEffect(() => {
        if (user) {
            fetchOrders();
            fetchShops();
        }
    }
    // eslint-disable-next-line
    , 
    // eslint-disable-next-line
    [user]);

    const fetchOrders = async () => {
        try {
            const ordersQuerySnapshot = await getDocs(
                query(
                    collection(db, "orders"),
                    where("userID", "==", user.uid)
                )
            );

            const ordersData = ordersQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(ordersData);
            console.log("Orders fetched: ", ordersData);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
    };

    const fetchShops = async () => {
        try {
            const shopsQuerySnapshot = await getDocs(collection(db, "shops"));

            const shopsData = shopsQuerySnapshot.docs.reduce((acc, doc) => {
                acc[doc.id] = doc.data();
                return acc;
            }, {});
            setShops(shopsData);
            console.log("Shops fetched: ", shopsData);
        } catch (error) {
            console.error("Error fetching shops: ", error);
        }
    };

      
    const origin = [51.505, -0.09]; // Replace with the coordinates of the origin
    const destination = [51.515, -0.1]; // Replace with the coordinates of the destination

    const [userLocation, setUserLocation] = useState(null);
    const [destination1, setDestination] = useState(null);
    const mapRef = useRef();


    useEffect(() => {
        // Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      }, (error) => {
        console.error('Error getting user location:', error);
      });
      
        const fetchCoordinates = async () => {
          //const originAddress = '1600 Amphitheatre Parkway, Mountain View, CA';
          let destinationAddress = '46 Biccard St, Braamfontein, Johannesburg, 2000, South Africa';
            const destinationCoords = await getCoordinates(destinationAddress);
            
          if (destinationCoords) {
            setDestination([destinationCoords.lat, destinationCoords.lon]);
          }
        

          orders.map(order => (order.items.map(item => {
            const shop = shops[item.shop_id];
            if (shop.location != undefined){
                destinationAddress = shop.location;
                console.log(shop.location+" "+"HELLO");
            }
            
            })
        ));

        
          //const originCoords = await getCoordinates(originAddress);
          //const destinationCoords = await getCoordinates(destinationAddress);
    
          //console.log("HERE IT ISSSSSS"+" "+destinationCoords.lat);
          if (destinationCoords) {
            //setOrigin([originCoords.lat, originCoords.lon]);
            setDestination([destinationCoords.lat, destinationCoords.lon]);
            
          }
        };
    
        
        fetchCoordinates();
      }, []);

      
      

      useEffect(() => {
        console.log('Origin:', userLocation);
        console.log('Destination:', destination1);
      }, [userLocation, destination1]);

    return (
        <article className="OrderTrackingArticle">
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.id} className="orderBlock DashboardArticles" onClick={() => console.log("Order clicked:", order.id)}>
                        <div className="orderHeader">
                            <h3>Order ID: {order.id}</h3>
                            <p>Total Price: R{order.total}</p>
                            <p>Status: {order.status}</p>
                        </div>
                        <ul className="orderItemsList">
                            {order.items.map(item => {
                                const shop = shops[item.shop_id];
                                return (
                                    <li key={item.id} className="orderItem">
                                        <div className="orderItemDetails">
                                            <p>{item.name} - R{item.price} - {item.status}</p>
                                            {shop && (
                                                <>
                                                    <p>Shop Name: {shop.name}</p>
                                                    <p>Location: {shop.location}</p>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                             <section id="map">{userLocation && destination1 ? (
          <MapComponent origin={userLocation} destination={destination1} />
        ) : (
          <p>Loading coordinates...</p>
        )}
                             </section>
                        </ul>
                    </div>
                ))
            ) : (
                <p>No orders found</p>
            )}
        </article>
    );

    async function getCoordinates(address) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        console.log(address+" "+"ncdjnjn");
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          if (data.length === 0) throw new Error('No results found');
      
          const { lat, lon } = data[0];
          return { lat: parseFloat(lat), lon: parseFloat(lon) };
          
        } catch (error) {
          console.error('Error fetching coordinates:', error);
          return null;
        }
        
      }
}
