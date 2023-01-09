'use strict';
const EmailAccountController = require( '../../controllers/EmailAccountController' );
const FirstPartyAuthMiddleware = require( '../../middleware/FirstPartyAuthMiddleware' );

const express = require( 'express' ),
    router = express.Router();

router.use(FirstPartyAuthMiddleware.handle);
router.get( '/', EmailAccountController.getAll );
router.get( '/:id', EmailAccountController.get );
router.post( '/', EmailAccountController.insert );
router.put( '/:id', EmailAccountController.update );
router.delete( '/:id', EmailAccountController.delete );


module.exports = router;