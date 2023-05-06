const main = document.querySelector('main');

const {data} = json;

data.forEach(element => {
    const section = createSection(element.cards, element.title, element.linkAllCards);    
    main.appendChild(section);
});

