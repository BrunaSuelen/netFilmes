import React, { useEffect } from "react";


const Streamings = () => {
    useEffect(()=>{
        // api.get("/streamings")
        // .then((response) => response.json)
        // .then((data) => console.log(data))
        // .catch((err) => {
        //   console.error("ops! ocorreu um erro" + err);
        // });
        console.log('Lista de Streamings');
    },[]);

    return (
        <h2>Streamings</h2>
    )
}

export default Streamings;