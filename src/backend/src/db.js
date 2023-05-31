const sqlite3 = require('sqlite3').verbose();

const pathDb = './database.db';
const db = new sqlite3.Database(pathDb, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Conexão com banco de dados !!!");
});


function initDb() {

    db.serialize(() => {
        // Cria a tabela "Serie"
        db.run(``);

        // Cria a tabela "Streaming"
        db.run(``);

        // Cria a tabela "Usuário"
        db.run(``);

       
        console.log("Tabelas criadas com sucesso !!!");
    })
}

function populateDabase() {
    // Caso não tiver registros ele cria
    db.get(`SELECT COUNT(*) as count FROM Serie`, (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            if (row.count == 0) {

                // Insere dados na tabela "Série"
                db.run(`INSERT INTO Serie (x, y) VALUES ('x', 'y')`);

            }
        }
    });
    // Caso não tiver registros ele cria
    db.get(`SELECT COUNT(*) as count FROM Streaming`, (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            if (row.count == 0) {
                // Insere dados na tabela "Streaming"
                db.run(`INSERT INTO Streaming (x) VALUES ('x')`);
            }
        }
    });


    db.get(`SELECT COUNT(*) as count FROM Usuario`, (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            if (row.count == 0) {
                // Insere dados na tabela "Usuário"
                db.run(`INSERT INTO Usuario (x) VALUES ('x')`);
            }
        }
    });


    console.log("Registros criados com sucesso !!!")
}


module.exports = {db, initDb, populateDabase};

