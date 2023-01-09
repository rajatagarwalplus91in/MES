const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );
const uuid = require('node-uuid');

const common = require('../common/common.js');

class BounceEmailAddress {

    initSchema() {
        const schema = new Schema( {
            _id: { type: String, default: uuid.v4},
            'sEmailAddress': {
                type: String,
                required: true
            },
            'bIsPermanentBounce': {
                type: Boolean,
                required: true,
                default: true
            },
            'dtBounceStatusTill': {
                type: Date,
            },
            'bIsGlobalBounceStatus': {
                type: Boolean,
                required: true,
                default: true
            },
            'sClientID': {
                type: String
            }
        }, { 'timestamps': true } );

        schema.pre( 'save', function( next ) {
            const BounceEmailAddress = this;
            return next();
        } );
        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'BounceEmailAddress', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'BounceEmailAddress' );
    }
}

module.exports = { BounceEmailAddress };
