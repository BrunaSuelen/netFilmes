import React from "react";
import SteamingForm from "../../form/StreamingForm/SteamingForm";


const EditStreaming = () => {

    function handleSubmit(event) {
        event.preventDefault();
        console.log('streaming___edit');
    }


    return (
        <>
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2" id="title-page">Editar Streaming</h1>
            </div>
            <SteamingForm props={{ handleSubmit }} />
        </>
    )
}

export default EditStreaming;