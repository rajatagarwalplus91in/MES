'use strict';
const { Service } = require( '../../system/services/Service' );

class BounceEmailAddressService extends Service {
    constructor( model ) {
        super( model );
    }

    async insert( data , params ) {
        try {
            data.sClientID = params.sClientID;
            return super.insert(data, params);
            
        } catch ( error ) {
            throw error;
        }
    }
}

module.exports = { BounceEmailAddressService };
