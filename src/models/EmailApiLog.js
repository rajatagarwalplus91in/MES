const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );
const uuid = require('node-uuid');
const crypto = require('crypto');

const common = require('../common/common.js');

class EmailApiLog {

    initSchema() {
        const schema = new Schema( {
            _id: { type: String, default: uuid.v4},
            'sEndpoint': {
                type: String,
                required: true
            },
            'sHeaders': {
                type: String,
                required: true
            },
            'sClientID': {
                type: String
            },
            'sRequestType': {
                type: String
            },
            'sRequestBody': {
                type: String
            },
            'sResponseBody': {
                type: String
            },
            'sResponseCode': {
                type: String
            },
            'sIP': {
                type: String
            },
            'sUserAgent': {
                type: String
            }
        }, { 'timestamps': true } );

        schema.pre( 'save', function( next ) {
        } );
        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'EmailApiLog', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'EmailApiLog' );
    }
}

module.exports = { EmailApiLog };
