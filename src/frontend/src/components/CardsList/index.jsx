import React from "react";
import Card from "../Cards";


const CardList = ({props}) => {
    const {series} = props;

    return(
        <ul className="list-cards row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3" >
        {/* { series.map((element, index) => {
            return <Card key={index} props={element}/>}) 
        } */}
        </ul>
    )
}

export default CardList;