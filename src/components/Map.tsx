import React, { useEffect } from "react";
import L from 'leaflet';

interface MapProps {
    latitude: number;
    longitude: number;
}
const Map: React.FC<MapProps> = ({latitude, longitude}) => {
    useEffect(() => {
        // initialize map
        const map = L.map('map').setView([latitude, longitude], 13);

        // add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // add a marker to the map
        L.marker([latitude, longitude]).addTo(map);
    }, [latitude, longitude]);


    return (
        <div id='map'>
            <h3>Map</h3>
        </div>
    );
}

export default Map;