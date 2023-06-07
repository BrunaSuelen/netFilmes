import React, { useState, useEffect } from 'react';

import './SerieForm.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const SerieForm = ({ props}) => {
    const { serie, handleSubmit } = props;

    const [listSelectStreamings, setListSelectStreamings] = useState([]);
    const [isEnableButton, setIsEnableButton] = useState(false);

    const [errorMessages, setErrorMessages] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        category: '',
        comments: '',
        idStreaming: ''
    });

    const [srcImage, setSrcImage] =  useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        api.get("/streaming", { params: { 'idUser': user?.id} })
        .then((response) =>response.data)
        .then((data) => setListSelectStreamings(data?.content))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);
    
    useEffect(() => {
        const areAllInputsHaveValues = Object.values(formData).every(element => element !== '');
        setIsEnableButton(areAllInputsHaveValues);
    }, [formData]);

    useEffect(()=> {
        if(serie){
            setFormData({
                'name': serie?.nome,
                'image': serie?.image,
                'category': serie?.categoria && serie?.categoria.toLowerCase(),
                'comments': serie?.comment,
                'idStreaming': serie?.streaming?.id
            })
        }
        setSrcImage(serie?.image?.encondingImage)
    },[serie])

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
                <label htmlFor="nameSerie" className="form-label">Série</label>
                <input type="text" className="form-control" id="nameSerie" name="name" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData?.name} required />
                <span className="error" id="error-nameSerie">{errorMessages?.name}</span>
            </div>

            <div className="mb-3">
                <label htmlFor="imageSerie" className="form-label">Imagem da capa</label>
                <input className="form-control" type="file" id="imageSerie" name="image" accept="image/png" onChange={handleImageUpload} onFocus={handleOnFocusInput}  />
                <span className="error" id="error-imageSerie">{errorMessages?.image}</span>

                { serie?.image?.encondingImage && 
                    <img src={srcImage} alt="Imagem para editar" />
                }
            </div>

            <div className="mb-3">
                <label htmlFor="streamingSerie" className="form-label">Streaming</label>
                <select id="streamingSerie" className="form-select form-select" aria-label=".form-select" name="idStreaming" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData?.idStreaming} required>
                    <option value="" >Selecione um streaming</option>
                    {listSelectStreamings && listSelectStreamings.map((value, index) =>  <option key={index} value={value?.id}>{value?.nome}</option>)}
                </select>
                <span className="error" id="error-streamingSerie">{errorMessages?.idStreaming}</span>
            </div>

            <div className="mb-3">
                <label htmlFor="categoriaSerie" className="form-label">Categoria</label>
                <select id="categoriaSerie" className="form-select form-select" aria-label=".form-select" name="category" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData?.category} required>
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
            <Link to="/home" className="btn mt-4 btn-outline-dark float-start d-none d-sm-inline" >Voltar</Link>
            <button className="btn mt-4 btn-primary float-end" disabled={!isEnableButton}>Salvar</button>
        </form>
    );
};

export default SerieForm;