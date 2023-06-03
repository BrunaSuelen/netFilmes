const express = require('express');
const path = require('path');
const cors = require('cors');

const userRoute = require('./routes/userRoute');
const serieRoute = require('./routes/serieRoute');
const streamingRoute = require('./routes/streamingRoute');

const app = express();


//const db = require('./db');
//db.initDb();
//db.populateDabase();

const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: '*'}));

app.use("/user", userRoute);
app.use("/serie", serieRoute);
app.use("/streaming", streamingRoute);

// Rota para pegar arquivos de upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Caso tente acessar uma rota desconhecida
app.use(function(req, res, next) {
  res.json({"message" : "Endpoint não encontrado"});
});


app.listen(port, () => {
  console.log(`Servidor rodando na http://localhost:${port}`)
})