import React, { useEffect, useState } from "react";

import api from '../../services/api';
import SteamingForm from "../../forms/StreamingForm";

import './AddStreaming.css';
import { useNavigate } from "react-router-dom";

const AddStreaming = () => {
    const navigate = useNavigate();
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token === null){
            navigate("/");
        }
    },[])

    const [message, setMessage] = useState('');
    const [displayMessage, setDisplayMessage] = useState(false);
    

    function handleSubmit(event, formData) {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));

        const body = {...formData, 'userId': user.id} ;

        api.post("/streaming", body)
        .then((response) => {
            const {data} = response;
            setDisplayMessage(data?.created);
            setMessage(data?.message);
        })
        .catch((err) => {
            const message = err?.response?.data?.message;
            console.log(message);
        });
    }


    return (
        <>  
            {/*Implementar o alerta*/}
            {displayMessage && <div>{message}</div> }
            
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2" id="title-page">Cadastrar Streaming</h1>
            </div>
            <SteamingForm props={{ handleSubmit }} />

        </>
    )
}

export default AddStreaming;