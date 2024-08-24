import React from "react";
import { useState } from "react";

const Info: React.FC = () => {
    const [ip, setIp] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [isp, setIsp] = useState<string>('');

    interface IpInfo {
        ip: string;
        city: string;
        region: string;
        country: string;
        loc: string;
        org: string;
        timezone: string;
    }
    
    const isIpInfo = (data: any): data is IpInfo => {
        return data &&
            typeof data.ip === 'string' &&
            typeof data.city === 'string' &&
            typeof data.region === 'string' &&
            typeof data.country === 'string' &&
            typeof data.loc === 'string' &&
            typeof data.org === 'string' &&
            typeof data.timezone === 'string';
    }

    const getIpInfo = async (): Promise<void> => {
        try {
            const response = await fetch(`https://ipinfo.io/${ip}?token=e423fdda4d7df5`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (isIpInfo(data)) {
                setCity(data.city);
                setCountry(data.country);
                setIsp(data.org);
            }
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
                    onChange={(e) => {
                        setIp(e.target.value)
                        }} 
                    />
                <input type="button" onClick={getIpInfo} value="Get Location" />
            </div>
            <div id="output">
                <u>Your IP's location and ISP</u>
                {   
                    city && country && 
                    <>
                        <p>Approximate location</p>
                        <p><b>{city}, {country}</b></p>
                    </>
                }
                {
                    isp && 
                    <>
                        <p>Internet Service Provider</p>
                        <p><b>{isp}</b></p>
                    </>
                }
            </div>
        </div>
    );
}

export default Info;