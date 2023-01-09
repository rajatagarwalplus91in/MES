const { Controller } = require( '../../system/controllers/Controller' );
const { ClientService } = require( '../services/ClientService' );
const { Client } = require( '../models/Client' );
const autoBind = require( 'auto-bind' ),
    client = new ClientService(
        new Client().getInstance()
    );

class ClientController extends Controller {

    constructor( service ) {
        super( service );
        autoBind( this );
    }

}

console.log(new Client().getInstance());

module.exports = new ClientController( client );