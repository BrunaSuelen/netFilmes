
function createSection(cards=[], h2TextContent='', hrefLinkAllCards='#'){
    const section = document.createElement('section');
    const h2 = document.createElement('h2');
    const div = createListCards(cards, hrefLinkAllCards);
    
    section.appendChild(h2);
    section.appendChild(div)

    section.className='';

    h2.textContent = h2TextContent; 
    
    return section;
}

function createListCards(cards, hrefLinkAllCards){
    const divListCards = document.createElement('div');

    const ul = document.createElement('ul');
    const buttonRedirect = createButtonRedirect(hrefLinkAllCards,'button-redirect', 'bi bi-chevron-right')


    divListCards.appendChild(ul);
    divListCards.appendChild(buttonRedirect)

    divListCards.className="d-flex  align-items-center"


    ul.className="d-flex flex-row bd-highlight";
     

    const quantityCards = getNumberCardsByWidthScreen();

    const cardsToDisplay = cards.slice(0, quantityCards);
    
    cardsToDisplay.forEach((card, index) => {
        const listItem = createCard(card.link, card.imgSrc);
        ul.appendChild(listItem)
    });

    return divListCards
}



function createCard(hrefLinkCard='#', imgSrc='' ){ 

    const li = document.createElement('li')
    const img = document.createElement('img');
    const linkCard = document.createElement('a');

    li.appendChild(linkCard);
    linkCard.appendChild(img)

    li.className= "p-2 bd-highlight";

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
    icon.style.fontSize = '1rem';
    
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