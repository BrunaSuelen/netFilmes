import React from "react";
import './PageNotFound.css';
import { Link } from 'react-router-dom';

const PageNotFound = () => {

    return (
      <div className='pagina-nao-encontrada'>
        <img 
          src='images/logo-branca.png' 
          alt='Netfilmes' 
          width="32"/>
        <div>
          <h1>Ops!</h1>
          <p>A página que você está procurando não foi encontrada</p>
        </div>
        <Link to="home">Vá para a tela inicial</Link>
      </div>
    );
}

export default PageNotFound;