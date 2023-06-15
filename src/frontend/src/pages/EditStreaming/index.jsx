import React, { useEffect, useState } from "react";
import SteamingForm from "../../forms/StreamingForm";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Notification from "../../components/Notification";


const EditStreaming = () => {
    const { id } = useParams();
    const [streaming, setStreaming] = useState({});

    const navigate = useNavigate();
    const [alert, setAlert] = useState({'show': false, 'message':'', 'variant':''});
    
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
          console.error(err);
        });
    },[id])

     
    function handleSubmit(event, formData) {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const body = {...formData, 'userId': user.id} ;

        api.put(`/streaming/${id}`, body)
        .then((response) => {
            const {data} = response;
            setAlert({'show': true, 'message': data?.message , 'variant': data?.updated ? 'success': 'danger'})
        })
        .catch((err) => {
            const message = err?.response?.data?.message;
            setAlert({'show': true, 'message': message, 'variant': 'danger'})
            console.log(message);
        });
    }


    return (
        <>
            <div className="mb-4 d-flex justify-content-between position-relative" >
                {alert.show && <Notification props={{alert, setAlert}}/> }
                <h1 className="h2" id="title-page">Editar Streaming</h1>
            </div>
            <SteamingForm props={{ streaming, handleSubmit }} />
        </>
    )
}

export default EditStreaming;