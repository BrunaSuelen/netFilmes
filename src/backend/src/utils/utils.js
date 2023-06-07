const fs = require('fs');
const path = require('path');
const slugify = require('slugify');


const writeBase64ToImageUploadFolder = async (base64Image, nameImage, hostName) => {
    try{
        return await new Promise((resolve, reject) => {
        
        const nameImageFormatted =  slugify(nameImage);
        const pathToWrite = path.join(__dirname, '..', 'public', 'uploads', nameImageFormatted) ;
        
        const base64Sanitized = base64Image.replace('data:image/png;base64,', '');
        
        const buffer = Buffer.from(base64Sanitized, 'base64');
        
        fs.writeFile(pathToWrite, buffer, (error) => {
            if (error) {
              reject(null)
            } else {
                const fullUrlOfImage = `${hostName}/uploads/${nameImageFormatted}`;
                resolve(fullUrlOfImage);
            }
        });
    })
    }catch(error){
        return null;
    }
}

const encondingImageToBase64 = async (nameImage) => {
    try{
        return await new Promise((resolve, reject) => {

            if(!nameImage){
                throw new Error("Nome da imagem vazio")
            }
            const pathToWrite = path.join(__dirname, '..', 'public', 'uploads', nameImage) ;
            const base64 = fs.readFileSync(pathToWrite, "base64");
            resolve(base64);
        })
    }catch(error){
        console.log(error);
        reject(null);
    }
}



module.exports = {writeBase64ToImageUploadFolder, encondingImageToBase64}