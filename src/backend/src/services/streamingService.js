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
    if(! data) return false;

    if(! Object.values(body)) {
        throw new Error("Campo vazio");
    }

    try{
        return await new Promise((resolve,reject)=> {
            db.run(`INSERT INTO Serie (nome, image, categoria, comment, streaming_id, usuario_id) VALUES
            (?, ?, ?, ?, ?, ?);`,
            [nome, image, categoria, comment, streamingId, usuarioId],
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

module.exports = {getAllStreamings, createStreaming, getStreamingById, removeStreamingById}