require('dotenv').config();
const {S3Client, PutObjectCommand, PutBucketPolicyCommand } = require('@aws-sdk/client-s3');
const logger = require("../../config/logger"); 
const mime = require("mime-types");

class AwsUploadCtrl {
    constructor() {
        this.s3Client = new S3Client({
            region: process.env.REGION,
            credentials: {
                accessKeyId: process.env.ACCESSKEY,
                secretAccessKey: process.env.SECRETACCESSKEY
            }
        })
    }

    // Torar o Bucket publico
    // ook = async (req, res) => {
    //     try {
    //         const bucketPolicy = {
    //           Version: '2012-10-17',
    //           Statement: [
    //             {
    //               Effect: 'Allow',
    //               Principal: '*',
    //               Action: 's3:GetObject',
    //               Resource: `arn:aws:s3:::${process.env.BUCKET}/*`
    //             }
    //           ]
    //         };
        
    //         const params = {
    //           Bucket: process.env.BUCKET,
    //           Policy: JSON.stringify(bucketPolicy)
    //         };
        
    //         await this.s3Client.send(new PutBucketPolicyCommand(params));
        
    //         console.log('Bucket policy configurada com sucesso para permitir acesso público.');
    //       } catch (error) {
    //         console.error('Erro ao configurar a política do bucket:', error);
    //         throw error;
    //       }
    // }

    uploadPhotoUser = async (file, fileName) => {
        try {
            const folder = process.env.FOLDERIMGUSERS;

            const contentType = mime.lookup(file.originalname);
            const extension = mime.extension(contentType);

            const key = `${fileName}.${extension}`;
    
            const response = await this.uploadFile(file.buffer, key, contentType, folder);
            console.log(response);
        } catch (error) {
            throw new Error(error);
        }
    }

    uploadFile = async (file, fileName, fileType, folder) => {
        try {
            const s3ObjectKey = `${folder}/${fileName}`;

            const params = {
                Bucket: process.env.BUCKET,
                Key: s3ObjectKey,
                Body: file,
                ContentType: fileType,
            }

            const command = new PutObjectCommand(params);
            const response = await this.s3Client.send(command);

            return response;
        } catch (error) {
            logger.error('error', `Falha ao enviar o arquivo ${fileName} para aws.`);
            throw new Error(error);
        }
    }
}

module.exports = new AwsUploadCtrl;