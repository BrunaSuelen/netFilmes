import React from "react";
import { Link } from "react-router-dom";


const Card = ({ props }) => {
  const { content, editUrl } = props;

  if (!content) return;

  return (
    <li
      className="cards card-item text-center"
      data-bs-toggle="modal"
      data-bs-target="#modalSerieDetail">

      <div className="position-relative mb-2">
        <img className="img-fluid" src={content?.image} alt="" />
        <h4 className="h4 text-light position-absolute bottom-0 start-50 translate-middle-x">{content?.serieTitle}</h4>
      </div>

      <h6 className="h6 mb-0">{content?.streamingTitle}</h6>
      <p className="mb-0 text-sm">{content?.category}</p>
      <div className="d-flex justify-content-between btns-action">
        <Link
          className="btn btn-edit"
          to={`${editUrl}/${content?.id}`}
          onClick={(e) => console.log(e)}>
          <i className="bi bi-pencil"></i>
        </Link>
        <button
          type="button"
          className="btn btn-remover"
          data-bs-toggle="modal"
          data-bs-target="#modalRemoveSerie">
          <i className="bi bi-trash3"></i>
        </button>
      </div>


      {/* <!-- Modal - Confirmar Remoção --> */}
      <div className="modal fade" id="modalRemoveSerie" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="modalRemoveSerieLabel"
        aria-hidden="true">
        <div className="modal-dialog  modal-dialog-centered modal-lg ">
          <div className="modal-content">
            <div className="modal-header border-0 pb-1">
              <h1 className="modal-title h2" id="modalRemoveSerieLabel">Confirmar a remoção da série</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  ></button>
            </div>
            <div className="modal-body mb-2 pt-0">
              <p className="">Realmente deseja remover a série <b>{content?.streamingTitle}</b>?</p>
            </div>
            <div className="modal-footer border-0 mb-2">
              <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal" >Cancelar</button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={e => console.log('Fazer a requisição para remover o item na api')}
                >
                Apagar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Modal --> */}


      {/* <!-- Modal - Detalhes Série--> */}
      <div className="modal fade" id="modalSerieDetail" index="-1" aria-labelledby="modalSerieDetail"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg ">
          <div className="modal-content">
            <div className="modal-capa">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              <div className="image-wrap">
                <img src="images/serie.jpg" />
                <img className="backdrop-image" src="images/serie.jpg" />
              </div>
            </div>
            <div className="modal-header border-0 mb-3">
              <h1 className="modal-title fs-3 h2">{content?.streamingTitle}</h1>
              <select className="form-select form-select-sm categoriaSerie">
                <option value="nao_assistido">Assitido</option>
                <option value="assistido">Não Assiti</option>
                <option value="desejo_assistir">Desejo Assitir</option>
                <option value="recomendo">Recomendo</option>
                <option value="nao_recomendo">Não Recomendo</option>
              </select>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item p-2" to={`/serie/editar/${content?.id}`}>
                      <i className="bi bi-pencil p-2"></i>Editar
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item p-2"
                      data-bs-toggle="modal"
                      data-bs-target="#modalRemoveSerie"
                    >
                      <i className="bi bi-trash3 p-2"></i>Remover
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="modal-body mb-2">
            <h2 className="modal-subtitle">Disponível em: {content.streamingTitle}</h2>
            <h6>Comentário</h6>
            <p>
             {content?.comments}
            </p>
          </div>
        </div>
      </div>
      {/*<!-- End Modal -->*/}

    </li >
  )
}

export default Card;