import React, { useState, useEffect } from 'react';

import './SerieForm.css';

const SerieForm = ({ props }) => {
    const { serie, handleSubmit } = props;

    const [isEnableButton, setIsEnableButton] = useState(false);

    const [errorMessages, setErrorMessages] = useState({});

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        image: '',
        streaming: {},
        category: '',
        comments: ''
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
        if (serie) {
            const { id, name, image, streaming, category, comments } = serie;
            setFormData({ id, name, image, streaming, category, comments });
        }
    }, [serie]);



    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nameSerie" className="form-label">Série</label>
                <input type="name" className="form-control" id="nameSerie" name="name" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData.name} required />
                <span className="error" id="error-nameSerie">{errorMessages?.name}</span>
            </div>

            <div className="mb-3">
                <label htmlFor="imageSerie" className="form-label">Imagem da capa</label>
                <input className="form-control" type="file" id="imageSerie" name="image" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} src={formData.image} required />
                <span className="error" id="error-imageSerie">{errorMessages?.image}</span>
            </div>

            <div className="mb-3">
                <label htmlFor="streamingSerie" className="form-label">Streaming</label>
                <select id="streamingSerie" className="form-select form-select" aria-label=".form-select" name="streaming" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData.streaming} required>
                    <option value="" select="">Selecione um streaming</option>
                    <option value="netflix">Netflix </option><option value="globo-play">Globo Play </option><option value="hbo">HBO </option></select>
                <span className="error" id="error-streamingSerie">{errorMessages?.streaming}</span>
            </div>

            <div className="mb-3">
                <label htmlFor="categoriaSerie" className="form-label">Categoria</label>
                <select id="categoriaSerie" className="form-select form-select" aria-label=".form-select" name="category" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData.category} required>
                    <option value="" select="">Selecione a categoria</option>
                    <option value="assistido">Assitido</option>
                    <option value="nao_assistido">Não Assiti</option>
                    <option value="desejo_assistir">Desejo Assitir</option>
                    <option value="recomendo">Recomendo</option>
                    <option value="nao_recomendo">Não Recomendo</option>
                </select>
                <span className="error" id="error-categoriaSerie">{errorMessages?.category}</span>
            </div>

            <div className="mb3">
                <label htmlFor="comentarioSerie" className="form-label">Comentário</label>
                <textarea className="form-control" id="comentarioSerie" name="comments" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData.comments} required></textarea>
                <span className="error" id="error-comentarioSerie">{errorMessages?.comments}</span>
            </div>
            <a className="btn mt-4 btn-outline-dark float-start d-none d-sm-inline" onClick={(e) => console.log(e)}>Voltar</a>
            <button className="btn mt-4 btn-primary float-end" disabled={!isEnableButton}>Salvar</button>
        </form>
    );
};

export default SerieForm;