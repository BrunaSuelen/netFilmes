import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import api from "../../services/api";
import './ModalMoreDetail.css';
import Notification from "../Notification";

const ModalMoreDetail = ({ props }) => {

    const { handleClose, handleSubmit, show, content, type, editUrl} = props;
    const [alert, setAlert] = useState({'show': false, 'message':'', 'variant':''})
    const [selectedCategory, setSelectedCategory] = useState(content.categoria);
    
    function handleSelectCategory(event){
        const value = event.target.value
       
        if(! content?.id) return ;

        const body = {
            'id': content.id,
            'category': value,
        }

        api.put(`/serie/${content.id}/update/category`, body)
        .then((response) => {
            const {data} = response;
            if(data?.updated){
                content.categoria = value;
            }
            setAlert({'show': true, 'message': data?.message, 'variant': data?.updated ? 'success': 'danger' })
        })
        .catch((err) => {
            const message = err?.response?.data?.message;
            setAlert({'show':true, 'message':message, 'variant': 'danger'})
        });
        setSelectedCategory(value);
    }

    return (        
            <Modal show={show} onHide={handleClose} size="lg" centered>
                {alert.show && <Notification props={{alert, setAlert}}/> }
                <Modal.Header className="border-0 mb-3 p-0">
                    <button className="btn-close btn-close-white opacity-100 btn-close-modal-more-detail" onClick={handleClose}></button>

                    <div className="image-wrap">
                        <img src={content?.image} />
                        <img className="backdrop-image" src={content?.image} />
                    </div>
                </Modal.Header>
                <Modal.Body>

                    <div className="d-flex mt-2">
                        <h2 className="modal-more-detail-title fs-3 h2">{content?.nome}</h2>

                        {type === 'serie'  && 
                            <select className="form-select form-select-sm modal-more-detail-select" onChange={handleSelectCategory} value={selectedCategory}>
                                <option value="assistido">Assitido</option>
                                <option value="nao_assistido">Não Assitido</option>
                                <option value="desejo_assistir">Desejo Assitir</option>
                                <option value="recomendo">Recomendo</option>
                                <option value="nao_recomendo">Não Recomendo</option>
                            </select>
                        }
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item p-2" to={`${editUrl}/${content?.id}`}>
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
                    {content?.streaming?.nome &&
                        <h2 className="modal-more-detail-subtitle">Disponível em: {content?.streaming?.nome}</h2>
                    }
                    {content?.comment &&
                        <>
                            <h6 className="modal-more-detail-comments">Comentário</h6>
                            <p className="modal-more-detail-comments-title">{content?.comment}</p>
                        </>}
                </Modal.Body>
                
            </Modal>
    )
}

export default ModalMoreDetail;