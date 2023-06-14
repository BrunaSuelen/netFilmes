import React, { useEffect, useState } from "react";
import SerieForm from "../../forms/SerieForm";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Notification from "../../components/Notification";

const EditSerie = () => {
    const { id } = useParams();
    const [serie, setSerie] = useState({});
    const [alert, setAlert] = useState({'show': false, 'message':'', 'variant':''});

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null) {
            navigate("/");
        }

        const user = JSON.parse(localStorage.getItem('user'));
        api.get(`/serie/${id}`, { params: { 'idUser': user?.id } })
            .then((response) => response.data)
            .then((data) => { setSerie(data?.content) })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [id])



    function handleSubmit(event, formData) {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const body = { ...formData, 'userId': user.id };

        api.put(`/serie/${id}`, body)
            .then((response) => {
                const { data } = response;
                setAlert({'show': true, 'message': data?.message , 'variant': data?.updated ? 'success': 'danger'})
            })
            .catch((err) => {
                const message = err?.response?.data?.message;
                setAlert({'show': true, 'message': message, 'variant': 'danger'})
            });
    }

    return (
        <>
            <div className="mb-4 d-flex justify-content-between position-relative">
                {alert.show && <Notification props={{alert, setAlert}}/> }  
                <h1 className="h2" id="title-page">Editar Série</h1>
            </div>
            <SerieForm props={{ serie, handleSubmit }} />
        </>
    )
}

export default EditSerie;