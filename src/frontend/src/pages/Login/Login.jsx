import React, { useEffect, useState } from 'react';
import {  Link } from "react-router-dom";
import './Login.css'


const Login = () => {
    const [errorMessages, setErrorMessages ] = useState({});
 
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    
    const [isEnableButton, setIsEnableButton] = useState(false);

    useEffect(() => {   
        const areAllInputsHaveValues = Object.values(formData).every(element => element !== '');
        setIsEnableButton(areAllInputsHaveValues);
    }, [formData]);

    function handleOnChangeInput({target}){
        const {name, value} = target;

        setFormData({...formData, [name]: value});
       
        const msg = value === '' ? 'Campo Obrigatório' : '';
        setErrorMessages({...errorMessages, [name]: msg});
    }

    function handleOnFocusInput({target}){
        const {name, value} = target;

        const msg = value === '' ? 'Campo Obrigatório' : '';
        setErrorMessages({...errorMessages, [name]: msg});
    }
    
    return (
        <main className="form-signin w-100 m-auto" id="boxformlogin">
            <form className="" action="home.html" method="post">
                <img className="mb-5" src="images/logo.png" alt="Logo da Página NetFilmes" />

                <div className="form-floating">
                    <label htmlFor="floatingInput">Email</label>
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

                <button className="w-100 btn btn-lg btn-danger mb-3" id="botao" type="submit"  disabled={!isEnableButton}>Entrar</button>
                 <Link className="link-danger link-offset-2 link-underline link-underline-opacity-0" id="criarConta" to="cadastro" >Criar Conta</Link> 
            </form>
        </main>
    )
}

export default Login;