import React, { useEffect } from "react";
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
    

    function handleSubmit(event, formData) {
        event.preventDefault();

        console.log(formData);
    }


    return (
        <>
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2" id="title-page">Cadastrar Streaming</h1>
            </div>
            <SteamingForm props={{ handleSubmit }} />
        </>
    )
}

export default AddStreaming;