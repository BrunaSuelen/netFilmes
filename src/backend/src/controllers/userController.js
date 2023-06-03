


const getUser = (req, res) => {
    const body = req.body;
    const defaultResponseUser = {
        token: null,
        message: null,
        content: null
    }
   
    defaultResponseUser['content'] = {
        name : 'Carlos'
    }
    defaultResponseUser['token'] = 'aaaaasssssdddddd';

    res.status(200).json(defaultResponseUser);
}

const createUser = (req, res) => {
    const body = req.body;
    const queryStringID = req.query.id;


    const message = {
        token: null,
        message: null,
        content: null
    }

    console.log(body);
    
    res.status(200).json({'message': 200});
}

module.exports = {getUser, createUser};