import React, { useEffect } from "react";
import SerieForm from "../../forms/SerieForm";
import { useNavigate } from "react-router-dom";


const AddSerie = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token === null){
            navigate("/");
        }
    },[])
    

    function handleSubmit(event) {
        event.preventDefault();
        console.log('foi___add');
    }


    return (
        <>
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2" id="title-page">Cadastrar Série</h1>
            </div>
            <SerieForm props={{ handleSubmit }} />
        </>
    )
}

export default AddSerie;