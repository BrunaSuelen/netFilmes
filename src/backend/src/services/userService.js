
const {db, populateStreamingById} = require('../db');

async function login(data){
  const { email, password } = data;
  
  try {
   return await new Promise((resolve, reject) => {
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
  } catch (error) {
    return null; 
  }
}
async function createUser(data){

  const { nome, email, password } = data;

  try {
    return await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)`,
        [nome, email, password],
        function (error) {
          if (error) {
            console.error(error.message);
            reject(false); 
          }
          const {lastID} = this;
          populateStreamingById(lastID);
          resolve(true);
        }
      );
  });
  } catch (error) {
    return false; 
  }
}

module.exports = { login, createUser};
