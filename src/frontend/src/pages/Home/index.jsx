import React, { useEffect, useState } from "react";

import api from '../../services/api';
import {seriesMockdata} from '../../services/mockdata';
import CardList from "../../components/CardsList";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [series, setSeries] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token === null){
            navigate("/");
        }

        const user = JSON.parse(localStorage.getItem('user'));

        api.get("/serie", { params: { 'idUser': user?.id} })
        .then((response) =>response.data)
        .then((data) => setSeries(data?.content))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);


    if(!series) return ;
    return (
        <>
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2"> Séries Cadastradas </h1>
                <Link to="/serie/adicionar" className="btn btn-dark btn-add">
                    <i className="bi bi-plus-lg"> <span>Adicionar</span></i>
                </Link>
            </div>

            {series && <CardList props={{'items':series, 'editUrl': '/serie/editar'}} />}
        </>
    )
}

export default Home;