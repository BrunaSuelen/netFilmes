const userService = require('../services/userService');

const getUser = async (req, res) => {
    const response = {
        token: null,
        message: null,
        content: null
    }
    try{
        const body = req.body;
        if(Object.keys(body).length == 0){
            throw new Error("Campo vazio");
        }

        const data = {
            "email" : body?.email,
            "password": body?.password,
        }
        
        const user = await userService.getUser(data)

        if(!user) {
            throw new Error("Usuario não consegui logar");
        }

        response['message'] = "Usuario logado com sucesso !";
        response['content'] = {
            id: user?.id,
            name: user?.nome,
            email: user?.email
        };
        response['token'] = 'asd1234' ;

        return res.status(200).json(response);
    }catch (error) {
        response['message'] = 'Usuário e/ou senha inválido(s) !';
        return res.status(401).json(response);
    }

}

const createUser =  async (req, res) => {
    const response = {
        message: null,
        created: null,
    }
    try{
        const body = req.body;

        if(Object.keys(body).length == 0){
            throw new Error("Campo vazio");
        }

        const data = {
            "nome" : body?.name,
            "email" : body?.email,
            "password": body?.password,
        }
        
        const isCreated = await userService.createUser(data)

        if(!isCreated) {
            throw new Error("Não conseguiu criar no banco de dados");
        }

        response['created'] = isCreated;
        response['message'] = "Criado com sucesso !";
        return res.status(200).json(response);
    }catch (error) {
        response['message'] = 'Erro ao criar usuário';
        response['created']= false;
        return res.status(401).json(response);
    }

   
}

module.exports = {getUser, createUser};