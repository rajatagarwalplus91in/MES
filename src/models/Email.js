const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );
const uuid = require('node-uuid');

const common = require('../common/common.js');

class Email {

    initSchema() {
        const schema = new Schema( {
            _id: { type: String, default: uuid.v4},
            'sClientID': {
                type: String
            },
            'sEmailSubject': {
                'type': String,
                'required': true,
            },
            'sEmailBody': {
                'type': String,
                'required': true,
            },
            'bIsMarketingEmail': {
                'type': Boolean,
                'required': true,
            },
            'bIsEmailBodyHtml': {
                'type': Boolean,
                'required': true,
                'default': true
            },
            'dtScheduleAt': {
                'type': Date
            },
            'oReplyTo': common.EmailRecipient,
            'aRecipients': [
                common.EmailRecipient
            ],
            'aCCRecipients': [common.EmailRecipient],
            'aBCCRecipients' : [common.EmailRecipient],
            'oSender': common.EmailRecipient,
            'aAttachments': [
                common.EmailAttachment
            ],
            'bIsAsync' :{
                'type': Boolean,
                'default': false
            },
            'iEmailPriority': {
                'type': Number,
                'default': 2 
            },
            'sEmailStatus' : {
                'type': String,
                'enum': ["Pending", "In-Process", "Sent", "Delivered", "Rejected", "Failed", "Partially Failed", "Bounced"],
                'default': "Pending"
            }
        }, { 'timestamps': true } );

        schema.pre( 'save', function( next ) {
            const Email = this;
            return next();
        } );
        schema.plugin( uniqueValidator );

        schema.methods.getAllEmailAddresses = function() {
            let aEmailIDs = [];

            aEmailIDs = aEmailIDs.concat(this.aRecipients.map(function(a){ return a.sEmail }));
            aEmailIDs = aEmailIDs.concat(this.aCCRecipients.map(function(a){ return a.sEmail }));
            aEmailIDs = aEmailIDs.concat(this.aBCCRecipients.map(function(a){ return a.sEmail }));

            return aEmailIDs;

        }
        try {
            mongoose.model( 'Email', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        this.initSchema();
        return mongoose.model( 'Email' );
    }
}

module.exports = { Email };
