import React, { useEffect, useState } from "react";
import SerieForm from "../../forms/SerieForm";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';


const AddSerie = () => {
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

        api.post("/serie", body)
        .then((response) => {
            const {data} = response;
            console.log(data);
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
                <h1 className="h2" id="title-page">Cadastrar Série</h1>
            </div>
            <SerieForm props={{ handleSubmit }} />
        </>
    )
}

export default AddSerie;