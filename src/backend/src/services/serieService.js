const {db} = require('../db');

async function getAllSeries(idUser){
    if(! idUser) return null;

    try{
        return await new Promise((resolve, reject)=> {
            db.all(`SELECT s.id ,s.nome AS nome, s.image, s.categoria ,s.comment , st.id as streaming_id  ,st.nome AS streaming_nome, st.image as streaming_image
            FROM Serie as s
            INNER JOIN Streaming as st 
            ON s.streaming_id = st.id
            WHERE s.usuario_id = ?`,
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

async function createSerie(data){
    if(! data) return false;

    const areAllInputsHaveValues = Object.values(data).every(element => Boolean(element) );

    if(! areAllInputsHaveValues) return false;

    const {nome, image, categoria, comment, streamingId, usuarioId} = data;
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


async function getSerieById(idUser, idSerie){
    if(! idUser || ! idSerie )return null;

    try{
        return await  new Promise((resolve, reject) => {
            db.get(
                `SELECT s.id ,s.nome AS nome, s.image, s.categoria ,s.comment , st.id as streaming_id  ,st.nome AS streaming_nome, st.image as streaming_image
                FROM Serie as s
                INNER JOIN Streaming as st 
                ON s.streaming_id = st.id
                WHERE s.usuario_id = ? and s.id = ?`,
                [idUser, idSerie],
                function (error, row) {
                  if (error) {
                    reject(error); 
                  } else {
                    resolve(row); 
                  }
                }
              );
            });
    } catch (error) {
        return null; 
    }
}


async function removeSerieById(idUser, idSerie){
    if(!idUser || !idSerie) return false;
    
    try{
        return await new Promise((resolve, reject)=> {
            db.get(`DELETE FROM Serie as s
            WHERE s.usuario_id = ? and s.id = ?`,
            [idUser, idSerie],
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

module.exports = {getAllSeries, createSerie, getSerieById, removeSerieById};