import React from "react";


import Modal from 'react-bootstrap/Modal';

import './ModalConfirmRemove.css';

const ModalConfirmRemove = ({ props }) => {
    const { handleClose, handleSubmit, show, content } = props;
    
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header className="border-0 pb-1" closeButton >
                <Modal.Title className="h2">Confirmar a remoção da {content.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mb-2 pt-0 ">Realmente deseja remover a {content.type} <b>{content.title}</b></Modal.Body>
            <Modal.Footer className="border-0">
                <button className="btn btn-outline-dark" onClick={handleClose}> Cancelar </button>
                <button className="btn btn-primary" onClick={handleSubmit}> Apagar </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirmRemove;