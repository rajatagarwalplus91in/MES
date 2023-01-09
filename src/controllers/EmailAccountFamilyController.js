const { Controller } = require( '../../system/controllers/Controller' );
const { EmailAccountFamilyService } = require( '../services/EmailAccountFamilyService' );
const { EmailAccountFamily } = require( '../models/EmailAccountFamily' );
const autoBind = require( 'auto-bind' ),
    emailAccountFamily = new EmailAccountFamilyService(
        new EmailAccountFamily().getInstance()
    );

class EmailAccountFamilyController extends Controller {

    constructor( service ) {
        super( service );
        autoBind( this );
    }

}

module.exports = new EmailAccountFamilyController( emailAccountFamily );