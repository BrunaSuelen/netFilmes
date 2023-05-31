
const createStreaming = (req, res) => {
    const body = req.body;
    res.status(200).json({'message': 'create'});
}

const listStreaming = (req, res) => {
    res.status(200).json({'message': 'list'});
}

const updateStreaming = (req, res) => {
    const body = req.body;
    const id = req.query.id;
    res.status(200).json({'message': 'update'});
} 


const removeStreaming = (req,res) => {
    const id = req.query.id;
    res.status(200).json({'message': 'remove'});
}


module.exports = {createStreaming, listStreaming, updateStreaming, removeStreaming};