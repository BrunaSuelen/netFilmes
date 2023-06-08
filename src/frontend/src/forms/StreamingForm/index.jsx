import React, { useState, useEffect } from 'react';

import './SteamingForm.css';
import { Link } from 'react-router-dom';

const StreamingForm = ({ props }) => {
    const { streaming, handleSubmit } = props;

    const [isEnableButton, setIsEnableButton] = useState(false);

    const [errorMessages, setErrorMessages] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        image: '',
    });

    const [srcImage, setSrcImage] =  useState('');
    
    useEffect(() => {
        const areAllInputsHaveValues = Object.values(formData).every(element => element !== '');
        setIsEnableButton(areAllInputsHaveValues);
    }, [formData]);

    useEffect( ()=> {
        if(streaming){
           setFormData({'name': streaming?.nome, 'image': streaming?.image})
           setSrcImage(streaming?.image?.encondingImage)
        }
    },[streaming])

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


    const handleImageUpload = ({target}) => {
        const file = target.files[0];

        if(!file.name.match(/\.(png)$/)){
            const msg = "Apenas é possível utilizar imagem no formato .png";
            setErrorMessages({ ...errorMessages, 'image': msg });
            return;
        }
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64 = e.target.result;
            setFormData({...formData, 'image':{ 'name': file.name, 'encondingImage': base64}});
            setSrcImage(base64);
        };
        reader.readAsDataURL(file);
    };

    return (
        <form onSubmit={e => handleSubmit(e, formData)}>
            <div className="mb-3">
                <label htmlFor="nameStreaming" className="form-label">Streaming</label>
                <input type="text" className="form-control" id="nameStreaming" name="name" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData?.name} required />
                <span className="error" id="error-nameStreaming">{errorMessages?.name}</span>
            </div>

            <div className="mb-3">
                <label htmlFor="imageStreaming" className="form-label">Imagem da capa</label>
                <input type="file" className="form-control" id="imageStreaming" name="image" accept="image/png" onChange={handleImageUpload} onFocus={handleOnFocusInput} />
                <span className="error" id="error-imageStreaming">{errorMessages?.image}</span>

                { srcImage && 
                    <img src={srcImage} alt="Imagem para editar" />
                }
            </div>
            <Link to="/streamings" className="btn mt-4 btn-outline-dark float-start  d-none d-sm-inline" >Voltar</Link>
            <button className="btn mt-4 btn-primary float-end" disabled={!isEnableButton}>Salvar</button>
        </form>
    );
};

export default StreamingForm;