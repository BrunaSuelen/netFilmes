
const {db} = require('../db');

async function getUser(data){
  const { nome, email, password } = data;

  try {
    await new Promise((resolve, reject) => {
      db.get(
        `Select * from Usuario u WHERE  u.email = ? and u.senha = ?`,
        [email, password],
        function (error, row) {
          if (error) {
            reject(error); 
          } else {
            resolve(row); 
          }
        }
      );
    });

    return row; 
  } catch (error) {
    return null; 
  }
}
async function createUser(data){

  const { nome, email, password } = data;

  try {
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)`,
        [nome, email, password],
        function (error) {
          if (error) {
            console.error(error.message);
            reject(error); 
          } else {
            console.log(`Inserted a row with the ID: ${this.lastID}`);
            resolve(); 
          }
        }
      );
    });

    return true; // Retorna true se a inserção for bem-sucedida
  } catch (error) {
    return false; // Retorna false se ocorrer um erro
  }
}

module.exports = { getUser, createUser};
