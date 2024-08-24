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
        timzone: string;
    }
    
    const isIpInfo = (data: any): data is IpInfo => {
        return data &&
            typeof data.ip === 'string' &&
            typeof data.city === 'string' &&
            typeof data.region === 'string' &&
            typeof data.country === 'string' &&
            typeof data.loc === 'string' &&
            typeof data.org === 'string' &&
            typeof data.timzone === 'string';
    }

    const getIpInfo = async (): Promise<void> => {
        try {
            const response = fetch(`https://ipinfo.io/{ip}?token=e423fdda4d7df5`);
            const data = (await response).json();
            if (isIpInfo(data)) {
                setCity(data?.city);
                setCountry(data?.country);
                setIsp(data?.org);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div id='info'>
            <p>Enter an IP address to get information about</p>
            <div id="input">
                <input 
                    type="text" 
                    placeholder="Enter IP addr" 
                    onChange={(e) => {
                        setIp(e.target.value)
                        }} 
                    />
                <input type="button" onClick={getIpInfo} />
            </div>
            <div id="output">
                <p>your IP is <b>{ip}</b></p>
                <p>Approximate location</p>
                <p><b>{city}, {country}</b></p>
                <p>Internet Service Provider</p>
                <p><b>{isp}</b></p>
            </div>
        </div>
    );
}

export default Info;