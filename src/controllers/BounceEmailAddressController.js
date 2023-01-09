const { Controller } = require( '../../system/controllers/Controller' );
const { BounceEmailAddressService } = require( '../services/BounceEmailAddressService' );
const { BounceEmailAddress } = require( '../models/BounceEmailAddress' );
const autoBind = require( 'auto-bind' ),
    bounceEmailAddress = new BounceEmailAddressService(
        new BounceEmailAddress().getInstance()
    );

class BounceEmailAddressController extends Controller {

    constructor( service ) {
        super( service );
        autoBind( this );
    }

}

module.exports = new BounceEmailAddressController( bounceEmailAddress );