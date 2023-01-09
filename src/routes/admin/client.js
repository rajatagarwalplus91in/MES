'use strict';
const ClientController = require( '../../controllers/ClientController' );
const FirstPartyAuthMiddleware = require( '../../middleware/FirstPartyAuthMiddleware' );

const express = require( 'express' ),
    router = express.Router();

router.use(FirstPartyAuthMiddleware.handle);

router.get( '/', ClientController.getAll );
router.get( '/:id', ClientController.get );
router.post( '/', ClientController.insert );
router.put( '/:id', ClientController.update );
router.delete( '/:id', ClientController.delete );


module.exports = router;