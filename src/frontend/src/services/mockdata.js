export const seriesMockdata = JSON.stringify([...Array(20).keys()].map( index => {
    return {
        "id": index,
        "name": `Vikings-${index}`,
        "image": "images/serie.jpg",
        "streaming":{
            "name": "Netflix"
        },
        "category": "assistidos",
        "comments": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    }
}));

export const streaming = [];

