require('dotenv').config();
const AWS = require("aws-sdk");
const logger = require("../../config/logger"); 

class AwsUploadCtrl {
    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.ACCESSKEY,
            secretAccessKey: process.env.SECRETACCESSKEY,
            region: process.env.REGION
        });
    }

    uploadImg = async (req, res) => {
        const reqbody = req.file;
        const bucketName = 'oguiaagudos-arquivos';
        const file = 'file';

        // await this.uploadFile(bucketName, 'imgTeste', file, 'public-read');
    }

    uploadFile = async (bucketName, fileName, file, acl = 'public-read') => {
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: file,
            acl: acl
        }

        try {
            const data = await this.s3.upload(params).promise();
            return data;
        } catch (error) {
            logger.error('error', 'Falha ao enviar o arquivo para a AWS', error);
            throw error;
        }
    }
}

module.exports = new AwsUploadCtrl;