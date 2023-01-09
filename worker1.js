require( 'dotenv' ).config();
require('log-timestamp');
// Initialize DB Connection
require( './config/database' );

const config = require( './config/config' ).getConfig();

const { Email } = require( './src/models/Email' );
const { Client } = require( './src/models/Client' );

const { EmailProcessor } = require( './src/services/EmailProcessor' );
const { EmailAccount } = require('./src/models/EmailAccount');

let EmailFilter = {
    oFilter: {
        sEmailStatus: "Pending", 
    },
    oSort: {
        iEmailPriority: -1
    }
}
let oEmailProcessor = new EmailProcessor(new Email().getInstance(), EmailFilter, new Client().getInstance(), new EmailAccount().getInstance());

oEmailProcessor.processQueue();