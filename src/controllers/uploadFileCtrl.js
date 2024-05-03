const fs = require('fs');
const path = require('path');
const logger = require('../../config/logger');


class UploadFileCtrl {
    uploadFile = (file, fileName, directory) => {

        if (!fs.existsSync(`src/uploads/${directory}`)) {
            fs.mkdirSync(`src/uploads/${directory}`, { recursive: true });
        }

        const pathComplete = path.join(`src/uploads/${directory}`, fileName);

        fs.writeFileSync(pathComplete, file.buffer);
    }

    deleteFile = (fileName, directory) => {
        const filePath = path.join('src', 'uploads', directory, fileName);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}

module.exports = new UploadFileCtrl;