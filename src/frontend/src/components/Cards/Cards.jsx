import React from "react";


const Card = ({propos}) => {
    const imgSrc = '';
    const serieName = '';
    const streamingName = '';
    const statusSerie = '';
    return (
        <li 
          class="cards card-item text-center"
          data-bs-toggle="modal" 
          data-bs-target="#modalSerieDetail">
  
          <div class="position-relative mb-2">
            <img class="img-fluid" src={imgSrc} alt=""/>
            <h4 class="h4 text-light position-absolute bottom-0 start-50 translate-middle-x">{serieName}</h4>
          </div>
  
          <h6 class="h6 mb-0">{streamingName}</h6>
          <p class="mb-0 text-sm">{statusSerie}</p>
          <div class="d-flex justify-content-between btns-action">
            <a 
              type="button"
              class="btn btn-edit"
              onClick={(e) => console.log(e)}>
              <i class="bi bi-pencil"></i>
            </a>
            <a 
              type="button" 
              class="btn btn-remover" 
              data-bs-toggle="modal" 
              data-bs-target="#modalRemoveSerie">
              <i class="bi bi-trash3"></i> 
            </a>
          </div>
        </li>
    )
}