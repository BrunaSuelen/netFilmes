import React, { useEffect } from "react";

import api from '../../services/api';

const Home = () => {

    useEffect(()=>{
        // api.get("/series")
        // .then((response) => response.json)
        // .then((data) => console.log(data))
        // .catch((err) => {
        //   console.error("ops! ocorreu um erro" + err);
        // });
        console.log('Lista de Séries');
    },[]);
    return (
        <h2>Home</h2>
    )
}

export default Home;