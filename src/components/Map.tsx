import React, { useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../sass/map.sass';

interface MapProps {
    latitude: number;
    longitude: number;
}
const Map: React.FC<MapProps> = ({latitude, longitude}) => {
    if (latitude === 0 && longitude === 0) {
        latitude = 51.505;
        longitude = -0.09;
        useEffect(() => {
            // initialize map
            const map = L.map('map').setView([latitude, longitude], 13);
    
            // add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
    
            // custom icon
            const customIcon = L.icon({
                iconUrl: 'https://img.icons8.com/ios/50/000000/marker.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -100],
            });
        
            // add a marker to the map
            L.marker([latitude, longitude], {icon: customIcon})
                .addTo(map)
                .bindPopup('Default Location')
                .openPopup();
    
            // perform map cleanup
            return () => {
                map.remove();
            }
        }, [latitude, longitude]);
    } else {
        useEffect(() => {
            // initialize map
            const map = L.map('map').setView([latitude, longitude], 13);
    
            // add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
    
            // custom icon
            const customIcon = L.icon({
                iconUrl: 'https://img.icons8.com/ios/50/000000/marker.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -100],
            });
        
            // add a marker to the map
            L.marker([latitude, longitude], {icon: customIcon})
                .addTo(map)
                .bindPopup('IP Location')
                .openPopup();
    
            // perform map cleanup
            return () => {
                map.remove();
            }
        }, [latitude, longitude]);
    }

    return (
        <div id='map'>
            <h3>Map</h3>
        </div>
    );
}

export default Map;