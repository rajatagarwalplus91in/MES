'use strict';
const { Service } = require( '../../system/services/Service' );

class EmailApiLogService extends Service {
    constructor( model ) {
        super( model );
    }

}

module.exports = { EmailApiLogService };
