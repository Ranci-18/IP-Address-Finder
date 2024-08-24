import React from "react";
import { useState, useEffect } from "react";

const Info: React.FC = () => {
    const [info, setInfo] = useState<IpInfo | null>(null);
    const [ip, setIp] = useState('');

    useEffect(() => {
        console.log(info);
    }, [info]);

    interface IpInfo {
        query: string,
        country: string,
        city: string,
        lat: number,
        lon: number,
        isp: string
    }
    
    const isIpInfo = (data: any): data is IpInfo => {
        return data &&
            typeof data.query === 'string' &&
            typeof data.city === 'string' &&
            typeof data.lat === 'number' &&
            typeof data.lon === 'number' &&
            typeof data.country === 'string';
    }

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
            
            console.log(data.city, data.country_name, data.location.country_flag_emoji);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div id='info'>
            <div id="input">
                <input 
                    type="text" 
                    placeholder="Enter IP addr"
                    value={ip}
                    onChange={(e) => {
                        setIp(e.target.value)
                        }} 
                    />
                <input type="button" onClick={getIpInfo} value="Get Location" />
            </div>
            <div id="output">
                <h3>Your IP's location</h3>
                <h4>Approximate location</h4>
                <p>{info?.city} {info?.country}</p>
                <p>Internet Service Provider</p>
                <p><b>{info?.lat},{info?.lon}{info?.isp}</b></p>
            </div>
        </div>
    );
}

export default Info;