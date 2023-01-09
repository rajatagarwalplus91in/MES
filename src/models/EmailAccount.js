const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );
const uuid = require('node-uuid');

const common = require('../common/common.js');

class EmailAccount {

    initSchema() {
        const schema = new Schema( {
            _id: { type: String, default: uuid.v4},
            'sAccountName': {
                type: String,
                required: true
            },
            'sAttachmentlimit':{
                type: Number,
            },
            'aAllowedSenders': [common.EmailRecipient],
            'aCredentials': [common.SMTPEmailCredential]
        }, { 'timestamps': true } );

        schema.pre( 'save', function( next ) {
            return next();
        } );
        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'EmailAccount', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'EmailAccount' );
    }
}

module.exports = { EmailAccount };
