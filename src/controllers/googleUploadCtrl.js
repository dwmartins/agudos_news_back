require('dotenv').config();
const { google } = require('googleapis');
const GOOGLE_API = process.env.GOOGLE_API_FOLDER;
const logger = require('../../config/logger');
const fs = require('fs')
const stream = require('stream');

class GoogleUploadCtrl {

    uploadFile = async (fileName, mimeType, imgMedia) => {
        try {
            const auth = new google.auth.GoogleAuth({
                keyFile: 'googledrive.json',
                scopes: ['https://www.googleapis.com/auth/drive']
            });

            const driveService = google.drive({
                version: 'v3',
                auth
            });

            const fileMetaData = {
                'name': fileName,
                'parents': [GOOGLE_API]
            }

            const readableStream = new stream.PassThrough();
            readableStream.end(imgMedia);

            const media = {
                mimeType: 'image/' + mimeType,
                body: readableStream
            }

            const response = await driveService.files.create({
                resource: fileMetaData,
                media: media,
                fields: 'id'
            });

            return response.data.id;

        } catch (error) {
            logger.log(`error`, `Erro ao salvar a imagem no google: ${error}`);
        }
    }
}

module.exports = new GoogleUploadCtrl;