import React from "react";
import SerieForm from "../../form/SerieForm/SerieForm";

const EditSerie = () => {
    const serie = {
        name: 'Vikings',
        image: 'images/serie.png',
        streaming: 'netflix',
        category: 'assistido',
        comments: 'aaaa',
    }

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