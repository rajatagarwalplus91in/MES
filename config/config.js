'use strict';
const path = require( 'path' );

module.exports.getConfig = () => {
    const config = {
        'MODE': 'Development',
        'PORT': process.env.PORT || 5000,
        'MONGO_URL': process.env.MONGO_URL,
        'UPLOAD_PATH': path.resolve( `${__dirname }/../uploads` ),
        'JWT_SECRET': process.env.JWT_SECRET || 'RANDOMSTRING',
        'HTTPS': process.env.HTTPS || false,
        'HTTPS_PRIVATEKEY': process.env.HTTPS_PRIVATEKEY ||'',
        'HTTPS_CERT': process.env.HTTPS_CERT ||'',
        'HTTPS_CACHAIN': process.env.HTTPS_CACHAIN || ''
    };

    // Modify for Production
    if ( process.env.NODE_ENV === 'production' ) {
        config.MODE = 'Production';
    }

    return config;
};
