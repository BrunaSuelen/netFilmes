import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalConfirmRemove from "../ModalConfirmRemove";
import ModalMoreDetail from "../ModalMoreDetail";
import './Cards.css';
import api from "../../services/api";
import { formatCategoryName } from "../../utils/utils";



const Card = ({ props }) => {
  const { content, editUrl, type } = props;

  const navigate = useNavigate();

  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  const [showMoreDetail, setShowMoreDetail] = useState(false);

  const handleCloseConfirmRemove = () => setShowConfirmRemove(false);
  const handleShowConfirmRemove = () => setShowConfirmRemove(true);

  const handleCloseMoreDetail = () => setShowMoreDetail(false);
  const handleShowMoreDetail = () => setShowMoreDetail(true);


  const handleRemoveItem = () => {
    let endpoint = type == "serie" ? "/serie" : "/streaming";
    
    endpoint = `${endpoint}/${content?.id}`;

    const user = JSON.parse(localStorage.getItem('user'));
    api.delete(endpoint, { params: { 'idUser': user?.id} })
    .then((response) =>response.data)
    .then((data) => { 
      if(data.removed){
        //Força reload da página 
        navigate(0)
      } 
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  if (!content) return;
 

  return (
    <li className="cards card-item text-center">
      <div className="" onClick={handleShowMoreDetail}>
        <div className="position-relative mb-2" >
          <img className="img-fluid" src={content?.image} alt="" />
          <h4 className="h4 text-light position-absolute bottom-0 start-50 translate-middle-x">{type === 'serie'? content?.nome : null}</h4>
        </div>

        <h6 className="h6 mb-0">{type === 'serie'? content?.streaming?.nome : content?.nome}</h6>
        <p className="mb-0 text-sm">{formatCategoryName(content?.categoria)}</p>
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
          'handleSubmit': handleRemoveItem,
          'show': showMoreDetail,
          content,
          type,
          editUrl,
      }}/>

      <ModalConfirmRemove props={{
        'handleClose': handleCloseConfirmRemove,
        'handleSubmit': handleRemoveItem,
        'show': showConfirmRemove,
        'content': {
          'type': 'série',
          'title': content?.nome
        }
      }} />
    </li >
  )
}

export default Card;