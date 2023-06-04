import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const contentUser = JSON.parse(localStorage.getItem('contentUser'));
  const navigate = useNavigate();

  function handleClick(e) {
    localStorage.removeItem('token');
    localStorage.removeItem('contentUser');
    navigate('/');
  }

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-md container-fluid">
        <NavLink className="nav-link" to="home">
          <img src="images/logo-header.png" alt="Logo da página NetFilmes" />
        </NavLink>

        {/* Itens Menu */}
        <div className="collapse navbar-collapse" id="headerNavbar">
          <ul className="nav align-items-center w-100 ">
            <li className="nav-item">
              <NavLink className="nav-link active" to="home">
                Minhas Séries
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="streamings">
                Streamings
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Usuário */}
        <div className="dropdown text-end ms-md-auto user">
          <button
            className="d-flex link-dark dropdown-toggle show"
            data-bs-toggle="dropdown"
            aria-expanded="true">
            <div className="user-image">
              <img
                src="images/profile.png"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </div>
            <div className="ms-md-auto user-name">
              <p>Bem vindo!</p>
              <p>{contentUser?.name}</p>
            </div>
          </button>
          <ul className="dropdown-menu text-small" data-popper-placement="bottom-end">
            <li>
              <button className="dropdown-item" onClick={handleClick}>
                Sair
              </button>
            </li>
          </ul>
        </div>

        {/* Menu mobile  */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#headerNavbar"
          aria-controls="headerNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>

      <hr className="hr-menu mb-4" />
    </header>
  );
}
   
{/* 
<Dropdown className="dropdown text-end ms-md-auto user">
  <Dropdown.Toggle id="dropdown-basic"  variant="" size={"sm"} className="d-flex link-dark text-decoration-none  show">
      <div className="user-image">
        <img src="images/profile.png" alt="mdo" width="32" height="32" className="rounded-circle" />
      </div>

      <div className="ms-md-auto user-name">
        <p>Bem vindo!</p>
        <p>{contentUser?.name}</p>
      </div>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item className="" onClick={handleClick}>Sair</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown> */}

export default Header;