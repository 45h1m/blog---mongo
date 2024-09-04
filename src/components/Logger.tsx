"use client"
import axios from "axios";
import { useEffect } from "react";

const Logger = () => {


    const log = async () => {

        let pageURL = window.location.href;
        
        try {
            
            const response = await axios.post("/api/log", {pageURL});

            if(response.data.error) {
                console.log("Error Logging: "+ response.data.error);
            }
    
        } catch (error) {
            console.log("Error Logging: "+ error);
        }
    }

    useEffect(() => {
        log();
    },[]);

    return <div className="it-is-from-logger-component"></div>;
};

export default Logger;
