import React, { useEffect, useState } from "react";
import SteamingForm from "../../forms/StreamingForm";
import { useParams } from "react-router-dom";
import { streamingsMockdata } from "../../services/mockdata";
import api from "../../services/api";


const EditStreaming = () => {
    const { id } = useParams();

    const [streaming, setStreaming] = useState({});

    useEffect(() => {
        const streamingMockdata =  JSON.parse(streamingsMockdata)[id];
        setStreaming(streamingMockdata);
     }, [id])

     
    function handleSubmit(event) {
        event.preventDefault();
        console.log('streaming___edit');
    }


    return (
        <>
            <div className="mb-4 d-flex justify-content-between ">
                <h1 className="h2" id="title-page">Editar Streaming</h1>
            </div>
            <SteamingForm props={{ streaming, handleSubmit }} />
        </>
    )
}

export default EditStreaming;