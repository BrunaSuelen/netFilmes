import React, { useEffect, useState } from "react";
import api from '../../services/api';
import {streamingsMockdata} from '../../services/mockdata';
import CardList from "../../components/CardsList";
import { Link } from "react-router-dom";

import './Streamings.css'

const Streamings = () => {

    const [streamings, setStreamings] = useState([]);
    
    useEffect(() => {
        // api.get("/series")
        // .then((response) => response.json)
        // .then((data) => console.log(data))
        // .catch((err) => {
        //   console.error("ops! ocorreu um erro" + err);
        // });
        setStreamings(JSON.parse(streamingsMockdata));
    }, []);

    return (
        <>
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2"> Stremings Cadastrados </h1>
                <Link to="/streaming/adicionar" className="btn btn-dark btn-add">
                    <i className="bi bi-plus-lg"> <span>Adicionar</span></i>
                </Link>
            </div>

            {streamings && <CardList props={{'items': streamings, 'editUrl': '/streaming/editar'}} />}
        </>
    )
}

export default Streamings;