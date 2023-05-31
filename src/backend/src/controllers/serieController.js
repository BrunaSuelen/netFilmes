
const createSerie = (req, res) => {
    const body = req.body;
    res.status(200).json({'message': 'create'});
}

const listSerie = (req, res) => {
    res.status(200).json({'message': 'list'});
}

const updateSerie = (req, res) => {
    const body = req.body;
    const id = req.query.id;
    res.status(200).json({'message': 'update'});
} 


const removeSerie = (req,res) => {
    const id = req.query.id;
    res.status(200).json({'message': 'remove'});
}


module.exports = {createSerie, listSerie, updateSerie, removeSerie};