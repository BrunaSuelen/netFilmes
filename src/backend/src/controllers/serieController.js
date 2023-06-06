const serieService = require('../services/serieService');
const { writeBase64ImageToUploadFolder } = require('../utils/utils');

const create = async (req, res) => {
    const response = {
        message: null,
        created: null,
    } 
    try{

        const areAllInputsHaveValues = Object.values(req.body).every(element => Boolean( element) );

        if(! areAllInputsHaveValues) {
            throw new Error("Campo vazio");
        }

        if( Object.values(req.body?.image).length == 0 ) {
            throw new Error("Campo imagem vazio");
        }

        const {image} = req.body;

        const hostName = `http://${req.headers.host}`;
        const urlImage = await writeBase64ImageToUploadFolder(image.encondingImage, image.name, hostName);
        
        if(urlImage === null){
            throw new Error("Falha ao salvar imagem");
        }

        const body = {'nome': req.body?.name,
            'image': urlImage,
            'categoria': req.body?.category,
            'comment': req.body?.comments,
            'streamingId': parseInt(req.body?.idStreaming),
            'usuarioId': req.body?.userId};
        
        const isCreated = await serieService.createSerie(body);

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

        if(!idUser){
            throw new Error("Campo vazio");
        }

        const series = await serieService.getAllSeries(idUser);

        if(!series){
            throw new Error("Retorno vazio!");
        }

        const data = series.map(row => {
            return {
                'id': row?.id,
                'nome': row?.nome,
                'image': row?.image,
                'categoria': row?.categoria,
                'comment': row?.comment,
                'streaming':{
                    'id': row?.streaming_id,
                    'nome': row?.streaming_nome,
                    'image': row?.streaming_image
                }
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

const findById = async (req, res) => {
    const response = {
        message: null,
        content: null
    }
    try{
        const {idUser} = req.query;
        const idSerie = req.params?.id;

        if(! idUser || ! idSerie ){
            throw new Error("Algum campo não preenchido !");
        }
       
        const serie = await serieService.getSerieById(idUser, idSerie);

        if(!serie){
            throw new Error("Retorno vazio!");
        }

        const { id, nome, image, categoria, comment, streaming_id, streaming_nome, streaming_image } = serie;
        
        const data = {
            id,
            nome,
            image,
            categoria,
            comment,
            'streaming': {
                'id': streaming_id,
                'nome': streaming_nome,
                'image': streaming_image
            }
        };
        
        response['message'] = "Série encontrada com sucesso !";
        response['content'] = data;
        return res.status(200).json(response);
    }catch (error) {
        response['message'] = 'Serie não encontrada !';
        return res.status(204).json(response);
    }
    
}

const updateById = async (req, res) => {
    const response = {
        message: null,
        created: null,
    } 
    try{
        const areAllInputsHaveValues = Object.values(req.body).every(element => Boolean( element) );
        
        if(! areAllInputsHaveValues) {
            throw new Error("Campo vazio");
        }
        
        if( Object.values(req.body?.image).length == 0 ) {
            throw new Error("Campo imagem vazio");
        }

        const {image} = req.body;
        
        const hostName = `http://${req.headers.host}`;
        const urlImage = await writeBase64ImageToUploadFolder(image.encondingImage, image.name, hostName);
        
        if(urlImage === null){
            throw new Error("Falha ao salvar imagem");
        }
        
        const body = {
            'nome': req.body?.name,
            'image': urlImage,
            'categoria': req.body?.category,
            'comment': req.body?.comments,
            'idStreaming': parseInt(req.body?.idStreaming),
            'usuarioId': req.body?.userId
        };
        
        const isCreated = await serieService.updateSerieById(body);


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

        const isRemoved = await serieService.removeSerieById(idUser, id);

        if(!isRemoved){
            throw new Error("Retorno vazio!");
        }

        response['message'] = "Série removida com sucesso !";
        response['removed'] = isRemoved;
        return res.status(200).json(response);
    }catch(error){
        response['message'] = 'Erro ao remover a Série';
        response['removed']= false;
        return res.status(401).json(response);
    }
    
}

module.exports = {create,list, findById, updateById, removeById};