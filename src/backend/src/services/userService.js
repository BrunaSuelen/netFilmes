
const {db} = require('../db');

async function getUser(data){
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
          } else {
            resolve(true); 
          }
        }
      );
    });

  } catch (error) {
    return false; 
  }
}

module.exports = { getUser, createUser};
