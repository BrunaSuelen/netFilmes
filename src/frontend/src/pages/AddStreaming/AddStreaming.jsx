import React from "react";
import SteamingForm from "../../form/StreamingForm/SteamingForm";

import './AddStreaming.css';

const AddStreaming = () => {

    function handleSubmit(event) {
        event.preventDefault();
        console.log('streaming___add');
    }


    return (
        <>
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2" id="title-page">Cadastrar Streaming</h1>
            </div>
            <SteamingForm props={{ handleSubmit }} />
        </>
    )
}

export default AddStreaming;