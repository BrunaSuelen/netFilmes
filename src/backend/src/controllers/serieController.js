const serieService = require('../services/serieService');

const create = (req, res) => {
    const body = req.body;
    res.status(200).json({'message': 'create'});
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
        const body = req.body;

        if(Object.keys(body).length == 0) {
            throw new Error("Campo vazio");
        }

        const {idUser, idSerie} = body;

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

const updateById = (req, res) => {
    const body = req.body;
    const id = req.query.id;
    res.status(200).json({'message': 'update'});
} 


const removeById = (req,res) => {
    const id = req.query.id;
    res.status(200).json({'message': 'remove'});
}


module.exports = {create,list, findById, updateById, removeById};