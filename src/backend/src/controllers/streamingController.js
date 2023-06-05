const streamingService = require('../services/streamingService');

const create = async (req, res) => {
    const response = {
        message: null,
        created: null,
    }
    try{
        const body = req.body;
        
        if(! Object.values(body)) {
            throw new Error("Campo vazio");
        }

        const isCreated = await streamingService.createStreaming(body);

        if(!isCreated){
            throw new Error("Não conseguiu criar no banco de dados");
        }

        response['created'] = isCreated;
        response['message'] = "Criado com sucesso !";
        return res.status(200).json(response);
    }catch(error){
        response['message'] = 'Erro ao criar streaming';
        response['created']= false;
        return res.status(400).json(response);
    }
}

const list = async (req, res) => {
    const response = {
        message: null,
        content: null
    }
    try{
        const {idUser} = req.query;

        if(Object.keys(idUser).length == 0) {
            throw new Error("Campo vazio");
        }

        const streamings = await streamingService.getAllStreamings(idUser);

        if(!streamings){
            throw new Error("Retorno vazio!");
        }

        const data = streamings.map(row => {
            return {
                'id': row?.id,
                'nome': row?.nome,
                'image': row?.image
            }
        });

        response['message'] = "Séries encontradas com sucesso !";
        response['content'] = data;
        return res.status(200).json(response);
    }catch (error) {
        response['message'] = 'Series não foram encontradas !!';
        return res.status(204).json(response);
    }
}

const findById = async(req, res) => {
    const response = {
        message: null,
        content: null
    }
    try{
        const {idUser} = req.query;
        const {id} = req.params;

        if(!idUser || !id ) {
            throw new Error("Campo vazio");
        }

        const streamings = await streamingService.getStreamingById(idUser, id);

        if(!streamings){
            throw new Error("Retorno vazio!");
        }

        response['message'] = "Streaming encontrada com sucesso !";
        response['content'] = streamings;
        return res.status(200).json(response);
    }catch (error) {
        response['message'] = 'Serie não encontrada !';
        return res.status(204).json(response);
    }
}

const update = (req, res) => {
    const body = req.body;
    const id = req.query.id;
    res.status(200).json({'message': 'update'});
} 


const remove = async (req,res) => {
    const response = {
        message: null,
        removed: null,
    }
    try{
        const {idUser} = req.query;
        const {id} = req.params;

        if(!idUser || !id ) {
            throw new Error("Campo vazio");
        }

        const isRemoved = await streamingService.removeStreamingById(idUser, id);

        if(!isRemoved){
            throw new Error("Retorno vazio!");
        }

        response['message'] = "Streaming removido com sucesso !";
        response['removed'] = isRemoved;
        return res.status(200).json(response);
    }catch(error){
        response['message'] = 'Erro ao remover Streaming';
        response['removed']= false;
        return res.status(401).json(response);
    }
    
}


module.exports = {create, list, findById , update, remove};