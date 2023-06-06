import React, { useEffect, useState } from "react";
import SerieForm from "../../forms/SerieForm";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EditSerie = () => {
    const { id } = useParams();
    const [serie, setSerie] = useState({});

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [displayMessage, setDisplayMessage] = useState(false);


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
            {displayMessage && <div>{message}</div>}
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2" id="title-page">Editar Série</h1>
            </div>
            <SerieForm props={{ serie, handleSubmit }} />
        </>
    )
}

export default EditSerie;