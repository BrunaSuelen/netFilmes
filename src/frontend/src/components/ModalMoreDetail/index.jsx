import React from "react";
import { Link } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';

import './ModalMoreDetail.css';

const ModalMoreDetail = ({ props }) => {

    const { handleClose, handleSubmit, show, content } = props;

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header className="border-0 mb-3 p-0">
                <button className="btn-close btn-close-white opacity-100 btn-close-modal-more-detail" onClick={handleClose}></button>

                <div className="image-wrap">
                    <img src="images/serie.jpg" />
                    <img className="backdrop-image" src="images/serie.jpg" />
                </div>
            </Modal.Header>
            <Modal.Body>
                {content?.title &&
                    <div className="d-flex mt-2">
                        <h2 className="modal-more-detail-title fs-3 h2">{content?.title}</h2>

                        <select className="form-select form-select-sm modal-more-detail-select">
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
                                    <button className="dropdown-item p-2" onClick={handleSubmit}>
                                        <i className="bi bi-trash3 p-2"></i>Remover
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
                <h2 className="modal-more-detail-subtitle">Disponível em: {content?.subTitle}</h2>
                {content?.comments &&
                    <>
                        <h6 className="modal-more-detail-comments">Comentário</h6>
                        <p className="modal-more-detail-comments-title">{content.comments}</p>
                    </>}
            </Modal.Body>
        </Modal>
    )
}

export default ModalMoreDetail;