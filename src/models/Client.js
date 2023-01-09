const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );
const uuid = require('node-uuid');
const crypto = require('crypto');

const common = require('../common/common.js');

class Client {

    initSchema() {
        const schema = new Schema( {
            _id: { type: String, default: uuid.v4},
            'sFreeze': {
                type: Number,
                required: true,
                default:0,
                required: true},
            'sClientName': {
                type: String,
                required: true
            },
            'sClientSecret': {
                type: String
            },
            'sAttachmentlimit':{
                type: Number,
            },
            'aAllowedEmailAccounts' : [{
                type: String,
                required: true
            }]
        }, { 'timestamps': true } );

        schema.pre( 'save', function( next ) {
            const buf = crypto.randomBytes(16);
            this.sClientSecret = Buffer.from(buf).toString('hex');
            return next();
        } );
        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'Client', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'Client' );
    }
}

module.exports = { Client };
