const cloudinary = require( "cloudinary" );
const { CloudinaryStorage } = require( "multer-storage-cloudinary" );
const multer = require( "multer" );
const { API_KEY, API_SECRET, CLOUD_ACCESS } = require( "../config.js" );

cloudinary.v2.config( {
    cloud_name: CLOUD_ACCESS,
    api_key: API_KEY,
    api_secret: API_SECRET,
} );

const storage = new CloudinaryStorage( {
    cloudinary: cloudinary.v2,
    params: ( req, file ) => {
        console.log( "started" );

        return {
            folder: "data",
            public_id: file.originalname,
        };
    },
} );

const upload = multer( { storage } );
module.exports = upload;