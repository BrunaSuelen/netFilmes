import React from "react";
import Card from "../Cards";
import './CardList.css';

const CardList = ({ props }) => {
    const { items, editUrl, type} = props;

    return (
        <ul className="list-cards row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3" >
            {items.map((content, index) =>  <Card key={index} props={{content, editUrl, type}}/> )}
        </ul>
    )
}

export default CardList;