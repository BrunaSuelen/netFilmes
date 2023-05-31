

const getUser = (req, res) => {
    res.status(200).json({'message': 200});
}

const createUser = (req, res) => {
    const body = req.body;
    const queryStringID = req.query.id;
    res.status(200).json({'message': 200});
}

module.exports = {getUser, createUser};