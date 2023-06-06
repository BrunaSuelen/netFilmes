const fs = require('fs');
const path = require('path');
const slugify = require('slugify');


const writeBase64ImageToUploadFolder = async (base64Image, nameImage, hostName) => {
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



module.exports = {writeBase64ImageToUploadFolder}