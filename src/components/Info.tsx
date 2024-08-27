import React from "react";
import { useState, useEffect } from "react";
import Map from "./Map";
import '../sass/info.sass';

const Info: React.FC = () => {
    const [info, setInfo] = useState<IpInfo | null>(null);
    const [ip, setIp] = useState('');

    // interface for the IP info
    interface IpInfo {
        country_name: string,
        city: string,
        latitude: number,
        longitude: number,
        org: string
    }
    
    // type guard for the IP info
    const isIpInfo = (data: any): data is IpInfo => {
        return data &&
            typeof data.city === 'string' &&
            typeof data.latitude === 'number' &&
            typeof data.longitude === 'number' &&
            typeof data.country_name === 'string';
    }

    // fetch
    const getIpInfo = async (): Promise<void> => {
        /*if (!ip) {
            alert('Please enter an IP address');
            return;
        }*/
        try {
            const response = await fetch(`https://ipapi.co/${ip}/json/`);
            if (response.ok) {
                console.log('Response OK');
            }
            const data = await response.json();
            // console.log(data);
            if (isIpInfo(data)) {
                setInfo(data);
                }
            } catch (error) {
                console.log('Error:', error);
            }
    }
    console.log(info);
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
                    <p><b>Approximate location: </b><u>{info?.city}, {info?.country_name}</u></p>
                    <p><b>ISP: </b><u>{info?.org}</u></p>
                    <p><b>Latitude: </b><u>{info?.latitude}</u> <b>Longitude: </b><u>{info?.longitude}</u></p>
                </>)}
            </div>
            <div id="output2">
                <Map latitude={info?.latitude || 0} longitude={info?.longitude || 0} />
            </div>
        </div>
    );
}

export default Info;