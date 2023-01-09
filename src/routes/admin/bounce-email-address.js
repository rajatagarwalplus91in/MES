'use strict';
const BounceEmailAddressController = require( '../../controllers/BounceEmailAddressController' );
const FirstPartyAuthMiddleware = require( '../../middleware/FirstPartyAuthMiddleware' );

const express = require( 'express' ),
    router = express.Router();

router.use(FirstPartyAuthMiddleware.handle);
router.get( '/', BounceEmailAddressController.getAll );
router.get( '/:id', BounceEmailAddressController.get );
router.post( '/', BounceEmailAddressController.insert );
router.put( '/:id', BounceEmailAddressController.update );
router.delete( '/:id', BounceEmailAddressController.delete );


module.exports = router;