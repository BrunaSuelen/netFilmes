import React from "react";


const Card = ({props}) => {

    return (
        <li 
          className="cards card-item text-center"
          data-bs-toggle="modal" 
          data-bs-target="#modalSerieDetail">
  
          <div className="position-relative mb-2">
            <img className="img-fluid" src={props?.image} alt=""/>
            <h4 className="h4 text-light position-absolute bottom-0 start-50 translate-middle-x">{props?.serie}</h4>
          </div>
  
          <h6 className="h6 mb-0">{props?.streaming}</h6>
          <p className="mb-0 text-sm">{props?.category}</p>
          <div className="d-flex justify-content-between btns-action">
            <a 
              type="button"
              className="btn btn-edit"
              onClick={(e) => console.log(e)}>
              <i className="bi bi-pencil"></i>
            </a>
            <a 
              type="button" 
              className="btn btn-remover" 
              data-bs-toggle="modal" 
              data-bs-target="#modalRemoveSerie">
              <i className="bi bi-trash3"></i> 
            </a>
          </div>
        </li>
    )
}

export default Card;