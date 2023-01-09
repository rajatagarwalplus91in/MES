'use strict';
const EmailAccountFamilyController = require( '../../controllers/EmailAccountFamilyController.js' );
const FirstPartyAuthMiddleware = require( '../../middleware/FirstPartyAuthMiddleware' );

const express = require( 'express' ),
    router = express.Router();

router.use(FirstPartyAuthMiddleware.handle);
router.get( '/', EmailAccountFamilyController.getAll );
router.get( '/:id', EmailAccountFamilyController.get );
router.post( '/', EmailAccountFamilyController.insert );
router.put( '/:id', EmailAccountFamilyController.update );
router.delete( '/:id', EmailAccountFamilyController.delete );


module.exports = router;