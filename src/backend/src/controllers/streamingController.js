const streamingService = require('../services/streamingService');
const { writeBase64ToImageUploadFolder, encondingImageToBase64 } = require('../utils/utils');

const create = async (req, res) => {
    const response = {
        message: null,
        created: null,
    }
    try{
        const {name, image, userId} = req.body

        if( Object.values(image).length == 0 || !name || !userId ) {
            throw new Error("Campo vazio");
        }

        const hostName = `http://${req.headers.host}`;
        const urlImage = await writeBase64ToImageUploadFolder(image.encondingImage, image.name, hostName);
        
        if(urlImage === null){
            throw new Error("Falha ao salvar imagem");
        }

        const body = {'nome': name, 'image': urlImage, 'usuarioId': userId};

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

        if(! idUser) {
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

        const nameOfImage = streamings?.image && streamings?.image.split('/uploads/')[1] ;
        const imageBase64 = await encondingImageToBase64(nameOfImage);

        if(! imageBase64){
            throw new Error("Imagem não encontrada ")
        }
        //Atribui ao objeto image o campo de nome da imagem e base64
        streamings.image = { 'name': nameOfImage, 'encondingImage': `data:image/png;base64, ${imageBase64}`};

        response['message'] = "Streaming encontrada com sucesso !";
        response['content'] = streamings;
        return res.status(200).json(response);
    }catch (error) {
        response['message'] = 'Serie não encontrada !';
        return res.status(204).json(response);
    }
}

const updateById = async (req, res) => {
    const response = {
        message: null,
        updated: null,
    }
    try{
        const {name, image, userId} = req.body
        const {id} = req.params;

        if( Object.values(image).length == 0 ) {
            throw new Error("Campo vazio");
        }

        if( !name || !id || !userId){
            throw new Error("Campo vazio");
        }

        const hostName = `http://${req.headers.host}`;
        const urlImage = await writeBase64ToImageUploadFolder(image.encondingImage, image.name, hostName);
        
        if(urlImage === null){
            throw new Error("Falha ao salvar imagem");
        }

        const body = {
            'nome': name,
            'image': urlImage,
            'usuarioId': userId,
            'idStreaming': id
        };
        const isUpdated = await streamingService.updateStreamingById(body);

        if(!isUpdated){
            throw new Error("Não conseguiu criar no banco de dados");
        }

        response['updated'] = isUpdated;
        response['message'] = "Atualizado com sucesso !";
        return res.status(200).json(response);
    }catch(error){
        response['message'] = 'Erro ao criar streaming';
        response['updated']= false;
        return res.status(400).json(response);
    }
}


const removeById = async (req,res) => {
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

module.exports = {create, list, findById , updateById, removeById};