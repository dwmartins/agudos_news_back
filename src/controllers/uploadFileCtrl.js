const fs = require('fs');
const path = require('path');


class UploadFileCtrl {
    uploadFile = (file, fileName, directory) => {

        if (!fs.existsSync(`src/uploads/${directory}`)) {
            fs.mkdirSync(`src/uploads/${directory}`, { recursive: true });
        }

        const pathComplete = path.join(`src/uploads/${directory}`, fileName);

        fs.writeFileSync(pathComplete, file);
    }
}

module.exports = new UploadFileCtrl;