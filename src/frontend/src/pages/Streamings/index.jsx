import React, { useEffect, useState } from "react";
import api from '../../services/api';
import CardList from "../../components/CardsList";
import { Link, useNavigate } from "react-router-dom";

import './Streamings.css'

const Streamings = () => {

    const [streamings, setStreamings] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {

        const token = localStorage.getItem('token');
        if(token === null){
            navigate("/");
        }

        const user = JSON.parse(localStorage.getItem('user'));
        
        api.get("/streaming", { params: { 'idUser': user?.id} })
        .then((response) =>response.data)
        .then((data) => setStreamings(data?.content))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);
    
    return (
        <>
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2"> Stremings Cadastrados </h1>
                <Link to="/streaming/adicionar" className="btn btn-dark btn-add">
                    <i className="bi bi-plus-lg"> <span>Adicionar</span></i>
                </Link>
            </div>

            {streamings && <CardList props={{'items': streamings, 'editUrl': '/streaming/editar', 'type':'streaming'}} />}
        </>
    )
}

export default Streamings;