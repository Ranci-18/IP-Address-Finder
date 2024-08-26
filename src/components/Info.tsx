import React from "react";
import { useState, useEffect } from "react";
import Map from "./Map";
import '../sass/info.sass';

const Info: React.FC = () => {
    const [info, setInfo] = useState<IpInfo | null>(null);
    const [ip, setIp] = useState('');

    // interface for the IP info
    interface IpInfo {
        query: string,
        country: string,
        city: string,
        lat: number,
        lon: number,
        isp: string
    }
    
    // type guard for the IP info
    const isIpInfo = (data: any): data is IpInfo => {
        return data &&
            typeof data.query === 'string' &&
            typeof data.city === 'string' &&
            typeof data.lat === 'number' &&
            typeof data.lon === 'number' &&
            typeof data.country === 'string';
    }

    // fetch
    const getIpInfo = async (): Promise<void> => {
        try {
            const response = await fetch(`http://ip-api.com/json/${ip}`);
            if (response.ok) {
                console.log('Response OK');
            }
            const data = await response.json();
            console.log(data);
            if (isIpInfo(data)) {
                setInfo(data);
            }
            
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div id='info'>
            <div id="output1">
                <input 
                    type="text" 
                    placeholder="Enter IP addr"
                    value={ip}
                    onChange={(e) => {
                        setIp(e.target.value)
                        }} 
                    />
                <input type="button" onClick={getIpInfo} value="Geo Locate" />

                {info && 
                (<>
                    <h3><u>Your IP's location</u></h3>
                    <p><b>Approximate location: </b><u>{info?.city}, {info?.country}</u></p>
                    <p><b>ISP: </b><u>{info?.isp}</u></p>
                    <p><b>Latitude: </b><u>{info?.lat}</u> <b>Longitude: </b><u>{info?.lon}</u></p>
                </>)}
            </div>
            <div id="output2">
                <Map latitude={info?.lat || 0} longitude={info?.lon || 0} />
            </div>
        </div>
    );
}

export default Info;