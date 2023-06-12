const {db} = require('../db');

async function getAllStreamings(idUser){
    if(! idUser) return null;

    try{
        return await new Promise((resolve, reject)=> {
            db.all(`SELECT st.id,st.nome, st.image 
            FROM Streaming as st
            WHERE st.usuario_id = ?`,
            [idUser],
            function (error, rows){
                if(error){
                    reject(error);
                }else{
                    resolve(rows);
                }
            })
        })
    }catch(error){
        return null;
    }
}


async function createStreaming(data){
    if( Object.keys(data).length == 0 ){
        throw new Error("Objeto Vazio ")
    }   
    const {nome, image, usuarioId} = data;

    if(!nome || !image || !usuarioId){
        throw new Error("Campo vaizo")
    }

    try{
        return await new Promise((resolve,reject)=> {
            db.run(`INSERT INTO Streaming (nome, image, usuario_id) VALUES
            (?, ?, ?);`,
            [nome, image, usuarioId],
            function (error){
                if(error){
                    reject(false)
                }else{
                    resolve(true)
                }
            });
        })
    }catch(error){
        return false;
    }
}

async function getStreamingById(idUser, idStreaming){
    if(!idUser || ! idStreaming ) return null;

    try{
        return await new Promise((resolve, reject)=> {
            db.get(`SELECT st.id,st.nome, st.image 
            FROM Streaming as st
            WHERE st.usuario_id = ? and st.id = ?`,
            [idUser, idStreaming],
            function (error, row){
                if(error){
                    reject(error);
                }else{
                    resolve(row);
                }
            })
        })
    }catch(error){
        return null;
    }

}

async function updateStreamingById(data){

    if( Object.keys(data).length == 0){
        throw new Error("Objeto Vazio ")
    }
    const {nome, image, usuarioId, idStreaming} = data;
    
    if( !nome || !image || !usuarioId  || !idStreaming){
        throw new Error("Campo vazio ");
    }

    try{
        return await new Promise((resolve, reject) => {
            db.run(`UPDATE Streaming SET nome = ?, image = ?, usuario_id = ? WHERE id = ?`,
            [nome, image, usuarioId, idStreaming ],
            function(error){
                if(error){
                    reject(false);
                }else{
                    resolve(true);
                }
            })
        })
    }catch(error){
        return null;
    }
}

async function removeStreamingById(idUser, idStreaming){
    if(!idUser || !idStreaming) return false;

    try{
        return await new Promise((resolve, reject)=> {
            db.get(`DELETE FROM Streaming as st
            WHERE st.usuario_id = ? and st.id = ?`,
            [idUser, idStreaming],
            function (error){
                if(error){
                    reject(false);
                }else{
                    resolve(true);
                }
            })
        })
    }catch(error){
        return false;
    }
}

module.exports = {getAllStreamings, createStreaming, getStreamingById, updateStreamingById,removeStreamingById}