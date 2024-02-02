const mime = require("mime-types");

class HelperFile {
    validImg = (file) => {
        const contentType = mime.lookup(file.originalname);
        const extension = mime.extension(contentType);

        const validExtensions = ['png', 'jpg', 'jpeg'];
        const maxSizeInBytes = 5 * 1024 * 1024;

        if(!validExtensions.includes(extension)) {
            return {invalid: 'O formato da imagem deve ser (png, jpg, jpeg)'}
        } 

        if(file.size > maxSizeInBytes) {
            return {invalid: 'A Imagem deve ter no máximo 5MB'}
        }

        return {contentType: contentType, extension: extension};
    }
}

module.exports = new HelperFile();