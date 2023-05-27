export const seriesMockdata = JSON.stringify([...Array(20).keys()].map( index => {
    return {
        "id": index,
        "serieTitle": `Vikings-${index}`,
        "image": "images/serie.jpg",
        "streamingTitle": "Netflix",
        "category": "Assistido",
        "comments": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    }
}));

export const streamingsMockdata = JSON.stringify([...Array(20).keys()].map( index => {
    return {
        "id": index,
        "streamingTitle": `Netflix-${index}`,
        "image": "images/netflix.png",
    }
}));

