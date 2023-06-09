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
                ('Carlos Alberto da Silva', 'usuario1@gmail.com', '123456'),
                ('Ana Maria Silva', 'usuario2@gmail.com', '123456'),
                ('Thais Carla Silveira', 'usuario3@gmail.com', '123456'),
                ('Robson Nunes Pinheiro', 'usuario4@gmail.com', '123456'),
                ('João Neto da Costa', 'usuario5@gmail.com', '123456'),
                ('Matheus Tevez Nunes', 'usuario6@gmail.com', '123456'),
                ('Tenório Diogo Tavares', 'usuario7@gmail.com', '123456'),
                ('Maria da Neves', 'usuario8@gmail.com', '123456'),
                ('Carla Costa e Silva', 'usuario9@gmail.com', '123456'),
                ('Carlos Cunha da Azevedo', 'usuario10@gmail.com', '123456');`);
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
                //Usuario 1
                db.run(`INSERT INTO Serie (nome, image, categoria, comment, streaming_id, usuario_id) VALUES
                ('Better Call Saul', 'http://localhost:5000/uploads/better-call-saul.png', 'assistido', 'Better Call Saul é uma série de televisão de drama norte-americana criada por Vince Gilligan e Peter Gould. A série é uma pré-sequência derivada de Breaking Bad, que também foi criada por Gilligan.', 1, 1),
                ('Black Mirror', 'http://localhost:5000/uploads/black-mirror.png', 'assistido', 'Black Mirror é uma série de televisão britânica ontológica de ficção científica criada por Charlie Brooker e centrada em temas obscuros e satíricos que examinam a sociedade moderna, particularmente a respeito das consequências imprevistas das novas tecnologias.', 2, 1),
                ('Dark', 'http://localhost:5000/uploads/dark.png', 'assistido', 'Dark é uma premiada websérie alemã de drama, suspense e ficção científica, criada por Baran bo Odar e Jantje Friese e eleita em votação popular no site Rotten Tomatoes como a melhor série original Netflix.', 3, 1),
                ('Demolidor', 'http://localhost:5000/uploads/demolidor.png', 'assistido', 'Demolidor é um personagem fictício que aparece nas histórias em quadrinhos publicadas pela Marvel Comics.', 4, 1),
                ('Doutor House', 'http://localhost:5000/uploads/doutor-house.png', 'assistido', 'Dr. House é uma série médica norte-americana criada por David Shore e exibida originalmente nos Estados Unidos pela Fox de 16 de novembro de 2004 a 21 de maio de 2012. Seu personagem principal é o Dr. Gregory House, interpretado pelo ator inglês Hugh Laurie.', 5, 1),
                ('Era do Gelo', 'http://localhost:5000/uploads/era-do-gelo.png', 'assistido', 'Era do Gelo é uma série de filmes de animação produzidos originalmente pela Blue Sky Studios, uma subsidiária da 20th Century Fox e atualmente pela Disney+ Foram produzidos seis filmes até o momento.', 6, 1),
                ('Friends', 'http://localhost:5000/uploads/friends.png', 'assistido', 'Friends é uma sitcom americana criada por David Crane e Marta Kauffman e apresentada pela rede de televisão NBC entre 22 de setembro de 1994 e 6 de maio de 2004, com um total de 236 episódios.', 7, 1),
                ('Gavião Arqueiro', 'http://localhost:5000/uploads/gaviao-arqueiro.png', 'assistido', 'Gavião Arqueiro alter-ego de Clint Barton, é um personagem de quadrinhos americanos da Marvel Comics. Criado por Stan Lee e Don Heck, o herói fez sua primeira aparição em Tales of Suspense #57, onde era um vilão ajudando até então vilã, Viúva Negra.', 8, 1),
                ('Greys Anatomy', 'http://localhost:5000/uploads/greys-anatomy.png', 'assistido', 'A série médica de enorme sucesso foca em um grupo de jovens médicos do Hospital Grace Mercy West, de Seattle, que começaram a carreira na própria instituição como residentes. ', 9, 1),
                ('Hebe', 'http://localhost:5000/uploads/hebe.png', 'assistido', 'Ao longo de oito décadas, a história da menina pobre do interior que realiza o sonho de se tornar uma grande estrela sempre em busca de sua verdade.', 10, 1),
                ('House of Cards', 'http://localhost:5000/uploads/house-of-cards.png', 'assistido', 'O congressista Francis Underwood e sua mulher, Claire, fazem de tudo para conquistar seus objetivos, não importa o que aconteça. Um mundo político recheado de ganância, corrupção e luxúria na capital Washington.', 1, 1),
                ('How I Meet Your Mother', 'http://localhost:5000/uploads/how-i-meet-your-mother.png', 'assistido', 'Ted se apaixonou. Tudo começou quando seu melhor amigo, Marshall, soltou a bomba de que planejava pedir em casamento a namorada de longa data, Lily, uma professora de jardim de infância.', 2, 1),
                ('iCarly', 'http://localhost:5000/uploads/iCarly.png', 'assistido', 'Carly Shay tem sua vida radicalmente mudada quando seu programa na internet torna-se um sucesso entre os jovens. Como seus pais estão viajando, Carly precisa contar com a ajuda de seu irmão e amigos para administrar sua recente fama.', 3, 1),
                ('Loki', 'http://localhost:5000/uploads/loki.png', 'assistido', 'Loki, Deus da Trapaça, sai da sombra de seu irmão para embarcar em uma aventura que ocorre após os eventos de Vingadores: Ultimato.', 4, 1),
                ('Mr Robot', 'http://localhost:5000/uploads/mr-robot.png', 'assistido', 'Elliot é um jovem programador que trabalha como engenheiro de segurança virtual durante o dia, e como hacker vigilante durante a noite.', 5, 1),
                ('Os Simpsons', 'http://localhost:5000/uploads/os-simpsons.png', 'assistido', 'Esta comédia animada de enorme sucesso gira em torno da família de mesmo nome que mora na cidade de Springfield, em um estado americano sem nome. O pai, Homer, não é um típico homem de família.', 6, 1),
                ('Supernatural', 'http://localhost:5000/uploads/supernatural.png', 'assistido', 'Os irmãos Sam e Dean Winchester encaram cenários sinistros caçando monstros. Velhos truques, armas e esconderijos não funcionam mais e seus amigos os traem, forçando os irmãos a contar um com o outro enquanto enfrentam novos inimigos.', 7, 1),
                ('Sweet Tooth', 'http://localhost:5000/uploads/sweet-tooth.png', 'assistido', 'Em uma perigosa aventura em um mundo pós-apocalíptico, um adorável menino-cervo sai em busca de um novo começo na companhia de um protetor rabugento.', 8, 1),
                ('The Last of Us', 'http://localhost:5000/uploads/the-last-of-us.png', 'assistido', 'Joel, um sobrevivente duro e cínico, e a jovem e impetuosa Ellie se conectam pela dificuldade do mundo em que vivem. Juntos, eles enfrentam circunstâncias brutais e monstros impiedosos durante uma difícil jornada pelos EUA após um surto apocalíptico.', 9, 1),
                ('The Office', 'http://localhost:5000/uploads/the-office.png', 'assistido', 'The Office  é uma série televisiva de comédia em formato de pseudodocumentário exibida pela NBC. Uma adaptação da série britânica The Office da BBC, seus episódios retratam o cotidiano dos funcionários de um escritório em Scranton, Pensilvânia, filial da empresa fictícia Dunder Mifflin Paper Company.', 10, 1),
                ('Tim Maia', 'http://localhost:5000/uploads/tim-maia.png', 'assistido', 'A trajetória de Tim Maia, desde a infância pobre até o auge da carreira, detalhando a vida desregrada e a personalidade forte do cantor, que morreu em 1998.', 1, 1),
                ('Todo mundo Odeia Cris', 'http://localhost:5000/uploads/todo-mundo-odeia-o-cris.png', 'assistido', 'Chris é um adolescente crescendo no Broolkyn dos anos 80 com uma excêntrica família composta pelo pai Julius, sua mãe Rochelle, sua irmã mimada Tonya e seu irmão Drew, que é bastante popular.', 2, 1),
                ('Vikings', 'http://localhost:5000/uploads/vikings.png', 'assistido', 'A série acompanha a saga dos navegadores nórdicos que exploram - e conquistam - novos territórios nos tempos medievais.', 2, 1),
                ('Watchmen', 'http://localhost:5000/uploads/watchmen.png', 'assistido', 'Watchmen toma lugar 34 anos após os eventos da série de quadrinhos. Ambientado na realidade alternativa do século XX dos quadrinhos, vigilantes, uma vez vistos como heróis, têm sido proibidos devido aos seus métodos violentos. ', 3, 1);
                `);

                // Usuario 2
                db.run(`INSERT INTO Serie (nome, image, categoria, comment, streaming_id, usuario_id) VALUES
                ('Better Call Saul', 'http://localhost:5000/uploads/better-call-saul.png', 'assistido', 'Better Call Saul é uma série de televisão de drama norte-americana criada por Vince Gilligan e Peter Gould. A série é uma pré-sequência derivada de Breaking Bad, que também foi criada por Gilligan.', 1, 2),
                ('Dark', 'http://localhost:5000/uploads/dark.png', 'assistido', 'Dark é uma premiada websérie alemã de drama, suspense e ficção científica, criada por Baran bo Odar e Jantje Friese e eleita em votação popular no site Rotten Tomatoes como a melhor série original Netflix.', 3, 2),
                ('Doutor House', 'http://localhost:5000/uploads/doutor-house.png', 'assistido', 'Dr. House é uma série médica norte-americana criada por David Shore e exibida originalmente nos Estados Unidos pela Fox de 16 de novembro de 2004 a 21 de maio de 2012. Seu personagem principal é o Dr. Gregory House, interpretado pelo ator inglês Hugh Laurie.', 5, 2),
                ('Era do Gelo', 'http://localhost:5000/uploads/era-do-gelo.png', 'assistido', 'Era do Gelo é uma série de filmes de animação produzidos originalmente pela Blue Sky Studios, uma subsidiária da 20th Century Fox e atualmente pela Disney+ Foram produzidos seis filmes até o momento.', 6, 2),
                ('Gavião Arqueiro', 'http://localhost:5000/uploads/gaviao-arqueiro.png', 'assistido', 'Gavião Arqueiro alter-ego de Clint Barton, é um personagem de quadrinhos americanos da Marvel Comics. Criado por Stan Lee e Don Heck, o herói fez sua primeira aparição em Tales of Suspense #57, onde era um vilão ajudando até então vilã, Viúva Negra.', 8, 2),
                ('Hebe', 'http://localhost:5000/uploads/hebe.png', 'assistido', 'Ao longo de oito décadas, a história da menina pobre do interior que realiza o sonho de se tornar uma grande estrela sempre em busca de sua verdade.', 10, 2),
                ('House of Cards', 'http://localhost:5000/uploads/house-of-cards.png', 'assistido', 'O congressista Francis Underwood e sua mulher, Claire, fazem de tudo para conquistar seus objetivos, não importa o que aconteça. Um mundo político recheado de ganância, corrupção e luxúria na capital Washington.', 1, 2),
                ('iCarly', 'http://localhost:5000/uploads/iCarly.png', 'assistido', 'Carly Shay tem sua vida radicalmente mudada quando seu programa na internet torna-se um sucesso entre os jovens. Como seus pais estão viajando, Carly precisa contar com a ajuda de seu irmão e amigos para administrar sua recente fama.', 3, 2),
                ('Loki', 'http://localhost:5000/uploads/loki.png', 'assistido', 'Loki, Deus da Trapaça, sai da sombra de seu irmão para embarcar em uma aventura que ocorre após os eventos de Vingadores: Ultimato.', 4, 2),
                ('Supernatural', 'http://localhost:5000/uploads/supernatural.png', 'assistido', 'Os irmãos Sam e Dean Winchester encaram cenários sinistros caçando monstros. Velhos truques, armas e esconderijos não funcionam mais e seus amigos os traem, forçando os irmãos a contar um com o outro enquanto enfrentam novos inimigos.', 7, 2),
                ('The Last of Us', 'http://localhost:5000/uploads/the-last-of-us.png', 'assistido', 'Joel, um sobrevivente duro e cínico, e a jovem e impetuosa Ellie se conectam pela dificuldade do mundo em que vivem. Juntos, eles enfrentam circunstâncias brutais e monstros impiedosos durante uma difícil jornada pelos EUA após um surto apocalíptico.', 9, 2),
                ('Tim Maia', 'http://localhost:5000/uploads/tim-maia.png', 'assistido', 'A trajetória de Tim Maia, desde a infância pobre até o auge da carreira, detalhando a vida desregrada e a personalidade forte do cantor, que morreu em 1998.', 1, 2),
                ('Todo mundo Odeia Cris', 'http://localhost:5000/uploads/todo-mundo-odeia-o-cris.png', 'assistido', 'Chris é um adolescente crescendo no Broolkyn dos anos 80 com uma excêntrica família composta pelo pai Julius, sua mãe Rochelle, sua irmã mimada Tonya e seu irmão Drew, que é bastante popular.', 2, 2),
                ('Watchmen', 'http://localhost:5000/uploads/watchmen.png', 'assistido', 'Watchmen toma lugar 34 anos após os eventos da série de quadrinhos. Ambientado na realidade alternativa do século XX dos quadrinhos, vigilantes, uma vez vistos como heróis, têm sido proibidos devido aos seus métodos violentos. ', 3, 2);
                `);

                // Usuario 3
                db.run(`INSERT INTO Serie (nome, image, categoria, comment, streaming_id, usuario_id) VALUES
                ('Better Call Saul', 'http://localhost:5000/uploads/better-call-saul.png', 'assistido', 'Better Call Saul é uma série de televisão de drama norte-americana criada por Vince Gilligan e Peter Gould. A série é uma pré-sequência derivada de Breaking Bad, que também foi criada por Gilligan.', 1, 3),
                ('Dark', 'http://localhost:5000/uploads/dark.png', 'assistido', 'Dark é uma premiada websérie alemã de drama, suspense e ficção científica, criada por Baran bo Odar e Jantje Friese e eleita em votação popular no site Rotten Tomatoes como a melhor série original Netflix.', 3, 3),
                ('Gavião Arqueiro', 'http://localhost:5000/uploads/gaviao-arqueiro.png', 'assistido', 'Gavião Arqueiro alter-ego de Clint Barton, é um personagem de quadrinhos americanos da Marvel Comics. Criado por Stan Lee e Don Heck, o herói fez sua primeira aparição em Tales of Suspense #57, onde era um vilão ajudando até então vilã, Viúva Negra.', 8, 3),
                ('Hebe', 'http://localhost:5000/uploads/hebe.png', 'assistido', 'Ao longo de oito décadas, a história da menina pobre do interior que realiza o sonho de se tornar uma grande estrela sempre em busca de sua verdade.', 10, 3),
                ('iCarly', 'http://localhost:5000/uploads/iCarly.png', 'assistido', 'Carly Shay tem sua vida radicalmente mudada quando seu programa na internet torna-se um sucesso entre os jovens. Como seus pais estão viajando, Carly precisa contar com a ajuda de seu irmão e amigos para administrar sua recente fama.', 3, 3),
                ('Tim Maia', 'http://localhost:5000/uploads/tim-maia.png', 'assistido', 'A trajetória de Tim Maia, desde a infância pobre até o auge da carreira, detalhando a vida desregrada e a personalidade forte do cantor, que morreu em 1998.', 1, 3),
                ('Watchmen', 'http://localhost:5000/uploads/watchmen.png', 'assistido', 'Watchmen toma lugar 34 anos após os eventos da série de quadrinhos. Ambientado na realidade alternativa do século XX dos quadrinhos, vigilantes, uma vez vistos como heróis, têm sido proibidos devido aos seus métodos violentos. ', 3, 3);
                `);

                // Usuario 4
                db.run(`INSERT INTO Serie (nome, image, categoria, comment, streaming_id, usuario_id) VALUES
                ('Dark', 'http://localhost:5000/uploads/dark.png', 'assistido', 'Dark é uma premiada websérie alemã de drama, suspense e ficção científica, criada por Baran bo Odar e Jantje Friese e eleita em votação popular no site Rotten Tomatoes como a melhor série original Netflix.', 3, 4),
                ('Hebe', 'http://localhost:5000/uploads/hebe.png', 'assistido', 'Ao longo de oito décadas, a história da menina pobre do interior que realiza o sonho de se tornar uma grande estrela sempre em busca de sua verdade.', 10, 4),
                ('House of Cards', 'http://localhost:5000/uploads/house-of-cards.png', 'assistido', 'O congressista Francis Underwood e sua mulher, Claire, fazem de tudo para conquistar seus objetivos, não importa o que aconteça. Um mundo político recheado de ganância, corrupção e luxúria na capital Washington.', 1, 4),
                ('Supernatural', 'http://localhost:5000/uploads/supernatural.png', 'assistido', 'Os irmãos Sam e Dean Winchester encaram cenários sinistros caçando monstros. Velhos truques, armas e esconderijos não funcionam mais e seus amigos os traem, forçando os irmãos a contar um com o outro enquanto enfrentam novos inimigos.', 7, 4),
                ('The Last of Us', 'http://localhost:5000/uploads/the-last-of-us.png', 'assistido', 'Joel, um sobrevivente duro e cínico, e a jovem e impetuosa Ellie se conectam pela dificuldade do mundo em que vivem. Juntos, eles enfrentam circunstâncias brutais e monstros impiedosos durante uma difícil jornada pelos EUA após um surto apocalíptico.', 9, 4),
                ('Watchmen', 'http://localhost:5000/uploads/watchmen.png', 'assistido', 'Watchmen toma lugar 34 anos após os eventos da série de quadrinhos. Ambientado na realidade alternativa do século XX dos quadrinhos, vigilantes, uma vez vistos como heróis, têm sido proibidos devido aos seus métodos violentos. ', 3, 4);
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
                    
                    //Usuario 1
                    db.run(`INSERT INTO Streaming (nome, image, usuario_id) VALUES
                    ('Netflix', 'http://localhost:5000/uploads/netflix.png', 1),
                    ('Amazon Prime', 'http://localhost:5000/uploads/amazon-prime.png', 1),
                    ('HBO Max', 'http://localhost:5000/uploads/hbo.png', 1),
                    ('GloboPlay', 'http://localhost:5000/uploads/globo-play.png', 1),
                    ('Disney', 'http://localhost:5000/uploads/disney.png', 1),
                    ('Paramount', 'http://localhost:5000/uploads/paramount.png', 1),
                    ('Discovery', 'http://localhost:5000/uploads/discovery.png', 1),
                    ('Apple TV', 'http://localhost:5000/uploads/apple-tv.png', 1),
                    ('Telecine', 'http://localhost:5000/uploads/telecine.png', 1),
                    ('PlayPlus', 'http://localhost:5000/uploads/playplus.png', 1);`);

                    //Usuario 2 
                    db.run(`INSERT INTO Streaming (nome, image, usuario_id) VALUES
                    ('Netflix', 'http://localhost:5000/uploads/netflix.png', 2),
                    ('Amazon Prime', 'http://localhost:5000/uploads/amazon-prime.png', 2),
                    ('HBO Max', 'http://localhost:5000/uploads/hbo.png', 2),
                    ('GloboPlay', 'http://localhost:5000/uploads/globo-play.png', 2),
                    ('Disney', 'http://localhost:5000/uploads/disney.png', 2),
                    ('Paramount', 'http://localhost:5000/uploads/paramount.png', 2),
                    ('Discovery', 'http://localhost:5000/uploads/discovery.png', 2),
                    ('Apple TV', 'http://localhost:5000/uploads/apple-tv.png', 2),
                    ('Telecine', 'http://localhost:5000/uploads/telecine.png', 2),
                    ('PlayPlus', 'http://localhost:5000/uploads/playplus.png', 2);`);

                    //Usuario 3 
                    db.run(`INSERT INTO Streaming (nome, image, usuario_id) VALUES
                    ('Netflix', 'http://localhost:5000/uploads/netflix.png', 3),
                    ('Amazon Prime', 'http://localhost:5000/uploads/amazon-prime.png', 3),
                    ('HBO Max', 'http://localhost:5000/uploads/hbo.png', 3),
                    ('GloboPlay', 'http://localhost:5000/uploads/globo-play.png', 3),
                    ('Disney', 'http://localhost:5000/uploads/disney.png', 3),
                    ('Paramount', 'http://localhost:5000/uploads/paramount.png', 3),
                    ('Discovery', 'http://localhost:5000/uploads/discovery.png', 3),
                    ('Apple TV', 'http://localhost:5000/uploads/apple-tv.png', 3),
                    ('Telecine', 'http://localhost:5000/uploads/telecine.png', 3),
                    ('PlayPlus', 'http://localhost:5000/uploads/playplus.png', 3);`);

                    //Usuario 4
                    db.run(`INSERT INTO Streaming (nome, image, usuario_id) VALUES
                    ('Netflix', 'http://localhost:5000/uploads/netflix.png', 4),
                    ('Amazon Prime', 'http://localhost:5000/uploads/amazon-prime.png', 4),
                    ('HBO Max', 'http://localhost:5000/uploads/hbo.png', 4),
                    ('GloboPlay', 'http://localhost:5000/uploads/globo-play.png', 4),
                    ('Disney', 'http://localhost:5000/uploads/disney.png', 4),
                    ('Paramount', 'http://localhost:5000/uploads/paramount.png', 4),
                    ('Discovery', 'http://localhost:5000/uploads/discovery.png', 4),
                    ('Apple TV', 'http://localhost:5000/uploads/apple-tv.png', 4),
                    ('Telecine', 'http://localhost:5000/uploads/telecine.png', 4),
                    ('PlayPlus', 'http://localhost:5000/uploads/playplus.png', 4);`);
                }
            }
        });

    console.log("Registros criados com sucesso !!!")
}


module.exports = {db, initDb, populateDabase};

