import React from "react";
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-md container-fluid">
        <NavLink 
          className="nav-link"
          to="home">
          <img className="" src="images/logo-header.png" alt="Logo da página NetFilmes" />
        </NavLink>
        <div className="dropdown text-end ms-md-auto user">
          <button 
            className="d-flex link-dark text-decoration-none dropdown-toggle show"
            data-bs-toggle="dropdown"
             aria-expanded="true">
            
            <div className="user-image">
              <img src="images/profile.png" alt="mdo" width="32" height="32" className="rounded-circle" />
            </div>
            
            <div className="ms-md-auto user-name">
              <p>Bem vindo!</p>
              <p>Adilson</p>
            </div>
          </button>
          <ul className="dropdown-menu text-small" data-popper-placement="bottom-end" >
            <li><a className="dropdown-item" href="index.html">Sair</a></li>
          </ul>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#headerNavbar"
          aria-controls="headerNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="headerNavbar">
          <ul className="nav align-items-center w-100 ">
            <li className="nav-item">
              <NavLink className="nav-link active" to="home"> Minhas Séries </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="streamings"> Streamings </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <hr className="hr-menu mb-4" />
    </header>
  )
}

export default Header;