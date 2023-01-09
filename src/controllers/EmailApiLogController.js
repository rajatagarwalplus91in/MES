const { Controller } = require( '../../system/controllers/Controller' );
const { EmailApiLogService } = require( '../services/EmailApiLogService' );
const { EmailApiLog } = require( '../models/EmailApiLog.js' );
const autoBind = require( 'auto-bind' ),
    emailApiLog = new EmailApiLogService(
        new EmailApiLog().getInstance()
    );

class EmailApiLogController extends Controller {

    constructor( service ) {
        super( service );
        autoBind( this );
    }

}

console.log(new EmailApiLog().getInstance());

module.exports = new EmailApiLogController( emailApiLog );