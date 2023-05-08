const main = document.querySelector('main');

const {data} = json;

function renderPage(){
    data.forEach(element => {
        //Cria a seção que vai envolver a seção do conteúdo 
        const section = createSection( element.title, 'h2');    
        main.appendChild(section);
        
        const buttonRedirect = createButtonRedirect(element.linkAllCards,'button-redirect', 'bi bi-chevron-right')
        const divWrapListCards = createListCards( buttonRedirect, 'd-flex  align-items-center', 'd-flex flex-row bd-highlight');
        
        section.appendChild(divWrapListCards)
        
        const ul = divWrapListCards.firstChild 
        
        
        const quantityColumnsCards = getNumberCardsByWidthScreen()
        const cards = element.cards.slice(0, quantityColumnsCards);
        cards.forEach(card => {
            const listItem = createCard(card.link, card.imgSrc, 'p-2');
            ul.appendChild(listItem)
        })
    });
}
    
renderPage()

window.addEventListener( 'resize' , event => {
    main.innerHTML = '';
    renderPage()
}, )
