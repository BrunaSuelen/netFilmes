import React, { useEffect, useState } from "react";
import SteamingForm from "../../forms/StreamingForm";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";


const EditStreaming = () => {
    const { id } = useParams();
    const [streaming, setStreaming] = useState({});

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [displayMessage, setDisplayMessage] = useState(false);

    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token === null){
            navigate("/");
        }
        
        const user = JSON.parse(localStorage.getItem('user'));
        api.get(`/streaming/${id}`, { params: { 'idUser': user?.id} })
        .then((response) => response.data)
        .then((data) => setStreaming(data?.content))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    },[id])

     
    function handleSubmit(event, formData) {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const body = {...formData, 'userId': user.id} ;

        api.put(`/streaming/${id}`, body)
        .then((response) => {
            const {data} = response;
            setDisplayMessage(data?.updated);
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
                <h1 className="h2" id="title-page">Editar Streaming</h1>
            </div>
            <SteamingForm props={{ streaming, handleSubmit }} />
        </>
    )
}

export default EditStreaming;