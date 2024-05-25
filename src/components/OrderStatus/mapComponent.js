// src/MapComponent.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


const MapComponent = ({ origin, destination }) => {
  useEffect(() => {
    console.log('Rendering MapComponent with origin and destination:', origin, destination);
  }, [origin, destination]);

  return (
    <MapContainer center={origin} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={origin}>
        <Popup>Origin</Popup>
      </Marker>
      <Marker position={destination}>
        <Popup>Destination</Popup>
      </Marker>
      <Routing origin={origin} destination={destination} />
    </MapContainer>
  );
};

const Routing = ({ origin, destination }) => {
  const map = useMap();

  useEffect(() => {
    console.log('Adding routing control to the map');
    if (!map || !origin || !destination) return;

    let routingControl = L.Routing.control({
      waypoints: [
        L.latLng(origin[0], origin[1]),
        L.latLng(destination[0], destination[1])
      ],
      routeWhileDragging: true
    }).addTo(map);

    
  }, [map, origin, destination]);

  return null;
};

export default MapComponent;


