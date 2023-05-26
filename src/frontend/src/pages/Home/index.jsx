import React, { useEffect, useState } from "react";

import api from '../../services/api';
import {seriesMockdata} from '../../services/mockdata';
import CardList from "../../components/CardsList";
import { Link } from "react-router-dom";

const Home = () => {
    const [series, setSeries] = useState([]);
    useEffect(() => {
        // api.get("/series")
        // .then((response) => response.json)
        // .then((data) => console.log(data))
        // .catch((err) => {
        //   console.error("ops! ocorreu um erro" + err);
        // });
        setSeries(JSON.parse(seriesMockdata));
    }, []);

    return (
        <>
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2"> Séries Cadastradas </h1>
                <Link to="/serie/adicionar" className="btn btn-dark btn-add">
                    <i className="bi bi-plus-lg"> <span>Adicionar</span></i>
                </Link>
            </div>

            {series && <CardList props={{series}} />}
        </>
    )
}

export default Home;