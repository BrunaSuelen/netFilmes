import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import api from '../../services/api';
import Notification from '../../components/Notification';

const Login = () => {
    const navigate = useNavigate();

    const [errorMessages, setErrorMessages] = useState({});

    const [formData, setFormData] = useState({email: '', password: ''});

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

        api.post("/user", formData)
            .then((response) => {
                const {data} = response;
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('user', JSON.stringify(data.content));
                navigate('/home');
            })
            .catch((err) => {
                const message = err?.response?.data?.message;
                setFormData({email: '', password: ''});
                setAlert({'show': true, 'message': message, 'variant':'danger'})
            });
    }
    return (
        <div className="page-login">
            <div id='containerLogin'>
                <main className="form-signin w-100 m-auto" id="boxformlogin">
                    {alert.show && <Notification props={{alert, setAlert}}/> }
                    <form className="" onSubmit={handleSubmit}>
                        <img className="mb-5" src="images/logo.png" alt="Logo da Página NetFilmes" />

                        <div className="form-floating">
                            <input type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                name="email"
                                onChange={handleOnChangeInput}
                                onFocus={handleOnFocusInput}
                                value={formData.email}
                                required
                            />
                            <label htmlFor="floatingInput">Email</label>
                            <span className="error" id="error-floatingInput">{errorMessages?.email}</span>

                        </div>

                        <div className="form-floating">
                            <input type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                name="password"
                                onChange={handleOnChangeInput}
                                onFocus={handleOnFocusInput}
                                value={formData.password}
                                required
                            />
                            <label htmlFor="floatingPassword">Senha</label>
                            <span className="error" id="error-floatingPassword">{errorMessages?.password}</span>
                        </div>

                        <button className="w-100 btn btn-lg btn-danger mb-3" id="botao" type="submit" disabled={!isEnableButton}>Entrar</button>
                        <Link className="link-danger link-offset-2 link-underline link-underline-opacity-0" id="criarConta" to="cadastro" >Criar Conta</Link>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default Login;