import React from "react";

interface MapProps {
    latitude: number;
    longitude: number;
}
const Map: React.FC<MapProps> = ({latitude, longitude}) => {
    return (
        <div id='map'>
            <h3>Map</h3>
        </div>
    );
}

export default Map;