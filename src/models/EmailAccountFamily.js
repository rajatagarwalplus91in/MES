const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );
const uuid = require('node-uuid');

const common = require('../common/common.js');

class EmailAccountFamily {

    initSchema() {
        const schema = new Schema( {
            _id: { type: String, default: uuid.v4},
            'sAccountFamilyName': {
                type: String
            }
        }, { 'timestamps': true } );

        schema.pre( 'save', function( next ) {
            return next();
        } );
        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'EmailAccountFamily', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'EmailAccountFamily' );
    }
}

module.exports = { EmailAccountFamily };
