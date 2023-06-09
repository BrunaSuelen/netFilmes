import React, { useEffect } from "react";
import Alert  from 'react-bootstrap/Alert';

import './Notification.css';

const Notification = ({props}) => {

    const {alert, setAlert} = props;

    useEffect(() => {
        if(alert.show){
            const timer = setTimeout(() => setAlert({'show': false, 'message': '', 'variant': ''}), 4 * 1000);
            
            return () => {
                clearTimeout(timer);
            };
        }  
    },[alert.show]);
    
    
    if(alert.show){
        return (
            <Alert  id="notification" variant={alert.variant} >
                <p>{alert.message}</p>
            </Alert>
        );
    }
}

export default Notification;