const main = document.querySelector('main');

const {cards} = json;

function renderPage(){
    const section = createSection( 'Lista de series', 'mb-3');   
    main.appendChild(section);
    
    const divWrapListCards = createListCards(null, '', 'd-flex flex-wrap justify-content-between');
    section.appendChild(divWrapListCards);
    const ul = divWrapListCards.firstChild ;

    cards.forEach(element => {
        const listItem = createCard(element.link, element.imgSrc, 'series-img');
        ul.appendChild(listItem)
    });
}
    
renderPage()
