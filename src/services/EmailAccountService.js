'use strict';
const { Service } = require( '../../system/services/Service' );

class EmailAccountService extends Service {
    constructor( model ) {
        super( model );
    }

}

module.exports = { EmailAccountService };
