import React, { useEffect, useState } from "react";
import SerieForm from "../../forms/SerieForm";
import { useNavigate, useParams } from "react-router-dom";
import { seriesMockdata } from "../../services/mockdata";

const EditSerie = () => {
    const { id } = useParams();
    const [serie, setSerie] = useState({});

    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token === null){
            navigate("/");
        }
    },[])

    useEffect(() => {
        
       const serieMockdata =  JSON.parse(seriesMockdata)[id];
       setSerie(serieMockdata);
    }, [id])

    function handleSubmit(event) {
        event.preventDefault();
        console.log('foi___editar');
    }

    return (
        <>
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2" id="title-page">Editar Série</h1>
            </div>
            <SerieForm props={{ serie, handleSubmit }} />
        </>
    )
}

export default EditSerie;