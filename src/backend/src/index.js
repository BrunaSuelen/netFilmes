const express = require('express');
const path = require('path');
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const serieRoute = require('./routes/serieRoute');
const streamingRoute = require('./routes/streamingRoute');

const app = express();

//Cria as tabelas e popula o banco de dados com os registros
const db = require('./db');
db.initDb();
db.populateDabase();

const port = 5000;

//Implementando algumas configurações no projeto
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: '*' }));

// Rotas da nossa aplicação
app.use("/user", userRoute);
app.use("/serie", serieRoute);
app.use("/streaming", streamingRoute);

// Rota para pegar arquivos de upload
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

//Caso tente acessar uma rota desconhecida
app.use(function(req, res, next) {
  res.json({"message" : "Endpoint não encontrado"});
});


app.listen(port, () => {
  console.log(`Servidor rodando na http://localhost:${port}`)
})