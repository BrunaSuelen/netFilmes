

function createSection( h2TextContent='', h2ClassName=''){
    const section = document.createElement('section');
    const h2 = document.createElement('h2');
    
    section.appendChild(h2);

    section.className='';

    h2.className = h2ClassName;
    h2.textContent = h2TextContent; 
    
    return section;
}

function createListCards( buttonRedirect=null, divListCardsClassName='', ulClassName=''){
    const divListCards = document.createElement('div');

    const ul = document.createElement('ul');

    divListCards.appendChild(ul);
    
    if(buttonRedirect){
        divListCards.appendChild(buttonRedirect)
    }

    divListCards.className= divListCardsClassName


    ul.className= ulClassName;
     
    return divListCards
}



function createCard(hrefLinkCard='#', imgSrc='', liClassName='' ){ 

    const li = document.createElement('li')
    const img = document.createElement('img');
    const linkCard = document.createElement('a');

    li.appendChild(linkCard);
    linkCard.appendChild(img)

    li.className= liClassName;

    linkCard.href = hrefLinkCard

    img.src = imgSrc;
    img.className="img-fluid";

    return li;
}


function createButtonRedirect(buttonSrcRedirect='#', buttonClassName='', iconClassName=''){
    const buttonRedirect = document.createElement('a');

    buttonRedirect.href= buttonSrcRedirect
    buttonRedirect.className = buttonClassName;

    const icon = document.createElement('i');

    icon.className = iconClassName
    // icon.style.fontSize = '1rem';
    
    buttonRedirect.appendChild(icon);

    return buttonRedirect
}

function getNumberCardsByWidthScreen(){
    const widthScreen = document.querySelector('body').offsetWidth;

    let quantityCards = 3;
   
    if( widthScreen>= 1200){
        quantityCards= 7;
    }else if(widthScreen >= 992){
        quantityCards = 6;
    }else if(widthScreen >= 768){
        quantityCards = 5;
    }else if(widthScreen >= 576){
        quantityCards = 4;
    }

    return quantityCards;
}