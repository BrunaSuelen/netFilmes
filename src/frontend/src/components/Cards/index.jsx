import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalConfirmRemove from "../ModalConfirmRemove";
import ModalMoreDetail from "../ModalMoreDetail";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Card = ({ props }) => {
  const { content, editUrl } = props;


  const [showConfirmRemove, setShowConfirmRemove] = useState(false);

  const [showMoreDetail, setShowMoreDetail] = useState(false);

  const handleCloseConfirmRemove = () => setShowConfirmRemove(false);
  const handleShowConfirmRemove = () => setShowConfirmRemove(true);
  const handleSubmitConfirmRemove = () => console.log('foi');

  const handleCloseMoreDetail = () => setShowMoreDetail(false);
  const handleShowMoreDetail = () => setShowMoreDetail(true);
  const handleSubmitMoreDetail = () => console.log('More Detail');

  if (!content) return;

  return (
    <li className="cards card-item text-center">
      <div className="" onClick={handleShowMoreDetail}>
        <div className="position-relative mb-2" >
          <img className="img-fluid" src={content?.image} alt="" />
          <h4 className="h4 text-light position-absolute bottom-0 start-50 translate-middle-x">{content?.serieTitle}</h4>
        </div>

        <h6 className="h6 mb-0">{content?.streamingTitle}</h6>
        <p className="mb-0 text-sm">{content?.category}</p>
      </div>
      <div className="d-flex justify-content-between btns-action">
        <Link className="btn btn-edit" to={`${editUrl}/${content?.id}`} >
          <i className="bi bi-pencil"></i>
        </Link>
        <button
          type="button"
          className="btn btn-remover"
          onClick={handleShowConfirmRemove}>
          <i className="bi bi-trash3"></i>
        </button>
      </div>

      <ModalMoreDetail props={{
          'handleClose': handleCloseMoreDetail,
          'handleSubmit': handleSubmitMoreDetail,
          'show': showMoreDetail,
          'content': {
            'title': content?.serieTitle,
            'subTitle': content?.streamingTitle,
            'comments':content?.comments,
          }
      }}/>

      <ModalConfirmRemove props={{
        'handleClose': handleCloseConfirmRemove,
        'handleSubmit': handleSubmitConfirmRemove,
        'show': showConfirmRemove,
        'content': {
          'type': 'série',
          'title': content?.streamingTitle
        }
      }} />
    </li >
  )
}

export default Card;