import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:8000';

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

export const uploadImage = (request, response) => {
    if(!request.file) 
        return response.status(404).json("File not found");
    
    const imageUrl = `${url}/file/${encodeURIComponent(request.file.filename)}`;
    console.log('Image uploaded:', imageUrl);

    response.status(200).json(imageUrl);    
}

export const getImage = async (request, response) => {
    try {   
        const filename = decodeURIComponent(request.params.filename);
        const file = await gfs.files.findOne({ filename });
        
        if (!file) {
            return response.status(404).json({ msg: 'File not found' });
        }

        // Set proper headers for image display
        response.set('Content-Type', file.contentType);
        response.set('Content-Disposition', `inline; filename="${file.filename}"`);
        
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        console.error('Error serving image:', error);
        response.status(500).json({ msg: error.message });
    }
}