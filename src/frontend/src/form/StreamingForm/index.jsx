import React, { useState, useEffect } from 'react';

import './SteamingForm.css';

const StreamingForm = ({ props }) => {
    const { streaming, handleSubmit } = props;

    const [isEnableButton, setIsEnableButton] = useState(false);

    const [errorMessages, setErrorMessages] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        image: '',
    });

    useEffect(() => {
        const areAllInputsHaveValues = Object.values(formData).every(element => element !== '');
        setIsEnableButton(areAllInputsHaveValues);
    }, [formData]);


    function handleOnChangeInput({ target }) {
        const { name, value } = target;

        setFormData({ ...formData, [name]: value });

        const msg = value === '' ? 'Campo Obrigatório' : '';
        setErrorMessages({ ...errorMessages, [name]: msg });
    }

    function handleOnFocusInput({ target }) {
        const { name, value } = target;

        const msg = value === '' ? 'Campo Obrigatório' : '';
        setErrorMessages({ ...errorMessages, [name]: msg });
    }

    useEffect(() => {
        if (streaming) {
            const { name, image, } = streaming;
            setFormData({ 'name': name, 'image': image });
        }
    }, []);



    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nameStreaming" className="form-label">Streaming</label>
                <input type="name" className="form-control" id="nameStreaming" name="name" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData.name} required />
                <span className="error" id="error-nameStreaming">{errorMessages?.name}</span>
            </div>

            <div className="mb-3">
                <label htmlFor="imageStreaming" className="form-label">Imagem da capa</label>
                <input type="file" className="form-control" id="imageStreaming" name="image" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} src={formData.image} required />
                <span className="error" id="error-imageStreaming">{errorMessages?.image}</span>
            </div>
            <a className="btn mt-4 btn-outline-dark float-start  d-none d-sm-inline" onClick={e => console.log(e)}>Voltar</a>
            <button className="btn mt-4 btn-primary float-end" disabled={!isEnableButton}>Salvar</button>
        </form>
    );
};

export default StreamingForm;