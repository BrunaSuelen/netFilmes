import React, { useEffect, useState } from "react";
import SerieForm from "../../forms/SerieForm";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import Notification from "../../components/Notification";


const AddSerie = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token === null){
            navigate("/");
        }
    },[])
    
    const [alert, setAlert] = useState({'show': false, 'message':'', 'variant':''});

    function handleSubmit(event, formData) {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));

        //Deixar o nome maiúsculo para ser único
        const body = {...formData, 'userId': user.id} ;
        body.name = formData.name.toUpperCase();

        api.post("/serie", body)
        .then((response) => {
            const {data} = response;
            setAlert({'show': true, 'message': data?.message , 'variant': data?.created ? 'success': 'danger'})
        })
        .catch((err) => {
            const message = err?.response?.data?.message;
            setAlert({'show': true, 'message': message, 'variant': 'danger'})
            console.log(message);
        });
    }


    return (
        <>
            <div className="mb-4 d-flex justify-content-between position-relative">
                {alert.show && <Notification props={{alert, setAlert}}/> }
                <h1 className="h2" id="title-page">Cadastrar Série</h1>
            </div>
            <SerieForm props={{ handleSubmit }} />
        </>
    )
}

export default AddSerie;