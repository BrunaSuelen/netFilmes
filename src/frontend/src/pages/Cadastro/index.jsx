import React, { useEffect, useState } from 'react';
import './Cadastro.css';
import { Link } from "react-router-dom";
import api from '../../services/api';
import Notification from '../../components/Notification';

const Cadastro = () => {
    const [errorMessages, setErrorMessages] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [isEnableButton, setIsEnableButton] = useState(false);

    const [alert, setAlert] = useState({'show': false, 'message':'', 'variant':''});

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

    function handleSubmit(event) {
        event.preventDefault();


        api.post("/user/create", formData)
            .then((response) => {
                const { data } = response;
                setAlert({'show': true, 'message': data?.message , 'variant':'success'})
                setFormData({name: '', email: '', password: '' });
            })
            .catch((err) => {
                const message = err?.response?.data?.message;
                setAlert({'show': true, 'message': message, 'variant':'danger'})
            });
    }


    return (
        <div className="page-cadastro">
            <form className="mb-3" onSubmit={handleSubmit} id='formulario' >
                {alert.show && <Notification props={{alert, setAlert}}/> }
                <img className="mb-5" src="images/logo.png" alt="Logo da Página NetFilmes" id='imagem' />
                <div className="form-floating">
                    <input type="text"
                        name="name"
                        className="form-control"
                        id="floatingInputName"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={handleOnChangeInput}
                        onFocus={handleOnFocusInput}
                    />
                    <label htmlFor="floatingInputName">Nome</label>
                    <span className="error" id="error-floatingInputName">{errorMessages?.name}</span>
                </div>
                <div className="form-floating">
                    <input type="email"
                        name="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleOnChangeInput}
                        onFocus={handleOnFocusInput}
                    />
                    <label htmlFor="floatingInput">Email</label>
                    <span className="error" id="error-floatingInput">{errorMessages?.email}</span>
                </div>
                <div className="form-floating">
                    <input type="password"
                        name="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleOnChangeInput}
                        onFocus={handleOnFocusInput}
                    />
                    <label htmlFor="floatingPassword">Senha</label>
                    <span className="error" id="error-floatingPassword">{errorMessages?.password}</span>
                </div>
                <Link className="btn mt-4 btn-outline-dark float-start d-none d-sm-inline" to="/" >Voltar</Link>
                <button className="btn mt-4 btn-primary float-end" id="botao" type="submit" disabled={!isEnableButton}>Cadastrar</button>
            </form>
        </div>
    )
}

export default Cadastro;