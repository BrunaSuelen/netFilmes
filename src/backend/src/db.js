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

        // Cria a tabela "Usuário"
        db.run(`CREATE TABLE IF NOT EXISTS Usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            senha VARCHAR(255) NOT NULL
          );`);

        // Cria a tabela "Serie"
        db.run(`CREATE TABLE IF NOT EXISTS Serie (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            categoria VARCHAR(255) NOT NULL,
            comment VARCHAR(255),
            streaming_id INTEGER,
            usuario_id INTEGER,
            FOREIGN KEY (streaming_id) REFERENCES Streaming(id),
            FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
            );`);

        // Cria a tabela "Streaming"
        db.run(`CREATE TABLE IF NOT EXISTS Streaming (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            usuario_id INTEGER,
            FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
          );`);

        console.log("Tabelas criadas com sucesso !!!");
    })
}

function populateDabase() {
    db.get(`SELECT COUNT(*) as count FROM Usuario`, (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            if (row.count == 0) {
                // Insere dados na tabela "Usuário"
                db.run(`INSERT INTO Usuario (nome, email, senha) VALUES
                ('Usuário 1', 'usuario1@gmail.com', '123456'),
                ('Usuário 2', 'usuario2@gmail.com', '123456'),
                ('Usuário 3', 'usuario3@gmail.com', '123456'),
                ('Usuário 4', 'usuario4@gmail.com', '123456'),
                ('Usuário 5', 'usuario5@gmail.com', '123456'),
                ('Usuário 6', 'usuario6@gmail.com', '123456'),
                ('Usuário 7', 'usuario7@gmail.com', '123456'),
                ('Usuário 8', 'usuario8@gmail.com', '123456'),
                ('Usuário 9', 'usuario9@gmail.com', '123456'),
                ('Usuário 10', 'usuario10@gmail.com', '1234560');`);
            }
        }
    });

     // Caso não tiver registros de SERIE ele cria
     db.get(`SELECT COUNT(*) as count FROM Serie`, (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            if (row.count == 0) {
                // Insere dados na tabela "Série"
                db.run(`INSERT INTO Serie (nome, image, categoria, comment, streaming_id, usuario_id) VALUES
                ('Série 1', 'http://localhost:5000/uploads/serie.jpg', 'Categoria 1', 'Comentário 1', 1, 1),
                ('Série 2', 'http://localhost:5000/uploads/serie.jpg', 'Categoria 2', 'Comentário 2', 2, 1),
                ('Série 3', 'http://localhost:5000/uploads/serie.jpg', 'Categoria 3', 'Comentário 3', 3, 1),
                ('Série 4', 'http://localhost:5000/uploads/serie.jpg', 'Categoria 4', 'Comentário 4', 4, 1),
                ('Série 5', 'http://localhost:5000/uploads/serie.jpg', 'Categoria 5', 'Comentário 5', 5, 1),
                ('Série 6', 'http://localhost:5000/uploads/serie.jpg', 'Categoria 6', 'Comentário 6', 6, 1),
                ('Série 7', 'http://localhost:5000/uploads/serie.jpg', 'Categoria 7', 'Comentário 7', 7, 1),
                ('Série 8', 'http://localhost:5000/uploads/serie.jpg', 'Categoria 8', 'Comentário 8', 8, 1),
                ('Série 9', 'http://localhost:5000/uploads/serie.jpg', 'Categoria 9', 'Comentário 9', 9, 1),
                ('Série 10', 'http://localhost:5000/uploads/serie.jpg', 'Categoria 10', 'Comentário 10', 10, 1);
              `);

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
                    db.run(`INSERT INTO Streaming (nome, image, usuario_id) VALUES
                    ('Streaming 1', 'http://localhost:5000/uploads/netflix.png', 1),
                    ('Streaming 2', 'http://localhost:5000/uploads/netflix.png', 1),
                    ('Streaming 3', 'http://localhost:5000/uploads/netflix.png', 1),
                    ('Streaming 4', 'http://localhost:5000/uploads/netflix.png', 1),
                    ('Streaming 5', 'http://localhost:5000/uploads/netflix.png', 1),
                    ('Streaming 6', 'http://localhost:5000/uploads/netflix.png', 1),
                    ('Streaming 7', 'http://localhost:5000/uploads/netflix.png', 1),
                    ('Streaming 8', 'http://localhost:5000/uploads/netflix.png', 1),
                    ('Streaming 9', 'http://localhost:5000/uploads/netflix.png', 1),
                    ('Streaming 10', 'http://localhost:5000/uploads/netflix.png', 1);`);
                }
            }
        });

    console.log("Registros criados com sucesso !!!")
}


module.exports = {db, initDb, populateDabase};

