const { Controller } = require( '../../system/controllers/Controller' );
const { EmailAccountService } = require( '../services/EmailAccountService' );
const { EmailAccount } = require( '../models/EmailAccount' );
const autoBind = require( 'auto-bind' ),
    emailAccount = new EmailAccountService(
        new EmailAccount().getInstance()
    );

class EmailAccountController extends Controller {

    constructor( service ) {
        super( service );
        autoBind( this );
    }

}

module.exports = new EmailAccountController( emailAccount );